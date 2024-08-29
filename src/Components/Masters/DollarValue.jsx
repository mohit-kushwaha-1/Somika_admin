import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputNumber, message } from 'antd';

const DollarValue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDollarValues();
  }, []);

  const fetchDollarValues = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/dollar'); 
      const result = await response.json();
      console.log('API Response:', result);

      const dollarValues = result.map(item => ({
        key: item._id,
        value: item.value,
      }));

      setData(dollarValues);
      // message.success('Dollar values fetched successfully!');
    } catch (error) {
      console.error('Error fetching dollar values:', error);
      message.error('Error fetching dollar values.');
    } finally {
      setLoading(false);
    }
  };

  // const handleAdd = () => {
  //   setEditingValue(null);
  //   form.resetFields();
  //   setIsModalOpen(true);
  // };

  const handleEdit = (record) => {
    setEditingValue(record);
    form.setFieldsValue({
      value: record.value,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/dollar/${id}`, {
        method: 'DELETE',
      });
      fetchDollarValues();
      message.success('Dollar value deleted successfully!');
    } catch (error) {
      console.error('Error deleting dollar value:', error);
      message.error('Error deleting dollar value.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      value: values.value,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/dollar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding dollar value');
      }

      fetchDollarValues();
      setIsModalOpen(false);
      message.success('Dollar value added successfully!');
    } catch (error) {
      message.error('Error adding dollar value.');
      console.error('Error adding dollar value:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      value: values.value,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/dollar/${editingValue.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating dollar value');
      }

      fetchDollarValues();
      setIsModalOpen(false);
      message.success('Dollar value updated successfully!');
    } catch (error) {
      message.error('Error updating dollar value.');
      console.error('Error updating dollar value:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingValue) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Dollar Value',
      dataIndex: 'value',
      key: 'value',
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
      {/* <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Dollar Value
      </Button> */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />

      <Modal
        title={editingValue ? 'Edit Dollar Value' : 'Add Dollar Value'}
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
            name="value"
            label="Dollar Value"
            rules={[{ required: true, message: 'Please input the dollar value!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingValue ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DollarValue;
