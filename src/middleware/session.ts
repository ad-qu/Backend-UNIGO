import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // Bearer: 11111
    const isUser = verifyToken(`${jwt}`) as { username: string, role: string };
    if (!isUser) {
      res.status(401);
      res.send("NO_TIENES_UN_JWT_VALIDO");
    } else {
      req.user = isUser;
      //console.log(`User ${isUser.username} token OK, rol ${isUser.role}`);
      next();
    }
  } catch (e) {
    console.log({ e });
    res.status(400);
    res.send("SESSION_NO_VALIDA");
  }
};

const checkAdmin = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || ""; //Nos llega o un JWT o nada (string vacia)
    const jwt = jwtByUser.split(" ").pop(); // "Bearer token"-> Nos quedamos con la ultima parte
    const isUser = verifyToken(`${jwt}`) as { email: string, role: string };
    if (!isUser) {
      res.status(401);
      res.send("NO_TIENES_UN_JWT_VALIDO");
    } 
    if (isUser.role != "admin"){
      res.status(401);
      res.send("UNAUTHORIZED");
    } 
    else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    console.log({ e });
    res.status(400);
    res.send("SESSION_NO_VALIDA");
  }
};

export { checkJwt, checkAdmin };