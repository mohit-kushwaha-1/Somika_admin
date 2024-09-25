import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, message, Switch } from 'antd';
import
{
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
// import { Text } from '@chakra-ui/react';

const AirportTrip = ({ setSelectedTab }) =>
{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // console.log("setSelectedTab is",setSelectedTab)

  const handleCardClick = (tabKey) =>
  {
    setSelectedTab(tabKey);
  };

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      setLoading(true);
      try
      {
        const users = await axios.get(
          "http://102.133.144.226:8000/api/v1/users/getAllUser"
        );
        setUserData(users.data.data);
        console.log(users.data.data)
      } catch (error)
      {
        console.error("Error fetching users:", error);
      } finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const getAlldropBooking = async () =>
  {
    try
    {
      const response = await axios.get("http://102.133.144.226:8000/api/v1/trip/getAllAirdropBookings")



      const data1 = response.data.airdropTrips;
      const data2 = data1?.map((item) =>
      {

        const retrundata = {
          employeeName: item?.employeeTrips[0]?.employeeId.name,
          employeeEmail: item?.employeeTrips[0]?.employeeId.email,
          seatbooks: item?.employeeTrips[0]?.seatbooks,
          totalDistance: item?.totalDistance,
          status: item?.status,
          type: item?.type,
          boardingPoint: item.boardingPoint.companyId.name,
          destinationPoint: item.destinationPoint.companyId.name,
        }

        return retrundata
      })

      console.log("reponse data is ", data2);
      setData(data2)
    } catch (error)
    {
      console.log(error);
    }
  }


  useEffect(() =>
  {
    getAlldropBooking();
  }, [])

  const handleSearch1 = (value) =>
  {
    setSearchValue(value);
    // console.log("value is ",typeof value);
    if (value)
    {
      const filtered = userData?.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else
    {
      setFilteredOptions([]);
    }
  };

  if (searchValue)
  {
    localStorage.setItem('empId', searchValue);
  }
  console.log("search value is ", typeof searchValue);


  // status:item?.employeeTrips[0]?.status,
  // seatbooks:item?.employeeTrips[0]?.seatbooks,
  // totalDistance:item?.totalDistance,
  // totalTime:item?.totalTime,
  // type:item?.type,
  const columns = [
    {
      title: 'Email',
      dataIndex: 'employeeEmail',
      key: 'employeeEmail',
    },
    {
      title: 'Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Boarding Point',
      dataIndex: 'boardingPoint',
      key: 'boardingPoint',
    },
    {
      title: 'Destination Point',
      dataIndex: 'destinationPoint',
      key: 'destinationPoint',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },



  ];



  return (
    <>
      {/* <Flex gap="small">
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
      </Flex> */}


      <h1 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Airport Trip</h1>

      <div>
        <Button onClick={() => handleCardClick('airportbook')} type="primary" style={{ marginLeft: "10px" }}>New Booking</Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
      />



    </>
  );
};

export default AirportTrip;
