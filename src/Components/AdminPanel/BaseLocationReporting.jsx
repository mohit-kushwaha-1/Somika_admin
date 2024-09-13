// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message } from 'antd';

// const BaseLocationReporting = () =>
// {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingLocation, setEditingLocation] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() =>
//   {
//     fetchBaseLocations();
//   }, []);

//   const fetchBaseLocations = async () =>
//   {
//     try
//     {
//       const response = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations');
//       const result = await response.json();
//       console.log('API Response:', result);

//       const baseLocations = result.getAllBaseLocations.map(item =>
//       {
//         const { BaseDetails, locations } = item.Base;
//         return {
//           key: BaseDetails._id,
//           name: BaseDetails.name,
//           is_type: BaseDetails.is_type,
//           address: BaseDetails.address,
//           latitude: locations[0]?.coordinates?.coordinates[1],
//           longitude: locations[0]?.coordinates?.coordinates[0],
//         };
//       });

//       setData(baseLocations);
//       setLoading(false);
//     } catch (error)
//     {
//       console.error('Error fetching Locations:', error);
//       setLoading(false);
//     }
//   };

//   const handleAdd = () =>
//   {
//     setEditingLocation(null);
//     setIsModalVisible(true);
//     form.resetFields();
//   };

//   const handleEdit = (record) =>
//   {
//     setEditingLocation(record);
//     setIsModalVisible(true);
//     form.setFieldsValue(record);
//   };

//   const handleDelete = async (key) =>
//   {
//     try
//     {
//       await fetch(`http://102.133.144.226:8000/api/v1/companies/${ key }`, {
//         method: 'DELETE',
//       });
//       message.success('Base location deleted successfully');
//       fetchBaseLocations();
//     } catch (error)
//     {
//       console.error('Error deleting base location:', error);
//       message.error('Failed to delete base location');
//     }
//   };

//   const handleSubmit = async (values) =>
//   {
//     const { name, is_type, address, latitude, longitude } = values;
//     const method = editingLocation ? 'PATCH' : 'POST';
//     const url = editingLocation
//       ? `http://102.133.144.226:8000/api/v1/companies/${ editingLocation.key }`
//       : 'http://102.133.144.226:8000/api/v1/companies';

//     const payload = {
//       name,
//       is_type: parseInt(is_type, 10), // Assuming is_type is an integer (0 or 1)
//       address,
//       coordinates: [parseFloat(longitude), parseFloat(latitude)],
//     };

//     try
//     {
//       await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       message.success(`Base location ${ editingLocation ? 'updated' : 'added' } successfully`);
//       setIsModalVisible(false);
//       fetchBaseLocations();
//     } catch (error)
//     {
//       console.error(`Error ${ editingLocation ? 'updating' : 'adding' } base location:`, error);
//       message.error(`Failed to ${ editingLocation ? 'update' : 'add' } base location`);
//     }
//   };

//   const columns = [
//     {
//       title: 'Location Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'is_type',
//       key: 'is_type',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//     {
//       title: 'Latitude',
//       dataIndex: 'latitude',
//       key: 'latitude',
//     },
//     {
//       title: 'Longitude',
//       dataIndex: 'longitude',
//       key: 'longitude',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <>
//           <Button type="link" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
//           <Button type="link" onClick={() => handleDelete(record.key)}>Delete</Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>Add Base Location</Button>
//       <Table
//         columns={columns}
//         dataSource={data}
//         loading={loading}
//         rowKey="key"
//       />
//       <Modal
//         title={editingLocation ? 'Edit Base Location' : 'Add Base Location'}
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form
//           form={form}
//           onFinish={handleSubmit}
//           initialValues={{ latitude: '', longitude: '', is_type: '0' }}
//         >
//           <Form.Item
//             name="name"
//             label="Location Name"
//             rules={[{ required: true, message: 'Please input the location name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="is_type"
//             label="Type"
//             rules={[{ required: true, message: 'Please input the type!' }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             name="address"
//             label="Address"
//             rules={[{ required: true, message: 'Please input the address!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="latitude"
//             label="Latitude"
//             rules={[{ required: true, message: 'Please input the latitude!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="longitude"
//             label="Longitude"
//             rules={[{ required: true, message: 'Please input the longitude!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editingLocation ? 'Update' : 'Add'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BaseLocationReporting;




import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Select ,Switch} from 'antd';

const { Option } = Select;

const BaseLocationReporting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBaseLocations();
  }, []);

  const fetchBaseLocations = async () => {
    try {
      const response = await fetch('http://102.133.144.226:8000/api/v1/companies/getAllBaseLocations');
      const result = await response.json();
      console.log('API Response:', result);

      const baseLocations = result.getAllBaseLocations.map(item => {
        const { BaseDetails, locations } = item.Base;
        return {
          key: BaseDetails._id,
          name: BaseDetails.name,
          is_type: BaseDetails.is_type,
          address: BaseDetails.address,
          latitude: locations[0]?.coordinates?.coordinates[1],
          longitude: locations[0]?.coordinates?.coordinates[0],
          status: BaseDetails.status || 'Active', 
        };
      });

      setData(baseLocations);
      // console.log("base",baseLocations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Locations:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingLocation(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingLocation(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (key) => {
    try {
      await fetch(`http://102.133.144.226:8000/api/v1/companies/${key}`, {
        method: 'DELETE',
      });
      message.success('Base location deleted successfully');
      fetchBaseLocations();
    } catch (error) {
      console.error('Error deleting base location:', error);
      message.error('Failed to delete base location');
    }
  };

  const handleSubmit = async (values) => {
    
    const is_type = 1;
    const status = "Active";
    const { name, address, latitude, longitude } = values;
    const method = editingLocation ? 'PATCH' : 'POST';
    const url = editingLocation
      ? `http://102.133.144.226:8000/api/v1/companies/${editingLocation.key}`
      : 'http://102.133.144.226:8000/api/v1/companies';

    const payload = {
      name,
      is_type: parseInt(is_type, 10), 
      address,
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      status, 
    };

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      message.success(`Base location ${editingLocation ? 'updated' : 'added'} successfully`);
      setIsModalVisible(false);
      fetchBaseLocations();
    } catch (error) {
      console.error(`Error ${editingLocation ? 'updating' : 'adding'} base location:`, error);
      message.error(`Failed to ${editingLocation ? 'update' : 'add'} base location`);
    }
  };

  const columns = [
    {
      title: 'Location Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'is_type',
    //   key: 'is_type',
    // },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
     
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          {/* <Button type="link" onClick={() => handleDelete(record.key)}>Delete</Button> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>Add Location</Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />
      <Modal
        title={editingLocation ? 'Edit Base Location' : 'Add Base Location'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ latitude: '', longitude: '', is_type: '0', status: 'Active' }}
        >
          <Form.Item
            name="name"
            label="Location Name"
            rules={[{ required: true, message: 'Please input the location name!' }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="is_type"
            label="Type"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input type="number" />
          </Form.Item> */}
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
          {/* <Form.Item
            name="status"
            label="Status"
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingLocation ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BaseLocationReporting;
