import File from "../models/file.model.js";
import Agent from "../models/agent.model.js"; // Import the Agent model
import fs from "fs";
import xlsx from "xlsx";

export const fileUploading = async (req, res) => {
  let { agentsCount } = req.params;
  console.log("Agents count:", agentsCount);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!agentsCount || agentsCount <= 0) {
      return res.status(400).json({ message: "Invalid number of agents." });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(data);

    // Validate CSV structure
    if (
      !data.length ||
      !data[0].FirstName ||
      !data[0].Phone ||
      !data[0].Notes
    ) {
      fs.unlinkSync(filePath); // Delete file if invalid
      return res.status(400).json({
        message:
          "Invalid file format. Must contain FirstName, Phone, and Notes.",
      });
    }
    console.log(agentsCount);
    // Fetch only the required number of agents
    const agents = await Agent.find().limit(agentsCount);
    if (agents.length < agentsCount) {
      return res.status(400).json({
        message: `Only ${agents.length} agents available, but ${agentsCount} were requested.`,
      });
    }

    const totalAgents = agents.length;
    const totalItems = data.length;
    const baseItemsPerAgent = Math.floor(totalItems / totalAgents);
    let extraItems = totalItems % totalAgents;

    let distributedTasks = [];
    let agentIndex = 0;

    for (let i = 0, count = 0; i < totalItems; i++) {
      distributedTasks.push({
        firstName: data[i].FirstName,
        phone: data[i].Phone,
        notes: data[i].Notes,
        agentId: agents[agentIndex]._id, // Assign task only to selected agents
        agentName: agents[agentIndex].name,
      });

      count++;

      if (count >= baseItemsPerAgent + (extraItems > 0 ? 1 : 0)) {
        agentIndex++; // Move to next agent
        count = 0;
        if (extraItems > 0) extraItems--;
      }
    }

    await File.insertMany(distributedTasks);
    fs.unlinkSync(filePath); // ✅ Delete file after processing

    res.status(200).json({
      message: `File processed and tasks distributed among ${totalAgents} agents.`,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all assigned tasks (for frontend)
export const getAssignedTasks = async (req, res) => {
  console.log("fdsfsbgfnd");
  try {
    const tasks = await File.find();
    if (tasks.length === 0) {
      return res.status(400).json({ message: "No tasks to show" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await File.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
