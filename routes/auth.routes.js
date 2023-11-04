import { Router } from "express";
import { 
    getRegister,
    register,
    login,
    doLogin,
    renderLogin,
    renderRegistration,
    getRegistration
    // dashboard,
} from "../controllers/authController.js";

import auth from '../middleware/auth.js';

const router = Router();


router.put("/", login);
router.get("/register", getRegister);
router.put("/register", register);
router.put("/login", login);
router.get("/registration", renderRegistration);
router.post("/registration", getRegistration);
router.get("/doLogin", renderLogin);
router.post("/doLogin", doLogin);


export default router;