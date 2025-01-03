import React, { useState } from "react";
import DefaultSVG from '../assets/DefaultSVG.svg';
import { useUser } from "../context/UserContext";
import { useNavigate,NavLink } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user = {} } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const {setToken} = useUser();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token')
  }

  return (
    <nav className="bg-blue-700 text-white px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="text-xl font-bold">ResolveX</div>

      <div className="space-x-6 hidden md:flex">
        <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
        <NavLink to="/tasks" className="hover:text-gray-300">Tasks</NavLink>
        <NavLink to="/add-task" className="hover:text-gray-300">Add Task</NavLink>
        <NavLink to="/about-us" className="hover:text-gray-300">About us</NavLink>
      </div>

      <div className="relative">
        <img
          src={user.image || DefaultSVG}
          alt="User Logo"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40 transition duration-300 transform scale-100">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleNavigation('/profile')}>
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleNavigation('/setting')}>
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
