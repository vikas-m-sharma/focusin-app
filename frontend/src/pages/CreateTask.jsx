// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaClock } from "react-icons/fa";
// import dayjs from "dayjs";

// export default function CreateTask() {
//   const navigate = useNavigate();
//   const [subject, setSubject] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [notes, setNotes] = useState("");
//   const [duration, setDuration] = useState("");

//   // 🕒 Auto-calculate duration
//   const calculateDuration = (start, end) => {
//     if (!start || !end) return;
//     const startObj = dayjs(`2025-01-01T${start}`);
//     const endObj = dayjs(`2025-01-01T${end}`);
//     const diff = endObj.diff(startObj, "minute");
//     if (diff > 0) {
//       const hours = (diff / 60).toFixed(1);
//       setDuration(`${hours}h`);
//     } else {
//       setDuration("");
//     }
//   };

//   // ✅ Save Task to Backend
//   const handleSave = async () => {
//     if (!subject || !startTime || !endTime) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     const userId = localStorage.getItem("user_id");
//     if (!userId) {
//       alert("User not logged in!");
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           subject,
//           start_time: startTime,
//           end_time: endTime,
//           duration,
//           notes,
//           user: userId,
//         }),
//       });

//       if (response.ok) {
//         alert("✅ Task saved successfully!");
//         navigate("/timetable");
//       } else {
//         const err = await response.json();
//         console.error("❌ Backend error:", err);
//         alert("❌ Failed to save task — check backend logs.");
//       }
//     } catch (error) {
//       console.error("Error saving task:", error);
//       alert("Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f8ff] p-6">
//       {/* Back */}
//       <button
//         onClick={() => navigate("/timetable")}
//         className="text-blue-600 mb-4 font-semibold hover:underline"
//       >
//         ← Back
//       </button>

//       {/* Header */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Study Task</h1>
//       <p className="text-gray-500 mb-6">Plan your study session</p>

//       {/* Form */}
//       <div className="bg-white p-6 rounded-2xl shadow-md space-y-5">
//         {/* Subject */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Subject</label>
//           <input
//             type="text"
//             placeholder="e.g., Mathematics"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Start Time + End Time */}
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-1">
//               Start Time
//             </label>
//             <div className="flex items-center border rounded-lg px-3 py-2">
//               <FaClock className="text-gray-500 mr-2" />
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => {
//                   setStartTime(e.target.value);
//                   calculateDuration(e.target.value, endTime);
//                 }}
//                 className="w-full focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-1">
//               End Time
//             </label>
//             <div className="flex items-center border rounded-lg px-3 py-2">
//               <FaClock className="text-gray-500 mr-2" />
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => {
//                   setEndTime(e.target.value);
//                   calculateDuration(startTime, e.target.value);
//                 }}
//                 className="w-full focus:outline-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Duration (Auto-calculated) */}
//         {duration && (
//           <div className="text-sm text-green-600 font-medium">
//             ⏱ Duration: {duration}
//           </div>
//         )}

//         {/* Notes */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Notes (Optional)
//           </label>
//           <textarea
//             placeholder="Add any notes or topics to cover..."
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
//             rows="4"
//           ></textarea>
//         </div>

//         {/* Save */}
//         <div className="flex gap-4">
//           <button
//             onClick={handleSave}
//             className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Save Task
//           </button>
//         </div>
//       </div>

//       {/* Tip */}
//       <div className="mt-6 text-center text-gray-600 bg-green-100 py-3 rounded-lg text-sm">
//         💡 Tip: Select start & end time easily — duration auto-calculates!
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaMicrophone } from "react-icons/fa";
import dayjs from "dayjs";

export default function CreateTask() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState("");

  // 🧮 Calculate Duration
  const calculateDuration = (start, end) => {
    if (!start || !end) return;
    const startObj = dayjs(`2025-01-01T${start}`);
    const endObj = dayjs(`2025-01-01T${end}`);
    const diff = endObj.diff(startObj, "minute");
    if (diff > 0) {
      const hours = (diff / 60).toFixed(1);
      setDuration(`${hours}h`);
    } else {
      setDuration("");
    }
  };

  // 💾 Save Task
  const handleSave = async () => {
    if (!subject || !startTime || !endTime) {
      alert("Please fill all required fields!");
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("User not logged in!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          start_time: startTime,
          end_time: endTime,
          duration,
          notes,
          user: userId,
        }),
      });

      if (response.ok) {
        alert("✅ Task saved successfully!");
        navigate("/timetable");
      } else {
        const err = await response.json();
        console.error("❌ Backend error:", err);
        alert("❌ Failed to save task — check backend logs.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/timetable")}
        className="text-blue-600 mb-4 font-semibold hover:underline"
      >
        ← Back
      </button>

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Study Task</h1>
      <p className="text-gray-500 mb-6">Plan your study session</p>

      {/* Task Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-5">
        {/* Subject */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Subject</label>
          <input
            type="text"
            placeholder="e.g., Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Start Time Picker */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Start Time</label>
          <TimePicker
            onChange={(value) => {
              setStartTime(value);
              calculateDuration(value, endTime);
            }}
            value={startTime}
            disableClock={false}
            format="h:mm a"
            className="w-full border rounded-lg p-2 text-gray-700"
            clearIcon={null}
            clockIcon={null}
          />
        </div>

        {/* End Time Picker */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">End Time</label>
          <TimePicker
            onChange={(value) => {
              setEndTime(value);
              calculateDuration(startTime, value);
            }}
            value={endTime}
            disableClock={false}
            format="h:mm a"
            className="w-full border rounded-lg p-2 text-gray-700"
            clearIcon={null}
            clockIcon={null}
          />
        </div>

        {/* Duration */}
        {duration && (
          <div className="text-sm text-green-600 font-medium">
            ⏱ Duration: {duration}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Notes (Optional)</label>
          <textarea
            placeholder="Add any notes or topics to cover..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>

        {/* Save Task */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Task
          </button>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 text-center text-gray-600 bg-green-100 py-3 rounded-lg text-sm">
        💡 Tip: Select start & end time easily — analog clock picker with AM/PM support!
      </div>
    </div>
  );
}

