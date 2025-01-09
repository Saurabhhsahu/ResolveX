import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultSVG from '../assets/DefaultSVG.svg';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProfileTemplate = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams(); // Assume userId is passed as a URL parameter
  const {token} = useUser()
  
  const URI = import.meta.env.VITE_API_URI;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axios.post(`${URI}/user/getProfile`,{profileId:userId},{headers:{token}});
        
        if (data.success) {
          setProfile(data.user); // Assuming the response has 'profile' key
        }
      } catch (err) {
        console.error('Error fetching profile data:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Loading...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-10 cursor-pointer">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center bg-blue-700 p-6">
          <img
            src={profile.image || DefaultSVG}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-6"
          />
          <div className="text-white flex-1">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-blue-200">{profile.email}</p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-gray-800 text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-bold text-gray-600 w-1/3">ID:</span>
              <span className="text-gray-800">{profile._id}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-gray-600 w-1/3">Location:</span>
              <span className="text-gray-800">
                {profile.location?.coordinates.join(', ')}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-gray-600 w-1/3">Address:</span>
              <span className="text-gray-800">
                {`${profile.address?.line1}, ${profile.address?.line2}`}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-gray-600 w-1/3">Mobile:</span>
              <span className="text-gray-800">{profile.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;
