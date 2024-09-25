import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Text, Box, Flex } from "@chakra-ui/react";
import
{
  Button,
  Modal,
  Table,
  Select,
  message,
  Form,
  Input,
  // Flex,
  Tooltip,
} from "antd";

const AllTrip = () =>
{

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status1, setStatus1] = useState(""); // Default status is "booked"
  const [tripType, setTripType] = useState(""); // Default tripType is "interoffice"
  const [employeeId, setEmployeeId] = useState("");
  const [reportData, setReportData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterN, setFilterN] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [cost, setCost] = useState();
  const [emp, setEmp] = useState();

  console.log("data", startDate, "end", endDate, "status", status1, "triptype", tripType, "emp is", employeeId)



  const handleCost = (record) =>
  {
    setIsModalOpen1(true);
    setLoading(true)
    console.log("record data is", record);

    const data = record?.employeeCosts?.map((item) =>
    {
      const retrundata = {
        cost: item?.cost,
        distanceTraveled: item?.distanceTraveled,
        employeeEmail: item?.employeeEmail,
        employeeName: item?.employeeName,

      }

      return retrundata
    })

    if (data)
    {
      setLoading(false);
    }
    setCost(data)
  }


  const column2 = [
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },

    {
      title: 'Employee Email',
      dataIndex: 'employeeEmail',
      key: 'employeeEmail',
    },

    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },

    {
      title: 'Distance Traveled',
      dataIndex: 'distanceTraveled',
      key: 'distanceTraveled',
    },
  ]

  const fetchEmployees = async () =>
  {


    try
    {
      const response = await fetch('http://102.133.144.226:8000/api/v1/users/getAllUser');
      const result = await response.json();

      console.log("employ data is following ", result.data);
      setEmp(result.data)
    } catch (error)
    {
      console.log(error)
    }
  };


  useEffect(() =>
  {

    fetchEmployees();
  }, []);


  const handleOk1 = () =>
  {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () =>
  {
    setIsModalOpen1(false);
  };

  const filterdataIs = async () =>
  {
    // const id = "66c865228897f067258244f3";
    // startDate=${"2024-09-01"}&endDate=${"2024-09-30"}&status=${"booked"}&tripType=${"interoffice"}&employeeId=${"66c865228897f067258244f3"}
    try
    {
      const response = await axios.get(
        `http://102.133.144.226:8000/api/v1/report/tripReport/?startDate=${ startDate }&endDate=${ endDate }&status=${ status1 }&tripType=${ tripType }&employeeId=${ employeeId }`
      );

      console.log("filter data is now ", response.data.report);
      const data1 = response.data.report

      const finaldata = data1.map((item) =>
      {
        const starttime = item?.startTime;

        const date = new Date(starttime);

        // Get hours and minutes
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        const day = date.getUTCDate();
        const month = date.toLocaleString("en-us", { month: "short" });

        // Convert to 12-hour format and set AM/PM
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // Convert to 12-hour format
        minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed

        // Format the time
        const formattedTime = `${ hours }.${ minutes }${ ampm },${ day }-${ month.toLowerCase() }`;

        const formatDate = (dateString) =>
        {
          const date = new Date(dateString);
          if (isNaN(date.getTime()))
          {
            return "No Date Available";
          }

          return date
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-");
        };

        let bookingDate = formatDate(item?.startTime);

        // let currentLocation = item?.boardingPoint._id;
        // let destinationLocation = item?.destinationPoint._id;
        const returndata = {
          name: item?.employeeCosts[0]?.employeeName,
          Email: item?.employeeCosts[0]?.employeeEmail,
          mobile: "NA",
          BoradingPoint: item?.boardingPoint,
          DestinationPonint: item?.destinationPoint,
          starttime: formattedTime,
          status: item?.status,

          employeeCosts: item?.employeeCosts,


          // currentLocationID: currentLocation,
          // destinationLocationID: destinationLocation,
          // bookingDate1: bookingDate,
          // requestId: item?._id,
        };

        return returndata;
      });
      console.log("filter data is now", response.data);
      console.log("formated data is now ", finaldata);
      setFilteredData(finaldata)
      if (response)
      {
        setFilterN(true);
      }
    } catch (error) { }
  };

  const resetFilter = () =>
  {
    setStartDate("");
    setEndDate("")
    setStatus1("")
    setTripType("")
    setEmployeeId("")
    setFilteredData(null);
    setFilterN(false)

  }

  useEffect(() =>
  {
    const fetchdata = async () =>
    {
      // setLoading(true);
      try
      {
        const response = await axios.get("http://102.133.144.226:8000/api/v1/trip/findAllTrip")
        console.log("response data is", response.data.suitableCabs);

        const data1 = response.data.suitableCabs;

        const data2 = data1?.map((item) =>
        {


          const returndata = {
            vehicle_number: item?.cab?.vehicle_number,
            capacity: item?.cab?.capacity,
            status: item?.cab?.status,
            type: item?.cab?.type,
            pickUpDate: item?.pickUpDate,
            pickUpTime: item?.pickUpTime,
            currentLocation: item?.currentLocation[0]?.label,
            destinationLocation: item?.destinationLocation[0]?.label,

          }

          return returndata
        })

        console.log("data 2 is now ", data2);
        setData(data2)

      } catch (error)
      {
        console.log(error);
      } finally
      {
        setLoading(false);
      }
    };


    fetchdata();
  }, [])




  //   name: item?.employeeCosts[0]?.employeeName         ,
  //   Email: item?.employeeCosts[0]?.employeeEmail,
  //   mobile: "NA",
  //   BoradingPoint: item?.boardingPoint,
  //   DestinationPonint: item?.destinationPoint ,
  //   starttime: formattedTime,
  //   status: item?.status,

  //  employeeCosts:item?.employeeCosts,

  const columns = filterN
    ? [
      // Columns to show when filterN is true
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email',
      },
      {
        title: 'Boarding Point',
        dataIndex: 'BoradingPoint',
        key: 'BoradingPoint',
      },
      {
        title: 'Destination Point',
        dataIndex: 'DestinationPonint',
        key: 'DestinationPonint',
      },
      {
        title: 'Start time',
        dataIndex: 'starttime',
        key: 'starttime',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button onClick={() => handleCost(record)}>View</Button>
        ),
      },
    ]
    : [
      // Columns to show when filterN is false
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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Current Location',
        dataIndex: 'currentLocation',
        key: 'currentLocation',
      },
      {
        title: 'Destination Location',
        dataIndex: 'destinationLocation',
        key: 'destinationLocation',
      },
      {
        title: 'PickUp Time',
        dataIndex: 'pickUpTime',
        key: 'pickUpTime',
      },
      {
        title: 'Pick UpDate',
        dataIndex: 'pickUpDate',
        key: 'pickUpDate',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    ];



  return (
    <>


      <Modal title="Basic Modal" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>

        <Table
          columns={column2}
          dataSource={cost}
          // dataSource={data}
          loading={loading}
          rowKey={(record) => record._id}
        // onRow={(record) => ({
        //   onClick: () => {
        //     handleRowClick(record); // Trigger the click handler
        //   },
        // })}
        />

      </Modal>

      <form   >
        <div style={{ display: "flex" }}>
          <div>
            <label>Start Date: </label>
            <br />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}

              style={{
                border: "1px solid black",
                width: "180px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            />
          </div>

          <div>
            <label>End Date: </label>
            <br />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                border: "1px solid black",
                width: "180px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            />
          </div>

          <div>
            <label>Status: </label>
            <br />
            <select
              value={status1}
              onChange={(e) => setStatus1(e.target.value)}
              style={{
                border: "1px solid black",
                width: "180px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              <option value="">Select Status</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <div>
            <label>Trip Type: </label>
            <br />
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              style={{
                border: "1px solid black",
                width: "180px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            >

              <option value="">Select TripType</option>
              <option value="interoffice">Interoffice</option>
            </select>
          </div>

          {/* emp */}

          <div>
            <label>Employee ID: </label>
            <br />
            {/* <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={{
                border: "1px solid black",
                width: "180px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
              
            /> */}


            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={{
                border: "1px solid black",
                width: "250px",
                marginRight: "10px",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              <option value="">Select Employee</option>
              {emp?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}

            </select>
          </div>
        </div>


      </form>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={filterdataIs} style={{ width: "110px", background: "blue", marginTop: "10px", height: "30px", borderRadius: "10px", color: "white", marginRight: "20px" }}>Filter</button>
        <button onClick={resetFilter} style={{ width: "110px", background: "blue", marginTop: "10px", height: "30px", borderRadius: "10px", color: "white" }}>Reset Filter</button>
      </div>



      <Table
        columns={columns}
        dataSource={filteredData?.reverse() || data?.reverse()}
        // dataSource={data}
        loading={loading}
        rowKey={(record) => record._id}
      // onRow={(record) => ({
      //   onClick: () => {
      //     handleRowClick(record); // Trigger the click handler
      //   },
      // })}
      />
      {/* <h1>welcome</h1> */}
    </>
  )
}

export default AllTrip

