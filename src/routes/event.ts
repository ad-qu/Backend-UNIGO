import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getAllEntities, getEntity, getFollowersEntities, getNotFollowingEntities, addEntity, 
    updateEntity, addFollowEntities, deleteFollowEntities, deleteEntities, getFollowingPeople } from "../controllers/entity";

const router =  Router();

router.get("/get/all", checkJwt, getAllEntities); //Get all entities
router.get("/get/:idEntity", checkJwt, getEntity); //Get an entity
router.get("/get/followingPeople/:idEntity", getFollowingPeople);

router.get("/following/:idUser", getFollowersEntities); //Get the entities that the user is following
router.get("/unfollowing/:idUser", checkJwt, getNotFollowingEntities); //Get the entities that the user is not following

router.post("/add", checkJwt, addEntity); //Creates an entity by a user
router.post("/update/:idEntity", checkJwt, updateEntity); //Update the parameters of an entity

router.post("/follow/add/:idUser/:idEntity", checkJwt, addFollowEntities); //Allows a user to follow an entity (and therefore view its news and chats)
router.post("/follow/delete/:idUser/:idEntity", checkJwt, deleteFollowEntities); //Allows a user to unfollow an entity

router.delete("/delete/:idEntity", checkJwt, deleteEntities); //Deletes an entity (itineraries, chat and news)

export{ router };