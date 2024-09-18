import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from 'axios'


const Notify = () => {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/notifications/user/66c86250b01896ae48684d11"
      );
      setNotifications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const pusher = new Pusher("df0703214150d5a04c36", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe("notifications");
    channel.bind("new-notification", (data) => {
      fetchNotifications(); 
    });

    return () => {
      pusher.unsubscribe("notifications");
    };
  }, []);

  return (
    <>
      <div>
        <h2>Notifications</h2>
      </div>
    </>
  );
};

export default Notify;
