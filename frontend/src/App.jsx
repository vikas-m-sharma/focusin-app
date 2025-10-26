import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
