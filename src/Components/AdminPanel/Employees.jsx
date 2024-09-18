// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

// const { Option } = Select;

// const Employees = () =>
// {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [form] = Form.useForm();

//   // State variables for dropdowns
//   const [locations, setLocations] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [countryCodes, setCountryCodes] = useState([]);

//   useEffect(() =>
//   {
//     fetchEmployees();
//     fetchDropdownData();
//   }, []);

//   const fetchEmployees = async () =>
//   {
//     setLoading(true);
//     try
//     {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser');
//       const result = await response.json();
//       console.log('API Response:', result);

//       if (result.success)
//       {
//         const employees = result.data.map(item => ({
//           key: item._id,
//           ...item
//         }));
//         setData(employees);
//         message.success(result.message);
//       } else
//       {
//         message.error('Failed to fetch employee data.');
//       }
//     } catch (error)
//     {
//       console.error('Error fetching employees:', error);
//       message.error('Error fetching employee data.');
//     } finally
//     {
//       setLoading(false);
//     }
//   };

//   const fetchDropdownData = async (id) =>
//   {
//     try
//     {
//       // Fetch locations
//       const locationsResponse = await fetch(`http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations`);
//       const locationsResult = await locationsResponse.json();
//       setLocations(locationsResult.getAllBaseLocations);

//       // Fetch companies
//       const companiesResponse = await fetch('http://102.133.144.226:8000/api/v1/companies');
//       const companiesResult = await companiesResponse.json();

//       setCompanies(companiesResult);

//       // Fetch departments
//       const departmentsResponse = await fetch('http://102.133.144.226:8000/api/v1/department');
//       const departmentsResult = await departmentsResponse.json();
//       setDepartments(departmentsResult);

//       // Fetch country codes
//       const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
//       const countryCodesResult = await countryCodesResponse.json();
//       setCountryCodes(countryCodesResult);
//     } catch (error)
//     {
//       console.error('Error fetching dropdown data:', error);
//       message.error('Error fetching dropdown data.');
//     }
//   };

//   const handleAdd = () =>
//   {
//     setEditingEmployee(null);
//     form.resetFields();
//     setIsModalOpen(true);
//   };

//   const handleEdit = (record) =>
//   {
//     setEditingEmployee(record);
//     form.setFieldsValue({
//       employee_id: record.employee_id,
//       mobile: record.mobile,
//       email: record.email,
//       name: record.name,
//       base_office_location_name: record.base_office_location_name,
//       company: record.company?._id,
//       department: record.department?._id,
//       country_code: record.country_code?._id,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) =>
//   {
//     try
//     {
//       const response = await fetch(`http://102.133.144.226:8000/api/v1/users/getAllUser/${ id }`, {
//         method: 'DELETE',
//       });

//       const result = await response.json();
//       if (result.success)
//       {
//         fetchEmployees();
//         message.success('Employee deleted successfully!');
//       } else
//       {
//         message.error('Failed to delete employee.');
//       }
//     } catch (error)
//     {
//       console.error('Error deleting employee:', error);
//       message.error('Error deleting employee.');
//     }
//   };

//   const handlePost = async (values) =>
//   {
//     const postData = {
//       ...values,
//       password: '123456789',
//     };

//     try
//     {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/users/createUserByAdmin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//       });

//       const result = await response.json();
//       if (result.success)
//       {
//         fetchEmployees();
//         setIsModalOpen(false);
//         message.success('Employee added successfully!');
//       } else
//       {
//         message.error('Failed to add employee.');
//       }
//     } catch (error)
//     {
//       message.error('Error adding employee.');
//       console.error('Error adding employee:', error);
//     }
//   };

//   const handlePut = async (values) =>
//   {
//     const putData = {
//       ...values,
//     };

//     try
//     {
//       const response = await fetch(`http://102.133.144.226:8000/api/v1/users/createUserByAdmin/${ editingEmployee.key }`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(putData),
//       });

