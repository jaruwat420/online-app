import { Router } from "express";
import { 
    renderHome,
    renderRegister,
    Register,
    renderLogin,
    Login,
} from "../controllers/homeController.js";

const router = Router();

router.get("/", renderHome);
router.get("/register", renderRegister);
router.post("/register", Register);
router.get("/login", renderLogin);
router.post("/login", Login);

export default router;