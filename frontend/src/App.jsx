import React from "react";
import { Routes, Route } from "react-router-dom";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timetable from "./pages/Timetable";
import CreateTask from "./pages/CreateTask";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding1 />} />
      <Route path="/onboarding2" element={<Onboarding2 />} />
      <Route path="/onboarding3" element={<Onboarding3 />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/create-task" element={<CreateTask />} />
    </Routes>
  );
}
