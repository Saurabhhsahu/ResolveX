import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import UserBanner from '../component/UserBanner';
import ProfileTemplate from '../component/ProfileTemplate';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function TaskDetails() {
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const { taskId } = useParams();
  const { myTasks } = useTask();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTask = () => {
      if (myTasks) {
        const foundTask = myTasks.find(currTask => currTask._id === taskId);
        if (foundTask) {
          setTask(foundTask);
        }
      }
    };
    getTask();
  }, [taskId, myTasks]);

  if (!task) {
    return <div className="p-6 bg-black min-h-screen text-white">Loading task details...</div>;
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">{task.title}</h1>
      <p className="text-lg mb-2"><strong className="text-blue-500">Description:</strong> {task.description}</p>
      <p className="text-lg mb-2"><strong className="text-blue-500">Bounty:</strong> ${task.bounty}</p>
      <p className="text-lg mb-4"><strong className="text-blue-500">Status:</strong> {task.status}</p>

      {task.location && (
        <div className="h-64 mb-6">
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
      )}

      <UserBanner user={task.user}/>

      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Requested Users</h2>
        {task.requestedUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {task.requestedUsers.map((user, index) => (
              <UserBanner key={index} user={user} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-400">No users have requested to solve this task yet.</p>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
