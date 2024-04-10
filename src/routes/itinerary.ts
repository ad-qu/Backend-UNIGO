import { Router } from "express";

import { addItinerary, getAllItineraries } from "../controllers/itinerary";  
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/get/all",checkJwt, getAllItineraries); //Get all challenges

router.post("/add",checkJwt, addItinerary); //Create a challenge

export{ router };