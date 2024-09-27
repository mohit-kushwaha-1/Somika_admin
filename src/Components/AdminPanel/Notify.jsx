import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Layout, Menu, Avatar, Button ,Dropdown} from "antd";
import { BellOutlined,TranslationOutlined ,TruckOutlined  } from "@ant-design/icons";
import { Badge, Space } from "antd";
import axios from 'axios'


// const fetchNotifications1 = async () => {
//   // Replace this URL with your actual endpoint
//   const response = await fetch('http://102.133.144.226:8000/api/v1/notifications/user/66c86250b01896ae48684d11');
//   const data = await response.json();
//   return data.count; // Assuming the response has a count field
// };


const Notify = ({setSelectedTab}) => {
  const [notifications, setNotifications] = useState([]);
  const[count,setCount] = useState(0)

  const user =  JSON.parse(localStorage.getItem('user'));

  console.log("user is",user._id);

  const {_id} = user;
  // console.log("id id ",_id);


//  console.log("setSelectedTab is",setSelectedTab)
  const handleNavigate = (tabs)=>{
    
    // console.log("tabs is following",tabs);
    if(tabs ==='airport'){
      setSelectedTab("airport")
    }
    else if(tabs ==='interoffice'){
      setSelectedTab("trips")
    }
    
  }
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://102.133.144.226:8000/api/v1/notifications/user/${user?._id}`
      );
      setNotifications(response.data.notifications);
      // console.log("notification is",response.data.notifications);
      setCount(response.data.notifications.length);
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
    });

    return () => {
      pusher.unsubscribe("notifications");
    };
  }, []);




  const menu = (
    <Menu  style={{ width: "auto" }} >

      {
        notifications?.map((item)=>{
            return(<>
                  <Menu.Item key={item?._id} style={{border:"1px solid black"}}  >
                    
                    <div  style={{display:"flex"}}  onClick={()=>{handleNavigate(`${item?.isType}`)}}>
                       <img src={`${item?.image}`} alt="" style={{width:'50px',height:"50px",marginRight:"10px"}}/>

                       <h1 style={{marginRight:"10px"}}>{item?.message}</h1>
                      
                       <h1 style={{marginRight:"10px"}}>{item?.createdAt?.time}</h1>

                       <h1>{item?.createdAt?.date}</h1>
                       
                    </div>
                    
                    
                    
                    
                    </Menu.Item>
            
            </>)
        })
      }
      
      {/* <Menu.Item key="2">Notification 2</Menu.Item>
      <Menu.Item key="3">Notification 3</Menu.Item>
      <Menu.Item key="4">Notification 4</Menu.Item> */}
    </Menu>
  );


  // console.log(fetchNotifications1,"khgjgjhgjhg");

  return (
    <>
      
    
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" style={{ width: "300px" }}>
        <a onClick={(e) => e.preventDefault()} style={{ width: "300px" }}>
          <Badge count={count}>
            <Avatar shape="square" size="large">
              <BellOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Avatar>
          </Badge>
        </a>
      </Dropdown>
        {/* <h2>Notifications</h2> */}
      
    </>
  );
};

export default Notify;
