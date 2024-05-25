import { Router } from "express";

import { getAllNews, getEntityNews, addNew, deleteNew, getNew } from "../controllers/new";  
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/get/all", checkJwt, getAllNews); 
router.get("/get/entityNews/:idEntity", getEntityNews);
router.post("/add/:idEntity", checkJwt, addNew);
router.delete("/delete/:idNew",checkJwt, deleteNew); 
router.get("/get/:idNew", getNew);

export{ router };