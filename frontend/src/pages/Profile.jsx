import React from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f8ff]">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">👤 Profile</h1>
      {user ? (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">
            Name: {user.name}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Email: {user.email}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No user information found.</p>
      )}
    </div>
  );
}
