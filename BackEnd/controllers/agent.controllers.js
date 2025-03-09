import bcrypt from "bcryptjs";
import Agent from "../models/agent.model.js";
export const agentAdd = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent)
      return res.status(400).json({ message: "Agent already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await newAgent.save();
    console.log(newAgent);
    res
      .status(200)
      .json({ message: "Agent added successfully", agent: newAgent });
  } catch (error) {
    console.log("Got the error");
    res.status(500).json({ message: "Server Error" });
  }
};
export const agentView = async (req, res) => {
  try {
    const agents = await Agent.find();
    if (!agents) {
      res.status(400).json({ message: "No agents are there" });
    }
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const update = async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;
    await agent.save();
    res.status(200).json({ message: "Agent Updated Successfully", agent });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found " });
    }
    await agent.deleteOne(agent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
