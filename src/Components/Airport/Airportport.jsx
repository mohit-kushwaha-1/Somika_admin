// import React, { useEffect, useState } from "react";
// import { Modal, message, Button } from "antd";
// import { Box, Input, Text, Flex, FormLabel, Select } from "@chakra-ui/react";
// import { GoogleMap, Marker } from "@react-google-maps/api";
// import { LoadScript } from "@react-google-maps/api";
// import axios from "axios";

// // const { Option } = Select;

// const googleMapsApiKey = "AIzaSyBPnipzrKgRKIcHt1Bh_4xy1fZi7FUdUYs";

// const Airportport = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isModal2Visible, setIsModal2Visible] = useState(false);
//   const [clickedPosition, setClickedPosition] = useState(null);
//   const [clickedPosition2, setClickedPosition2] = useState(null);
//   const [address, setAddress] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [startTime1, setStartTime] = useState();
//   const [EndTime, setEndTime] = useState();
//   const [vehicleId1, setVehicleId] = useState();

//   console.log("position one is", clickedPosition);

//   const [format1, setformat1] = useState();
//   const [foramt2, setForamt2] = useState();
//   const [availabeCabs, setAvailableCabs] = useState();
//   console.log("formate 1 is", format1);
//   console.log("start time i is ", startTime1);

//   // "boardingCoordinates": [77.0773551,28.362964],
//   //  "destinationCoordinates": [77.100281,28.556160],

//   const changeVehicle = (e) => {
//     console.log("value is ", e.target.value);
//     setVehicleId(e.target.value);
//   };

//   console.log("vehicle id is", vehicleId1);
//   const handleDateChange = (e) => {
//     setStartTime(e.target.value);

//     const date = new Date(e.target.value);
//     const isoDate = date.toISOString();
//     setformat1(isoDate);
//   };

//   const findCabs = async () => {
//     try {
//       const a = Object.values(clickedPosition);
//       const boardingCoordinates = a.reverse();
//       const b = Object.values(clickedPosition2);
//       const destinationCoordinates = b.reverse();

//       function formatDateTime(isoDate) {
//         const date = new Date(isoDate);

//         const day = String(date.getDate()).padStart(2, "0");
//         const month = String(date.getMonth() + 1).padStart(2, "0"); 
//         const year = date.getFullYear();

        
//         let hours = date.getHours();

//         const minutes = String(date.getMinutes()).padStart(2, "0");
//         const ampm = hours >= 12 ? "PM" : "AM";


//         hours = hours % 12 || 12; 
//         hours = String(hours).padStart(2, "0");

//         return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
//       }

//       const startTime = formatDateTime(startTime1);
      

//       const response = await axios.post(
//         "http://102.133.144.226:8000/api/v1/trip/findcabs",
//         {
//           boardingCoordinates,
//           destinationCoordinates,
//           startTime,
//         }
//       );

//       console.log("response data is following", response.data.availableCabs);
//       setAvailableCabs(response.data.availableCabs);
//     } catch (error) {}
//   };

//   const postAirdrop = async () => {
//     try {
//       const a = Object.values(clickedPosition);
//       const boardingCoordinates = a.reverse();
//       const b = Object.values(clickedPosition2);
//       const destinationCoordinates = b.reverse();
//       const startTime = format1;
//       const endTime = foramt2;
//       const vehicleId = vehicleId1;

//       const employeeId = "66c86250b01896ae48684d11";

//       const response = await axios.post(
//         "http://102.133.144.226:8000/api/v1/trip/airdrop",
//         {
//           employeeId,
//           boardingCoordinates,
//           destinationCoordinates,
//           startTime,
//           endTime,
//           vehicleId,
//         }
//       );

//       console.log("boardingCoordinates", response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   findCabs();
//   // }, []);

//   const handleDateChange1 = (e) => {
//     setEndTime(e.target.value);
//     const date = new Date(e.target.value);
//     const isoDate = date.toISOString();
//     setForamt2(isoDate);
//   };

//   const handleModalOpen = (type) => {
//     if (type === "start") setIsModal2Visible(true);
//     else if (type === "destination") setIsModalVisible(true);
//   };

