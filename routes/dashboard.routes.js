import { Router } from "express";
import { 
    renderHome,
    setBanner
} from "../controllers/dashboardController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/banner", auth, setBanner);

export default router;