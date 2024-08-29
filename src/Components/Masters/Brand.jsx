import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const Brand = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/brand'); 
      const result = await response.json();
      console.log('API Response:', result);

      const brands = result.map(item => ({
        key: item._id,
        name: item.name,
      }));

      setData(brands);
    //   message.success('Brand details fetched successfully!');
    } catch (error) {
      console.error('Error fetching brand details:', error);
      message.error('Error fetching brand details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingBrand(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingBrand(record);
    form.setFieldsValue({
      name: record.name,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/brand/${id}`, { 
        method: 'DELETE',
      });
      fetchBrands();
      message.success('Brand deleted successfully!');
    } catch (error) {
      console.error('Error deleting brand:', error);
      message.error('Error deleting brand.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      name: values.name,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/brand', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding brand');
      }

      fetchBrands();
      setIsModalOpen(false);
      message.success('Brand added successfully!');
    } catch (error) {
      message.error('Error adding brand.');
      console.error('Error adding brand:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      name: values.name,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/brand/${editingBrand.key}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating brand');
      }

      fetchBrands();
      setIsModalOpen(false);
      message.success('Brand updated successfully!');
    } catch (error) {
      message.error('Error updating brand.');
      console.error('Error updating brand:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingBrand) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Brand Name',
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
        Add Brand
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />

      <Modal
        title={editingBrand ? 'Edit Brand' : 'Add Brand'}
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
            label="Brand Name"
            rules={[{ required: true, message: 'Please input the brand name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBrand ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Brand;
