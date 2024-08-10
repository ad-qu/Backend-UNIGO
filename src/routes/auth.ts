import { Router } from "express";
import { signUpControl, logInControl, googleControl } from "../controllers/auth";

const router = Router();

router.post("/signUp", signUpControl); 
router.post("/logIn", logInControl);

router.post("/googleAuthSignUp", googleControl);

export {router};