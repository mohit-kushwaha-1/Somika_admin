import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Layout, Menu, Avatar, Button, Dropdown } from "antd";
import { ClockCircleOutlined ,NotificationOutlined} from '@ant-design/icons';
import {
  BellOutlined,
  TranslationOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Badge, Space } from "antd";
import axios from "axios";

// const fetchNotifications1 = async () => {
//   // Replace this URL with your actual endpoint
//   const response = await fetch('http://102.133.144.226:8000/api/v1/notifications/user/66c86250b01896ae48684d11');
//   const data = await response.json();
//   return data.count; // Assuming the response has a count field
// };

const Notify = ({ setSelectedTab }) => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [notify,setNotify] = useState(false);


  
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("user is", user._id);

  const { _id } = user;
  // console.log("id id ",_id);

  //  console.log("setSelectedTab is",setSelectedTab)
  const handleNavigate = (tabs) => {
    // console.log("tabs is following",tabs);
    setNotify(false)
    if (tabs === "airport") {
      setSelectedTab("airport");
    } else if (tabs === "interoffice") {
      setSelectedTab("trips");
    }
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://102.133.144.226:8000/api/v1/notifications/user/${user?._id}`
      );
      setNotifications(response.data.notifications);
      // console.log("notification is", response.data.notifications);

      const data1 = response.data.notifications;
      const data2 = data1.reverse()
      setCount(data2);
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
    // console.log("channel is",channel);
    channel.bind("new-notification", (data) => {
      fetchNotifications();
      setNotify(true)
    });

    return () => {
      pusher.unsubscribe("notifications");
    };
  }, []);

  const menu = (
    <Menu style={{ width: "auto", height: "40vh", overflowY: "auto" }}>
      {notifications?.map((item) => {
        return (
          <>
            <Menu.Item key={item?._id} style={{ border: "1px solid black" }}>
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  handleNavigate(`${item?.isType}`);
                }}
              >
                <div>
                  <img
                    src={`${item?.image}`}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                </div>

                <div>
                  <div>
                    <h1
                      style={{
                        marginRight: "10px",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {item?.message}
                    </h1>
                  </div>

                  <div>
                    <h1>{item?.sub_message}</h1>{" "}
                  </div>
                </div>
              </div>
            </Menu.Item>
          </>
        );
      })}

      {/* <Menu.Item key="2">Notification 2</Menu.Item>
      <Menu.Item key="3">Notification 3</Menu.Item>
      <Menu.Item key="4">Notification 4</Menu.Item> */}
    </Menu>
  );

  // console.log(fetchNotifications1,"khgjgjhgjhg");

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="bottomRight"
        style={{ width: "300px" }}
      >
        <a onClick={(e) => e.preventDefault()} style={{ width: "300px" }}>
        {notify ? (
  <Badge
    count={
      <div
      style={{
        width: "20px", 
        height: "20px", 
        backgroundColor: "#f5222d", 
        borderRadius: "50%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        color: "#fff"
      }}
    >
      N
    </div>
      
    }
  >
    <Avatar shape="square" size="large">
      <BellOutlined style={{ fontSize: "24px", color: "#fff" }} />
    </Avatar>
  </Badge>
) : (
  <Badge>
    <Avatar shape="square" size="large">
      <BellOutlined style={{ fontSize: "24px", color: "#fff" }} />
    </Avatar>
  </Badge>
)}
        </a>
      </Dropdown>
      {/* <h2>Notifications</h2> */}
    </>
  );
};

export default Notify;