//       const result = await response.json();
//       if (result.success)
//       {
//         fetchEmployees();
//         setIsModalOpen(false);
//         message.success('Employee updated successfully!');
//       } else
//       {
//         message.error('Failed to update employee.');
//       }
//     } catch (error)
//     {
//       message.error('Error updating employee.');
//       console.error('Error updating employee:', error);
//     }
//   };

//   const handleSubmit = async (values) =>
//   {
//     if (editingEmployee)
//     {
//       await handlePut(values);
//     } else
//     {
//       await handlePost(values);
//     }
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Employee ID',
//       dataIndex: 'employee_id',
//       key: 'employee_id',
//     },
//     {
//       title: 'Mobile',
//       dataIndex: 'mobile',
//       key: 'mobile',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button type="link" onClick={() => handleEdit(record)}>View</Button>
//           {/* <Button type="link" onClick={() => handleDelete(record.key)}>Delete</Button> */}
//         </>
//       ),
//     },
//   ];
//   const extractBaseDetails = (data) =>
//   {
//     return data.map(base =>
//     {
//       const { _id, name } = base.Base.BaseDetails;
//       return { _id, name };
//     });

//   };

//   const baseDetails = extractBaseDetails(locations);
//   console.log(baseDetails);
//   return (
//     <div>
//       <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
//         Add Employee
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={data}
//         loading={loading}
//         rowKey="key"
//       />

//       <Modal
//         title={editingEmployee ? 'View Employee' : 'Add Employee'}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//         >
//           <Form.Item
//             name="employee_id"
//             label="Employee ID"
//             rules={[{ required: true, message: 'Please input the employee ID!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: 'Please input the name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <div className='mobile_code'>
//             <Form.Item
//               name="country_code"
//               label="Country Code"
//               rules={[{ required: true, message: 'Please select the country code!' }]}
//             >
//               <Select>
//                 {countryCodes.map(code => (
//                   <Option key={code._id} value={code._id}>{code.code}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item
//               name="mobile"
//               label="Mobile"
//               rules={[{ required: true, message: 'Please input the mobile number!' }]}
//             >
//               <Input />
//             </Form.Item>
//           </div>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="base_office_location_name"
//             label="Base Office Location"
//             rules={[{ required: true, message: 'Please select the base office location!' }]}
//           >
//             <Select>
//               {baseDetails.map(location => (
//                 <Option key={location._id} value={location._id}>{location.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="company"
//             label="Company"
//             rules={[{ required: true, message: 'Please select the company!' }]}
//           >
//             <Select>
//               {companies.map(company => (
//                 <Option key={company._id} value={company._id}>{company.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="department"
//             label="Department"
//             rules={[{ required: true, message: 'Please select the department!' }]}
//           >
//             <Select>
//               {departments.map(department => (
//                 <Option key={department._id} value={department._id}>{department.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {!editingEmployee && <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Employee
//             </Button>
//           </Form.Item>}
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Employees;





// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

// const { Option } = Select;

// const Employees = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [form] = Form.useForm();


//   const [locations, setLocations] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [countryCodes, setCountryCodes] = useState([]);

//   useEffect(() => {
//     fetchEmployees();
//     fetchDropdownData();
//   }, []);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser');
//       const result = await response.json();
//       console.log('API Response:', result);

//       if (result.success) {
//         const employees = result.data.map(item => ({
//           key: item._id,
//           ...item
//         }));
//         setData(employees);
//         message.success(result.message);
//       } else {
//         message.error('Failed to fetch employee data.');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       message.error('Error fetching employee data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {

//       const locationsResponse = await fetch(`http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations`);
//       const locationsResult = await locationsResponse.json();
//       setLocations(locationsResult.getAllBaseLocations);


//       const companiesResponse = await fetch('http://102.133.144.226:8000/api/v1/companies');
//       const companiesResult = await companiesResponse.json();
//       setCompanies(companiesResult);


