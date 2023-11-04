import { Router } from "express";
import { 
    renderHome,
    getDataTable,
    createProduct,
    updateProduct,
    deleteProduct,
    productDetail,

} from "../controllers/productController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", auth, renderHome);
router.get("/dataTable", auth, getDataTable);
router.put("/create", auth, createProduct);
router.put("/update/:id", auth, updateProduct);
router.put("/delete/:id", auth, deleteProduct);
router.get("/single-product/:id", productDetail);

export default router;