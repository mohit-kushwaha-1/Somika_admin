// import React, { useState } from 'react';
// import axios from 'axios';
// import { message } from 'antd'; // You can use Ant Design for notifications, or use any other notification library

// const VehiclePostData = () => {
//   // State to manage form inputs
//   const [formData, setFormData] = useState({
//     vehicle_id: '',
//     vehicle_number: '',
//     capacity: 0,
//     base_location: '',
//     department: '',
//     TrasmissionType: '',
//     brand_make: '',
//     mobile: '',
//     country_code: '',
//     company: null, // Ensure this matches the expected format (ObjectId if required)
//     allowed_locations: {
//       location: []
//     }
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Post data to the API
//       const response = await axios.post('http://102.133.144.226:8000/api/v1/vehicles', formData);
//       message.success('Vehicle added successfully.');
//       console.log('Response:', response.data);
//     } catch (error) {
//       message.error('Error adding vehicle. Please try again later.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Vehicle</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Vehicle ID:
//           <input
//             type="text"
//             name="vehicle_id"
//             value={formData.vehicle_id}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Vehicle Number:
//           <input
//             type="text"
//             name="vehicle_number"
//             value={formData.vehicle_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Capacity:
//           <input
//             type="number"
//             name="capacity"
//             value={formData.capacity}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Base Location:
//           <input
//             type="text"
//             name="base_location"
//             value={formData.base_location}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Department:
//           <input
//             type="text"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Transmission Type:
//           <input
//             type="text"
//             name="TrasmissionType"
//             value={formData.TrasmissionType}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Brand Make:
//           <input
//             type="text"
//             name="brand_make"
//             value={formData.brand_make}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Mobile:
//           <input
//             type="text"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Country Code:
//           <input
//             type="text"
//             name="country_code"
//             value={formData.country_code}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Company:
//           <input
//             type="text"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Add Vehicle</button>
//       </form>
//     </div>
//   );
// };

// export default VehiclePostData;
