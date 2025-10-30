import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        name,
        email,
        password,
      });

      console.log("✅ Signup successful:", res.data);
      setMessage("Account created successfully ✅");

      // Redirect to login after 1.5s
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("❌ Signup error:", error.response?.data || error.message);
      if (error.response && error.response.data?.error) {
        setMessage(error.response.data.error + " ❌");
      } else {
        setMessage("Something went wrong ❌");
      }
    }
  };

  // 🌐 Google Sign-Up
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/google-login/", { token });
      console.log("✅ Google Signup Success:", res.data);
      setMessage("Google sign-up successful ✅");
      setTimeout(() => navigate("/timetable"), 1000);
    } catch (err) {
      console.error("❌ Google signup error:", err);
      setMessage("Google sign-up failed ❌");
    }
  };

  const handleGoogleError = () => {
    setMessage("Google sign-up failed ❌");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f8ff]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="text-left mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="text-left mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-gray-500 text-sm">or continue with</div>

        {/* 🟦 Google Login */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>

        {/* Feedback Message */}
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
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
