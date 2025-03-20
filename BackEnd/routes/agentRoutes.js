import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();
import {
  agentAdd,
  agentView,
  update,
  deleteAgent,
} from "../controllers/agent.controllers.js";

// AGENT CREATION AND MANAGEMENT

// ADD AGENT
router.post("/add", protect, admin, agentAdd);
router.get("/view", protect, admin, agentView);
router.put("/update/:id", protect, admin, update);
router.put("/delete/:id", protect, admin, deleteAgent);
export default router;
