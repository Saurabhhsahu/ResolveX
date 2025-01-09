import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserBanner({ user }) {
  const navigate = useNavigate()

  const handleNavigating = () => {
    navigate(`/task/profile/${user._id}`)
  }

  return (
    <div className="flex items-center justify-between bg-blue-700 p-4 rounded-lg mb-4 cursor-pointer" onClick={() => handleNavigating()}>
      <div className="flex items-center">
        <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
        <div className="text-white">
          <p className="font-semibold">{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserBanner;
