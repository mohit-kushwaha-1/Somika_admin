import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const IdType = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIdType, setEditingIdType] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchIdTypes();
  }, []);

  const fetchIdTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/idtype');
      const result = await response.json();

      const idTypes = result.map(item => ({
        key: item._id,
        name: item.name,
      }));

      setData(idTypes);
      // message.success('ID types fetched successfully!');
    } catch (error) {
      console.error('Error fetching ID types:', error);
      message.error('Error fetching ID types.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingIdType(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingIdType(record);
    form.setFieldsValue({
      name: record.name,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/idtype/${id}`, {
        method: 'DELETE',
      });
      fetchIdTypes();
      message.success('ID type deleted successfully!');
    } catch (error) {
      console.error('Error deleting ID type:', error);
      message.error('Error deleting ID type.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      name: values.name,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/idtype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding ID type');
      }

      fetchIdTypes();
      setIsModalOpen(false);
      message.success('ID type added successfully!');
    } catch (error) {
      message.error('Error adding ID type.');
      console.error('Error adding ID type:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      name: values.name,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/idtype/${editingIdType.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating ID type');
      }

      fetchIdTypes();
      setIsModalOpen(false);
      message.success('ID type updated successfully!');
    } catch (error) {
      message.error('Error updating ID type.');
      console.error('Error updating ID type:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingIdType) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'ID Type Name',
      dataIndex: 'name',
      key: 'name',
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
        Add ID Type
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />

      <Modal
        title={editingIdType ? 'Edit ID Type' : 'Add ID Type'}
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
            name="name"
            label="ID Type Name"
            rules={[{ required: true, message: 'Please input the ID type name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingIdType ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default IdType;
