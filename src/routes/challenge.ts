import { Router } from "express";

import {getHistoryChallenges, solveChallenge, getAllChallenges, getChallenges, 
    getChallenge, getChallengeCount, addChallenge, updateChallenge, deleteChallenge, 
    addChallengeToUser, addBadge} from "../controllers/challenge";  
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/get/all", checkJwt, getAllChallenges); //Get all challenges
router.get("/get/pagination/:pageNumber/:nPerPage",checkJwt, getChallenges); //Get some challenges
router.get("/get/:idChallenge",checkJwt, getChallenge); //Get only the information of one challenge
router.get("/get/history/:idUser", getHistoryChallenges);
router.get("/count",checkJwt, getChallengeCount); //Return the total number of active challenges

router.post("/add", checkJwt, addChallenge); //Create a challenge
router.post("/update/:idChallenge", checkJwt, updateChallenge); //Update the details of a challenge

router.post("/challenges/add/:idUser/:idChallenge",checkJwt, addChallengeToUser); //Adds a challenge to the list of completed challenges that a user has

router.post("/post/solve",  solveChallenge);
router.post("/challenges/addinsignia/:idUser/:idItinerari", checkJwt, addBadge);

router.delete("/delete/:idChallenge", checkJwt, deleteChallenge); //Remove a challenge permanently

export{ router };