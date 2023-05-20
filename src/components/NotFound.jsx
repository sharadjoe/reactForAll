import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-600">
        The page you're looking for does not exist.
      </p>
    </div>
  );
}
