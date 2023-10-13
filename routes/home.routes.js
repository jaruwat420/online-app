import { Router } from "express";
import { 
    renderHome,
    renderAbout,
    renderMessage
} from "../controllers/homeController.js";

const router = Router();

router.get("/", renderHome);
router.get("/about", renderAbout);
router.get("/success", renderMessage);

export default router;