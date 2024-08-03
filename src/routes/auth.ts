import { Router } from "express";
import { loginControl, signupControl, googleControl } from "../controllers/auth";

const router = Router();

router.post("/signup", signupControl); 
router.post("/login", loginControl);

router.post("/googleAuthSignUp", googleControl);

export {router};