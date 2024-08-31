import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UserAccess = () =>
{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load access data from localStorage on component mount

  useEffect(() =>
  {
    fetchEmployees()
  }, [isModalVisible]);

  // Save access data to localStorage whenever it changes

  const fetchEmployees = async () =>
  {
    setLoading(true);
    try
    {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser');
      const result = await response.json();
      console.log('API Response:', result);

      if (result.success)
      {
        const employees = result.data.map(item => ({
          key: item._id,
          ...item
        }));
        setData(employees);
        // message.success(result.message);
      } else
      {
        // message.error('Failed to fetch employee data.');
      }
    } catch (error)
    {
      // console.error('Error fetching employees:', error);
      // message.error('Error fetching employee data.');
    } finally
    {
      setLoading(false);
    }
  };
  useEffect(() =>
  {
    localStorage.setItem('userAccess', JSON.stringify(selectedAccess));
  }, [selectedAccess]);

  const handleSelectChange = (value) =>
  {
    setSelectedUser(value);
  };

  const handleOpenModal = () =>
  {
    setIsModalVisible(true);
  };

  const handleOk = async () =>
  {
    setSelectedAccess((prevAccess) => [...prevAccess, ...checkedList]);
    console.log({ selectedUser, checkedList })
    await axios.post('http://102.133.144.226:8000/api/v1/users/giveAccessToUser/' + selectedUser, { access: checkedList }).then((res) =>
    {
      setIsModalVisible(false);
    })
  };

  const handleCancel = () =>
  {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (selectedKeys) =>
  {
    setCheckedList(selectedKeys);
  };

  const handleDeactivateAccess = (access) =>
  {

    // Write the Logic to deactivate the access

  };
  const fetchUsersWithAccess = async () =>
  {
    setLoading(true);
    try
    {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/getUsersWithAccess');
      const result = await response.json();
      console.log('API Response:', result);

      if (result.users)
      {
        const users = result.users.map(item => ({
          key: item._id,
          ...item
        }));
        setData(users);
        // message.success('Users fetched successfully');
      } else
      {
        // message.error('Failed to fetch users with access.');
      }
    } catch (error)
    {
      // console.error('Error fetching users with access:', error);
      // message.error('Error fetching users with access.');
    } finally
    {
      setLoading(false);
    }
  };
  const handleUpdateAccess = async (userId, newAccess) =>
  {
    try
    {
      await axios.put(`http://102.133.144.226:8000/api/v1/users/updateAccess/${ userId }`, { access: newAccess });
      // message.success('Access updated successfully');
      fetchUsersWithAccess(); // Refresh data
    } catch (error)
    {
      // console.error('Error updating access:', error);
      // message.error('Error updating access.');
    }
  };
  const handleDeleteAccess = async (userId, accessToRemove) =>
  {
    try
    {
      await axios.delete(`http://102.133.144.226:8000/api/v1/users/deleteAccess/${ userId }`, { data: { accessToRemove } });
      // message.success('Access deleted successfully');
      fetchUsersWithAccess(); // Refresh data
    } catch (error)
    {
      // console.error('Error deleting access:', error);
      // message.error('Error deleting access.');
    }
  };



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Access',
      dataIndex: 'access',
      render: (access) => access.join(', '), // Join array elements into a string
    },
    // {
    //   title: 'Update Access',
    //   dataIndex: 'update',
    //   render: (text, record) => (
    //     <Button onClick={() => handleUpdateAccess(record._id, selectedAccess)}>Update Access</Button>
    //   ),
    // },
    // {
    //   title: 'Delete Access',
    //   dataIndex: 'delete',
    //   render: (text, record) => (
    //     <Button onClick={() => handleDeleteAccess(record._id, checkedList)}>Delete Access</Button>
    //   ),
    // },
  ];

  const dataSource = data
    .filter(user => user.access && user.access.length > 0) // Filter out users with no access
    .map(user => ({
      key: user._id, // Ensure 'key' is assigned correctly
      name: user.name,
      access: user.access, // Join access array into a comma-separated string
      update: 'Update Access',
      delete: 'Delete Access',
    }));


  const accessOptions = [
    'Employee', 'Driver', 'Vehicle', 'Trip', 'Courier',
    'Request', 'Location', 'Exception Report', 'Master Card'
  ];
  useEffect(() =>
  {
    fetchUsersWithAccess();
  }, []);
  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Give Access
      </Button>
      <br /><br />
      <h2>Give User Access</h2>
      <br />



      <Modal
        title="Give Access"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          style={{ width: 200, marginBottom: 20 }}
          placeholder="Select a user"
          onChange={handleSelectChange}
        >
          {data.map(user => (
            <Option key={user._id} value={user._id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: handleCheckboxChange,
          }}
          columns={[{ title: 'Access', dataIndex: 'access' }]}
          dataSource={accessOptions.map((option) => ({ key: option, access: option }))}
          pagination={false}
          scroll={{ y: 240 }}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default UserAccess;