//   const handleModalClose = (type) => {
//     if (type === "start") setIsModal2Visible(false);
//     else if (type === "destination") setIsModalVisible(false);
//   };

//   const empId = localStorage.getItem("empId");
//   console.log("dfgdfgf", empId);

//   const getGeocode = (lat, lng, setAddressFunc) => {
//     const geocoder = new window.google.maps.Geocoder();
//     const latLng = { lat, lng };

//     geocoder.geocode({ location: latLng }, (results, status) => {
//       if (status === "OK") {
//         if (results[0]) {
//           setAddressFunc(results[0].formatted_address); // Set the address
//         } else {
//           console.error("No results found");
//         }
//       } else {
//         console.error("Geocoder failed due to: " + status);
//       }
//     });
//   };

//   const handleMapClick = (event, setPositionFunc, setAddressFunc) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setPositionFunc({ lat, lng });
//     getGeocode(lat, lng, setAddressFunc);
//   };

//   return (
//     <div>
//       <Box
//         w="400px"
//         m="auto"
//         border="1px solid black"
//         p="30px"
//         borderRadius="10px"
//       >
//         <FormLabel>Enter Start Time</FormLabel>
//         <Input
//           type="datetime-local"
//           placeholder={"Enter Start Time"}
//           mb="20px"
//           border="1px solid black"
//           h="40px"
//           value={startTime1}
//           onChange={handleDateChange}
//         />

//         <Flex
//           justifyContent="space-between"
//           border="1px solid black"
//           borderRadius="10px"
//           p="10px"
//           mb="20px"
//         >
//           <Text fontSize="15px">Select starting point</Text>
//           <Button h="30px" onClick={() => handleModalOpen("start")}>
//             Map View
//           </Button>
//         </Flex>

//         <Flex
//           justifyContent="space-between"
//           border="1px solid black"
//           borderRadius="10px"
//           p="10px"
//           mb="20px"
//         >
//           <Text fontSize="15px">Select destination point</Text>
//           <Button h="30px" onClick={() => handleModalOpen("destination")}>
//             Map View
//           </Button>
//         </Flex>

//         <Button type="primary" onClick={findCabs} style={{marginBottom:"15px"}}>
//           Get Cabs
//         </Button>

//         <Select
//           placeholder="Change Vehicle"
//           border="1px solid black"
//           mb="20px"
//           h="40px"
//           onChange={changeVehicle}
//           value={vehicleId1}
//         >
//           {Array.isArray(availabeCabs) &&
//             availabeCabs.map((option) => (
//               <option key={option?.cab?._id} value={option?.cab?._id}>
//                 {option?.cab?.vehicle_number}
//               </option>
//             ))}
//         </Select>

//         <FormLabel>Enter End Time</FormLabel>
//         <Input
//           type="datetime-local"
//           placeholder="Enter End Time"
//           mb="20px"
//           border="1px solid black"
//           h="40px"
//           value={EndTime}
//           onChange={handleDateChange1}
//         />
//         {/* <Input placeholder="Enter Date" mb="20px" border="1px solid black" h="40px" /> */}

//         <Button onClick={postAirdrop} type="primary">
//           submit
//         </Button>
//       </Box>

//       {/* Modal for Starting Point */}
//       <Modal
//         visible={isModal2Visible}
//         onOk={() => handleModalClose("start")}
//         onCancel={() => handleModalClose("start")}
//       >
//         <GoogleMap
//           center={{ lat: 28.6139, lng: 77.209 }} // Default location (New Delhi, India)
//           zoom={12}
//           mapContainerStyle={{ height: "400px", width: "400px" }}
//           onClick={(event) =>
//             handleMapClick(event, setClickedPosition, setAddress)
//           }
//         >
//           {clickedPosition && <Marker position={clickedPosition} />}
//         </GoogleMap>

//         {clickedPosition && (
//           <div style={{ marginTop: "20px" }}>
//             <p>
//               Clicked Latitude1: {clickedPosition.lat}, Longitude1:{" "}
//               {clickedPosition.lng}
//             </p>
//             <p>Address: {address}</p>
//           </div>
//         )}
//       </Modal>

