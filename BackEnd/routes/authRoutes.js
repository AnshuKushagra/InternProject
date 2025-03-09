import express from "express";
import { login, signup } from "../controllers/authUser.controllers.js";
const router = express.Router();

// LOGIN ROUTE

router.post("/login", login);
router.post("/signup", signup);
// router.post("/logout", logout);
export default router;
