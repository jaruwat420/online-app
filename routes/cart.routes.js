import { Router } from "express";
import { 
    addCart,
    renderHome,
    checkoutProduct,
    destroySession,
    addSession

} from "../controllers/cartController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", renderHome);
router.put("/add-to-cart/:id", addCart);
router.put("/add-to-cart/", addSession);
router.get("/checkout", checkoutProduct);
router.put("/destroy-session", destroySession);

export default router;