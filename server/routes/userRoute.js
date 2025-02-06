import {Router} from "express";
import { deleteUser, getAllUsers, homeControl, loginUser, registerUser } from "../controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = Router();

router.get("/allUsers",authMiddleware, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware, homeControl);
router.delete("/delete/:id", authMiddleware, deleteUser);

export default router;