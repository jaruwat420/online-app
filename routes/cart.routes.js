import { Router } from "express";
import { 
    addCart,
    renderHome,
    renderCheckout,
    destroySession,
    addSession,
    addSingleProduct,
    getCheckout,
    getConfirm,

} from "../controllers/cartController.js";

//--------------------------auth---------------------------//


const router = Router();

router.get("/", renderHome);
router.put("/add-to-cart/:id", addCart);
router.put("/add-to-cart/", addSession);
router.put("/add-to-cart-single/", addSingleProduct);
router.put("/destroy-session", destroySession);
router.get("/checkout", renderCheckout);
router.put("/checkout", getCheckout);
router.get("/checkout_confirm", getConfirm);

export default router;