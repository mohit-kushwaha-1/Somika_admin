import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
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
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/drivers');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching drivers:', error);
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
    form.setFieldsValue(record);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) => {
    try {
      if (isEditing) {
       
        await axios.put(`http://102.133.144.226:8000/api/v1/drivers/${editingDriver.driver_id.number}`, values);
      } else {
       
        await axios.post('http://102.133.144.226:8000/api/v1/drivers', values);
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error submitting form:', error);
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
    {
      title: 'Vehicle ID',
      dataIndex: 'vehicle_id',
      key: 'vehicle_id',
    },
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
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        Add Driver
      </Button>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey={(record) => record.driver_id?.number} 
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
            label="Driver Name"
            name="name"
            rules={[{ required: true, message: 'Please input the driver name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="License Number"
            name={['driver_id', 'number']}
            rules={[{ required: true, message: 'Please input the license number!' }]}
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
          <Form.Item
            label="Phone Number"
            name="number"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Alternate Number"
            name="alternate_num"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle ID"
            name="vehicle_id"
            rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Photo URL"
            name="photo"
            rules={[{ required: true, message: 'Please input the photo URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Rating"
            name={['ratings', 'rating']}
          >
            <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update" : "Add"} Driver
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Drivers;
