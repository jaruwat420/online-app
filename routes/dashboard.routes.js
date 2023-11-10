import { Router } from "express";
import { 
    renderHome,
    setBanner,
    renderPayment,
    createPayment,
    getdatatablePayment,
    deletePayment
} from "../controllers/dashboardController.js";


const router = Router();

router.get("/", renderHome);
router.get("/banner", setBanner);
router.get("/datatable_payment", getdatatablePayment);
router.get("/payment", renderPayment);
router.put("/payment_create", createPayment);
router.put("/deletePayment/:id", deletePayment);

export default router;