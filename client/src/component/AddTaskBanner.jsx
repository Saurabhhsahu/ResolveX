import React from 'react'
import Pointer from '../assets/Pointer.svg'
import { NavLink } from 'react-router-dom'

function AddTaskBanner() {
  return (
    <div className="flex items-center justify-between p-10 bg-black text-white shadow-lg">
      {/* Left Half with Bigger SVG */}
      <div className="w-1/2 flex justify-center">
        <img src={Pointer} alt="Pointer" className="w-72 h-72" />
      </div>

      {/* Right Half with Motivating Content and Button */}
      <div className="w-1/2 p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">Need Help? Add a Task!</h2>
        <p className="mb-4 text-gray-300">
          If you're facing a challenge, share it here and let the community help you solve it. Together, we can make things easier!
        </p>
        <NavLink to="/add-task" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          Add Task
        </NavLink>
      </div>
    </div>
  )
}

export default AddTaskBanner
