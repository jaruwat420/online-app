import { Router } from "express";
import { 
    getRegister,
    register,
    login,
    secretPage,
} from "../controllers/authController.js";

const router = Router();

router.put("/", login);
router.get("/register", getRegister);
router.put("/register", register);
router.put("/login", login);
router.put("/secret", secretPage);

export default router;