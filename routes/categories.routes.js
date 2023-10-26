import { Router } from "express";
import { 
    renderHome,
    createCategories,
    dataTableCategories,

} from "../controllers/categoriesController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/dataTable", auth, dataTableCategories);
router.put("/create", auth, createCategories);

export default router;