import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Tag, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Vehicle = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchData();
    fetchLocations(); // Fetch allowed locations
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

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/companies/getAllCompaniesLocation');
      setLocations(response.data); // Adjust according to your actual API response
    } catch (error) {
      message.error('Error fetching locations. Please try again later.');
      console.error('Error fetching locations:', error);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingVehicle(record);
    form.setFieldsValue({
      vehicle_id: record.vehicle_id,
      vehicle_number: record.vehicle_number,
      capacity: record.capacity,
      TrasmissionType: record.TrasmissionType,
      brand_make: record.brand_make,
      mobile: record.mobile,
      country_code: record.country_code,
      base_location: record.base_location,
      allowed_locations: record.allowed_locations || [], // Default to empty array
      department: record.department,
      company: record.company,
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
      allowed_locations: values.allowed_locations || [], // Ensure it's an array
      department: values.department,
      company: values.company,
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://102.133.144.226:8000/api/v1/vehicles/${id}`);
      message.success('Vehicle deleted successfully.');
      fetchData();
    } catch (error) {
      message.error('Error deleting vehicle. Please try again later.');
      console.error('Error deleting vehicle:', error);
    }
  };

  const columns = [
    {
      title: 'Vehicle ID',
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
      dataIndex: 'TrasmissionType',
      key: 'TrasmissionType',
    },
    {
      title: 'Brand Make',
      dataIndex: 'brand_make',
      key: 'brand_make',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Country Code',
      dataIndex: 'country_code',
      key: 'country_code',
    },
    // {
    //   title: 'Base Location',
    //   dataIndex: 'base_location',
    //   key: 'base_location',
    // },
    // {
    //   title: 'Allowed Locations',
    //   dataIndex: 'allowed_locations',
    //   key: 'allowed_locations',
    //   render: (allowed_locations) => (
    //     <>
    //       {Array.isArray(allowed_locations) ? (
    //         allowed_locations.map(loc => (
    //           <Tag key={loc}>{loc}</Tag>
    //         ))
    //       ) : (
    //         <Tag>Invalid Data</Tag>
    //       )}
    //     </>
    //   ),
    // },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)} >
            Delete
          </Button>
        </>
      ),
    },
  ];

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
            label="Vehicle ID"
            name="vehicle_id"
            rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle Number"
            name="vehicle_number"
            rules={[{ required: true, message: 'Please input the vehicle number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: 'Please input the capacity!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Transmission Type"
            name="TrasmissionType"
            rules={[{ required: true, message: 'Please input the transmission type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand Make"
            name="brand_make"
            rules={[{ required: true, message: 'Please input the brand make!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: true, message: 'Please input the country code!' }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Base Location"
            name="base_location"
            rules={[{ required: true, message: 'Please input the base location!' }]}
          >
            <Input />
          </Form.Item> */}
          {/* <Form.Item
            label="Allowed Locations"
            name="allowed_locations"
            rules={[{ required: true, message: 'Please select allowed locations!' }]}
          >
            <Select mode="multiple" placeholder="Select allowed locations" style={{ width: '100%' }}>
              {locations.map(loc => (
                <Option key={loc._id} value={loc._id}>{loc.name}</Option>
              ))}
            </Select>
            <Input/>
          </Form.Item> */}
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please input the department!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: 'Please select the company!' }]}
          >
            <Input />
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
