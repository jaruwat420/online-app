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
    // dashboard,
} from "../controllers/authController.js";


import checkAuthentication from '../middleware/checkAuthen.js';

const router = Router();

router.put("/", login);
router.get("/register", getRegister);
router.put("/register", register);
router.put("/login",checkAuthentication, login);
router.get("/registration", checkAuthentication,renderRegistration);
router.post("/registration",checkAuthentication, getRegistration);
router.get("/doLogin",checkAuthentication, renderLogin);
router.post("/doLogin",checkAuthentication, doLogin);
router.get('/logout', getLogout);
router.get('/profile', renderProfile);
router.put('/profile', getProfile);



export default router;