//       const departmentsResponse = await fetch('http://102.133.144.226:8000/api/v1/department');
//       const departmentsResult = await departmentsResponse.json();
//       setDepartments(departmentsResult);

//       const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
//       const countryCodesResult = await countryCodesResponse.json();
//       setCountryCodes(countryCodesResult);
//     } catch (error) {
//       console.error('Error fetching dropdown data:', error);
//       message.error('Error fetching dropdown data.');
//     }
//   };

//   const handleAdd = () => {
//     setEditingEmployee(null);
//     form.resetFields();
//     setIsModalOpen(true);
//   };

//   const handleEdit = (record) => {
//     setEditingEmployee(record);
//     form.setFieldsValue({
//       name: record.name,
//       company: record.company?._id,
//       department: record.department?._id,
//       base_office_location_name: record.base_office_location_name,
//       employee_id: record.employee_id,
//       country_code: record.country_code?._id,
//       mobile: record.mobile,
//       email: record.email,
//       status: record.status,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://102.133.144.226:8000/api/v1/users/getAllUser/${id}`, {
//         method: 'DELETE',
//       });

//       const result = await response.json();
//       if (result.success) {
//         fetchEmployees();
//         message.success('Employee deleted successfully!');
//       } else {
//         message.error('Failed to delete employee.');
//       }
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//       message.error('Error deleting employee.');
//     }
//   };

//   const handlePost = async (values) => {
//     const postData = {
//       ...values,
//       password: '123456789',
//     };

//     try {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/users/createUserByAdmin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//       });

//       const result = await response.json();
//       if (result.success) {
//         fetchEmployees();
//         setIsModalOpen(false);
//         message.success('Employee added successfully!');
//       } else {
//         message.error('Failed to add employee.');
//       }
//     } catch (error) {
//       message.error('Error adding employee.');
//       console.error('Error adding employee:', error);
//     }
//   };

//   const handlePut = async (values) => {
//     const putData = {
//       ...values,
//     };

//     try {
//       const response = await fetch(`http://102.133.144.226:8000/api/v1/users/createUserByAdmin/${editingEmployee.key}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(putData),
//       });

//       const result = await response.json();
//       if (result.success) {
//         fetchEmployees();
//         setIsModalOpen(false);
//         message.success('Employee updated successfully!');
//       } else {
//         message.error('Failed to update employee.');
//       }
//     } catch (error) {
//       message.error('Error updating employee.');
//       console.error('Error updating employee:', error);
//     }
//   };

//   const handleSubmit = async (values) => {
//     if (editingEmployee) {
//       await handlePut(values);
//     } else {
//       await handlePost(values);
//     }
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Employee ID',
//       dataIndex: 'employee_id',
//       key: 'employee_id',
//     },
//     {
//       title: 'Mobile',
//       dataIndex: 'mobile',
//       key: 'mobile',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Status',
//       render: status => {

//         console.log('Status:', status);
//         return status ? 'Active' : 'Inactive';
//       }
//     },

//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button  onClick={() => handleEdit(record)}>Edit</Button>
//           <Button  onClick={() => handleDelete(record.key)}>Delete</Button>
//         </>
//       ),
//     },
//   ];

//   const extractBaseDetails = (data) => {
//     return data.map(base => {
//       const { _id, name } = base.Base.BaseDetails;
//       return { _id, name };
//     });
//   };

//   const baseDetails = extractBaseDetails(locations);
//   console.log(baseDetails);

//   return (
//     <div>
//       <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
//         Add Employee
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={data}
//         loading={loading}
//         rowKey="key"
//       />

