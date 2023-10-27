import { Router } from "express";
import { 
    renderHome,
    getDataTable,
    deleteUser,

} from "../controllers/userController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/dataTable", auth, getDataTable);
router.put("/delete/:id", auth, deleteUser);

export default router;