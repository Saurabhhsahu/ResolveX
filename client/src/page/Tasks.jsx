import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { useUser } from '../context/UserContext';
import L from 'leaflet';

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useSVGOverlay } from 'react-leaflet/SVGOverlay';

function Tasks() {
  const { tasks, getAllTask,sendRequest } = useUser();
  const [allot,setAllot] = useState(false);
  
  useEffect(() => {
    getAllTask();
  },[]); // Add dependency array to avoid infinite re-renders

  // Define a custom icon for the marker
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Adjust the size of the icon
    iconAnchor: [12, 41], // Adjust the position of the icon
    popupAnchor: [1, -34], // Adjust the position of the popup
    shadowSize: [41, 41], // Adjust the shadow size
  });

  const handleRequest = (taskId) => {
    sendRequest(taskId);
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-700 rounded-lg p-4 shadow-md bg-gray-900 text-white"
            >
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
                    <span className="font-medium text-gray-200">Location:</span>
                    {task.location.coordinates[0]},{task.location.coordinates[1]}
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
                      <Marker position={task.location.coordinates} icon={customIcon}>
                        <Popup>{task.title}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </>
              )}

              <div 
                className="bg-blue-700 px-4 py-2 rounded text-white mt-4 w-full text-center cursor-pointer hover:bg-blue-600"
                onClick={() => handleRequest(task)}
              >
                Request to solve it
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Tasks;