//       <Modal
//         title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//         >
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: 'Please input the name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="company"
//             label="Company"
//             rules={[{ required: true, message: 'Please select the company!' }]}
//           >
//             <Select>
//               {companies.map(company => (
//                 <Option key={company._id} value={company._id}>{company.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="department"
//             label="Department"
//             rules={[{ required: true, message: 'Please select the department!' }]}
//           >
//             <Select>
//               {departments.map(department => (
//                 <Option key={department._id} value={department._id}>{department.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="base_office_location_name"
//             label="Location"
//             rules={[{ required: true, message: 'Please select the location!' }]}
//           >
//             <Select>
//               {baseDetails.map(location => (
//                 <Option key={location._id} value={location._id}>{location.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="employee_id"
//             label="Employee ID"
//             rules={[{ required: true, message: 'Please input the employee ID!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <div className='mobile_code'>

//             <Form.Item
//               name="country_code"
//               label="Country Code"
//               rules={[{ required: true, message: 'Please select the country code!' }]}
//             >
//               <Select>
//                 {countryCodes.map(code => (
//                   <Option key={code._id} value={code._id}>{code.code}</Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item
//               name="mobile"
//               label="Mobile Number"
//               rules={[{ required: true, message: 'Please input the mobile number!' }]}
//             >
//               <Input />
//             </Form.Item>
//           </div>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="status"
//             label="Employee Status"
//             rules={[{ required: true, message: 'Please select the status!' }]}
//           >
//             <Select>
//               <Option value="Active">Active</Option>
//               <Option value="Inactive">Inactive</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editingEmployee ? 'Update' : 'Add'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Employees;

