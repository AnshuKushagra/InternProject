import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useFileStore = create((set) => ({
  uploadedFile: null,
  assignedTasks: [],
  loading: false,
  uploadFile: async (file, agentsCount) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        `/files/upload/${agentsCount}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      set({ uploadedFile: response.data, loading: false });
      toast.success("Files Uploaded Successfully !");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
    }
  },
  fetchAssignedtasks: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/files/assignedtasks/`, {
        withCredentials: true,
      });
      set({ assignedTasks: res.data, loading: false });
    } catch (error) {
      console.log("Failed to fetch tasks", error);
      toast.error("Failed to fetch tasks");
    } finally {
      set({ loading: false });
    }
  },
  deleteTask: async (taskId) => {
    try {
      await axiosInstance.delete(`/files/delete/${taskId}`);
      set((state) => ({
        assignedTasks: state.assignedTasks.filter(
          (task) => task._id !== taskId
        ),
      }));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  },
}));
