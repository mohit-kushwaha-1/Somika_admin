import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const googleMapsApiKey = 'AIzaSyBPnipzrKgRKIcHt1Bh_4xy1fZi7FUdUYs';

const Map = () => {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [address, setAddress] = useState('');

  // Function to reverse geocode lat/lng into an address
  const getGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat, lng };
    
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address); // Set the address
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  // Handle the map click event
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickedPosition({ lat, lng });

    // Get the address from lat/lng
    getGeocode(lat, lng);
    console.log("Clicked position:", lat, lng);
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
           center={{ lat: 28.6139, lng: 77.2090 }} // Default location (New York)
          zoom={12}
          mapContainerStyle={{ height: "400px", width: "800px" }}
          onClick={handleMapClick} // Add the onClick handler
        >
          {/* Place a marker where the user clicked */}
          {clickedPosition && <Marker position={clickedPosition} />}
        </GoogleMap>

        {/* Display the clicked position */}
        {clickedPosition && (
          <div style={{ marginTop: "20px" }}>
            <p>
              Clicked Latitude: {clickedPosition.lat}, Longitude: {clickedPosition.lng}
            </p>
            <p>Address: {address}</p> {/* Display the reverse geocoded address */}
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
