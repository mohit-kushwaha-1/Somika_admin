// import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Form, Input, InputNumber, Select, Tag, message } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// const Vehicle = () =>
// {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
//   const [editingVehicle, setEditingVehicle] = useState(null);

//   // State variables for dropdowns
//   const [transmissionTypes, setTransmissionTypes] = useState([]);
//   const [brandMakes, setBrandMakes] = useState([]);
//   const [countryCodes, setCountryCodes] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [companies, setCompanies] = useState([]);

//   useEffect(() =>
//   {
//     fetchData();
//     fetchDropdownData();
//   }, []);

//   const fetchData = async () =>
//   {
//     setLoading(true);
//     try
//     {
//       const response = await axios.get('http://102.133.144.226:8000/api/v1/vehicles');
//       setData(response.data);
//     } catch (error)
//     {
//       message.error('Error fetching vehicles. Please try again later.');
//       console.error('Error fetching vehicles:', error);
//     } finally
//     {
//       setLoading(false);
//     }
//   };

//   const fetchDropdownData = async () =>
//   {
//     try
//     {
//       // Fetch transmission types
//       const transmissionResponse = await fetch('http://102.133.144.226:8000/api/v1/transmission');
//       const transmissionResult = await transmissionResponse.json();
//       setTransmissionTypes(transmissionResult);

//       // Fetch brand makes
//       const brandMakesResponse = await fetch('http://102.133.144.226:8000/api/v1/brand');
//       const brandMakesResult = await brandMakesResponse.json();
//       setBrandMakes(brandMakesResult);

//       // Fetch country codes
//       const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
//       const countryCodesResult = await countryCodesResponse.json();
//       setCountryCodes(countryCodesResult);

//       // Fetch departments
//       const departmentsResponse = await fetch('http://102.133.144.226:8000/api/v1/department');
//       const departmentsResult = await departmentsResponse.json();
//       setDepartments(departmentsResult);

//       // Fetch companies
//       const companiesResponse = await fetch('http://102.133.144.226:8000/api/v1/companies');
//       const companiesResult = await companiesResponse.json();
//       setCompanies(companiesResult);

//     } catch (error)
//     {
//       console.error('Error fetching dropdown data:', error);
//       message.error('Error fetching dropdown data.');
//     }
//   };

//   const handleAdd = () =>
//   {
//     form.resetFields();
//     setIsEditing(false);
//     setIsModalVisible(true);
//   };

//   const handleEdit = (record) =>
//   {
//     setEditingVehicle(record);
//     form.setFieldsValue({
//       vehicle_id: record.vehicle_id,
//       vehicle_number: record.vehicle_number,
//       capacity: record.capacity,
//       TrasmissionType: record.TrasmissionType._id,
//       brand_make: record.brand_make._id,
//       mobile: record.mobile,
//       country_code: record.country_code._id,
//       department: record.department._id,
//       baselocation: record.baselocation._id,
//     });
//     setIsEditing(true);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () =>
//   {
//     setIsModalVisible(false);
//   };

//   const handleFinish = async (values) =>
//   {
//     const vehicleData = {
//       vehicle_id: values.vehicle_id,
//       vehicle_number: values.vehicle_number,
//       capacity: values.capacity,
//       TrasmissionType: values.TrasmissionType,
//       brand_make: values.brand_make,
//       mobile: values.mobile,
//       country_code: values.country_code,
//       department: values.department,
//       baselocation: values.baselocation,
//     };

//     try
//     {
//       if (isEditing)
//       {
//         await axios.put(`http://102.133.144.226:8000/api/v1/vehicles/${ editingVehicle._id }`, vehicleData);
//         message.success('Vehicle updated successfully.');
//       } else
//       {
//         await axios.post('http://102.133.144.226:8000/api/v1/vehicles', vehicleData);
//         message.success('Vehicle added successfully.');
//       }
//       fetchData();
//       setIsModalVisible(false);
//     } catch (error)
//     {
//       message.error('Error submitting form. Please try again later.');
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleDelete = async (id) =>
//   {
//     try
//     {
//       await axios.delete(`http://102.133.144.226:8000/api/v1/vehicles/${ id }`);
//       message.success('Vehicle deleted successfully.');
//       fetchData();
//     } catch (error)
//     {
//       message.error('Error deleting vehicle. Please try again later.');
//       console.error('Error deleting vehicle:', error);
//     }
//   };

