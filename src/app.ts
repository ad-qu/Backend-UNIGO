import "dotenv/config";
import cors from "cors";
import config from "config";
import express from "express";
import db from "../config/mongo"
import { Server } from "socket.io";
import { createServer } from "http";
import { router } from "./routes";
import { version } from "../package.json";

const PORT = process.env.PORT || 3001;  
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

db().then(() => console.log("Connection is ready..."));
app.listen(PORT, () => console.log(`Hey! Listening by the port ${PORT}.`));

const port = config.get<number>("port");
//const host = config.get<string>("host");
//const corsOrigin = "*";

const httpServer = createServer(app);

const io = new Server(httpServer);

const connectedUsers: { [room: string]: Set<string> } = {};

io.on('connection', (socket) => {
     console.log('backend connected');
      socket.on('join-room', (room) => {
          socket.join(room);
          if (!connectedUsers[room]) {
              connectedUsers[room] = new Set();
          }
          connectedUsers[room].add(socket.id);
          io.to(room).emit('connected-users', connectedUsers[room].size);
      });
      socket.on('message', (data) => {
          const { room, idUser, senderName, message } = data;
          console.log('msg ', data);
          io.to(room).emit('message', { idUser: idUser, senderName: senderName, message: message });
      });
      socket.on('disconnect', () => {
          for (const room in connectedUsers) {
              if (connectedUsers[room].has(socket.id)) {
                  connectedUsers[room].delete(socket.id);
                  io.to(room).emit('connected-users', connectedUsers[room].size);
                  break;
              }
          }
      });
  });
  
  httpServer.listen(port, () => { console.log(`Server version ${version} is listening 🚀`); },
);