import { Router } from "express";
import { 
    renderHome,
    getDataTable,
    createProduct

} from "../controllers/productController.js";

const router = Router();

router.get("/", renderHome);
router.get("/getdatatable", getDataTable);
router.post("/create_product", createProduct);

export default router;