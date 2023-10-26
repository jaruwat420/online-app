import { Router } from "express";
import { 
    renderIndex,
    renderUser,
    get_datatable,
} from "../controllers/userController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.get("/index", auth, renderIndex);
router.get("/user", auth, renderUser);
router.get("/dataTable", auth, get_datatable);

export default router;