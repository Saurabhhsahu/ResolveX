import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from '../context/UserContext';
import L from 'leaflet';

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function MyTasks() {
  const { myTasks, updateTask, deleteTask,getMyTasks,setMyTasks } = useUser(); // Add deleteTask function from context
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  // Define a custom icon for the marker
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({ ...task });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    updateTask(editedTask);
    setEditingTaskId(null);
  };

  const handleDeleteClick = (taskId) => {
    deleteTask(taskId); // Call deleteTask function
    const updatedTasks = myTasks.filter((task) => task._id !== taskId);
    setMyTasks(updatedTasks)
    getMyTasks();
  };

  const EditableMarker = ({ location, title }) => (
    <Marker position={location} icon={customIcon}>
      <Popup>{title}</Popup>
    </Marker>
  );

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">My Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myTasks &&
          myTasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-700 rounded-lg p-4 shadow-md bg-gray-900 text-white"
            >
              {editingTaskId === task._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editedTask.title}
                    onChange={handleInputChange}
                    className="block w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  />
                  <textarea
                    name="description"
                    value={editedTask.description}
                    onChange={handleInputChange}
                    className="block w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  />
                  <input
                    type="text"
                    name="bounty"
                    value={editedTask.bounty}
                    onChange={handleInputChange}
                    className="block w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  />
                  <select
                    name="status"
                    value={editedTask.status}
                    onChange={handleInputChange}
                    className="block w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Solved">Solved</option>
                  </select>
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 px-4 py-2 rounded text-white"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
                  <p className="text-gray-400 mb-1">
                    <span className="font-medium text-gray-200">Description:</span> {task.description}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-medium text-gray-200">Bounty:</span> {task.bounty}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-medium text-gray-200">Status:</span> {task.status}
                  </p>
                  {task.location && (
                    <>
                      <p className="text-gray-400 mb-2">
                        <span className="font-medium text-gray-200">Location:</span> {task.location.coordinates[0]}, {task.location.coordinates[1]}
                      </p>
                      <div className="h-64">
                        <MapContainer
                          center={task.location.coordinates}
                          zoom={13}
                          scrollWheelZoom={false}
                          className="h-full w-full rounded-lg"
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <EditableMarker location={task.location.coordinates} title={task.title} />
                        </MapContainer>
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => handleEditClick(task)}
                    className="bg-blue-700 px-4 py-2 rounded text-white mt-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task._id)}
                    className="bg-red-700 px-4 py-2 rounded text-white mt-2"
                  >
                    Delete
                  </button>

                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyTasks;
