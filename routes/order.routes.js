import { Router } from "express";
import { 
    renderHome,
    createOrder,
    renderConfirm,
} from "../controllers/orderController.js";


const router = Router();

router.get("/", renderHome);
router.put("/create", createOrder);
router.get("/confirmation", renderConfirm);

export default router;