//   const columns = [
//     {
//       title: 'Chassis ID/Vehicle ID',
//       dataIndex: 'vehicle_id',
//       key: 'vehicle_id',
//     },
//     {
//       title: 'Vehicle Number',
//       dataIndex: 'vehicle_number',
//       key: 'vehicle_number',
//     },
//     {
//       title: 'Capacity',
//       dataIndex: 'capacity',
//       key: 'capacity',
//     },
//     {
//       title: 'Transmission Type',
//       dataIndex: ['TrasmissionType', 'type'],
//       key: 'TrasmissionType.type',
//     },
//     {
//       title: 'Brand Make',
//       dataIndex: ['brand_make', 'name'],
//       key: 'brand_make.name',
//     },
//     {
//       title: 'Country Code',
//       dataIndex: ['country_code', 'code'],
//       key: 'country_code.code',
//     },
//     {
//       title: 'Mobile',
//       dataIndex: 'mobile',
//       key: 'mobile',
//     },
//     // {
//     //   title: 'Department',
//     //   dataIndex: ['department', 'name'],
//     //   key: 'department.name',
//     // },
//     // {
//     //   title: 'Company',
//     //   dataIndex: ['company', 'name'],
//     //   key: 'company.name',
//     // },
//     {
//       title: 'Base Location',
//       dataIndex: ['company', 'name'],
//       key: 'company.name',
//     },
//     {
//       title: 'Allowed Location',
//       dataIndex: ['company', 'name'],
//       key: 'company.name',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button type="link" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Button type="link" onClick={() => handleDelete(record._id)} >
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];


//   return (
//     <div>
//       <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
//         Add Vehicle
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={data}
//         loading={loading}
//         rowKey="_id"
//       />
//       <Modal
//         title={isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFinish}
//         >
//           <Form.Item
//             label="Chassis ID/Vehicle ID"
//             name="vehicle_id"
//             rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
//           >
//             <Input placeholder='ANH10 0068485' />
//           </Form.Item>
//           <Form.Item
//             label="Vehicle Number"
//             name="vehicle_number"
//             rules={[{ required: true, message: 'Please input the vehicle number!' }]}
//           >
//             <Input placeholder='0594 AN 05' />
//           </Form.Item>
//           <Form.Item
//             label="Capacity"
//             name="capacity"
//             rules={[{ required: true, message: 'Please select the capacity!' }]}
//           >
//             <Select placeholder="Select capacity">
//               <Option value={4}>4</Option>
//               <Option value={7}>7</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Transmission Type"
//             name="TrasmissionType"
//             rules={[{ required: true, message: 'Please select the transmission type!' }]}
//           >
//             <Select placeholder="Select transmission type">
//               {transmissionTypes.map(type => (
//                 <Option key={type._id} value={type._id}>{type.type}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Brand Make"
//             name="brand_make"
//             rules={[{ required: true, message: 'Please select the brand make!' }]}
//           >
//             <Select placeholder="Select brand make">
//               {brandMakes.map(brand => (
//                 <Option key={brand._id} value={brand._id}>{brand.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Country Code"
//             name="country_code"
//             rules={[{ required: true, message: 'Please select the country code!' }]}
//           >
//             <Select placeholder="Select country code">
//               {countryCodes.map(code => (
//                 <Option key={code._id} value={code._id}>{code.code}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Mobile"
//             name="mobile"
//             rules={[{ required: true, message: 'Please input the mobile number!' }]}

