import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getAllNews, getEntityNews, addNew, deleteNew, getNew } from "../controllers/new";  

const router = Router();

router.get("/get/all", checkJwt, getAllNews); //Get all news
router.get("/get/:idNew", checkJwt, getNew); //Get a new
router.get("/get/entityNews/:idEntity", getEntityNews); //Get the news that a entity has

router.post("/add/:idEntity", checkJwt, addNew); //Adds a new to the entity

router.delete("/delete/:idNew", checkJwt, deleteNew); //Deletes a new of the entity

export{ router };