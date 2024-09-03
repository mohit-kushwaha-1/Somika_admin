import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

const Trips = () =>
{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() =>
  {
    fetchData();
  }, []);

  const fetchData = async () =>
  {
    try
    {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/trips/getNearestCab');
      setData(response.data.DUMMY_DATA.available_vehicles);
      setLoading(false);
    } catch (error)
    {
      console.error('Error fetching trip data:', error);
      setLoading(false);
    }
  };

  const handleAdd = () =>
  {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record) =>
  {
    setEditingTrip(record);
    form.setFieldsValue(record);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () =>
  {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) =>
  {
    try
    {
      if (isEditing)
      {
        await axios.put(`http://102.133.144.226:8000/trips/getNearestCab/${ editingTrip._id }`, values);
      } else
      {
        await axios.post('http://102.133.144.226:8000/trips/getNearestCab', values);
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error)
    {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = (id) =>
  {
    Modal.confirm({
      title: 'Are you sure you want to delete this trip?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () =>
      {
        try
        {
          await axios.delete(`http://102.133.144.226:8000/trips/getNearestCab/${ id }`);
          fetchData(); // Refresh the data after deletion
        } catch (error)
        {
          console.error('Error deleting trip:', error);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Pick Up Time',
      dataIndex: 'pick_up',
      key: 'pick_up',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Start Location',
      dataIndex: ['locations', 'start'],
      key: 'start_location',
    },
    {
      title: 'Intermediate Locations',
      dataIndex: ['locations', 'intermediate'],
      key: 'intermediate_locations',
      render: (text) => text.join(', '),
    },
    {
      title: 'Last Location',
      dataIndex: ['locations', 'last'],
      key: 'last_location',
    },
    {
      title: 'Capacity Total',
      dataIndex: ['capacity', 'total'],
      key: 'capacity_total',
    },
    {
      title: 'Capacity Left',
      dataIndex: ['capacity', 'left'],
      key: 'capacity_left',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Trip
      </Button> */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title={isEditing ? 'Edit Cab Trip' : 'Add Cab Trip'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Pick Up Time"
            name="pick_up"
            rules={[{ required: true, message: 'Please input the pick up time!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Location"
            name={['locations', 'start']}
            rules={[{ required: true, message: 'Please input the start location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Intermediate Locations"
            name={['locations', 'intermediate']}
            rules={[{ required: true, message: 'Please input intermediate locations!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Location"
            name={['locations', 'last']}
            rules={[{ required: true, message: 'Please input the last location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Capacity Total"
            name={['capacity', 'total']}
            rules={[{ required: true, message: 'Please input the total capacity!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Capacity Left"
            name={['capacity', 'left']}
            rules={[{ required: true, message: 'Please input the left capacity!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update' : 'Add'} Cab Trip
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Trips;
