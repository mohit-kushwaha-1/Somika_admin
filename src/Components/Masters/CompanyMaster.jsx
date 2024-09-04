import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const CompanyMaster = () =>
{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() =>
  {
    fetchData();
  }, []);
  var arr = []
  const fetchData = async () =>
  {
    try
    {
      const response = await fetch('http://102.133.144.226:8000/api/v1/companies');
      const result = await response.json();
      result.map((result_data) =>
      {
        if (result_data.is_type == 0)
        {
          arr.push(result_data)
        }
      })
      setData(arr);
      setLoading(false);
    } catch (error)
    {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAdd = () =>
  {
    setEditingCompany(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) =>
  {
    setEditingCompany(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) =>
  {
    try
    {
      await fetch(`http://102.133.144.226:8000/api/v1/companies/${ id }`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error)
    {
      console.error('Error deleting data:', error);
    }
  };


  const handlePost = async (values) =>
  {
    const postData = {
      name: values.name,
      is_type: 0,  
      address: values.address,
      location: {
        type: 'Point',
        coordinates: [values.longitude, values.latitude],
      },
    };

    try
    {
      const response = await fetch('http://102.133.144.226:8000/api/v1/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok)
      {
        throw new Error('Error submitting data');
      }

      fetchData();
      setIsModalOpen(false);
    } catch (error)
    {
      console.error('Error submitting data:', error);
    }
  };

  const handlePut = async (values) =>
  {
    const putData = {
      name: values.name,
      address: values.address,
      location: {
        type: 'Point',
        coordinates: [values.longitude, values.latitude],
      },
      is_type: values.is_type,  
    };

    try
    {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/companies/${ editingCompany._id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (!response.ok)
      {
        throw new Error('Error updating data');
      }

      fetchData();
      setIsModalOpen(false);
    } catch (error)
    {
      console.error('Error updating data:', error);
    }
  };



  const handleSubmit = async (values) =>
  {
    if (editingCompany)
    {
      await handlePut(values);
    } else
    {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Latitude',
      dataIndex: ['location', 'coordinates', 'coordinates', 1],
      key: 'latitude',
      render: (_, record) => record.location.coordinates.coordinates[1],
    },
    {
      title: 'Longitude',
      dataIndex: ['location', 'coordinates', 'coordinates', 0],
      key: 'longitude',
      render: (_, record) => record.location.coordinates.coordinates[0],
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'is_type',
    //   key: 'is_type',
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add More
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
      />

      <Modal
        title={editingCompany ? 'Edit Company' : 'Add Company'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
       

        <Form
          initialValues={editingCompany ? {
            name: editingCompany.name,
            address: editingCompany.address,
            latitude: editingCompany.location.coordinates.coordinates[1],
            longitude: editingCompany.location.coordinates.coordinates[0],
            is_type: editingCompany.is_type,
          } : {}}
          onFinish={handleSubmit}
        >

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the company name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true, message: 'Please input the latitude!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true, message: 'Please input the longitude!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_Type"
            label="Type"
            rules={[{ required: true, message: 'Please select the type!' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {editingCompany ? 'Update' : 'Submit'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyMaster;
