import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const DomainName = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);
  const [form] = Form.useForm(); // Use Form instance for handling form state

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/domain');
      const result = await response.json();
      console.log('API Response:', result);

      const domains = result.map(item => ({
        key: item._id,
        url: item.url,
      }));

      setData(domains);
    } catch (error) {
      console.error('Error fetching domains:', error);
      message.error('Error fetching domains.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDomain(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingDomain(record);
    form.setFieldsValue({
      url: record.url,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/domain/${id}`, {
        method: 'DELETE',
      });
      fetchDomains();
    } catch (error) {
      console.error('Error deleting domain:', error);
      message.error('Error deleting domain.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      url: values.url,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding domain');
      }

      fetchDomains();
      setIsModalOpen(false);
    } catch (error) {
      message.error('Error adding domain.');
      console.error('Error adding domain:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      url: values.url,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/domain/${editingDomain.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating domain');
      }

      fetchDomains();
      setIsModalOpen(false);
    } catch (error) {
      message.error('Error updating domain.');
      console.error('Error updating domain:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingDomain) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Domain URL',
      dataIndex: 'url',
      key: 'url',
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
      {/* <h2>Domain Name</h2> */}
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Domain
      </Button>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="key" 
      />

      <Modal
        title={editingDomain ? 'Edit Domain' : 'Add Domain'}
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
            name="url"
            label="Domain URL"
            rules={[{ required: true, message: 'Please input the domain URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingDomain ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DomainName;
