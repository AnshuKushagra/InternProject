import express from "express";
import {
  fileUploading,
  getAssignedTasks,
  deleteTask,
} from "../controllers/fileUploader.controllers.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post(
  "/upload/:agentsCount",
  uploadMiddleware.single("file"),
  protect,
  fileUploading
);
router.get("/assignedtasks", protect, getAssignedTasks);
router.delete("/delete/:taskId", deleteTask);
export default router;
