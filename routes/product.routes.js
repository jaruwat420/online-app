import { Router } from "express";
import { 
    renderHome,
    getDataTable,
    createProduct

} from "../controllers/productController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/getdatatable", auth, getDataTable);
router.put("/create", auth, createProduct);

export default router;