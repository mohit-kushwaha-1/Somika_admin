import React, { useState } from "react";
import { Modal, message } from "antd";
import { Box, Input, Text, Button, Flex,FormLabel } from "@chakra-ui/react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";



const googleMapsApiKey = "AIzaSyBPnipzrKgRKIcHt1Bh_4xy1fZi7FUdUYs";

const Airportport = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedPosition2, setClickedPosition2] = useState(null);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const[startTime,setStartTime] = useState();
  const[EndTime,setEndTime] = useState();




  const handleDateChange = (e) => {
    const inputDate = e.target.value; // This gets the local date-time format
    const formattedDate = new Date(inputDate).toISOString(); // Converts it to ISO 8601 format with Z
    setStartTime(formattedDate);
  };


  const handleDateChange1 = (e) => {
    const inputDate = e.target.value; // This gets the local date-time format
    const formattedDate = new Date(inputDate).toISOString(); // Converts it to ISO 8601 format with Z
    setEndTime(formattedDate);
  };
  console.log("start",startTime);
  console.log("End",EndTime);

  const handleModalOpen = (type) => {
    if (type === "start") setIsModal2Visible(true);
    else if (type === "destination") setIsModalVisible(true);
  };

  const handleModalClose = (type) => {
    if (type === "start") setIsModal2Visible(false);
    else if (type === "destination") setIsModalVisible(false);
  };

   const empId = localStorage.getItem('empId');
   console.log("dfgdfgf",empId);

  const getGeocode = (lat, lng, setAddressFunc) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setAddressFunc(results[0].formatted_address); // Set the address
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const handleMapClick = (event, setPositionFunc, setAddressFunc) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPositionFunc({ lat, lng });
    getGeocode(lat, lng, setAddressFunc);
  };

  return (
    <div>
      <Box
        w="400px"
        m="auto"
        border="1px solid black"
        p="30px"
        borderRadius="10px"
      >

     <FormLabel>Enter Start Time</FormLabel>
        <Input
        
          type="datetime-local"
          placeholder={"Enter Start Time"}
          mb="20px"
          border="1px solid black"
          h="40px"
          value={startTime ? startTime.substring(0, 16) : ""}  
          onChange={handleDateChange}
        />
        <FormLabel>Enter End Time</FormLabel>
        <Input
          type="datetime-local"
          placeholder="Enter End Time"
          mb="20px"
          border="1px solid black"
          h="40px"

          value={EndTime? EndTime.substring(0, 16) : ""}
          onChange={handleDateChange1}
        />
        {/* <Input placeholder="Enter Date" mb="20px" border="1px solid black" h="40px" /> */}

        <Flex
          justifyContent="space-between"
          border="1px solid black"
          borderRadius="10px"
          p="10px"
          mb="20px"
        >
          <Text fontSize="15px">Select starting point</Text>
          <Button h="30px" onClick={() => handleModalOpen("start")}>
            Map View
          </Button>
        </Flex>

        <Flex
          justifyContent="space-between"
          border="1px solid black"
          borderRadius="10px"
          p="10px"
          mb="20px"
        >
          <Text fontSize="15px">Select destination point</Text>
          <Button h="30px" onClick={() => handleModalOpen("destination")}>
            MapView
          </Button>
        </Flex>
      </Box>

      {/* Modal for Starting Point */}
      <Modal
        visible={isModal2Visible}
        onOk={() => handleModalClose("start")}
        onCancel={() => handleModalClose("start")}
      >
        <GoogleMap
          center={{ lat: 28.6139, lng: 77.209 }} // Default location (New Delhi, India)
          zoom={12}
          mapContainerStyle={{ height: "400px", width: "400px" }}
          onClick={(event) =>
            handleMapClick(event, setClickedPosition, setAddress)
          }
        >
          {clickedPosition && <Marker position={clickedPosition} />}
        </GoogleMap>

        {clickedPosition && (
          <div style={{ marginTop: "20px" }}>
            <p>
              Clicked Latitude1: {clickedPosition.lat}, Longitude1:{" "}
              {clickedPosition.lng}
            </p>
            <p>Address: {address}</p>
          </div>
        )}
      </Modal>

      {/* Modal for Destination Point */}
      <Modal
        visible={isModalVisible}
        onOk={() => handleModalClose("destination")}
        onCancel={() => handleModalClose("destination")}
      >
        <GoogleMap
          center={{ lat: 28.6139, lng: 77.209 }} // Default location (New Delhi, India)
          zoom={12}
          mapContainerStyle={{ height: "400px", width: "400px" }}
          onClick={(event) =>
            handleMapClick(event, setClickedPosition2, setAddress2)
          }
        >
          {clickedPosition2 && <Marker position={clickedPosition2} />}
        </GoogleMap>

        {clickedPosition2 && (
          <div style={{ marginTop: "20px" }}>
            <p>
              Clicked Latitude2: {clickedPosition2.lat}, Longitude2:{" "}
              {clickedPosition2.lng}
            </p>
            <p>Address: {address2}</p>
          </div>
        )}
      </Modal>

      {/* LoadScript at the top level */}
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        {/* Other components or logic can go here */}
      </LoadScript>
    </div>
  );
};

export default Airportport;
