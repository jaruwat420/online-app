import { Router } from "express";
import { 
    getRegister,
    register,
    login,
} from "../controllers/authController.js";

const router = Router();

router.put("/", login);
router.get("/register", getRegister);
router.put("/register", register);
router.put("/login", login);


export default router;