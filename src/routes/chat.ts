import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getChat, addChat, updateChat, deleteChat } from "../controllers/chat";

const router =  Router();

router.get("/get/:idEntity", getChat); //Get the chat of a entity
router.post("/add/:idEntity", checkJwt, addChat); //Creates a chat (when an entity is created)
router.put("/update/:idChat", updateChat); //Update a chat with messages
router.delete("/delete/:idChat", checkJwt, deleteChat); //Deletes a chat (when an entity is deleted)

export{ router };