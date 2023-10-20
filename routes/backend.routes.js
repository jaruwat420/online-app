import { Router } from "express";
import { 
    renderIndex,
    renderUser,
    getDatatable,
    renderCategory,
    addCategory,
    getDataTableCategory
} from "../controllers/userController.js";

import auth from '../middleware/auth.js';

const router = Router();

router.get("/index", auth, renderIndex);
router.get("/user", auth, renderUser);
router.get("/get_datatable", auth, getDatatable);
router.get("/category", auth, renderCategory);
router.post("/category", auth, addCategory);
router.get("/get_datatable_category", auth, getDataTableCategory);



export default router;