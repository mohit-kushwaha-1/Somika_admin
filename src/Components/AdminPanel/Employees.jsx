// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message } from 'antd';

// const Employees = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser'); // Adjust the URL as needed
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

//   const handleAdd = () => {
//     setEditingEmployee(null);
//     form.resetFields();
//     setIsModalOpen(true);
//   };

//   const handleEdit = (record) => {
//     setEditingEmployee(record);
//     form.setFieldsValue({
//       employee_id: record.employee_id,
//       mobile: record.mobile,
//       email: record.email,
//       name: record.name
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
//       employee_id: values.employee_id,
//       mobile: values.mobile,
//       email: values.email,
//       name: values.name,
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
//       employee_id: values.employee_id,
//       mobile: values.mobile,
//       email: values.email,
//       name: values.name,
//     };

//     try {
//       const response = await fetch(`http://102.133.144.226:8000/api/v1/users/getAllUser/${editingEmployee.key}`, {
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
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
//           <Button type="link" onClick={() => handleDelete(record.key)}>Delete</Button>
//         </>
//       ),
//     },
//   ];

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
//             name="employee_id"
//             label="Employee ID"
//             rules={[{ required: true, message: 'Please input the employee ID!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="mobile"
//             label="Mobile"
//             rules={[{ required: true, message: 'Please input the mobile number!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
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
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editingEmployee ? 'Update' : 'Submit'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Employees;








import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const Employees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();
  
  // State variables for dropdowns
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchDropdownData();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser');
      const result = await response.json();
      console.log('API Response:', result);

      if (result.success) {
        const employees = result.data.map(item => ({
          key: item._id,
          ...item
        }));
        setData(employees);
        message.success(result.message);
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

  const fetchDropdownData = async (id) => {
    try {
      // Fetch locations
      const locationsResponse = await fetch(`http://102.133.144.226:8000/api/v1/companies/getAllLocation`);
      const locationsResult = await locationsResponse.json();
      if (locationsResult.success) setLocations(locationsResult.data);

      // Fetch companies
      const companiesResponse = await fetch('http://102.133.144.226:8000/api/v1/companies'); 
      const companiesResult = await companiesResponse.json();
      if (companiesResult.success) setCompanies(companiesResult.data);

      // Fetch departments
      const departmentsResponse = await fetch('http://102.133.144.226:8000/api/v1/department'); 
      const departmentsResult = await departmentsResponse.json();
      if (departmentsResult.success) setDepartments(departmentsResult.data);

      // Fetch country codes
      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode'); 
      const countryCodesResult = await countryCodesResponse.json();
      if (countryCodesResult.success) setCountryCodes(countryCodesResult.data);
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
      employee_id: record.employee_id,
      mobile: record.mobile,
      email: record.email,
      name: record.name,
      base_office_location_name: record.base_office_location_name,
      company: record.company,
      department: record.department,
      country_code: record.country_code,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/users/getAllUser/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        fetchEmployees();
        message.success('Employee deleted successfully!');
      } else {
        message.error('Failed to delete employee.');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      message.error('Error deleting employee.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      ...values,
      password: '123456789', 
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/createUserByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      if (result.success) {
        fetchEmployees();
        setIsModalOpen(false);
        message.success('Employee added successfully!');
      } else {
        message.error('Failed to add employee.');
      }
    } catch (error) {
      message.error('Error adding employee.');
      console.error('Error adding employee:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      ...values,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/users/createUserByAdmin/${editingEmployee.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      const result = await response.json();
      if (result.success) {
        fetchEmployees();
        setIsModalOpen(false);
        message.success('Employee updated successfully!');
      } else {
        message.error('Failed to update employee.');
      }
    } catch (error) {
      message.error('Error updating employee.');
      console.error('Error updating employee:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingEmployee) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record.key)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
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
        >
          <Form.Item
            name="employee_id"
            label="Employee ID"
            rules={[{ required: true, message: 'Please input the employee ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="base_office_location_name"
            label="Base Office Location"
            rules={[{ required: true, message: 'Please select the base office location!' }]}
          >
            {/* <Select>
              {locations.map(location => (
                <Option key={location._id} value={location._id}>{location.name}</Option>
              ))}
            </Select> */}
            <Input/>
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select the company!' }]}
          >
            {/* <Select>
              {companies.map(company => (
                <Option key={company._id} value={company._id}>{company.name}</Option>
              ))}
            </Select> */}
            <Input/>
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select the department!' }]}
          >
            {/* <Select>
              {departments.map(department => (
                <Option key={department._id} value={department._id}>{department.name}</Option>
              ))}
            </Select> */}
            <Input/>
          </Form.Item>
          <Form.Item
            name="country_code"
            label="Country Code"
            rules={[{ required: true, message: 'Please select the country code!' }]}
          >
            {/* <Select>
              {countryCodes.map(code => (
                <Option key={code._id} value={code._id}>{code.code}</Option>
              ))}
            </Select> */}
            <Input/>
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
