import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding3() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f8ff] px-6 text-center">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">
        <div className="mb-8">
          <div className="mx-auto bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center text-3xl">
            🎯
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Track, Focus & Achieve
        </h1>
        <p className="text-gray-600 mb-8">
          Stay consistent with smart reminders, progress tracking, and study insights.
        </p>

        <div className="flex justify-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
        </div>

        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started →
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">FocusIn © 2025 – All rights reserved</p>
    </div>
  );
}
