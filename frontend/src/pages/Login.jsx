import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Email-password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      setMessage("Login successful ✅");
      console.log("User data:", res.data);
    } catch (error) {
      console.error(error);
      setMessage("Login failed ");
    }
  };

  // ✅ Google login success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    console.log("Google token:", token);

    try {
      // Send token to backend for verification (Django)
      // Uncomment when backend route is ready:
      // await axios.post("http://127.0.0.1:8000/api/google-login/", { token });

      setMessage("Google sign-in successful ✅ (check console)");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setMessage("Google sign-in failed ");
    }
  };

  // ✅ Google login error handler
  const handleGoogleError = () => {
    setMessage("Google sign-in failed ");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h2>

        {/* Email-password form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-left">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 text-center text-gray-500">or</div>

        {/* Google Login button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        {message && (
          <p className="mt-6 text-center text-sm text-red-500">{message}</p>
        )}

        <p className="mt-8 text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
