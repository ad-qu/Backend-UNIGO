import { Router } from "express";

import { addItinerary, getAllItineraries, deleteItinerary } from "../controllers/itinerary";  
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/get/all",checkJwt, getAllItineraries); //Get all challenges

router.post("/add",checkJwt, addItinerary); //Create a challenge
router.delete("/delete/:idItinerary",checkJwt, deleteItinerary); //Create a challenge

export{ router };