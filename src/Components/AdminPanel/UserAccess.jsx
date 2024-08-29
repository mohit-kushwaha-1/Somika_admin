// import React, { useState } from 'react';
// import { Button, Modal, Table, Checkbox, Select } from 'antd';

// const { Option } = Select;

// const UserAccess = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedAccess, setSelectedAccess] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleSelectChange = (value) => {
//     setSelectedUser(value);
//   };

//   const handleOpenModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setSelectedAccess((prevAccess) => [...prevAccess, ...checkedList]);
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleCheckboxChange = (selectedKeys) => {
//     setCheckedList(selectedKeys);
//   };

//   const handleDeactivateAccess = (access) => {
//     // Logic to deactivate the access
//   };

//   const handleDeleteAccess = (access) => {
//     setSelectedAccess((prevAccess) => prevAccess.filter((item) => item !== access));
//   };

//   const columns = [
//     {
//       title: 'Access',
//       dataIndex: 'access',
//     },
//     {
//       title: 'Deactivate',
//       dataIndex: 'deactivate',
//       render: (text, record) => (
//         <Button onClick={() => handleDeactivateAccess(record.access)}>Deactivate</Button>
//       ),
//     },
//     {
//       title: 'Delete',
//       dataIndex: 'delete',
//       render: (text, record) => (
//         <Button onClick={() => handleDeleteAccess(record.access)}>Delete</Button>
//       ),
//     },
//   ];

//   const dataSource = selectedAccess.map((access) => ({
//     key: access,
//     access: access,
//     deactivate: 'Deactivate',
//     delete: 'Delete',
//   }));

//   const accessOptions = [
//     'Employee', 'Driver', 'Vehicle', 'Trip', 'Courier',
//     'Request', 'Base Location', 'Exception Report', 'Master Card'
//   ];

//   const [checkedList, setCheckedList] = useState([]);

//   return (
//     <div>
//         <Button type="primary" onClick={handleOpenModal}>
//         Give Access
//       </Button>
//       <br /><br />
//       <h2>Give User Access</h2>
//       <br />
//       <Select
//         style={{ width: 200, marginBottom: 20 }}
//         placeholder="Select a user"
//         onChange={handleSelectChange}
//       >
//         <Option value="user1">User 1</Option>
//         <Option value="user2">User 2</Option>
//         <Option value="user3">User 3</Option>
//       </Select>

      

//       <Modal
//         title="Give Access"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Table
//           rowSelection={{
//             type: 'checkbox',
//             onChange: handleCheckboxChange,
//           }}
//           columns={[{ title: 'Access', dataIndex: 'access' }]}
//           dataSource={accessOptions.map((option) => ({ key: option, access: option }))}
//           pagination={false}
//         />
//       </Modal>

//       {selectedAccess.length > 0 && (
//         <Table
//           columns={columns}
//           dataSource={dataSource}
//           pagination={false}
//           style={{ marginTop: 20 }}
//         />
//       )}
//     </div>
//   );
// };

// export default UserAccess;





import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Select } from 'antd';

const { Option } = Select;

const UserAccess = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedList, setCheckedList] = useState([]);

  // Load access data from localStorage on component mount
  
  useEffect(() => {
    const storedAccess = JSON.parse(localStorage.getItem('userAccess'));
    if (storedAccess) {
      setSelectedAccess(storedAccess);
    }
  }, []);

  // Save access data to localStorage whenever it changes

  useEffect(() => {
    localStorage.setItem('userAccess', JSON.stringify(selectedAccess));
  }, [selectedAccess]);

  const handleSelectChange = (value) => {
    setSelectedUser(value);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setSelectedAccess((prevAccess) => [...prevAccess, ...checkedList]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (selectedKeys) => {
    setCheckedList(selectedKeys);
  };

  const handleDeactivateAccess = (access) => {

    // Write the Logic to deactivate the access

  };

  const handleDeleteAccess = (access) => {
    setSelectedAccess((prevAccess) => prevAccess.filter((item) => item !== access));
  };

  const columns = [
    {
      title: 'Access',
      dataIndex: 'access',
    },
    {
      title: 'Deactivate',
      dataIndex: 'deactivate',
      render: (text, record) => (
        <Button onClick={() => handleDeactivateAccess(record.access)}>Deactivate</Button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (text, record) => (
        <Button onClick={() => handleDeleteAccess(record.access)}>Delete</Button>
      ),
    },
  ];

  const dataSource = selectedAccess.map((access) => ({
    key: access,
    access: access,
    deactivate: 'Deactivate',
    delete: 'Delete',
  }));

  const accessOptions = [
    'Employee', 'Driver', 'Vehicle', 'Trip', 'Courier',
    'Request', 'Base Location', 'Exception Report', 'Master Card'
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Give Access
      </Button>
      <br /><br />
      <h2>Give User Access</h2>
      <br />
      <Select
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select a user"
        onChange={handleSelectChange}
      >
        <Option value="user1">User 1</Option>
        <Option value="user2">User 2</Option>
        <Option value="user3">User 3</Option>
      </Select>

      <Modal
        title="Give Access"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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

      {selectedAccess.length > 0 && (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ y: 240 }} 
          sticky
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
};

export default UserAccess;
