import express from "express";
import {
  fileUploading,
  getAssignedTasks,
  deleteTask,
} from "../controllers/fileUploader.controllers.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.post(
  "/upload/:agentsCount",
  uploadMiddleware.single("file"),
  fileUploading
);
router.get("/assignedtasks", getAssignedTasks);
router.delete("/delete/:taskId", deleteTask);
export default router;
