import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const DepartmentMaster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [form] = Form.useForm(); 

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/department');
      const result = await response.json();
      console.log('API Response:', result);

      const departments = result.map(item => ({
        key: item._id,
        name: item.name,
      }));

      setData(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      message.error('Error fetching departments.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDepartment(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingDepartment(record);
    form.setFieldsValue({
      name: record.name,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/department/${id}`, {
        method: 'DELETE',
      });
      fetchDepartments();
      message.success('Department deleted successfully!')
    } catch (error) {
      console.error('Error deleting department:', error);
      message.error('Error deleting department.');
    }
  };

  const handlePost = async (values) => {
    const postData = {
      name: values.name,
    };

    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error adding department');
      }

      fetchDepartments();
      setIsModalOpen(false);
      message.success('Depatment added successfully!')
    } catch (error) {
      message.error('Error adding department.');
      console.error('Error adding department:', error);
    }
  };

  const handlePut = async (values) => {
    const putData = {
      name: values.name,
    };

    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/department/${editingDepartment.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok) {
        throw new Error('Error updating department');
      }

      fetchDepartments();
      setIsModalOpen(false);
      message.success('Department updated successfully!')
    } catch (error) {
      message.error('Error updating department.');
      console.error('Error updating department:', error);
    }
  };

  const handleSubmit = async (values) => {
    if (editingDepartment) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Department Name',
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
      {/* <h2>Department Master</h2> */}
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Department
      </Button>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="key" 
      />

      <Modal
        title={editingDepartment ? 'Edit Department' : 'Add Department'}
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
            label="Department Name"
            rules={[{ required: true, message: 'Please input the department name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingDepartment ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentMaster;
