import { Router } from "express";

import { getChat, addChat, deleteChat } from "../controllers/chat";

import { checkJwt } from "../middleware/session";

const router =  Router();

router.get("/get/:idChat", getChat);
router.post("/add/:idEntity", addChat);
router.delete("/delete/:idChat", deleteChat);

export{ router };