import { Router } from "express";
import { 
    getIndex,
    getUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/index", getIndex);
router.get("/user", getUser);

export default router;