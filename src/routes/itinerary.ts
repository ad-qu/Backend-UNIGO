import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getAllItineraries, getItinerary, getUserItineraries, getEntityItineraries, 
    addItinerary, deleteItinerary } from "../controllers/itinerary";  

const router = Router();

router.get("/get/all",checkJwt, getAllItineraries); //Get all challenges
router.get("/get/:idItinerary", getItinerary); //Get an itinerary

router.get("/get/userItineraries/:idUser", getUserItineraries); //Get user itineraries (of every entity is following)
router.get("/get/entityItineraries/:idEntity", getEntityItineraries); //Get the itineraries that an entity has

router.post("/add/:idEntity", checkJwt, addItinerary); //Creates an itinerary

router.delete("/delete/:idItinerary",checkJwt, deleteItinerary); //Deletes an itinerary

export{ router };