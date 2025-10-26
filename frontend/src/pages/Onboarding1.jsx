import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding1() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f8ff]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-4xl text-blue-600 font-bold">+</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to FocusIn
        </h2>
        <p className="text-gray-600 mb-6">
          Your AI-powered study companion that helps you organize, plan, and
          achieve your academic goals.
        </p>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mb-6">
          <span className="h-3 w-3 bg-blue-600 rounded-full"></span>
          <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
          <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
        </div>

        <button
          onClick={() => navigate("/onboarding2")}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Continue →
        </button>

        <p className="text-gray-500 mt-6 text-sm">
          FocusIn © 2025 – All rights reserved
        </p>
      </div>
    </div>
  );
}
