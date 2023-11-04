import { Router } from "express";
import { 
    renderHome,
    // dashboard,
} from "../controllers/orderController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.get("/", renderHome);

export default router;