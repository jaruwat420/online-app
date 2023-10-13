import { Router } from "express";
import { 
    getRegister,
    register,
    getLogin,
    login,
} from "../controllers/authController.js";

const router = Router();

router.get("/register", getRegister);
router.put("/register", register);
router.get("/login", getLogin);
router.put("/login", login);

export default router;