import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    Table,
    Select,
    message,
    Form,
    Input,
    Flex,
    Tooltip,
  } from "antd";
  import axios from 'axios'

const GeoFacing = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/violations"
      );
      
      console.log("data is",response.data.data);
      const data1 = response.data.data;
      const data2 = data1?.map((item)=>{

        const date = new Date(item?.violationTime);

        // Add a day to the date
        date.setDate(date.getDate() + 1);
        
        // Get the day
        const day = date.getDate();
        
        // Get the month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        
        // Get hours and minutes
        let hours = date.getHours();
        let minutes = date.getMinutes();
        
        // Convert 24-hour format to 12-hour format
        let period = 'AM';
        if (hours >= 12) {
          period = 'PM';
          hours = hours > 12 ? hours - 12 : hours;
        }
        if (hours === 0) {
          hours = 12;
        }
        
        // Format minutes to always be two digits
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        // Combine the result
        const formattedDate = `${day}-${month}, ${hours}.${minutes}${period}`;

              const distance = ((item?.distanceFromBase)/1000).toFixed(3);
              const returndata = {
                vehicle_number:item?.vehicleId?.vehicle_number,
                status:item?.status,
                violationTime:formattedDate,
                distance:distance,

              }

              return returndata
      })

      setData(data2)

      console.log("data is",data2);
    
     
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);



  const columns = [
    {
      title: 'Vehicle Number',
      dataIndex: 'vehicle_number',
      key: 'vehicle_number',
    },

    {
        title: 'Distance',
        dataIndex: 'distance',
        key: 'distance',
      },

      {
        title: 'Violation Time',
        dataIndex: 'violationTime',
        key: 'violationTime',
      },
    

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
     
    },




    
  ];

  return (
    <div>
        {/* <h1>welcome</h1> */}
        <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record._id}
        
      />
    </div>
  )
}

export default GeoFacing
