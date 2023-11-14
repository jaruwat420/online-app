import { Router } from "express";
import { 
    getRegister,
    register,
    login,
    doLogin,
    renderLogin,
    renderRegistration,
    getRegistration,
    renderProfile,
    getLogout,
    getProfile,
    getConfirm
    // dashboard,
} from "../controllers/authController.js";


import checkAuthentication from '../middleware/checkAuthen.js';
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
router.get('/logout', getLogout);
router.get('/profile', renderProfile);
router.put('/profile', getProfile);
router.get('/checkout_confirm', getConfirm);



export default router;