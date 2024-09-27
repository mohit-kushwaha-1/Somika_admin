import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  Select,
  message,
  Form,
  Input,
  Flex,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const UserAccess = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const users = await axios.get(
        "http://102.133.144.226:8000/api/v1/users/getAllUser"
      );
      console.log("user is", users.data.data);
      setUser(users.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [userData, setUserData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  console.log("searchValue",searchValue);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const users = await axios.get(
          "http://102.133.144.226:8000/api/v1/users/getAllUser"
        );
        setUserData(users.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch1 = (value) => {
    setSearchValue(value);
    if (value) {
      const filtered = userData?.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchEmployees();
  }, [isModalVisible]);

  // Save access data to localStorage whenever it changes

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://102.133.144.226:8000/api/v1/users/getAllUser"
      );
      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        const employees = result.data.map((item) => ({
          key: item._id,
          ...item,
        }));
        setData(employees);
        // message.success(result.message);
      } else {
        // message.error('Failed to fetch employee data.');
      }
    } catch (error) {
      // console.error('Error fetching employees:', error);
      // message.error('Error fetching employee data.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    localStorage.setItem("userAccess", JSON.stringify(selectedAccess));
  }, [selectedAccess]);

  const handleSelectChange = (value) => {
    setSelectedUser(value);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setSelectedAccess((prevAccess) => [...prevAccess, ...checkedList]);
    console.log({ selectedUser, checkedList });
    await axios
      .post(
        "http://102.133.144.226:8000/api/v1/users/giveAccessToUser/" +
        searchValue,
        { access: checkedList }
      )
      .then((res) => {
        setIsModalVisible(false);
      });
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
  const fetchUsersWithAccess = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://102.133.144.226:8000/api/v1/users/getUsersWithAccess"
      );
      const result = await response.json();
      console.log("API Response:", result);

      if (result.users) {
        const users = result.users.map((item) => ({
          key: item._id,
          ...item,
        }));

        console.log("result",result);
        setData(users);
        // message.success('Users fetched successfully');
      } else {
        // message.error('Failed to fetch users with access.');
      }
    } catch (error) {
      // console.error('Error fetching users with access:', error);
      // message.error('Error fetching users with access.');
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateAccess = async (userId, newAccess) => {
    try {
      await axios.put(
        `http://102.133.144.226:8000/api/v1/users/updateAccess/${userId}`,
        { access: newAccess }
      );
      // message.success('Access updated successfully');
      fetchUsersWithAccess(); // Refresh data
    } catch (error) {
      // console.error('Error updating access:', error);
      // message.error('Error updating access.');
    }
  };
  const handleDeleteAccess = async (userId, accessToRemove) => {
    try {
      await axios.delete(
        `http://102.133.144.226:8000/api/v1/users/deleteAccess/${userId}`,
        { data: { accessToRemove } }
      );
      // message.success('Access deleted successfully');
      fetchUsersWithAccess(); // Refresh data
    } catch (error) {
      // console.error('Error deleting access:', error);
      // message.error('Error deleting access.');
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Access",
      dataIndex: "access",
      render: (access) => access.join(", "), // Join array elements into a string
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
    .filter((user) => user.access && user.access.length > 0) // Filter out users with no access
    .map((user) => ({
      key: user._id, // Ensure 'key' is assigned correctly
      name: user.name,
      access: user.access, // Join access array into a comma-separated string
      update: "Update Access",
      delete: "Delete Access",
    }));

  const accessOptions = [
    "Employee",
    "Driver",
    "Vehicle",
    "Intercity Request",
    // "Courier",
    "Cancel Request",
    "Airport Booking",
    "Setups",
    "Location",
    // "Exception Report",
    "Master Card",
  ];
  useEffect(() => {
    fetchUsersWithAccess();
  }, []);
  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Give Access
      </Button>
      <br />
      <br />
      <h2>Give User Access</h2>
      <br />

      <Modal
        title="Give Access"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flex gap="small">
          <Select
            showSearch
            value={searchValue}
            placeholder="Type to search users"
            style={{ width: 300 }}
            onSearch={handleSearch1} // Filter options as the user types
            onChange={setSearchValue} // Update the selected value
            filterOption={false} // Disable default filtering to use custom filtering
            notFoundContent={loading ? "Loading..." : "No results found"} // Loading or empty message
          >
            {filteredOptions?.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Flex>

        <Table
          rowSelection={{
            type: "checkbox",
            onChange: handleCheckboxChange,
          }}
          columns={[{ title: "Access", dataIndex: "access" }]}
          dataSource={accessOptions.map((option) => ({
            key: option,
            access: option,
          }))}
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
