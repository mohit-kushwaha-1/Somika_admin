import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Tag, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Vehicle = () =>
{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingVehicle, setEditingVehicle] = useState(null);

  // State variables for dropdowns
  const [transmissionTypes, setTransmissionTypes] = useState([]);
  const [brandMakes, setBrandMakes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() =>
  {
    fetchData();
    fetchDropdownData();
  }, []);

  const fetchData = async () =>
  {
    setLoading(true);
    try
    {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/vehicles');
      setData(response.data);
    } catch (error)
    {
      message.error('Error fetching vehicles. Please try again later.');
      console.error('Error fetching vehicles:', error);
    } finally
    {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () =>
  {
    try
    {
      // Fetch transmission types
      const transmissionResponse = await fetch('http://102.133.144.226:8000/api/v1/transmission');
      const transmissionResult = await transmissionResponse.json();
      setTransmissionTypes(transmissionResult);

      // Fetch brand makes
      const brandMakesResponse = await fetch('http://102.133.144.226:8000/api/v1/brand');
      const brandMakesResult = await brandMakesResponse.json();
      setBrandMakes(brandMakesResult);

      // Fetch country codes
      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

      // Fetch departments
      const departmentsResponse = await fetch('http://102.133.144.226:8000/api/v1/department');
      const departmentsResult = await departmentsResponse.json();
      setDepartments(departmentsResult);

      // Fetch companies
      const companiesResponse = await fetch('http://102.133.144.226:8000/api/v1/companies');
      const companiesResult = await companiesResponse.json();
      setCompanies(companiesResult);

    } catch (error)
    {
      console.error('Error fetching dropdown data:', error);
      message.error('Error fetching dropdown data.');
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
    setEditingVehicle(record);
    form.setFieldsValue({
      vehicle_id: record.vehicle_id,
      vehicle_number: record.vehicle_number,
      capacity: record.capacity,
      TrasmissionType: record.TrasmissionType._id,
      brand_make: record.brand_make._id,
      mobile: record.mobile,
      country_code: record.country_code._id,
      department: record.department._id,
      company: record.company._id,
    });
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () =>
  {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) =>
  {
    const vehicleData = {
      vehicle_id: values.vehicle_id,
      vehicle_number: values.vehicle_number,
      capacity: values.capacity,
      TrasmissionType: values.TrasmissionType,
      brand_make: values.brand_make,
      mobile: values.mobile,
      country_code: values.country_code,
      department: values.department,
      company: values.company,
    };

    try
    {
      if (isEditing)
      {
        await axios.put(`http://102.133.144.226:8000/api/v1/vehicles/${ editingVehicle._id }`, vehicleData);
        message.success('Vehicle updated successfully.');
      } else
      {
        await axios.post('http://102.133.144.226:8000/api/v1/vehicles', vehicleData);
        message.success('Vehicle added successfully.');
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error)
    {
      message.error('Error submitting form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) =>
  {
    try
    {
      await axios.delete(`http://102.133.144.226:8000/api/v1/vehicles/${ id }`);
      message.success('Vehicle deleted successfully.');
      fetchData();
    } catch (error)
    {
      message.error('Error deleting vehicle. Please try again later.');
      console.error('Error deleting vehicle:', error);
    }
  };

  const columns = [
    {
      title: 'Vehicle ID',
      dataIndex: 'vehicle_id',
      key: 'vehicle_id',
    },
    {
      title: 'Vehicle Number',
      dataIndex: 'vehicle_number',
      key: 'vehicle_number',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Transmission Type',
      dataIndex: ['TrasmissionType', 'type'],
      key: 'TrasmissionType.type',
    },
    {
      title: 'Brand Make',
      dataIndex: ['brand_make', 'name'],
      key: 'brand_make.name',
    },
    {
      title: 'Country Code',
      dataIndex: ['country_code', 'code'],
      key: 'country_code.code',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Department',
      dataIndex: ['department', 'name'],
      key: 'department.name',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company.name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)} >
            Delete
          </Button>
        </>
      ),
    },
  ];


  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Vehicle
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title={isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
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
            label="Vehicle ID"
            name="vehicle_id"
            rules={[{ required: true, message: 'Please input the vehicle ID!' }]}
          >
            <Input placeholder='ANH10 0068485' />
          </Form.Item>
          <Form.Item
            label="Vehicle Number"
            name="vehicle_number"
            rules={[{ required: true, message: 'Please input the vehicle number!' }]}
          >
            <Input placeholder='0594 AN 05' />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: 'Please select the capacity!' }]}
          >
            <Select placeholder="Select capacity">
              <Option value={4}>4</Option>
              <Option value={7}>7</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Transmission Type"
            name="TrasmissionType"
            rules={[{ required: true, message: 'Please select the transmission type!' }]}
          >
            <Select placeholder="Select transmission type">
              {transmissionTypes.map(type => (
                <Option key={type._id} value={type._id}>{type.type}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand Make"
            name="brand_make"
            rules={[{ required: true, message: 'Please select the brand make!' }]}
          >
            <Select placeholder="Select brand make">
              {brandMakes.map(brand => (
                <Option key={brand._id} value={brand._id}>{brand.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: true, message: 'Please select the country code!' }]}
          >
            <Select placeholder="Select country code">
              {countryCodes.map(code => (
                <Option key={code._id} value={code._id}>{code.code}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}

          >
            <Input placeholder='' minLength={9} maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please select the department!' }]}
          >
            <Select placeholder="Select department">
              {departments.map(dept => (
                <Option key={dept._id} value={dept._id}>{dept.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: 'Please select the company!' }]}
          >
            <Select placeholder="Select company">
              {companies.map(company => (
                <Option key={company._id} value={company._id}>{company.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicle;
