import { Router } from "express";
import { 
    renderHome
} from "../controllers/dashboardController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);

export default router;