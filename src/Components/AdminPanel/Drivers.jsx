import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Switch, Tag, Upload } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Drivers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingDriver, setEditingDriver] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [driverIDTypes, setDriverIDTypes] = useState(["DL", "ID", "Passport"]);

  useEffect(() => {
    fetchData();
    fetchVehicles();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/driver');
      setData(response.data);
    } catch (error) {
      message.error('Error fetching drivers. Please try again later.');
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/vehicles');
      setVehicles(response.data);

      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

    } catch (error) {
      message.error('Error fetching vehicles. Please try again later.');
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingDriver(record);
    form.setFieldsValue({
      name: record.name,
      driver_id_type: record.driver_id?.type,
      driver_id_number: record.driver_id?.number,
      photo: record.photo,
      country_code: record.country_code,
      number: record.number,
      alternate_num: record.alternate_num,
      license: record.license,
      address: record.address,
      vehicle_id: record.vehicle_id,
      status: record.status === 'Active',
    });
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) => {
    const driverData = {
      driver_id: {
        type: values.driver_id_type,
        number: values.driver_id_number,
      },
      photo: values.photo,
      name: values.name,
      country_code: values.country_code,
      number: values.number,
      alternate_num: values.alternate_num,
      license: values.license,
      address: values.address,
      vehicle_id: values.vehicle_id,
      status: values.status ? 'Active' : 'Inactive',
    };

    try {
      if (isEditing) {
        await axios.put(`http://102.133.144.226:8000/api/v1/driver/${editingDriver._id}`, driverData);
        message.success('Driver updated successfully.');
      } else {
        await axios.post('http://102.133.144.226:8000/api/v1/driver', driverData);
        message.success('Driver added successfully.');
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error submitting form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  // const handleDelete = async (driverId) => {
  //   try {
  //     await axios.delete(`http://102.133.144.226:8000/api/v1/driver/${driverId}`);
  //     message.success('Driver deleted successfully.');
  //     fetchData();
  //   } catch (error) {
  //     message.error('Error deleting driver. Please try again later.');
  //     console.error('Error deleting driver:', error);
  //   }
  // };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://102.133.144.226:8000/api/v1/driver/${id}`, { status: status ? 'Active' : 'Inactive' });
      message.success('Driver status updated successfully.');
      fetchData();
    } catch (error) {
      message.error('Error updating driver status. Please try again later.');
      console.error('Error updating driver status:', error);
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
      title: 'Rating',
      dataIndex: ['ratings', 'rating'],
      key: 'rating',
      render: (_, record) => record.ratings?.rating?.[0]?.rating ?? 'N/A',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => <img src={photo} alt="Photo" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Switch
            checked={record.status === 'Active'}
            onChange={(checked) => handleStatusChange(record._id, checked)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Driver
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record._id}
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
            rules={[{ required: true, message: 'Please input the driver\'s name!' }]}
          >
            <Input placeholder="Enter the driver's name" />
          </Form.Item>

          <Form.Item
            label="Photo"
            name="photo"
            rules={[{ required: true, message: 'Please upload the driver\'s photo!' }]}
          >
            <Upload
              action="/upload.do"
              listType="picture"
              beforeUpload={() => false}
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Driver ID Type"
            name="driver_id_type"
            rules={[{ required: true, message: 'Please select the driver ID type!' }]}
          >
            <Select placeholder="Select ID Type">
              {driverIDTypes.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Driver ID Number"
            name="driver_id_number"
            rules={[{ required: true, message: 'Please input the driver ID number!' }]}
          >
            <Input placeholder="Enter the driver ID number" />
          </Form.Item>

          <div className='mobile_code' >
            <Form.Item
              label="Country Code"
              name="country_code"
              rules={[{ required: true, message: 'Please select the country code!' }]}
            >
              <Select placeholder="Select Country Code">
                {countryCodes.map(code => (
                  <Option key={code._id} value={code._id}>
                    {code.code}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input placeholder="Enter the phone number" />
            </Form.Item>
          </div>

          <Form.Item
            label="Alternate Number"
            name="alternate_num"
            rules={[{ required: false }]}
          >
            <Input placeholder="Enter the alternate number" />
          </Form.Item>

          <Form.Item
            label="License"
            name="license"
            rules={[{ required: true, message: 'Please input the license!' }]}
          >
            <Input placeholder="Enter the license details" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input placeholder="Enter the address" />
          </Form.Item>

          <Form.Item
            label="Vehicle ID"
            name="vehicle_id"
            rules={[{ required: false }]}
          >
            <Select placeholder="Select Vehicle ID">
              {vehicles.map(vehicle => (
                <Option key={vehicle._id} value={vehicle._id}>
                  {vehicle.vehicle_id}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update Driver' : 'Add Driver'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Drivers;
