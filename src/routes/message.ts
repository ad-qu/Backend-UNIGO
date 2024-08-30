import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getMessage, addMessage, deleteMessage } from "../controllers/message";

const router =  Router();

router.get("/get/:idMessage", checkJwt, getMessage); //Get the chat of a entity
router.post("/add/:idChat", checkJwt, addMessage); //Creates a chat (when an entity is created)
router.delete("/delete/:idMessage", checkJwt, deleteMessage); //Deletes a chat (when an entity is deleted)

export{ router };