//           >
//             <Input placeholder='' minLength={9} maxLength={10} />
//           </Form.Item>
//           {/* <Form.Item
//             label="Department"
//             name="department"
//             rules={[{ required: true, message: 'Please select the department!' }]}
//           >
//             <Select placeholder="Select department">
//               {departments.map(dept => (
//                 <Option key={dept._id} value={dept._id}>{dept.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Company"
//             name="company"
//             rules={[{ required: true, message: 'Please select the company!' }]}
//           >
//             <Select placeholder="Select company">
//               {companies.map(company => (
//                 <Option key={company._id} value={company._id}>{company.name}</Option>
//               ))}
//             </Select>
//           </Form.Item> */}

//           <Form.Item
//             label="Base Location"
//             name="company"
//             rules={[{ required: true, message: 'Please select the Base Location!' }]}
//           >
//             <Select placeholder="Select base location">
//               {companies.map(company => (
//                 <Option key={company._id} value={company._id}>{company.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Allowed Location"
//             name="department"
//             rules={[{ required: true, message: 'Please select the allowed location!' }]}
//           >
//             <Select placeholder="Select allowed location">
//               {departments.map(dept => (
//                 <Option key={dept._id} value={dept._id}>{dept.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Vehicle;






import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, message, Upload, Switch } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';

const { Option } = Select;

