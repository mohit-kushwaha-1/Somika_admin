// import React from 'react';

// const DriverPostData = () => {
//   // Define the driver data object
//   const driverData = {
//     driver_id: {
//       type: "DL",
//       number: "123456"
//     },
//     photo: "http://example.com/photo.jpg",
//     name: "David Roy",
//     ratings: {
//       rating: [
//         {
//           user: "60c72b1f4f1a2c001c9e13b8",
//           rating: 4.5
//         }
//       ]
//     },
//     country_code: "+1",
//     number: 1234567890,
//     alternate_num: "0987654321",
//     license: "DL123456",
//     address: "123 Main St, Springfield",
//     vehicle_id: "60c72b1f4f1a2c001c9e13b8"
//   };

//   // Function to send data to the API
//   const sendDriverData = async () => {
//     try {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/driver', {
//         method: 'POST', // Use POST method to send data
//         headers: {
//           'Content-Type': 'application/json' // Set the content type to JSON
//         },
//         body: JSON.stringify(driverData) // Convert the data object to a JSON string
//       });

//       // Check if the response is successful
//       if (response.ok) {
//         const responseData = await response.json(); // Parse the JSON response
//         console.log('Data successfully sent:', responseData);
//         // You can also update the UI or state here to reflect the successful submission
//       } else {
//         // Handle HTTP errors
//         const errorText = await response.text();
//         console.error('Error sending data:', response.status, response.statusText, errorText);
//       }
//     } catch (error) {
//       // Handle network or other errors
//       console.error('An error occurred while sending data:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Send Driver Data</h2>
//       {/* Button to trigger the data submission */}
//       <button onClick={sendDriverData}>Submit Driver Data</button>
//     </div>
//   );
// };

// export default DriverPostData;



// import React from 'react';
// import { Form, Input, Button } from 'antd';
// import '../Styles/DriverPostData.css';

// const DriverPostData = () => {
//   const sendDriverData = async (driverData) => {
//     console.log("Sending the following data to the API:", driverData);

//     try {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/driver', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(driverData)
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Data successfully sent:', responseData);
//       } else {
//         const errorText = await response.text();
//         console.error('Error sending data:', response.status, response.statusText, errorText);
//       }
//     } catch (error) {
//       console.error('An error occurred while sending data:', error);
//     }
//   };

//   const onFinish = (values) => {
//     const driverData = {
//       driver_id: {
//         type: values.driver_id_type,
//         number: values.driver_id_number,
//       },
//       photo: values.photo,
//       name: values.name,
//       ratings: {
//         rating: [
//           {
//             user: values.user_id,
//             rating: values.rating,
//           }
//         ],
//       },
//       country_code: values.country_code,
//       number: values.number,
//       alternate_num: values.alternate_num,
//       license: values.license,
//       address: values.address,
//       vehicle_id: values.vehicle_id,
//     };

//     sendDriverData(driverData);
//   };

//   return (
//     <div className="formContainer">
//       <h2>Send Driver Data</h2>
//       <Form onFinish={onFinish} layout="vertical">
//         <div className="formFlexContainer">
//           <div className="formColumn">
//             <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
//               <Input placeholder="David Roy" />
//             </Form.Item>

//             <Form.Item label="Driver ID Type" name="driver_id_type" rules={[{ required: true, message: 'Please input the driver ID type!' }]}>
//               <Input placeholder="DL" />
//             </Form.Item>

//             <Form.Item label="Driver ID Number" name="driver_id_number" rules={[{ required: true, message: 'Please input the driver ID number!' }]}>
//               <Input placeholder="123456" />
//             </Form.Item>

//             <Form.Item label="Photo URL" name="photo" rules={[{ required: true, message: 'Please input the photo URL!' }]}>
//               <Input placeholder="http://example.com/photo.jpg" />
//             </Form.Item>

//             <Form.Item label="User ID for Rating" name="user_id" rules={[{ required: true, message: 'Please input the user ID for rating!' }]}>
//               <Input placeholder="60c72b1f4f1a2c001c9e13b8" />
//             </Form.Item>

//             <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please input the rating!' }]}>
//               <Input type="number" placeholder="4.5" />
//             </Form.Item>
//           </div>

//           <div className="formColumn">
//             <Form.Item label="Country Code" name="country_code" rules={[{ required: true, message: 'Please input the country code!' }]}>
//               <Input placeholder="+1" />
//             </Form.Item>

//             <Form.Item label="Phone Number" name="number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
//               <Input type="number" placeholder="1234567890" />
//             </Form.Item>

//             <Form.Item label="Alternate Phone Number" name="alternate_num">
//               <Input placeholder="0987654321" />
//             </Form.Item>

//             <Form.Item label="License" name="license" rules={[{ required: true, message: 'Please input the license number!' }]}>
//               <Input placeholder="DL123456" />
//             </Form.Item>

//             <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input the address!' }]}>
//               <Input placeholder="123 Main St, Springfield" />
//             </Form.Item>

//             <Form.Item label="Vehicle ID" name="vehicle_id" rules={[{ required: true, message: 'Please input the vehicle ID!' }]}>
//               <Input placeholder="60c72b1f4f1a2c001c9e13b8" />
//             </Form.Item>
//           </div>
//         </div>

//         <Form.Item>
//           <Button className="btn-driver" type="primary" htmlType="submit">
//             Submit Driver Data
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default DriverPostData;
