import { Router } from "express";
import { 
    addCart,
    renderHome,
    checkoutProduct,
    destroySession,

} from "../controllers/cartController.js";

//--------------------------auth---------------------------//
import auth from '../middleware/auth.js';

const router = Router();

router.get("/", renderHome);
router.put("/add-to-cart/:id", addCart);
router.get("/checkout", checkoutProduct);
router.put("/destroy-session", destroySession);

export default router;