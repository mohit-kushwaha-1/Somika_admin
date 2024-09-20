import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Input, Button } from 'antd';
import { LoadScript, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key

function MyMapApp() {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button type="primary" onClick={openModal}>
        Open Map Modal
      </Button>

      {/* Map Modal */}
      <MyMapModal isModal2Visible={isModalVisible} handleModalClose={closeModal} />
    </div>
  );
}

function MyMapModal({ isModal2Visible, handleModalClose }) {
  const [map, setMap] = useState(null); // Holds the Google Map instance
  const [autocomplete, setAutocomplete] = useState(null); // Holds the Autocomplete instance
  const [clickedPosition, setClickedPosition] = useState(null); // Stores the position clicked on the map
  const [address, setAddress] = useState(''); // Stores the address based on clicked position

  // Memoized center coordinates (New Delhi, India)
  const center = useMemo(() => ({ lat: 28.6139, lng: 77.209 }), []);

  // Trigger resize event when modal is visible and map is loaded
  useEffect(() => {
    if (isModal2Visible && map) {
      window.google.maps.event.trigger(map, "resize");
    }
  }, [isModal2Visible, map]);

  // Function to handle the loading of the Autocomplete instance
  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  // Function to handle the place change when a user selects a place from Autocomplete
  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry) {
        // If a place has been selected and has a geometry, update the map center and clicked position
        const location = place.geometry.location;
        const newLocation = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setClickedPosition(newLocation);
        map.panTo(newLocation); // Move the map to the new location
        setAddress(place.formatted_address); // Set the address to display
      }
    }
  };

  // Function to handle map clicks and update clickedPosition state
  const handleMapClick = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setClickedPosition(newPosition);
    fetchAddress(newPosition); // Fetch address from the clicked position using Geocoding API
  };

  // Function to fetch address based on latitude and longitude (using Geocoding API)
  const fetchAddress = (position) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    });
  };

  return (
    <Modal
      visible={isModal2Visible}
      onOk={() => handleModalClose("start")}
      onCancel={() => handleModalClose("start")}
      footer={null}
      style={{ top: 20 }}
    >
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
        <div>
          {/* Autocomplete Input for Places Search */}
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              id="search-box"
              type="text"
              placeholder="Search for a place"
              style={{ marginBottom: "10px" }}
            />
          </Autocomplete>

          {/* Google Map */}
          <div style={{ height: '400px', width: '400px' }}>
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={{ height: "100%", width: "100%" }}
              onLoad={(mapInstance) => setMap(mapInstance)}
              onClick={handleMapClick}
            >
              {/* Show marker when the map is clicked */}
              {clickedPosition && <Marker position={clickedPosition} />}
            </GoogleMap>
          </div>

          {/* Display clicked position and address */}
          {clickedPosition && (
            <div style={{ marginTop: "20px" }}>
              <p>
                Clicked Latitude: {clickedPosition.lat}, Longitude: {clickedPosition.lng}
              </p>
              <p>Address: {address}</p>
            </div>
          )}
        </div>
      </LoadScript>
    </Modal>
  );
}

export default MyMapApp;
