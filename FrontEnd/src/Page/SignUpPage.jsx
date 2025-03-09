import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore.js";
import { User, Mail, Eye, Lock, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      await signup(formData);
      setFormData({ fullName: "", email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        {/* LOGO */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-500">Get started with your free account</p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              className="w-full p-2 pl-10 border border-gray-300 rounded mb-2"
              placeholder="Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="email"
              className="w-full p-2 pl-10 border border-gray-300 rounded mb-2"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pl-10 border border-gray-300 rounded mb-2"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-gray-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <div className="flex justify-center items-center">
                <Loader2 className="size-5 animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="text-center mt-4">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;
