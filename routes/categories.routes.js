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


const router = Router();

router.get("/",  renderHome);
router.get("/dataTable", dataTableCategories);
router.put("/create", createCategories);
router.put("/delete/:id", deleteCategories);

//---------------------Front End---------------------------//
router.get("/index", renderIndex);
router.get("/find/:id", findCategories)

export default router;