import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { FaBookOpen, FaUsers, FaHome, FaUserCircle } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Timetable() {
  const [currentTime, setCurrentTime] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🕒 Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 📅 Fetch tasks
  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.warn("⚠️ No user_id found in localStorage");
        return;
      }

      const res = await fetch(`http://127.0.0.1:8000/api/tasks/?user_id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setSchedule(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setSchedule([]);
    } finally {
      setLoading(false);
    }
  };
  fetchTasks();
}, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faff] px-6 py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome Back! 👋</h1>
        <p className="text-gray-500">Stay focused and achieve your goals</p>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <AiOutlineClockCircle />
          <span>{today}</span>
        </div>
      </div>

      {/* Clock */}
      <div className="flex justify-center mb-8">
        <div className="relative w-72 h-72 bg-white shadow-xl rounded-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-800">{currentTime}</h2>
          <p className="text-sm text-gray-500 mt-1">Current Time</p>
        </div>
      </div>

      {/* Schedule */}
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Today's Schedule</h3>
      <div className="flex flex-col gap-3 pb-20">
        {loading ? (
          <p className="text-gray-500 text-center">Loading your schedule...</p>
        ) : schedule.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks added yet ✏️</p>
        ) : (
          schedule.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-blue-600">{item.subject}</p>
                <p className="text-sm text-gray-500">
                  {item.time} • {item.duration}
                </p>
                {item.notes && (
                  <p className="text-xs text-gray-400 mt-1 italic">{item.notes}</p>
                )}
              </div>
              <button className="text-blue-600 font-medium">View</button>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/create-task")}
        className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <AiOutlinePlus size={24} />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around py-3 border-t rounded-t-2xl">
        <button
          onClick={() => navigate("/blog")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <FaBookOpen size={20} />
          <span className="text-xs">Blog</span>
        </button>

        <button
          onClick={() => navigate("/materials")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <MdLibraryBooks size={20} />
          <span className="text-xs">Materials</span>
        </button>

        <button
          onClick={() => navigate("/timetable")}
          className="flex flex-col items-center text-blue-600"
        >
          <FaHome size={22} />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => navigate("/groups")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <FaUsers size={20} />
          <span className="text-xs">Groups</span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition"
        >
          <FaUserCircle size={22} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
