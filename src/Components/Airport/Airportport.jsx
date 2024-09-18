import React, { useEffect, useState } from "react";
import { Modal, message, Button } from "antd";
import { Box, Input, Text, Flex, FormLabel, Select } from "@chakra-ui/react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";

// const { Option } = Select;

const googleMapsApiKey = "AIzaSyBPnipzrKgRKIcHt1Bh_4xy1fZi7FUdUYs";

const Airportport = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedPosition2, setClickedPosition2] = useState(null);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [startTime1, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();
  const [vehicleId1, setVehicleId] = useState();

  console.log("position one is", clickedPosition);

  const [format1, setformat1] = useState();
  const [foramt2, setForamt2] = useState();
  const [availabeCabs, setAvailableCabs] = useState();
  console.log("formate 1 is", format1);
  console.log("start time i is ", startTime1);

  // "boardingCoordinates": [77.0773551,28.362964],
  //  "destinationCoordinates": [77.100281,28.556160],

  const changeVehicle = (e) => {
    console.log("value is ", e.target.value);
    setVehicleId(e.target.value);
  };

  console.log("vehicle id is", vehicleId1);
  const handleDateChange = (e) => {
    setStartTime(e.target.value);

    const date = new Date(e.target.value);
    const isoDate = date.toISOString();
    setformat1(isoDate);
  };

  const findCabs = async () => {
    try {
      const a = Object.values(clickedPosition);
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
    } catch (error) {}
  };

  const postAirdrop = async () => {
    try {
      const a = Object.values(clickedPosition);
      const boardingCoordinates = a.reverse();
      const b = Object.values(clickedPosition2);
      const destinationCoordinates = b.reverse();
      const startTime = format1;
      const endTime = foramt2;
      const vehicleId = vehicleId1;

      const employeeId = "66c86250b01896ae48684d11";

      const response = await axios.post(
        "http://102.133.144.226:8000/api/v1/trip/airdrop",
        {
          employeeId,
          boardingCoordinates,
          destinationCoordinates,
          startTime,
          endTime,
          vehicleId,
        }
      );

      console.log("boardingCoordinates", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   findCabs();
  // }, []);

  const handleDateChange1 = (e) => {
    setEndTime(e.target.value);
    const date = new Date(e.target.value);
    const isoDate = date.toISOString();
    setForamt2(isoDate);
  };

  const handleModalOpen = (type) => {
    if (type === "start") setIsModal2Visible(true);
    else if (type === "destination") setIsModalVisible(true);
  };

  const handleModalClose = (type) => {
    if (type === "start") setIsModal2Visible(false);
    else if (type === "destination") setIsModalVisible(false);
  };

  const empId = localStorage.getItem("empId");
  console.log("dfgdfgf", empId);

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
          value={startTime1}
          onChange={handleDateChange}
        />

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
            Map View
          </Button>
        </Flex>

        <Button type="primary" onClick={findCabs} style={{marginBottom:"15px"}}>
          Get Cabs
        </Button>

        <Select
          placeholder="Change Vehicle"
          border="1px solid black"
          mb="20px"
          h="40px"
          onChange={changeVehicle}
          value={vehicleId1}
        >
          {Array.isArray(availabeCabs) &&
            availabeCabs.map((option) => (
              <option key={option?.cab?._id} value={option?.cab?._id}>
                {option?.cab?.vehicle_number}
              </option>
            ))}
        </Select>

        <FormLabel>Enter End Time</FormLabel>
        <Input
          type="datetime-local"
          placeholder="Enter End Time"
          mb="20px"
          border="1px solid black"
          h="40px"
          value={EndTime}
          onChange={handleDateChange1}
        />
        {/* <Input placeholder="Enter Date" mb="20px" border="1px solid black" h="40px" /> */}

        <Button onClick={postAirdrop} type="primary">
          submit
        </Button>
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
