import { Router } from "express";
import { 
    renderHome,
    getDataTable,
    deleteUser,


} from "../controllers/userController.js";


const router = Router();

router.get("/", renderHome);
router.get("/dataTable", getDataTable);
router.put("/delete/:id", deleteUser);


export default router;