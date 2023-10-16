import { Router } from "express";
import { 
    getIndex,

} from "../controllers/adminController.js";

const router = Router();

router.get("/index", getIndex);


export default router;