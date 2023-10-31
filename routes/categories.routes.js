import { Router } from "express";
import { 
    renderHome,
    createCategories,
    deleteCategories,
    dataTableCategories,
    renderIndex,
    findCategories

} from "../controllers/categoriesController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/dataTable", auth, dataTableCategories);
router.put("/create", auth, createCategories);
router.put("/delete/:id", auth, deleteCategories);

//---------------------Front End---------------------------//
router.get("/index", renderIndex);
router.get("/find/:id", findCategories)

export default router;