import Notify from '../../Notify';
import A from '../../A';

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message,Upload, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const Employees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState("");

  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);

    const[image1,setImage] = useState();

  const uploadImage = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("image", file.file);
    console.log(file.file.name);

    try {
      const response = await axios.post(
        "http://102.133.144.226:8000/api/v1/users/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Image uploaded successfully!");
      setImage(response.data.filePath);
      console.log("image is ",image1);
      // console.log("image is ",response.data.filePath
      // );
      return response.data.url; // Assuming the API returns the image URL in the 'url' field
    } catch (error) {
      message.error("Error uploading image. Please try again later.");
      console.error("Image upload error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDropdownData();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser');
      const result = await response.json();
      console.log("result is",result);
      if (result.success) {
        const employees = result.data.map(item => ({
          key: item._id,
          ...item
        }));

        const reversedEmployees = employees.reverse();
        setData(reversedEmployees);
        // console.log(employees);
      } else {
        message.error('Failed to fetch employee data.');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      message.error('Error fetching employee data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const locationsResponse = await fetch(`http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations`);
      const locationsResult = await locationsResponse.json();
      setLocations(locationsResult.getAllBaseLocations);

      const companiesResponse = await fetch('http://102.133.144.226:8000/api/v1/companies');
      const companiesResult = await companiesResponse.json();
      // console.log("companies",companiesResult)
      setCompanies(companiesResult);

      const departmentsResponse = await fetch('http://102.133.144.226:8000/api/v1/department');
      const departmentsResult = await departmentsResponse.json();
      setDepartments(departmentsResult);

      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);
      console.log("country",countryCodesResult);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      message.error('Error fetching dropdown data.');
    }
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingEmployee(record);
    form.setFieldsValue({
      name: record.name,
      photo: image1,
      company: record.company?._id,
      department: record.department?._id,
      base_office_location_name: record.base_office_location_name,
      employee_id: record.employee_id,
      country_code: record.country_code?._id,
      mobile: record.mobile,
      email: record.email,
    });
    setIsModalOpen(true);
  };

  const handleStatusToggle = async (record) => {
    const updatedStatus = record.status === 'Active' ? 'Inactive' : 'Active';
    const updatedData = { status: updatedStatus }; // Only send the status in the request body
  
    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/users/${record._id}/status`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
      console.log("result sdf df",result);
      if (result.message) {
        fetchEmployees(); // Reload employee data
        message.success(`Employee status updated `);
      } else {
        message.error('Failed to update employee status.');
      }
    } catch (error) {
      message.error('Error updating employee status.');
      console.error('Error updating employee status:', error);
    }
  };
  

  const handleSubmit = async (values) => {
      const a = values;
      values['photo'] = image1;
      console.log("a is followinf ",a);
    if (editingEmployee) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const handlePost = async (values) => {
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/createUserByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.success) {
        fetchEmployees();
        setPhoto("");
        message.success('Employee added successfully!');
        setIsModalOpen(false);
      } else {
        message.error('Failed to add employee.');
      }
    } catch (error) {
      message.error('Error adding employee.');
      console.error('Error adding employee:', error);
    }
  };

  const handlePut = async (values) => {
    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/users/updateUser/${editingEmployee.key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      // console.log("result is ",result.message);
      if (result.message === "User updated successfully") {
        fetchEmployees();
        setPhoto("");
        message.success('Employee updated successfully!');
        setIsModalOpen(false);
      } else {
        message.error('Failed to update employee.');
      }
    } catch (error) {
      message.error('Error updating employee.');
      console.error('Error updating employee:', error);
    }
  };


  useEffect(() => {
    if (editingEmployee) {
      // Populate form fields when record data is available (for updating)
      form.setFieldsValue({
        name: editingEmployee.name,
        company: editingEmployee.company?._id,                // Assuming company is an object and you're using its _id
        department: editingEmployee.department?._id,          // Assuming department is an object and you're using its _id
        base_office_location_name: editingEmployee.base_office_location_name?._id, // Assuming base_office_location_name is an object and you're using its _id
        employee_id: editingEmployee.employee_id,
        country_code: editingEmployee.country_code?._id,      // Assuming country_code is an object and you're using its _id
        mobile: editingEmployee.mobile,
        email: editingEmployee.email,
      });
    } else if(!editingEmployee) {
      // Clear form fields when adding a new record
      form.resetFields();
    }
  }, [editingEmployee, form]);
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: "Photo",
      key: "photo",
      render: (_, record) => (
        <img
          src={
            record?.photo
              ? `http://102.133.144.226:8000/${record.photo}`
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAMFBMVEXk5ueutLfp6+y2vL6rsbWor7KyuLu6v8LT1tjY29zb3t/Gysze4eLDx8rP09TJzc8ZZtZUAAAD90lEQVR4nO2c246jMAxAickVCPn/v90And22gtaJwWa0OS8jjebhyIlNLs50XaPRaDQajUaj0Wg0Go1G10E3DWGex5hJPgwdgLTSHtD56Kw2Ri/kH9aNvrudKgSnlFYvaK1snO6lGnrzZvkja1yQlvtLjqbe19zi6u4S1fhBc1VVSVqxW8JpP2sumF48qDC/p9B+UK30TE0Iy011Fo1pNFhRZQRNYcR7LjEVE02Y6fkUUy+jCXOZZzadZExLPZXuRTz7YlGlo4DnWO65TFP21J8qNBe4RcHVBHQZfGbToaSCPmMHVk9wlZ5Kj6yiodYzw1pMY90MXTCJcZZOlhBRzsT3tam0hpQvnWpr0wO+CgWUgOYKxeXZBaIo17YECteh77DtSuqr/UOUbffcE0W5FnsDqYpmuNbPgSpqmb6inujJ9bmHmeqpeb5N5bvPd5g+oieI8lT8/0iUaY7Ss14zlSfKPmSDS5Rc8Hk8iRuRPPKOSRR+y6Lk1yzzyPWJ7UB3Im5F2LahQItoz7cLrTob/YHzImegiBo2za7qWPxvQPlGPkPIe6al04P6jxPbZ2kDqs8d+Tb1D9PaUsp91QSpzlTg/qYq8bXlv2KuWz4L3IaW3YE/ELkJB0QzySvayfQWlBZTiQm6UTZNNdfZ2J5p0TTlvVx8AfAxzfEUbdPBtGetnv0g3aJlMcNveJci+6SvvWTact5/HgLhS1CNEx/2H+ZPbZlWqN1pD4DU704ArRz/cukjS4ezfevK1caO4X5dzpkhOW3WWaC1US4JVvgvAEA3BO99mG7a2/4AXpHW2WGxmsKcYnSuzzjn4jjnwN5GdxX0KS4vBcxrMq2/yVN1nMMwyeYUwOCj65X5VPCXVw7WxSSX/xCiXZ8vYMh/ZR3/RiSPt4/q4DHDMcYsJYsvsAA+Hj25+BbYPAsS08IUumSR473vqhTLS5cwfkwdZFydv9YVJod6yPBdVfcXLlagO0lzVVX2IlWYxroEOsS4cIEqzITj8AO0iqcXq4l4W3ekevb4f9pr0DDuzPOTgkc2xZwXVBiKj+0KVU/aTJPab1GcMvy060QkuidnP7jL47lCPkIj9LEXmpJOU4hd1yWQjiUZPRfqM4ojj56oPTqnt7YVUntpQmxirzGtekpQ+wSMZFqzT2UrTM9UTFPuCbpRMU0lNFX5C+f6DgcqZZ2QBRddZ1OY+byfpBeKGuJIDVhE9IgPKfM3/o2CTjNiNyNVFL0zoT6sooLvP6A2W1PBHqDI1aYN7KthQP9Lj6tEsZtS0ZxfwZXSidi9Tgf57zcGaU9sR+T1JyNfwTV2VPYxngmukoqt8P5hUKKj7aXBLUrhBqBEG41b8QcZDDNkChgRlgAAAABJRU5ErkJggg==" // Dummy image URL
          }
          alt="Photo"
          style={{ width: 90, height: 90 }}
        />
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          onChange={() => handleStatusToggle(record)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Update</Button>
        </>
      ),
    },
  ];

  const extractBaseDetails = (data) => {
    return data.map(base => {
      const { _id, name } = base.Base.BaseDetails;
      return { _id, name };
    });
  };

  const baseDetails = extractBaseDetails(locations);

  return (
    <div>
       {/* <A/> */}
      {/* <Notify/> */}
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Employee
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          // initialValues={editingEmployee ? {
          //   name: editingEmployee.name,
          //   company: editingEmployee.company,
          //   department: editingEmployee.department,
          //   base_office_location_name: editingEmployee.base_office_location_name?._id,
          //   employee_id: editingEmployee.employee_id,
          //   country_code: editingEmployee.country_code,
          //   mobile: editingEmployee.mobile,
          //   email: editingEmployee.email,
          // } : {}}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
            
          >
            <Input  placeholder="Enter Name"/>
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select the company!' }]}
            placeholder="Enter Name"
          >
            <Select placeholder="Enter Company Name">
              {companies.map(company => (
                <Option key={company._id} value={company._id}>{company.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select the department!' }]}
          >
            <Select placeholder="Enter Department ">
              {departments.map(department => (
                <Option key={department._id} value={department._id}>{department.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="base_office_location_name"
            label="Location"
            rules={[{ required: true, message: 'Please select the location!' }]}
          >
            <Select placeholder="Enter Location">
              {baseDetails.map(location => (
                <Option key={location._id} value={location._id}>{location.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="employee_id"
            label="Employee ID"
            rules={[{ required: true, message: 'Please input the employee ID!' }]}
          >
            <Input  placeholder="Enter Employee ID"/>
          </Form.Item>
          <div className='mobile_code'>

          <Form.Item
            name="country_code"
            label="Country Code"
            rules={[{ required: true, message: 'Please select the country code!' }]}
          >
            <Select placeholder="Enter Country Code">
              {countryCodes.map(code => (
                <Option key={code._id} value={code._id}>{code.code}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}
          >
            <Input  placeholder="Enter Mobile Number"/>
          </Form.Item>
          </div>

          <Form.Item
            label="Photo"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            rules={[
              { required: true, message: "Please upload the driver's photo!" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={uploadImage}
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded"
                height="100px"
                width="100px"
              />
            </div>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input placeholder="Enter Email"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;


