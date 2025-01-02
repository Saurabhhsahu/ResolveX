import React, { useState } from 'react'
import {useUser} from '../context/UserContext'

function AddTask() {
  // State to manage form inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [bounty, setBounty] = useState('')

  const {addTask} = useUser();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you can send the form data to an API or update state
    addTask(title,description,bounty);
  }

  return (
    < div className="w-full bg-black py-20" >
      <div className="max-w-lg bg-black mx-auto p-6 text-white border-[0.5px] rounded-xl border-white">
        <h2 className="text-2xl font-semibold mb-4">Add a New Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-400"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Task Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-400"
              placeholder="Enter task description"
              rows="4"
              required
            />
          </div>

          {/* Bounty Input */}
          <div className="mb-4">
            <label htmlFor="bounty" className="block text-sm font-medium text-gray-300">
              Task Bounty (in USD)
            </label>
            <input
              type="number"
              id="bounty"
              value={bounty}
              onChange={(e) => setBounty(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-400"
              placeholder="Enter bounty amount"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTask