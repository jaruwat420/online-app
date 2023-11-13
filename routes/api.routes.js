import { Router } from "express";
import { 
    checkout,

} from "../controllers/apiController.js";

//--------------------------auth---------------------------//


const router = Router();

router.post("/checkout", checkout);

export default router;