import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";

const ProfileDetail = ({ setSelectedTab }) =>
{
  const [data, setData] = useState();

  const fetchdata = async () =>
  {
    try
    {
      const response = await axios.get(
        "http://102.133.144.226:8000/api/v1/report/summary-report"
      );
      console.log("response", response.data.report);
      setData(response.data.report);
    } catch (error)
    {
      console.log(error);
    }
  };

  useEffect(() =>
  {
    fetchdata();
  }, []);

  const handleNavigate = () =>
  {
    setSelectedTab("vehicle")
  }

  const handleNavigate1 = () =>
  {
    setSelectedTab("trips")
  }

  const handleNavigate2 = () =>
  {
    setSelectedTab("trips")
  }

  const handleNavigate3 = () =>
  {
    setSelectedTab("trips")
  }

  const handleNavigate4 = () =>
  {
    setSelectedTab("vehicle")
  }

  const handleNavigate5 = () =>
  {
    setSelectedTab("vehicle")
  }


  return (


    <>

      <div> <h1>Hey, {JSON.parse(localStorage.getItem("user")).name} </h1></div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "100", gap: 5, marginTop: "30px" }}>

        {/* http://localhost:80/api/v1/report/summary-report */}

        <Card
          title="Active Vehicles"
          // bordered={false}
          style={{
            width: 300,



          }}
        >
          {
            data ? (<>

              <pre style={{ cursor: "pointer" }} onClick={handleNavigate}>Total Active Vehicles : {data?.activeVehicles}</pre>

            </>) : (<></>)
          }

        </Card>



        <Card
          title="Completed Trips"
          // bordered={false}
          style={{
            width: 300,



          }}
        >
          {
            data ? (<>


              <pre style={{ cursor: "pointer" }} onClick={handleNavigate1}>Total Completed Trips : {data?.completedTrips}</pre>

            </>) : (<></>)
          }

        </Card>




        <Card
          title="InProgressTrips"
          // bordered={false}
          style={{
            width: 300,


          }}
        >
          {
            data ? (<>



              <pre style={{ cursor: "pointer" }} onClick={handleNavigate2}>Total InProgress Trips : {data?.inProgressTrips}</pre>


            </>) : (<></>)
          }

        </Card>






        <Card
          title="Total Trips"
          // bordered={false}
          style={{
            width: 300,


          }}
        >
          {
            data ? (<>



              <pre style={{ cursor: "pointer" }} onClick={handleNavigate3}>Total Trips     : {data?.totalTrips}</pre>


            </>) : (<></>)
          }

        </Card>



        <Card
          title="Total Users"
          // bordered={false}
          style={{
            width: 300,


          }}
        >
          {
            data ? (<>


              <pre style={{ cursor: "pointer" }} onClick={handleNavigate4}>Total Users     : {data?.totalUsers}</pre>


            </>) : (<></>)
          }

        </Card>


        <Card
          title="Total Vehicles"
          // bordered={false}
          style={{
            width: 300,


          }}
        >
          {
            data ? (<>


              <pre style={{ cursor: "pointer" }} onClick={handleNavigate5}>Total Vehicles  : {data?.totalVehicles}</pre>

            </>) : (<></>)
          }

        </Card>
      </div>

    </>
  );
};

export default ProfileDetail;
