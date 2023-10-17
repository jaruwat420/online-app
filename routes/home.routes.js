import { Router } from "express";
import { 
    renderHome,
    renderSecret,
    renderAbout,
} from "../controllers/homeController.js";

const router = Router();

router.get("/", renderHome);

router.get("/secret", renderSecret);
router.get("/about", renderAbout);


export default router;