import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useUser } from '../context/UserContext';

const socket = io('http://localhost:5000'); // Backend URL

const Notification = () => {
  const { notifications, setNotifications } = useUser();
  console.log(notifications);

  useEffect(() => {
    socket.on('new_task_notification', (data) => {
      console.log('Received notification:', data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.message,
      ]);
    });

    return () => {
      socket.off('new_task_notification');
    };
  }, [setNotifications]);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <div>
            {notification.message}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
