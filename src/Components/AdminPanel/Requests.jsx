import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, message, Switch } from 'antd';
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
import { h1 } from "framer-motion/client";

const Requests = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[record1,setRecord] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleRowClick = (record) => {
    // console.log("Clicked row data:", record);
    setRecord(record);
  
    // Access the clicked row's data here
    // You can now use 'record' to get the details of the clicked row
  };



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/trip/getCancellationRequest"
      );
      
      console.log("data is",response);
      const data4 = response.data
      // console.log("cancellation reson is",response.data[0].employeeTrips[0]?.cancellationReason);
      
      
      const filteredDataWithOuter = data4.map(outerArray => {
           const filteredInnerArray = outerArray?.employeeTrips?.filter(item => item.cancellationRequested=== true);
    return {
      outerData: outerArray,
      filteredInnerData: filteredInnerArray
    };
  });

       console.log("filter data is now foloowing ",filteredDataWithOuter);


        const data1 = filteredDataWithOuter.map((item)=>{
                     
        const returndata = {
            name:item?.filteredInnerData[0]?.employeeId?.name,
            email:item?.filteredInnerData[0]?.employeeId?.email,
            status:item?.filteredInnerData[0]?.status,
            tripType:item?.outerData?.tripType,
            EmpId:item?.filteredInnerData[0]?.employeeId?._id,
            id:item?.outerData?._id,
            massage:item?.filteredInnerData[0]?.cancellationReason ||"Na",
            empId:item?.filteredInnerData?.employeeId?._id,
            boardingPoint:item?.outerData?.boardingPoint?.companyId?.name,
            destinationPoint:item?.outerData?.destinationPoint?.companyId?.name,
        }

         return returndata
      })
     
      console.log("filter data is now data 1 ",data1);
      setData(data1);

      

      // console.log("cancel request is",response.data)
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  console.log("recond is ",record1);

  const hanleUpdate = async()=>{

           setIsModalOpen(true);

           
  }


  const cancelRequest = async()=>{
    try {

      const status = 'cancelled';

      const cancellationReason = record1?.massage ;
       const response = await axios.post(`http://102.133.144.226:8000/api/v1/trip/cancellation-requests/${record1?.id}/${record1?.EmpId}`,{
        status,
        cancellationReason,
       })

      //  console.log("cancel request is",response);
       if(response){
        message.success("Request Cancel succesfully")
        fetchData();
       }
   } catch (error) {
     console.log(error)
   }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Employee Email',
      dataIndex: 'email',
      key: 'email',
    },

    // boardingPoint:item?.boardingPoint?.companyId?.name,
    //           destinationPoint:item?.destinationPoint?.companyId?.name,
    
    {
      title: 'Boarding Point',
      dataIndex: 'boardingPoint',
      key: 'boardingPoint',
    },

    {
      title: 'Destination Point',
      dataIndex: 'destinationPoint',
      key: 'destinationPoint',
    },
    {
      title: 'Trip Type',
      dataIndex: 'tripType',
      key: 'tripType',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // render: (_, record) => (

      //   record.status==='cancelled'?(<>
      //     <h1>{record.status}</h1>
      //     <Button  onClick={hanleUpdate} >
      //       Update
      //     </Button>
          
      //   </>):(<h1><h1>{record.status}</h1></h1>)
        
      // ),
    },


    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
          <Button  
          onClick={()=>{hanleUpdate(record)}}
          disabled={record?.status === 'cancelled'}
           >
            Update
          </Button>
        
      ),
    },

    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <>
    //       <Button  onClick={hanleUpdate} >
    //         Update
    //       </Button>
          
    //     </>
    //   ),
    // },

    
  ];


  return (
    <>
      <h2 style={{fontSize:"1.2rem",fontWeight:"bold"}}>Requests Details</h2>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record._id}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record); // Trigger the click handler
          },
        })}
      />

     <Modal title="Update Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <pre><span style={{fontWeight:"bold"}}>Status</span>              : {record1?.status}</pre>
        <pre><span style={{fontWeight:"bold"}}>Cancellation Reason</span> : {record1?.massage}</pre>
        <br></br>

        <Button type="primary" onClick={cancelRequest}>Trip Cancel</Button>
      </Modal>

    </>
  )
}

export default Requests
