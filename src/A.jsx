import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import { Box, Flex, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { Button, Select, Modal } from "antd";

const { Option } = Select;
const googleMapsApiKey = "AIzaSyBPnipzrKgRKIcHt1Bh_4xy1fZi7FUdUYs";// Replace with your actual Google Maps API key
const libraries = ['places'];

const A = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://102.133.144.226:8000/api/v1/users/getAllUser");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle search in Select dropdown
  const handleSearch1 = (value) => {
    setSearchValue(value);
    if (value) {
      const filtered = userData?.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  // Open and close modals
  const handleModalOpen = (type) => {
    if (type === "start") setIsModal1Visible(true);
    else if (type === "destination") setIsModal2Visible(true);
  };

  const handleModalClose = (type) => {
    if (type === "start") setIsModal1Visible(false);
    else if (type === "destination") setIsModal2Visible(false);
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

  return (
    <>
      <Flex>
        <Box>
          <FormLabel>Username</FormLabel>
          <Select
            showSearch
            value={searchValue}
            placeholder="Type to search users"
            style={{ width: 300, border: "1px solid black" }}
            onSearch={handleSearch1}
            onChange={setSearchValue}
            filterOption={false}
            notFoundContent={loading ? "Loading..." : "No results found"}
          >
            {filteredOptions?.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Box>

        <Box ml={"10px"} mr={"10px"}>
          <FormLabel>Enter Start Time</FormLabel>
          <Input
            type="datetime-local"
            placeholder={"Enter Start Time"}
            mb="20px"
            border="1px solid black"
            h="32px"
          />
        </Box>

        <Box ml={"30px"}>
          <FormLabel>Map View Start</FormLabel>
          <Button style={{ width: 150, border: "1px solid black" }} onClick={() => handleModalOpen("start")}>
            Open Map
          </Button>
        </Box>

        <Box ml={"30px"}>
          <FormLabel>Map View Destination</FormLabel>
          <Button style={{ width: 150, border: "1px solid black" }} onClick={() => handleModalOpen("destination")}>
            Open Map
          </Button>
        </Box>
      </Flex>

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

export default A;
