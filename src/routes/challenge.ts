import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { getAllChallenges, getChallenges, getChallenge, getItineraryChallenges, getChallengeCount, getHistoryChallenges, 
    addChallenge, updateChallenge, addChallengeToUser, solveChallenge, deleteChallenge } from "../controllers/challenge";  

const router = Router();

router.get("/get/all", checkJwt, getAllChallenges); //Get all challenges
router.get("/get/pagination/:pageNumber/:nPerPage",checkJwt, getChallenges); //Get some challenges
router.get("/get/:idChallenge",checkJwt, getChallenge); //Get only the information of one challenge
router.get("/get/itineraryChallenges/:idItinerary", getItineraryChallenges); //Get the challenges of an itinerary
router.get("/count",checkJwt, getChallengeCount); //Return the total number of challenges

router.get("/get/history/:idUser", checkJwt, getHistoryChallenges); //Get the history of challenges of a user

router.post("/add", checkJwt, addChallenge); //Create a challenge
router.post("/update/:idChallenge", checkJwt, updateChallenge); //Update the details of a challenge

router.post("/challenges/add/:idUser/:idChallenge",checkJwt, addChallengeToUser); //Adds a challenge to the list of completed challenges that a user has (history)
router.post("/post/solve", checkJwt, solveChallenge); //Marks a challenge as solved for a user and adds the experience to it

router.delete("/delete/:idChallenge", checkJwt, deleteChallenge); //Deletes a challenge

export{ router };