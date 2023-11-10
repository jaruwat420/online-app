import { Router } from "express";
import { 
    addCart,
    renderHome,
    checkoutProduct,
    destroySession,
    addSession,
    addSingleProduct

} from "../controllers/cartController.js";

//--------------------------auth---------------------------//


const router = Router();

router.get("/", renderHome);
router.put("/add-to-cart/:id", addCart);
router.put("/add-to-cart/", addSession);
router.put("/add-to-cart-single/", addSingleProduct);
router.get("/checkout", checkoutProduct);
router.put("/destroy-session", destroySession);

export default router;