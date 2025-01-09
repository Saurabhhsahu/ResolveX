import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultSVG from '../assets/DefaultSVG.svg';
import { useUser } from '../context/UserContext.jsx';

const Profile = () => {
  const { profile, setProfile, token } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(profile);
  const [image, setImage] = useState(null);

  const URI = import.meta.env.VITE_API_URI;

  useEffect(() => {
    setUpdatedData(profile);
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'addressLine1' || name === 'addressLine2') {
      setUpdatedData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name === 'addressLine1' ? 'line1' : 'line2']: value,
        },
      }));
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updatedData.name);
      formData.append('email', updatedData.email);
      formData.append('mobile', updatedData.mobile);
      image && formData.append('image', image);
      formData.append('address', JSON.stringify(updatedData.address));  // Send address as a string
      formData.append('location', JSON.stringify(updatedData.location));  // Send location as a string

      const { data } = await axios.post(`${URI}/user/updateProfile`, formData, {
        headers: { token }
      });

      if (data.success) {
        setProfile(updatedData);
        setIsEditing(false);
        setImage(null);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center bg-blue-700 p-6">
          <label htmlFor="profilePic" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : profile.image || DefaultSVG}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-6"
            />
          </label>
          <input
            type="file"
            id="profilePic"
            hidden
            onChange={handleImageChange}
          />
          <div className="text-white flex-1">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
                className="bg-gray-100 text-3xl font-medium rounded-lg p-2"
              />
            ) : (
              <h1 className="text-3xl font-bold">{profile.name}</h1>
            )}
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
              {isEditing ? (
                <div className="w-2/3">
                  <input
                    type="text"
                    name="addressLine1"
                    value={updatedData.address?.line1 || ''}
                    onChange={handleInputChange}
                    className="text-gray-800 p-2 rounded border mb-2 w-full"
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={updatedData.address?.line2 || ''}
                    onChange={handleInputChange}
                    className="text-gray-800 p-2 rounded border w-full"
                    placeholder="Address Line 2"
                  />
                </div>
              ) : (
                <span className="text-gray-800">{`${profile.address?.line1}, ${profile.address?.line2}`}</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-bold text-gray-600 w-1/3">Mobile:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="mobile"
                  value={updatedData.mobile}
                  onChange={handleInputChange}
                  className="text-gray-800 p-2 rounded border w-2/3"
                />
              ) : (
                <span className="text-gray-800">{profile.mobile}</span>
              )}
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-end">
          {isEditing ? (
            <button
              onClick={updateUserProfileData}
              className="bg-green-600 text-white py-2 px-4 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>

  );
};

export default Profile;
