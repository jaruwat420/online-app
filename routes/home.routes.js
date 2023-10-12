import { Router } from "express";
import { 
    renderHome,
    renderAbout,
} from "../controllers/homeController.js";

const router = Router();

router.get("/", renderHome);
router.get("/about", renderAbout);

export default router;