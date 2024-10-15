import express from "express";
import { signup, login, logout, verifiedToken , get_data,reset_password,confirm_reset_password ,change_password,delete_account} from "../controllers/controllers.js";
import { verifiedAuth } from "../middleware/verifiedAuth.js";

const router = express.Router();

// Correct path for signup
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verified-email", verifiedToken);
router.get("/check-verified", verifiedAuth, get_data);
router.post("/reset-password", reset_password);
router.post("/confirm-reset-password/:token", confirm_reset_password);
router.post("/change/password",change_password)
router.post('/delete-account',delete_account)
export default router;
