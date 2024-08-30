import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getAllCampus, addCampus, deleteCampus, getCampus } from "../controllers/campus";  

const router = Router();

router.get("/get/all", getAllCampus); //Get all news
router.get("/get/:idCampus", getCampus); //Get a new

router.post("/add", addCampus); //Adds a new to the entity

router.delete("/delete/:idCampus", deleteCampus); //Deletes a new of the entity

export{ router };