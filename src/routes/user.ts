import { Router } from "express";
import { tokenCtrl } from "../controllers/auth";
import { checkJwt, checkAdmin } from "../middleware/session";

import { getAllUsers, getUsers, getUser, getUserCount, getUsersProfile, getUserProfile, updateUser,
     addFollow, deleteFollow, disableUser, deleteUser, unableUser, getFollowing, 
     getNotFollowing, getFollowersCount, getNotFollowingCount, getFollowingCount, getFollowers } from "../controllers/user";

const router =  Router();

//router.get("/get/all", checkAdmin, getAllUsers); //Get all users
//router.get("/get/:idUser", checkAdmin, getUser); //Get only the information of one user

router.get("/get/all", checkJwt, getAllUsers); //Get all users
router.get("/get/pagination/:pageNumber/:nPerPage", checkJwt, getUsers); //Get some users
router.get("/get/:idUser", getUser); //Get only the information of one user

router.get("/count", checkJwt, getUserCount); //Return the total number of active users

router.get("/profile/all/:pageNumber/:nPerPage", checkJwt, getUsersProfile); //Get all users information profile
router.get("/profile/:idUser", checkJwt, getUserProfile); //Get only the information of one user profile

router.post("/token", checkJwt, tokenCtrl); //Token required to enable startup and return a jwt

router.post("/update/:idUser", checkJwt, updateUser); //Lets a user to update his or her account details

router.post("/follow/add/:idUser/:idFollowed", addFollow); //Add a user to your following list
router.post("/follow/delete/:idUser/:idFollowed", checkJwt, deleteFollow); //Remove a user from your following list

router.get("/following/:idUser", getFollowing); //Gets the people that you follow
router.get("/followers/:idUser", getFollowers); //Gets the followers you have
router.get("/friends/unfollowing/:idUser", getNotFollowing);

router.get("/followers/count/:idUser", getFollowersCount); //Returns the number of people you follow
router.get("/following/count/:idUser", getFollowingCount); //Returns the number of followers

router.get("/friends/unfollowing/count/:idUser", getNotFollowingCount); //Returns the number of people you do not follow

router.post("/disable/:idUser", checkJwt, disableUser); //Disable a user so that he or she is not visible
router.post("/unable/:idUser", checkJwt, unableUser); //Disable a user so that he or she is not visible

router.delete("/delete/:idUser", checkJwt, deleteUser); //Remove a user permanently

export { router };
