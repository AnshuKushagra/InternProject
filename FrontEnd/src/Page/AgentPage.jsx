import { useAgentStore } from "../Store/useAgentStore";
import { useEffect } from "react";

const AgentPage = () => {
  const { agents, viewAgent } = useAgentStore();
  useEffect(() => {
    viewAgent();
  }, [viewAgent]);
  return (
    <div>
      <h1 className="text-2xl font-bold my-4 text-center ">All Agents</h1>

      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">S.No</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {agents && agents.length > 0 ? (
            agents.map((agent, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2">{agent.name}</td>
                <td className="border border-gray-300 p-2">{agent.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 p-2 text-center text-gray-500"
              >
                No Agents Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default AgentPage;
