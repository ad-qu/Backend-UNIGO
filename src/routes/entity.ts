import { checkJwt } from "../middleware/session";

import { getAllEntities, getNotFollowingEntities, getFollowersEntities,
    addEntity, addFollowEntities, deleteEntities, deleteFollowEntities, updateEntity, getEntity } from "../controllers/entity";

import { Router } from "express";

const router =  Router();

router.get("/get/all", checkJwt, getAllEntities);

router.post("/follow/add/:idUser/:idEntity", addFollowEntities);
router.post("/follow/delete/:idUser/:idEntity", checkJwt, deleteFollowEntities);
router.get("/following/:idUser", checkJwt, getFollowersEntities);
router.get("/unfollowing/:idUser", checkJwt, getNotFollowingEntities);
router.post("/add", checkJwt, addEntity);
router.delete("/delete/:idEntity", checkJwt, deleteEntities);
router.post("/update/:idEntity", checkJwt, updateEntity);
router.get("/get/:idEntity", checkJwt, getEntity); 

export{ router };