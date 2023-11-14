import { Router } from "express";
import { 
    renderHome,
    getDataTable,
    getConfirm
} from "../controllers/orderController.js";


const router = Router();

router.get("/", renderHome);
router.get("/order_list", getDataTable)
router.get("/confirmations/:id", getConfirm);

export default router;