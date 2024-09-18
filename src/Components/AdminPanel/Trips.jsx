// import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
// import axios from 'axios';

// const Trips = () =>
// {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [editingTrip, setEditingTrip] = useState(null);

//   useEffect(() =>
//   {
//     fetchData();
//     fetchTrip()
//   }, []);

//   const fetchTrip = async () => {
//     setLoading(true);
//     console.log("we start");
//     try {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/trip/getAllIntercityTripRequests');
//       const result = await response.json();
//       // console.log(result)
//       const result1 = result.tripRequests
//       if (result.message==='Trip requests fetched successfully') {
//         console.log(result1)
//         const trip = result1.map(item => ({
//           key: item._id,
//           id:item._id,
//           startTime:item.startTime
//         }));
//         setData(trip);
//         console.log("dfd",trip);
//       } else {
//         console.log("error in fetching data");
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);

//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchData = async () =>
//   {
//     try
//     {
//       const response = await axios.get('http://102.133.144.226:8000/api/v1/trips/getNearestCab');
//       setData(response.data.DUMMY_DATA.available_vehicles);
//       setLoading(false);
//     } catch (error)
//     {
//       console.error('Error fetching trip data:', error);
//       setLoading(false);
//     }
//   };

//   const handleAdd = () =>
//   {
//     form.resetFields();
//     setIsEditing(false);
//     setIsModalVisible(true);
//   };

//   const handleEdit = (record) =>
//   {
//     setEditingTrip(record);
//     form.setFieldsValue(record);
//     setIsEditing(true);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () =>
//   {
//     setIsModalVisible(false);
//   };

//   const handleFinish = async (values) =>
//   {
//     try
//     {
//       if (isEditing)
//       {
//         await axios.put(`http://102.133.144.226:8000/trips/getNearestCab/${ editingTrip._id }`, values);
//       } else
//       {
//         await axios.post('http://102.133.144.226:8000/trips/getNearestCab', values);
//       }
//       fetchData();
//       setIsModalVisible(false);
//     } catch (error)
//     {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleDelete = (id) =>
//   {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this trip?',
//       okText: 'Yes',
//       okType: 'danger',
//       cancelText: 'No',
//       onOk: async () =>
//       {
//         try
//         {
//           await axios.delete(`http://102.133.144.226:8000/trips/getNearestCab/${ id }`);
//           fetchData(); // Refresh the data after deletion
//         } catch (error)
//         {
//           console.error('Error deleting trip:', error);
//         }
//       },
//     });
//   };

//   const columns = [
//     {
//       title: 'Pick Up Time',
//       dataIndex: 'pick_up',
//       key: 'pick_up',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'Start Location',
//       dataIndex: ['locations', 'start'],
//       key: 'start_location',
//     },
//     {
//       title: 'Intermediate Locations',
//       dataIndex: ['locations', 'intermediate'],
//       key: 'intermediate_locations',
//       // render: (text) => text.join(', '),
//     },
//     {
//       title: 'Last Location',
//       dataIndex: ['locations', 'last'],
//       key: 'last_location',
//     },
//     {
//       title: 'Capacity Total',
//       dataIndex: ['capacity', 'total'],
//       key: 'capacity_total',
//     },
//     {
//       title: 'Capacity Left',
//       dataIndex: ['capacity', 'left'],
//       key: 'capacity_left',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button type="link" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Button type="link" onClick={() => handleDelete(record._id)} danger>
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {/* <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
//         Add Trip
//       </Button> */}
//       <Table
//         columns={columns}
//         dataSource={data}
//         loading={loading}
//         rowKey="_id"
//       />
//       <Modal
//         title={isEditing ? 'Edit Cab Trip' : 'Add Cab Trip'}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="horizontal"
//           onFinish={handleFinish}
//         >
//           <Form.Item
//             label="Pick Up Time"
//             name="pick_up"
//             rules={[{ required: true, message: 'Please input the pick up time!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Type"
//             name="type"
//             rules={[{ required: true, message: 'Please input the type!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Start Location"
//             name={['locations', 'start']}
//             rules={[{ required: true, message: 'Please input the start location!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Intermediate Locations"
//             name={['locations', 'intermediate']}
//             rules={[{ required: true, message: 'Please input intermediate locations!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Last Location"
//             name={['locations', 'last']}
//             rules={[{ required: true, message: 'Please input the last location!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Capacity Total"
//             name={['capacity', 'total']}
//             rules={[{ required: true, message: 'Please input the total capacity!' }]}
//           >
//             <InputNumber style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item
//             label="Capacity Left"
//             name={['capacity', 'left']}
//             rules={[{ required: true, message: 'Please input the left capacity!' }]}
//           >
//             <InputNumber style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {isEditing ? 'Update' : 'Add'} Cab Trip
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Trips;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  // Select,
  message,
  Switch,
} from "antd";


// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Text,
// } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

import {
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'

// import {  message} from 'antd';

const Trips = () => {
  const [status, setStatus] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [cabs, setCabs] = useState([]);
  const [record1, setRecord] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTrip();
  }, []);

  // useEffect(() => {
  //   handleRowClick()
  // }, []);

  const handleRow = async (record) => {
    
      console.log("Clicked row data:", record);
      setRecord(record);  // Update state with clicked row data
      setIsModalOpen(true);  // Open modal if necessary
  
      // Since setState is asynchronous, resolve the promise after state is se
        

      setTimeout(async() => {
        try {

          const currentLocation = record?.currentLocationID;
          const destinationLocation = record?.destinationLocationID  ;    
          const bookingDate = record?.bookingDate1;
          const getCurrentTime = () => {
            const currentTime = new Date();
            return currentTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          };
    
          const requestedStartTime = getCurrentTime();
          console.log("request time", getCurrentTime());
          const data = await axios.post(
            "http://102.133.144.226:8000/api/v1/trip/getNearestCab",
            {
              currentLocation,
              destinationLocation,
              bookingDate,
              requestedStartTime,
            }
          );
    
          console.log("data is is is", data);
    
          const filter = data?.data?.suitableCabs?.filter((item) => {
            return item?.cab?.type === "NA";
          });
    
          if (filter) {
            setCabs(filter);
            console.log("etcabs is running");
          }
    
          console.log("filter data is", filter);
        } catch (error) {
          console.log(error);
        }
      }, 100); 
      
      
   
  };

  console.log("vehicle id is following",record1);


  


  const handleAlloted = () => {
    setIsModalOpen(true);
    
  };
  

  const handleCancel = ()=>{
    setIsModalOpen(false);
    setCabs([]);

  }

  const fetchTrip = async () => {
    setLoading(true);
    console.log("we start");
    try {
      const response = await fetch(
        "http://102.133.144.226:8000/api/v1/trip/getAllIntercityTripRequests"
      );
      const result = await response.json();
      console.log("final result is ", result);

      // const response1 = await fetch(
      //   "http://102.133.144.226:8000/api/v1/trip/getAllAirdropBookings"
      // );
      // const result3 = await response1.json();

      const result1 = result.tripRequests;
      if (result.message === "Trip requests fetched successfully") {
        const reversedArr = result1.reverse();

        const data1 = reversedArr.filter((item) => {
          return (
            item.boardingPoint !== null &&
            item.employeeId !== null &&
            item.destinationPoint !== null
          );
        });

        const finaldata = data1.map((item) => {
          const starttime = item?.startTime;

          const date = new Date(starttime);

          // Get hours and minutes
          let hours = date.getUTCHours();
          let minutes = date.getUTCMinutes();
          const day = date.getUTCDate();
          const month = date.toLocaleString("en-us", { month: "short" });

          // Convert to 12-hour format and set AM/PM
          const ampm = hours >= 12 ? "pm" : "am";
          hours = hours % 12 || 12; // Convert to 12-hour format
          minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed

          // Format the time
          const formattedTime = `${hours}.${minutes}${ampm},${day}-${month.toLowerCase()}`;

          const formatDate = (dateString) => {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
              return "No Date Available"; 
            }
            
            return date
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "-"); 
          };

          let bookingDate = formatDate(item?.startTime);
           
          let currentLocation = item?.boardingPoint._id;
          let destinationLocation = item?.destinationPoint._id;
          const returndata = {
            name: item?.employeeId?.name,
            Email: item?.employeeId?.email,
            mobile: item?.employeeId?.mobile,
            BoradingPoint: item?.boardingPoint?.companyId?.name,
            DestinationPonint: item?.destinationPoint?.companyId?.name,
            starttime: formattedTime,
            status: item?.status,
            currentLocationID:currentLocation,
            destinationLocationID:destinationLocation,
            bookingDate1:bookingDate,
            requestId:item?._id,
          };

          return returndata;
        });

        console.log("final data is", finaldata);
        setData(finaldata);
        // console.log("data 1 is",data1[1]._id);
        // console.log("data 1 is",data1);
      } else {
        console.log("error in fetching data");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async () => {
  //   try {

  //     const currentLocation = record1?.currentLocationID;
  //     const destinationLocation = record1?.destinationLocationID  ;    
  //     const bookingDate = record1?.bookingDate1;
  //     const getCurrentTime = () => {
  //       const currentTime = new Date();
  //       return currentTime.toLocaleTimeString("en-US", {
  //         hour: "numeric",
  //         minute: "numeric",
  //         hour12: true,
  //       });
  //     };

  //     const requestedStartTime = getCurrentTime();
  //     console.log("request time", getCurrentTime());
  //     const data = await axios.post(
  //       "http://102.133.144.226:8000/api/v1/trip/getNearestCab",
  //       {
  //         currentLocation,
  //         destinationLocation,
  //         bookingDate,
  //         requestedStartTime,
  //       }
  //     );

  //     console.log("data is is is", data);

  //     const filter = data?.data?.suitableCabs?.filter((item) => {
  //       return item?.cab?.type === "NA";
  //     });

  //     if (filter) {
  //       setCabs(filter);
  //       console.log("etcabs is running");
  //     }

  //     console.log("filter data is", filter);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAprove = async () => {
    try {
      const status = "approved";
      const requestId = record1?.requestId;
      // console.log("vehicale id is",vehicleId);

      if(!vehicleId){
            message.error(" Please select Vehicle")
      }
      const data = await axios.post(
        "http://102.133.144.226:8000/api/v1/trip/intercity/approve",
        {
          requestId,
          vehicleId,
          status,
        }
      );

      if (data.data.message==="Trip approved and booked successfully") {
        message.success("trip booked succesfully");
        fetchTrip();
        setIsModalOpen(false);
        setVehicleId("");
        cabs([]);
        
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async()=>{
  
      try {
      const status = "rejected";
      const requestId = record1?.requestId;
      console.log("vehicale id is",vehicleId);
      const data = await axios.post(
        "http://102.133.144.226:8000/api/v1/trip/intercity/approve",
        {
          requestId,
          vehicleId,
          status,
        }
      );

      if (data) {
        message.success("trip Reject succesfully");
        setIsModalOpen(false);
        fetchTrip();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
       

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "Bording Point",
      dataIndex: "BoradingPoint",
      key: "BoradingPoint",
    },

    {
      title: "Destination Point",
      dataIndex: "DestinationPonint",
      key: "DestinationPonint",
    },

    {
      title: "Start Time",
      dataIndex: "starttime",
      key: "starttime",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        let color;
        let statusText;
    
        // Determine color and text based on the status value
        if (record.status === "approved") {
          color = "green";
          statusText = "Approved";
        } else if (record.status === "pending") {
          color = "orange";
          statusText = "Pending";
        } else if (record.status === "rejected") {
          color = "red";
          statusText = "Rejected";
        }
    
        return (
          <span style={{ color }}>
            {statusText}
          </span>
        );
      }
    },
    
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button

            onClick={()=>{handleRow(record)}}
          >
            Update
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
        // onRow={(record) => ({
        //   onClick: () => {
        //     handleRowClick(record); // Trigger the click handler
        //   },
        // })}



      />



       <Modal title={<strong>Intercity Request</strong>}   onCancel={handleCancel} open={isModalOpen}>
              <Text mt={"20px"} fontWeight={"bold"}>Emp Details</Text>
                   <Flex>
                                <Box mr={"20px"}>
                                  <Text color={"black"} fontWeight={"bold"}>Name</Text>
                                  <Text color={"black"} fontWeight={"bold"}>Email</Text>
                                  <Text color={"black"} fontWeight={"bold"}>Boarding Point</Text>
                                  <Text color={"black"} fontWeight={"bold"}>Destination Point</Text>
                                  <Text color={"black"} fontWeight={"bold"}>Start Time</Text>
                                  
                                </Box>
                                <Box>
                                  <Text color={"black"}>
                                    {record1?.name}
                                  </Text>
                                  <Text color={"black"}>
                                    {record1?.Email}
                                  </Text>
                                  <Text color={"black"}>
                                     {record1?.BoradingPoint}
                                  </Text>

                                  <Text color={"black"}>
                                    {record1?.DestinationPonint}
                                  </Text>
                                  <Text color={"black"}>
                                    {record1?.starttime}
                                  </Text>
                                </Box>
                              </Flex>



                              <Text mt={"20px"} fontWeight={"bold"}>Availbale Cabs</Text>

                              <Flex mb={"15px"} >
                                <UnorderedList>
                                  {
                                  
                                  cabs?(cabs?.map((item) => {
                                    return (
                                      <>
                                        <ListItem>
                                          <Flex>
                                            <Box mr={"20px"}>
                                              <Text mr={"5px"}>
                                                Vehicle Number
                                              </Text>
                                              <Text color={"green"}>
                                                {item?.cab?.vehicle_number}
                                              </Text>
                                            </Box>

                                            <Box>
                                              <Text mr={"5px"}>Capacity</Text>
                                              <Text mr={"5px"} color={"green"}>
                                                {item?.cab?.capacity}
                                              </Text>
                                            </Box>
                                          </Flex>
                                        </ListItem>
                                      </>
                                    );
                                  })):(<h1>Loading cabs</h1>)
                                
                                
                                }
                                </UnorderedList>
                              </Flex >


                              <Select placeholder="Select Vehicle" value={vehicleId} onChange={(e)=>{setVehicleId(e.target.value)}} style={{marginBottom:"20px"}}>
                                     {
                                      cabs?.map((item)=>{
                                          
                                        return (
                                             <>

                                    <option key={item.id} value={item?.cab?.vehicle_id}  >
                                     {item?.cab?.vehicle_number}
                                     </option>
                                             </>
                                        )
                                      })
                                     }
                              </Select>

                              <Button type="primary" onClick={handleAprove} style={{marginRight:"20px"}}>Approve</Button>
                              <Button type="primary" danger  onClick={handleReject}>Reject</Button>
      </Modal>

      {/* <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Employee name</Th>
              <Th ml={"30px"}>Email</Th>
              <Th>Boarding Point </Th>
              <Th>Destination Point</Th>
              <Th>Start Time</Th>
             
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!data ? (
              <h1>loading</h1>
            ) : (
              data.map((item) => {
                const starttime = item?.startTime;
                let currentLocation = item?.boardingPoint._id;
                let destinationLocation = item?.destinationPoint._id;
                let requestId = item?.employeeId._id;
                

                const formatDate = (dateString) => {
                  const date = new Date(dateString);
                  if (isNaN(date.getTime())) {
                    return "No Date Available"; 
                  }
                  
                  return date
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-"); 
                };

                let bookingDate = formatDate(item?.startTime);
                console.log("formateed", bookingDate);


                console.log(starttime);
                return (
                  <>
                    <Tr>
                      <Td>{item?.employeeId?.name}</Td>
                      <Td>{item?.employeeId?.email}</Td>
                      <Td>{item?.boardingPoint?.companyId?.name}</Td>
                      <Td>{item?.destinationPoint?.companyId?.name}</Td>
                      <Td>
                        {new Date(starttime).toLocaleString("en-US", {
                          
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </Td>
                      
                      <Td>{item.status}</Td>
                      <Td>
                        <Button
                           colorScheme='blue'
                          onClick={() => {
                            handleSubmit(
                              currentLocation,
                              destinationLocation,
                              bookingDate
                            );
                          }}
                        >
                          Update
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Update Request</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Flex>
                                <Box mr={"20px"}>
                                  <Text color={"black"}>Name</Text>
                                  <Text color={"black"}>Email</Text>
                                  <Text color={"black"}>Boarding Point</Text>
                                  <Text color={"black"}>Destination Point</Text>
                                  <Text color={"black"}>StartTime</Text>
                                  
                                </Box>
                                <Box>
                                  <Text color={"black"}>
                                    {item?.employeeId?.name}
                                  </Text>
                                  <Text color={"black"}>
                                    {item?.employeeId?.email}
                                  </Text>
                                  <Text color={"black"}>
                                    {item?.boardingPoint?.companyId?.name}
                                  </Text>

                                  <Text color={"black"}>
                                    {item?.destinationPoint?.companyId?.name}
                                  </Text>
                                  <Text color={"black"}>
                                    {new Date(starttime).toLocaleString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                      }
                                    )}
                                  </Text>
                                </Box>
                              </Flex>

                              <Text mt={"20px"}>Availbale Cabs</Text>

                              <Flex>
                                <UnorderedList>
                                  {cabs?.map((item) => {
                                    return (
                                      <>
                                        <ListItem>
                                          <Flex>
                                            <Box mr={"20px"}>
                                              <Text mr={"5px"}>
                                                Vehicle Number
                                              </Text>
                                              <Text color={"green"}>
                                                {item?.cab?.vehicle_number}
                                              </Text>
                                            </Box>

                                            <Box>
                                              <Text mr={"5px"}>Capacity</Text>
                                              <Text mr={"5px"} color={"green"}>
                                                {item?.cab?.capacity}
                                              </Text>
                                            </Box>
                                          </Flex>
                                        </ListItem>
                                      </>
                                    );
                                  })}
                                </UnorderedList>
                              </Flex>
                            </ModalBody>

                            <ModalFooter>
                              
                              <Select placeholder="Select Vehicle" onChange={(e)=>{setVehicleId(e.target.value)}} >
                                     {
                                      cabs?.map((item)=>{
                                          
                                        return (
                                             <>

                                    <option key={item.id} value={item?.cab?.vehicle_id}  >
                                     {item?.cab?.vehicle_number}
                                     </option>
                                             </>
                                        )
                                      })
                                     }
                              </Select>
                            
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  handleAprove(item?._id);
                                }}
                                color={"green"}
                                border={"1px solid black"}
                              >
                                Aproved
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Td>
                    </Tr>
                  </>
                );
              })
            )}
          </Tbody>
          
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default Trips;