//       {/* Modal for Destination Point */}
//       <Modal
//         visible={isModalVisible}
//         onOk={() => handleModalClose("destination")}
//         onCancel={() => handleModalClose("destination")}
//       >
//         <GoogleMap
//           center={{ lat: 28.6139, lng: 77.209 }} // Default location (New Delhi, India)
//           zoom={12}
//           mapContainerStyle={{ height: "400px", width: "400px" }}
//           onClick={(event) =>
//             handleMapClick(event, setClickedPosition2, setAddress2)
//           }
//         >
//           {clickedPosition2 && <Marker position={clickedPosition2} />}
//         </GoogleMap>

//         {clickedPosition2 && (
//           <div style={{ marginTop: "20px" }}>
//             <p>
//               Clicked Latitude2: {clickedPosition2.lat}, Longitude2:{" "}
//               {clickedPosition2.lng}
//             </p>
//             <p>Address: {address2}</p>
//           </div>
//         )}
//       </Modal>

//       {/* LoadScript at the top level */}
//       <LoadScript googleMapsApiKey={googleMapsApiKey}>
//         {/* Other components or logic can go here */}
//       </LoadScript>
//     </div>
//   );
// };

// export default Airportport;



import React, { useState,useEffect } from 'react';
// import { Card, Button, Spin, Col, Row,Select} from 'antd';
import { GoogleMap, Marker ,Autocomplete} from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import { Box ,Flex,FormLabel,Input,Text} from '@chakra-ui/react'
import axios from  'axios'
import {
  Button,
  Select,
  Card, 
  Spin,
  Col,
  Row,
  Modal,
} from "antd";

const { Option } = Select;
const googleMapsApiKey = "AIzaSyBPnipzrKgRKIcHt1Bh_4xy1fZi7FUdUYs";// Replace with your actual Google Maps API key
const libraries = ['places'];



// import 'antd/dist/reset.css';
const { Meta } = Card;

