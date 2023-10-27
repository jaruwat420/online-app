import { Router } from "express";
import { 
    renderHome,
    createCategories,
    deleteCategories,
    dataTableCategories,
    renderIndex

} from "../controllers/categoriesController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/dataTable", auth, dataTableCategories);
router.put("/create", auth, createCategories);
router.put("/delete/:id", auth, deleteCategories);

//---------------------Front End---------------------------//
router.get("/index", auth, renderIndex);

export default router;