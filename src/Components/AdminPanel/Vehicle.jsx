import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, message, Upload, Switch } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';

const { Option } = Select;

const Vehicle = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingVehicle, setEditingVehicle] = useState(null);


  const [transmissionTypes, setTransmissionTypes] = useState([]);
  const [brandMakes, setBrandMakes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [baseLocations, setBaseLocations] = useState([]);
  const [allowedLocations, setAllowedLocations] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDropdownData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://102.133.144.226:8000/api/v1/vehicles');
      setData(response.data);
      console.log("responce data",response.data);

      const base = await axios.get("http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations")
      console.log("base",base?.data?.getAllBaseLocations[0].Base.BaseDetails.name);

      const a = base?.data?.getAllBaseLocations.map((item)=>{
              return item.Base.BaseDetails.name
      })


    const b =   response.data.forEach((vehicle, index) => {
        if (a[index]) {
          vehicle.base_location = a[index];  
        } else {
          vehicle.base_location = "Default Location";  
        }
      });

      setBaseLocations(a)
      console.log("b is ",b);

      console.log("a is ",a);
    } catch (error) {
      message.error('Error fetching vehicles. Please try again later.');
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {

      const transmissionResponse = await fetch('http://102.133.144.226:8000/api/v1/transmission');
      const transmissionResult = await transmissionResponse.json();
      setTransmissionTypes(transmissionResult);


      const brandMakesResponse = await fetch('http://102.133.144.226:8000/api/v1/brand');
      const brandMakesResult = await brandMakesResponse.json();
      setBrandMakes(brandMakesResult);


      const countryCodesResponse = await fetch('http://102.133.144.226:8000/api/v1/countryCode');
      const countryCodesResult = await countryCodesResponse.json();
      setCountryCodes(countryCodesResult);

      const baseLocationsResponse = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllLocation');
      const baseLocationsResult = await baseLocationsResponse.json();
      const baseLocationsData = baseLocationsResult.Locations.map(location => ({
        value: location.value,
        label: location.label,
      }));
      setBaseLocations(baseLocationsData);


      const allowedLocationsResponse = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllLocation');
      const allowedLocationsResult = await allowedLocationsResponse.json();
      const allowedLocationsData = allowedLocationsResult.Locations.map(location => ({
        value: location.value,
        label: location.label,
      }));
      setAllowedLocations(allowedLocationsData);

    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      message.error('Error fetching dropdown data.');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };


  const handleEdit = (record) => {
    console.log('Editing record:', record);
    if (!record || !record._id) {
      message.error('Invalid record data.');
      return;
    }
    setEditingVehicle(record);
      
    const dataToSend = {
      allowed_locations: {
        location: record.allowed_locations
      }
    };


    console.log("data to send",dataToSend)
    form.setFieldsValue({
      vehicle_id: record.vehicle_id || '',
      vehicle_number: record.vehicle_number || '',
      capacity: record.capacity || 0,
      TrasmissionType: record.TrasmissionType?._id || '',
      brand_make: record.brand_make?._id || '',
      mobile: record.mobile || '',
      country_code: record.country_code?._id || '',
      base_location: record.base_location?._id || '',
      allowed_locations: dataToSend || '',
      status: record.status === 'Active',
    });

    setIsEditing(true);
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleStatusToggle = async (record) => {
    const updatedStatus = record.status === 'Active' ? 'Inactive' : 'Active';
    const updatedData = { status: updatedStatus }; // Only send the status in the request body
  
    try {
      const response = await fetch(`http://102.133.144.226:8000/api/v1/users/${record._id}/status`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
      console.log("result sdf df",result);
      if (result.message) {
        fetchData(); // Reload employee data
        message.success(`Vehicle status updated `);
      } else {
        message.error('Failed to update Vehicle status.');
      }
    } catch (error) {
      message.error('Error updating Vehicle status.');
      console.error('Error updating Vehicle status:', error);
    }
  };

  const handleFinish = async (values) => {
    
    const dataToSend =  {
        location: values.allowed_locations
      }
    

    const vehicleData = {
      vehicle_id: values.vehicle_id,
      vehicle_number: values.vehicle_number,
      capacity: values.capacity,
      TrasmissionType: values.TrasmissionType,
      brand_make: values.brand_make,
      mobile: values.mobile,
      country_code: values.country_code,
      base_location: values.base_location,
      allowed_locations: dataToSend,
      status: values.status ? 'Active' : 'Inactive',
      vehicle_image: values.vehicle_image ? values.vehicle_image.file.originFileObj : undefined,
    };

    try {
      if (isEditing) {
        await axios.put(`http://102.133.144.226:8000/api/v1/vehicles/${editingVehicle._id}`, vehicleData);
        message.success('Vehicle updated successfully.');
      } else {
        await axios.post('http://102.133.144.226:8000/api/v1/vehicles', vehicleData);
        message.success('Vehicle added successfully.');
      }
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error submitting form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  const columns = [
    {
      title: 'Chassis ID/Vehicle ID',
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
    // {
    //   title: 'Country Code',
    //   dataIndex: ['country_code', 'code'],
    //   key: 'country_code.code',
    // },
    // {
    //   title: 'Mobile',
    //   dataIndex: 'mobile',
    //   key: 'mobile',
    // },

    {
      title: 'Base Location',
      dataIndex: 'base_location',
      key: 'base_location',
      // render: (base_location) => base_location?.label,
    },
    {
      title: 'Allowed Location',
      key: 'allowed_locations',
      render: (record) => {
        // Check if allowed_locations and location array exist
        if (record.allowed_locations?.location ) {
          return record.allowed_locations.location
            .map((loc) => loc?.companyId?.name || 'N/A')
            .join(', '); // Join the names with commas if multiple
        }
        return 'N/A'; // Return 'N/A' if no locations available
      }
    }
    ,
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status) => (
    //     <Tag color={status === 'Active' ? 'green' : 'red'}>
    //       {/* {status} */}
    //     </Tag>
    //   ),
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Switch
            // checked={record.status === 'Active'}
            onChange={() => handleStatusToggle(record)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </>
      ),
    },
  ];

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://102.133.144.226:8000/api/v1/vehicles/${id}`, { status: status ? 'Active' : 'Inactive' });
      message.success('Vehicle status updated successfully.');
      fetchData();
    } catch (error) {
      message.error('Error updating vehicle status. Please try again later.');
      console.error('Error updating vehicle status:', error);
    }
  };

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
            label="Chassis ID/Vehicle ID"
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
            <Input placeholder='KCU 192X' />
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
            <Select placeholder="Select Transmission Type">
              {transmissionTypes.map((type) => (
                <Option key={type._id} value={type._id}>
                  {type.type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand Make"
            name="brand_make"
            rules={[{ required: true, message: 'Please select the brand make!' }]}
          >
            <Select placeholder="Select Brand Make">
              {brandMakes.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Country Code"
            name="country_code"
            rules={[{ required: true, message: 'Please select the country code!' }]}
          >
            <Select placeholder="Select Country Code">
              {countryCodes.map((code) => (
                <Option key={code._id} value={code._id}>
                  {code.code}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
          {/* <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please input the mobile number!' }]}
          >
            <Input placeholder='9479999999' />
          </Form.Item> */}

          <Form.Item
            label="Add Location"
            name="base_location"
            rules={[{ required: true, message: 'Please select the base location!' }]}
          >
            <Select placeholder="Select Base Location">
              {baseLocations.map(loc => (
                <Option key={loc.value} value={loc.value}>
                  {loc.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Allowed Locations"
            name="allowed_locations"
            rules={[{ required: true, message: 'Please select the allowed location!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select Allowed Locations"
            >
              {allowedLocations.map(loc => (
                <Option key={loc.value} value={loc.value}>
                  {loc.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Vehicle Image"
            name="vehicle_image"
            valuePropName="file"
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Vehicle Image</Button>
            </Upload>
          </Form.Item>
          {/* <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item> */}
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
