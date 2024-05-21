import { Router } from "express";

import { addItinerary, getAllItineraries, deleteItinerary, getUserItineraries, getEntityItineraries } from "../controllers/itinerary";  
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/get/all",checkJwt, getAllItineraries); //Get all challenges
router.get("/get/userItineraries/:idUser", getUserItineraries);
router.get("/get/entityItineraries/:idEntity", getEntityItineraries);
router.post("/add/:idEntity", checkJwt, addItinerary); //Create a challenge
router.delete("/delete/:idItinerary",checkJwt, deleteItinerary); //Create a challenge

export{ router };