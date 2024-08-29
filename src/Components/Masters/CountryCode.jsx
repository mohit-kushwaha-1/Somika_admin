import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const CountryCode = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  const fetchCountryCodes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const result = await response.json();
      console.log('API Response:', result);

      const countryCodes = result.map(item => ({
        key: item._id,
        name: item.name,
        code: item.code,
      }));

      setData(countryCodes);
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching country codes:', error);
      message.error('Error fetching country codes.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCountry(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingCountry(record);
    form.setFieldsValue({
      name: record.name,
      code: record.code,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/countryCode/${id}`, {
        method: 'DELETE',
      });
      fetchCountryCodes();
      message.success('Country code deleted successfully!');
    } catch (error) {
      console.error('Error deleting country code:', error);
      message.error('Error deleting country code.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      name: values.name,
      code: values.code,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/countryCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding country code');
      }

      fetchCountryCodes();
      setIsModalOpen(false);
      message.success('Country code added successfully!');
    } catch (error) {
      message.error('Error adding country code.');
      console.error('Error adding country code:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      name: values.name,
      code: values.code,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/countryCode/${editingCountry.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating country code');
      }

      fetchCountryCodes();
      setIsModalOpen(false);
      message.success('Country code updated successfully!');
    } catch (error) {
      message.error('Error updating country code.');
      console.error('Error updating country code:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingCountry) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Country Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Country Code',
      dataIndex: 'code',
      key: 'code',
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
        Add Country Code
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />

      <Modal
        title={editingCountry ? 'Edit Country Code' : 'Add Country Code'}
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
            label="Country Name"
            rules={[{ required: true, message: 'Please input the country name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="Country Code"
            rules={[{ required: true, message: 'Please input the country code!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCountry ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CountryCode;