const Vehicle = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingVehicle, setEditingVehicle] = useState(null);


  const [transmissionTypes, setTransmissionTypes] = useState([]);
  const [brandMakes, setBrandMakes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [baseLocations, setBaseLocations] = useState([]);
  const [allowedLocations, setAllowedLocations] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDropdownData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/vehicles');
      setData(response.data);
    } catch (error) {
      message.error('Error fetching vehicles. Please try again later.');
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {

      const transmissionResponse = await fetch('http://102.133.144.226:8000/api/v1/transmission');
      const transmissionResult = await transmissionResponse.json();
      setTransmissionTypes(transmissionResult);


      const brandMakesResponse = await fetch('http://102.133.144.226:8000/api/v1/brand');
      const brandMakesResult = await brandMakesResponse.json();
      setBrandMakes(brandMakesResult);


      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

      const baseLocationsResponse = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllLocation');
      const baseLocationsResult = await baseLocationsResponse.json();
      const baseLocationsData = baseLocationsResult.Locations.map(location => ({
        value: location.value,
        label: location.label,
      }));
      setBaseLocations(baseLocationsData);


      const allowedLocationsResponse = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllLocation');
      const allowedLocationsResult = await allowedLocationsResponse.json();
      const allowedLocationsData = allowedLocationsResult.Locations.map(location => ({
        value: location.value,
        label: location.label,
      }));
      setAllowedLocations(allowedLocationsData);

    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      message.error('Error fetching dropdown data.');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };


  const handleEdit = (record) => {
    console.log('Editing record:', record);
    if (!record || !record._id) {
      message.error('Invalid record data.');
      return;
    }
    setEditingVehicle(record);
    form.setFieldsValue({
      vehicle_id: record.vehicle_id || '',
      vehicle_number: record.vehicle_number || '',
      capacity: record.capacity || 0,
      TrasmissionType: record.TrasmissionType?._id || '',
      brand_make: record.brand_make?._id || '',
      mobile: record.mobile || '',
      country_code: record.country_code?._id || '',
      base_location: record.base_location?._id || '',
      allowed_locations: record.allowed_locations || '',
      status: record.status === 'Active',
    });

    setIsEditing(true);
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) => {
    const vehicleData = {
      vehicle_id: values.vehicle_id,
      vehicle_number: values.vehicle_number,
      capacity: values.capacity,
      TrasmissionType: values.TrasmissionType,
      brand_make: values.brand_make,
      mobile: values.mobile,
      country_code: values.country_code,
      base_location: values.base_location,
      allowed_locations: values.allowed_locations,
      status: values.status ? 'Active' : 'Inactive',
      vehicle_image: values.vehicle_image ? values.vehicle_image.file.originFileObj : undefined,
    };

    try {
      if (isEditing) {
        await axios.put(`http://102.133.144.226:8000/api/v1/vehicles/${editingVehicle._id}`, vehicleData);
        message.success('Vehicle updated successfully.');
      } else {
        await axios.post('http://102.133.144.226:8000/api/v1/vehicles', vehicleData);
        message.success('Vehicle added successfully.');
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error submitting form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  const columns = [
    {
      title: 'Chassis ID/Vehicle ID',
      dataIndex: 'vehicle_id',
      key: 'vehicle_id',
    },
    {
      title: 'Vehicle Number',
      dataIndex: 'vehicle_number',
      key: 'vehicle_number',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Transmission Type',
      dataIndex: ['TrasmissionType', 'type'],
      key: 'TrasmissionType.type',
    },
    {
      title: 'Brand Make',
      dataIndex: ['brand_make', 'name'],
      key: 'brand_make.name',
    },
    {
      title: 'Country Code',
      dataIndex: ['country_code', 'code'],
      key: 'country_code.code',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },

    {
      title: 'Base Location',
      dataIndex: 'base_location',
      key: 'base_location',
      render: (base_location) => base_location?.label || 'N/A',
    },
    {
      title: 'Allowed Location',
      dataIndex: ['allowed_locations', 'label'],
      key: 'allowed_locations.label',
      render: (allowed_locations) => allowed_locations?.label || 'N/A'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {/* {status} */}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Switch
            checked={record.status === 'Active'}
            onChange={(checked) => handleStatusChange(record._id, checked)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </>
      ),
    },
  ];

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://102.133.144.226:8000/api/v1/vehicles/${id}`, { status: status ? 'Active' : 'Inactive' });
      message.success('Vehicle status updated successfully.');
      fetchData();
    } catch (error) {
      message.error('Error updating vehicle status. Please try again later.');
      console.error('Error updating vehicle status:', error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Vehicle
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title={isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Chassis ID/Vehicle ID"
            name="vehicle_id"
            rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
          >
            <Input placeholder='ANH10 0068485' />
          </Form.Item>
          <Form.Item
            label="Vehicle Number"
            name="vehicle_number"
            rules={[{ required: true, message: 'Please input the vehicle number!' }]}
          >
            <Input placeholder='KCU 192X' />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: 'Please select the capacity!' }]}
          >
            <Select placeholder="Select capacity">
              <Option value={4}>4</Option>
              <Option value={7}>7</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Transmission Type"
            name="TrasmissionType"
            rules={[{ required: true, message: 'Please select the transmission type!' }]}
          >
            <Select placeholder="Select Transmission Type">
              {transmissionTypes.map((type) => (
                <Option key={type._id} value={type._id}>
                  {type.type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand Make"
            name="brand_make"
            rules={[{ required: true, message: 'Please select the brand make!' }]}
          >
            <Select placeholder="Select Brand Make">
              {brandMakes.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: true, message: 'Please select the country code!' }]}
          >
            <Select placeholder="Select Country Code">
              {countryCodes.map((code) => (
                <Option key={code._id} value={code._id}>
                  {code.code}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}
          >
            <Input placeholder='9479999999' />
          </Form.Item>

          <Form.Item
            label="Base Location"
            name="base_location"
            rules={[{ required: true, message: 'Please select the base location!' }]}
          >
            <Select placeholder="Select Base Location">
              {baseLocations.map(loc => (
                <Option key={loc.value} value={loc.value}>
                  {loc.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Allowed Locations"
            name="allowed_locations"
            rules={[{ required: true, message: 'Please select the allowed location!' }]}
          >
            <Select
              // mode="multiple"
              placeholder="Select Allowed Locations"
            >
              {allowedLocations.map(loc => (
                <Option key={loc.value} value={loc.value}>
                  {loc.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Vehicle Image"
            name="vehicle_image"
            valuePropName="file"
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Vehicle Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicle;
