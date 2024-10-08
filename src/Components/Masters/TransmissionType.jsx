import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const TransmissionType = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransmission, setEditingTransmission] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTransmissionTypes();
  }, []);

  const fetchTransmissionTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/transmission'); 
      const result = await response.json();
      console.log('API Response:', result);

      const transmissionTypes = result.map(item => ({
        key: item._id,
        type: item.type,
      }));

      setData(transmissionTypes);
      // message.success('Transmission types fetched successfully!');
    } catch (error) {
      console.error('Error fetching transmission types:', error);
      message.error('Error fetching transmission types.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingTransmission(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingTransmission(record);
    form.setFieldsValue({
      type: record.type,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/transmission/${id}`, {
        method: 'DELETE',
      });
      fetchTransmissionTypes();
      message.success('Transmission type deleted successfully!');
    } catch (error) {
      console.error('Error deleting transmission type:', error);
      message.error('Error deleting transmission type.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      type: values.type,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/transmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding transmission type');
      }

      fetchTransmissionTypes();
      setIsModalOpen(false);
      message.success('Transmission type added successfully!');
    } catch (error) {
      message.error('Error adding transmission type.');
      console.error('Error adding transmission type:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      type: values.type,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/transmission/${editingTransmission.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating transmission type');
      }

      fetchTransmissionTypes();
      setIsModalOpen(false);
      message.success('Transmission type updated successfully!');
    } catch (error) {
      message.error('Error updating transmission type.');
      console.error('Error updating transmission type:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingTransmission) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Transmission Type',
      dataIndex: 'type',
      key: 'type',
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
        Add Transmission Type
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />

      <Modal
        title={editingTransmission ? 'Edit Transmission Type' : 'Add Transmission Type'}
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
            name="type"
            label="Transmission Type"
            rules={[{ required: true, message: 'Please input the transmission type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTransmission ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TransmissionType;
