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


const router = Router();

router.get("/",  renderHome);
router.get("/dataTable",  getDataTable);
router.put("/create",  createProduct);
router.put("/update/:id",  updateProduct);
router.put("/delete/:id",  deleteProduct);
router.get("/single-product/:id", productDetail);

export default router;