import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ---- Email/Password Login ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      setMessage(response.data.message);
      console.log("✅ Logged in user:", response.data.user);

      // ✅ Store user ID for later (used in CreateTask / Timetable)
      localStorage.setItem("user_id", response.data.user.id);
      localStorage.setItem("user_name", response.data.user.name);
      localStorage.setItem("user_email", response.data.user.email);

      // ✅ Redirect to timetable after login
      setTimeout(() => navigate("/timetable"), 1000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.error || "Login failed ❌");
    }
  };

  // ---- Google Sign-In ----
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    console.log("Google token:", token);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/google-login/", { token });
      console.log("✅ Google login success:", res.data);

      // ✅ Save Google user info temporarily
      localStorage.setItem("user_email", res.data.email);
      localStorage.setItem("user_name", res.data.name);

      setMessage("Google sign-in successful ✅");
      setTimeout(() => navigate("/timetable"), 1000);
    } catch (err) {
      console.error("Google login error:", err);
      setMessage("Google sign-in failed ❌");
    }
  };

  const handleGoogleError = () => {
    setMessage("Google sign-in failed ❌");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f8ff]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>

        {/* ---- Email/Password Login Form ---- */}
        <form onSubmit={handleSubmit}>
          <div className="text-left mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-left mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 text-gray-500 text-sm">or</div>

        <div className="my-4 flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>

        {message && (
          <p
            className={`text-sm mt-4 ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
