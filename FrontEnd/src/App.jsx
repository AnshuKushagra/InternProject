import "./App.css";
import LoginPage from "./Page/LoginPage";
import SignUpPage from "./Page/SignUpPage";
import Dashboard from "./Page/DashBoardPage";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/useAuthStore";
import AgentPage from "./Page/AgentPage";
function App() {
  const { authUser } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/agents" element={<AgentPage />} />
        <Route path="/logout" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
export default App;
