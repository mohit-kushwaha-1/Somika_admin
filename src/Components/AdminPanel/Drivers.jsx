import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const Drivers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/driver');
      setData(response.data);
    } catch (error) {
      message.error('Error fetching drivers. Please try again later.');
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingDriver(record);
    form.setFieldsValue({
      name: record.name,
      driver_id_type: record.driver_id?.type,
      driver_id_number: record.driver_id?.number,
      photo: record.photo,
      user_id: record.ratings?.rating[0]?.user,
      rating: record.ratings?.rating[0]?.rating,
      country_code: record.country_code,
      number: record.number,
      alternate_num: record.alternate_num,
      license: record.license,
      address: record.address,
      vehicle_id: record.vehicle_id,
    });
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) => {
    const driverData = {
      driver_id: {
        type: values.driver_id_type,
        number: values.driver_id_number,
      },
      photo: values.photo,
      name: values.name,
      ratings: {
        rating: [
          {
            user: values.user_id,
            rating: values.rating,
          }
        ],
      },
      country_code: values.country_code,
      number: values.number,
      alternate_num: values.alternate_num,
      license: values.license,
      address: values.address,
      vehicle_id: values.vehicle_id,
    };

    try {
      if (isEditing) {
        await axios.put(`http://102.133.144.226:8000/api/v1/driver/${editingDriver._id}`, driverData);
        message.success('Driver updated successfully.');
      } else {
        await axios.post('http://102.133.144.226:8000/api/v1/driver', driverData);
        message.success('Driver added successfully.');
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error submitting form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (driverId) => {
    try {
      await axios.delete(`http://102.133.144.226:8000/api/v1/driver/${driverId}`);
      message.success('Driver deleted successfully.');
      fetchData();
    } catch (error) {
      message.error('Error deleting driver. Please try again later.');
      console.error('Error deleting driver:', error);
    }
  };

  const columns = [
    {
      title: 'Driver Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'License Number',
      dataIndex: ['driver_id', 'number'],
      key: 'license_number',
      render: (_, record) => record.driver_id?.number,
    },
    {
      title: 'Country Code',
      dataIndex: 'country_code',
      key: 'country_code',
    },
    {
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'phone_number',
    },
    {
      title: 'Alternate Number',
      dataIndex: 'alternate_num',
      key: 'alternate_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    // {
    //   title: 'Vehicle ID',
    //   dataIndex: 'vehicle_id',
    //   key: 'vehicle_id',
    // },
    {
      title: 'Rating',
      dataIndex: ['ratings', 'rating'],
      key: 'rating',
      render: (_, record) => record.ratings?.rating?.[0]?.rating ?? 'N/A',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => <img src={photo} alt="Driver" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Driver
      </Button>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey={(record) => record._id} 
      />
      <Modal
        title={isEditing ? "Edit Driver" : "Add Driver"}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="David Roy" />
          </Form.Item>

          <Form.Item
            label="Driver ID Type"
            name="driver_id_type"
            rules={[{ required: true, message: 'Please input the driver ID type!' }]}
          >
            <Input placeholder="DL" />
          </Form.Item>

          <Form.Item
            label="Driver ID Number"
            name="driver_id_number"
            rules={[{ required: true, message: 'Please input the driver ID number!' }]}
          >
            <Input placeholder="123456" />
          </Form.Item>

          <Form.Item
            label="Photo URL"
            name="photo"
            rules={[{ required: true, message: 'Please input the photo URL!' }]}
          >
            <Input placeholder="http://example.com/photo.jpg" />
          </Form.Item>

          <Form.Item
            label="User ID for Rating"
            name="user_id"
            rules={[{ required: true, message: 'Please input the user ID for rating!' }]}
          >
            <Input placeholder="60c72b1f4f1a2c001c9e13b8" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input the rating!' }]}
          >
            <Input type="number" placeholder="4.5" />
          </Form.Item>

          <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: true, message: 'Please input the country code!' }]}
          >
            <Input placeholder="+1" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="number"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input type="number" placeholder="1234567890" />
          </Form.Item>

          <Form.Item
            label="Alternate Phone Number"
            name="alternate_num"
          >
            <Input placeholder="0987654321" />
          </Form.Item>

          <Form.Item
            label="License"
            name="license"
            rules={[{ required: true, message: 'Please input the license number!' }]}
          >
            <Input placeholder="DL123456" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input placeholder="123 Street Name, City, Country" />
          </Form.Item>

          <Form.Item
            label="Vehicle ID"
            name="vehicle_id"
            rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
          >
            <Input placeholder="V12345" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update Driver" : "Add Driver"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Drivers;
