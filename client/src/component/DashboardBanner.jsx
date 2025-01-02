import React, { useEffect, useState } from 'react';
import TaskLogo from '../assets/TaskLogo.svg'; // Ensure TaskLogo is the SVG component

function DashboardBanner() {
  const [textIndex, setTextIndex] = useState(0);
  const text = "Welcome to your professional dashboard, Saurabh!"; // Typing text


  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6 flex items-center">
        {/* Left Half: Typing Effect */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-semibold">
            <span className="inline-block">{text}</span>
          </h1>
        </div>

        {/* Right Half: TaskLogo SVG */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
          {/* Adjust size of TaskLogo with Tailwind CSS */}
          <img src={TaskLogo} alt="Task Logo" className="w-48 h-48 md:w-64 md:h-64" />
        </div>
      </div>
    </div>
  );
}

export default DashboardBanner;
