import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";
export const useAgentStore = create((set) => ({
  agents: null,
  addAgent: async (agentData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized! Please log in again.");
        return;
      }
      const res = await axiosInstance.post("/agents/add", agentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (!res) {
        toast.error("Unexpected response from server.");
      }
      //   set({ agents: res.data });
      set((state) => ({ agents: [...(state.agents || []), res.data] }));
      toast.success("Agent created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  viewAgent: async () => {
    try {
      const res = await axiosInstance.get("/agents/view");
      if (!res) {
        toast.error("No Agents Found!");
        return;
      }
      set({ agents: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Unexpected response from server.");
    }
  },
}));
