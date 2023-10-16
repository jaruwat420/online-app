import { Router } from "express";
import { 
    getIndex,

} from "../controllers/userController.js";

const router = Router();

router.get("/index", getIndex);


export default router;