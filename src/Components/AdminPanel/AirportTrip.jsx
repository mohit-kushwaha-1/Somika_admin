import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, message, Switch } from 'antd';
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

const AirportTrip = ({ setSelectedTab }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  const handleCardClick = (tabKey) =>
    {
        setSelectedTab(tabKey);
    };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const users = await axios.get(
          "http://102.133.144.226:8000/api/v1/users/getAllUser"
        );
        setUserData(users.data.data);
        console.log(users.data.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const getAlldropBooking = async()=>{
         try {
              const response = await axios.get("http://102.133.144.226:8000/api/v1/trip/getAllAirdropBookings")
               console.log("reponse data is ",response.data);
         } catch (error) {
           console.log(error);
         }
  }


  useEffect(()=>{
    getAlldropBooking();
  },[])

  const handleSearch1 = (value) => {
    setSearchValue(value);
    // console.log("value is ",typeof value);
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

  if(searchValue){
    localStorage.setItem('empId',searchValue);
  }
  console.log("search value is ",typeof searchValue);

  


  
  return (
    <>
      <Flex gap="small">
        <Select
          showSearch
          value={searchValue}
          placeholder={"Type to search users"}
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

        <Button  onClick={() => handleCardClick('airportbook')}>Book now</Button>
      </Flex>
    </>
  );
};

export default AirportTrip;
