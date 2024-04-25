import { checkJwt,checkAdmin } from "../middleware/session";
import {registerCtrl, tokenCtrl} from "../controllers/auth";

import { getAllEntities, getNotFollowingEntities, getFollowersEntities,
    addEntity, addFollowEntities, deleteEntities, deleteFollowEntities, updateEntity } from "../controllers/entity";

import { Router } from "express";

const router =  Router();

router.get("/get/all", checkJwt, getAllEntities);

router.post("/follow/add/:idUser/:idEntity", addFollowEntities);
router.post("/follow/delete/:idUser/:idEntity", deleteFollowEntities);
router.get("/following/:idUser", getFollowersEntities);
router.get("/unfollowing/:idUser", getNotFollowingEntities);
router.post("/add", addEntity);
router.delete("/delete/:idEntity", deleteEntities);
router.post("/update/:idEntity", updateEntity);

export{ router };