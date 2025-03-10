import { useState, useEffect } from "react";
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Trash2,
  Phone,
} from "lucide-react";
import { useAgentStore } from "../Store/useAgentStore.js";
import { useFileStore } from "../Store/useFileStore.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
export default function Dashboard() {
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const { addAgent } = useAgentStore();
  const { uploadFile, fetchAssignedtasks, assignedTasks, loading, deleteTask } =
    useFileStore();

  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [agentsCount, setAgentsCount] = useState(0);

  const handleChange = (e) => {
    setAgentData({ ...agentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAgent(agentData);
    setAgentData({ name: "", email: "", mobile: "", password: "" });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file && agentsCount === 0) {
      alert("Please fill all the fields");
      return;
    }
    await uploadFile(file, agentsCount);
    setFile(null);
    fetchAssignedtasks(); // Refresh assigned tasks after upload
  };

  useEffect(() => {
    fetchAssignedtasks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
      <p className="text-gray-700 mb-6">You are logged in as an Admin.</p>

      {/* Side-by-Side Layout */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {/* Agent Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h3 className="text-xl font-bold mb-4 text-center">Add New Agent</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Agent Name"
                value={agentData.name}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded-md"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Agent Email"
                value={agentData.email}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded-md"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                type="tel"
                name="mobile"
                placeholder="+91 9876543210"
                // Placeholder with country code
                value={agentData.mobile}
                // value={"+91" + agentData.mobile} // Prepend country code
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded-md"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={agentData.password}
                onChange={handleChange}
                className="w-full p-2 pl-10 pr-10 border rounded-md"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Add Agent
            </button>
          </form>
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h3 className="text-xl font-bold mb-4 text-center">
            Upload CSV File
          </h3>

          {/* Custom File Upload */}
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
            >
              Choose File
            </label>
            <span className="text-gray-700">
              {file ? file.name : "No file selected"}
            </span>
          </div>

          <label className="block text-gray-700 mt-3">Number of Agents:</label>
          <input
            type="number"
            // min="1"
            placeholder="For example, 5"
            value={agentsCount}
            onChange={(e) => setAgentsCount(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <button
            onClick={handleUpload}
            className="w-full bg-green-500 text-white p-3 rounded-lg font-medium hover:bg-green-600 transition duration-300"
            disabled={loading || agentsCount <= 0 || agentsCount === ""}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Upload File"
            )}
          </button>
        </div>
      </div>

      {/* Assigned Tasks Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6">
        <h3 className="text-xl font-bold">Assigned Tasks</h3>
        <table className="w-full border-collapse border mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Agent ID</th>
              <th className="border p-2">Agent Name</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task, index) => (
                <tr key={index} className="border">
                  <td className="border p-2 text-center">{task.agentId}</td>
                  <td className="border p-2 text-center">{task.agentName}</td>
                  <td className="border p-2">{task.firstName}</td>
                  <td className="border p-2">{task.phone}</td>
                  <td className="border p-2">{task.notes}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border p-2 text-center text-gray-500"
                >
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
