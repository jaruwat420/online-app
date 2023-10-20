import { Router } from "express";
import { 
    getRegister,
    register,
    login,
    // dashboard,
} from "../controllers/authController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.put("/", login);
router.get("/register", getRegister);
router.put("/register", register);
router.put("/login", login);
// router.get("/dashboard", auth, dashboard);

export default router;