const Airportport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

  const [clickedPosition1, setClickedPosition1] = useState(null);
  const [clickedPosition2, setClickedPosition2] = useState(null);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [autocomplete1, setAutocomplete1] = useState(null);
  const [autocomplete2, setAutocomplete2] = useState(null);
  const [map1, setMap1] = useState(null);
  const [map2, setMap2] = useState(null);


  const [startTime1, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();
  const [vehicleId1, setVehicleId] = useState();
  const [format1, setformat1] = useState();
  const [foramt2, setForamt2] = useState();
  const [availabeCabs, setAvailableCabs] = useState();



  // console.log("start time is ",startTime1);
  // console.log("starting point is ",clickedPosition);
  // console.log("end point is ",clickedPosition2);
  // console.log("emp id is",searchValue);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const users = await axios.get(
          "http://102.133.144.226:8000/api/v1/users/getAllUser"
        );
        setUserData(users.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSearch1 = (value) => {
    setSearchValue(value);
    if (value) {
      const filtered = userData?.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };



  const findCabs = async () => {
    try {

      const a = Object.values(clickedPosition1);
      const boardingCoordinates = a.reverse();
      const b = Object.values(clickedPosition2);
      const destinationCoordinates = b.reverse();

      function formatDateTime(isoDate) {
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = date.getFullYear();

        
        let hours = date.getHours();

        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";


        hours = hours % 12 || 12; 
        hours = String(hours).padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
      }

      const startTime = formatDateTime(startTime1);
      

      const response = await axios.post(
        "http://102.133.144.226:8000/api/v1/trip/findcabs",
        {
          boardingCoordinates,
          destinationCoordinates,
          startTime,
        }
      );

      console.log("response data is following", response.data.availableCabs);
      setAvailableCabs(response.data.availableCabs);
    } catch (error) {
      console.log(error)
    }
  };



  const postAirdrop = async () => {
    try {
      const a = Object.values(clickedPosition1);
      const boardingCoordinates = a.reverse();
      const b = Object.values(clickedPosition2);
      const destinationCoordinates = b.reverse();
      const startTime = format1;
      // const endTime = foramt2;
      const vehicleId = "66d69f8c6958b0d198beeaa5";

      const employeeId = "66c86250b01896ae48684d11";

      const response = await axios.post(
        "http://102.133.144.226:8000/api/v1/trip/airdrop",
        {
          employeeId,
          boardingCoordinates,
          destinationCoordinates,
          startTime,
          // endTime,
          vehicleId,
        }
      );

      console.log("boardingCoordinates", response.data);
    } catch (error) {
      console.log(error);
    }
  };


  // Fetch data from API

//   useEffect(()=>{
//     fetchData();
//   },[])
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get('http://102.133.144.226:8000/api/v1/users/getAllUser'); // Replace with your API endpoint
  //     setData(response.data.data); // Assume API response is an array of items

  //   //   console.log("A data id",response.data.data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const changeVehicle = (e) => {
  //   console.log("value is ", e.target.value);
  //   setVehicleId(e.target.value);
  // };

  // console.log("vehicle id is", vehicleId1);



  const handleDateChange = (e) => {
    setStartTime(e.target.value);
    const date = new Date(e.target.value);
    const isoDate = date.toISOString();
    setformat1(isoDate);
  };


  const handleModalOpen = (type) => {
    if (type === "start") setIsModal2Visible(true);
    else if (type === "destination") setIsModal1Visible(true);
  };

  const handleModalClose = (type) => {
    if (type === "start") {
      console.log("Closing start modal");
      setIsModal1Visible(false);
    } else if (type === "destination") {
      console.log("Closing destination modal");
      setIsModal2Visible(false);
    }
  };

  // Handle Map clicks for both modals
  const handleMapClick1 = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickedPosition1({ lat, lng });
    getGeocode(lat, lng, setAddress1);
  };

  const handleMapClick2 = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickedPosition2({ lat, lng });
    getGeocode(lat, lng, setAddress2);
  };

  // Fetch address from Google Maps Geocode API
  const getGeocode = async (lat, lng, setAddressFunc) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`);
      const results = response.data.results;
      if (results.length > 0) {
        setAddressFunc(results[0].formatted_address);
      } else {
        setAddressFunc('Address not found');
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      setAddressFunc('Error fetching address');
    }
  };

  // Handle autocomplete place changed for both modals
  const handlePlaceChanged1 = () => {
    if (autocomplete1) {
      const place = autocomplete1.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setClickedPosition1({ lat, lng });
        setAddress1(place.formatted_address);
        if (map1) {
          map1.panTo({ lat, lng });
        }
      }
    }
  };

  const handlePlaceChanged2 = () => {
    if (autocomplete2) {
      const place = autocomplete2.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setClickedPosition2({ lat, lng });
        setAddress2(place.formatted_address);
        if (map2) {
          map2.panTo({ lat, lng });
        }
      }
    }
  };

  const handleAutocompleteLoad1 = (autocomplete) => setAutocomplete1(autocomplete);
  const handleAutocompleteLoad2 = (autocomplete) => setAutocomplete2(autocomplete);


  const handleCardClick = (id) => {
    setSelectedCardId(id); // Set the selected card ID
    console.log('Selected Card ID:', id); // Log the selected card ID for debugging
  
    // You can also add any additional logic here, 
    // such as fetching more details about the selected card or updating other state variables.
  };



 

  return (

    <>
    
 <Flex>

    <Box>
    <FormLabel>Search Emp</FormLabel>
    <Select
          
           showSearch
           value={searchValue}
           placeholder="Type to search users"
           style={{ width: 300,border:"1px solid black",borderRadius:"8px" }}
           onSearch={handleSearch1} // Filter options as the user types
           onChange={setSearchValue} // Update the selected value
           filterOption={false} // Disable default filtering to use custom filtering
           notFoundContent={loading ? "Loading..." : "No results found"} // Loading or empty message
         >
           {filteredOptions?.map((user) => (
             <Option key={user._id} value={user._id}>
               {user.name}
             </Option>
           ))}
         </Select>
    </Box>

    <Box  ml={"30px"} >
          
    <FormLabel>Select Date</FormLabel>
        <Input
          type="datetime-local"
          placeholder={"Enter Start Time"}
          mb="20px"
          border="1px solid black"
          h="32px"
          
          value={startTime1}
          onChange={handleDateChange}
        />

    </Box>


       <Box ml={"30px"}>
       <FormLabel>Select Boarding Point</FormLabel>
          <Button style={{ width: 150,border:"1px solid black" }} onClick={() => handleModalOpen("start")}>
            Map View
          </Button>
        </Box>

        <Box ml={"30px"}>
        <FormLabel>Select Destination Point</FormLabel>
          <Button style={{ width: 150,border:"1px solid black" }} onClick={() => handleModalOpen("destination")}>
            Map View
          </Button>
        </Box>
    

    </Flex>     


    <div style={{ padding: '16px' }}>
      <Button type="primary" onClick={findCabs} style={{ marginBottom: '16px',marginRight:"20px" }}>
         Get Cabs
      </Button>

      <Button type="primary" onClick={postAirdrop} style={{ marginBottom: '16px' }}>
         Book Now
      </Button>

      {loading ? (
        <Spin />
      ) : (
        <Row gutter={16}>
          {data?.map(item => (
            <Col span={8} key={item._id}  >
              <Card
                title={item.name} // Title of the card
                style={{ marginBottom: '16px', cursor: 'pointer' ,border:"1px solid black"}} // Add cursor pointer for click effect
                onClick={() => handleCardClick(item._id)} // Handle card click
              >
                <Meta
                  title={item.name} // Name to be displayed on the card
                  description={item.name} // Description to be displayed on the card
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {selectedCardId && (
        <div style={{ marginTop: '16px' }}>
          <h2>Selected Card ID: {selectedCardId}</h2>
        </div>
      )}
    </div>



           {/* Modal 1 for Start Point */}
      <Modal
        visible={isModal1Visible}
        onOk={() => handleModalClose("start")}
        onCancel={() => handleModalClose("start")}
        footer={null}
        style={{ top: 20 }}
      >
        {/* <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}> */}
          <Autocomplete onLoad={handleAutocompleteLoad1} onPlaceChanged={handlePlaceChanged1}>
            <Input id="search-box1" type="text" placeholder="Search for a place" />
          </Autocomplete>
          <GoogleMap
            center={{ lat: 28.6139, lng: 77.209 }} // Default coordinates (adjust as necessary)
            zoom={12}
            mapContainerStyle={{ height: "400px", width: "400px" }}
            onClick={handleMapClick1}
            onLoad={(mapInstance) => setMap1(mapInstance)}
          >
            {clickedPosition1 && <Marker position={clickedPosition1} />}
          </GoogleMap>
          {clickedPosition1 && (
            <div>
              <p>Latitude: {clickedPosition1.lat}, Longitude: {clickedPosition1.lng}</p>
              <p>Address: {address1}</p>
            </div>
          )}
        {/* </LoadScript> */}
      </Modal>

      {/* Modal 2 for Destination Point */}
      <Modal
        visible={isModal2Visible}
        onOk={() => handleModalClose("destination")}
        onCancel={() => handleModalClose("destination")}
        footer={null}
        style={{ top: 20 }}
      >
        {/* <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}> */}
          <Autocomplete onLoad={handleAutocompleteLoad2} onPlaceChanged={handlePlaceChanged2}>
            <Input id="search-box2" type="text" placeholder="Search for a place" />
          </Autocomplete>
          <GoogleMap
            center={{ lat: 28.6139, lng: 77.209 }} // Default coordinates (adjust as necessary)
            zoom={12}
            mapContainerStyle={{ height: "400px", width: "400px" }}
            onClick={handleMapClick2}
            onLoad={(mapInstance) => setMap2(mapInstance)}
          >
            {clickedPosition2 && <Marker position={clickedPosition2} />}
          </GoogleMap>
          {clickedPosition2 && (
            <div>
              <p>Latitude: {clickedPosition2.lat}, Longitude: {clickedPosition2.lng}</p>
              <p>Address: {address2}</p>
            </div>
          )}
        {/* </LoadScript> */}
      </Modal>

      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}></LoadScript>

    </>
  );
};

export default Airportport;

