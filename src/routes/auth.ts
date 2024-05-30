import { Router } from "express";
import { tokenCtrl, registerCtrl, googleControl } from "../controllers/auth";

const router = Router();

router.post("/register", registerCtrl); 
router.post("/login", tokenCtrl);

router.post("/loginGAuth", googleControl);
//router.post("/loginAppleAuth", appleControl);

export {router};