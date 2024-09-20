import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button ,Dropdown} from "antd";
import { BellOutlined,TranslationOutlined ,TruckOutlined  } from "@ant-design/icons";
import { Badge, Space } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  CarOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
  FormOutlined,
  HomeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Employees from "./Employees";
import Drivers from "./Drivers";
import Vehicle from "./Vehicle";
import Trips from "./Trips";
import Couriers from "./Couriers";
import Requests from "./Requests";
import BaseLocationReporting from "./BaseLocationReporting";
import ExceptionReport from "./ExceptionReport";
import ProfileDetail from "./ProfileDetail";
import MasterCards from "./MasterCards";
import CompanyMaster from "../Masters/CompanyMaster";
import LocationMaster from "../Masters/LocationMaster";
import DepartmentMaster from "../Masters/DepartmentMaster";
import CabTripStatusMaster from "../Masters/CabTripStatusMaster";
import RideTypeMaster from "../Masters/RideTypeMaster";
import CourierStatusMaster from "../Masters/CourierStatusMaster";
import DomainName from "../Masters/DomainName";
import EmployeeStatus from "../Masters/EmployeeStatus";
import IsAdmin from "../Masters/IsAdmin";
import Capacity from "../Masters/Capacity";
import TransmissionType from "../Masters/TransmissionType";
import RejectionReason from "../Masters/RejectionReason";
import DollarValue from "../Masters/DollarValue";
import IdType from "../Masters/IdType";
import Brand from "../Masters/Brand";
import UserAccess from "./UserAccess";
import "../Styles/AdminPanel.css";
import yourLogo from "../Assets/logo (1) 2.svg";
import CountryCode from "../Masters/CountryCode";
import { icons } from "antd/es/image/PreviewGroup";
import AirportTrip from "./AirportTrip";
import Airportport from "../Airport/Airportport";
import Notify from "../../Notify";

const { Header, Sider, Content } = Layout;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [userAccess, setUserAccess] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.access) {
      setUserAccess(userData.access);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const handleMenuClick = (e) => {
    setSelectedTab(e.key);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <ProfileDetail />;
      case "user-access":
        return <UserAccess />;
      case "driver":
        return <Drivers />;
        case "notification":
        return <Notify setSelectedTab={setSelectedTab}/>;

        case "airport":
        return <AirportTrip  setSelectedTab={setSelectedTab} />;
        case "airportbook":
        return <Airportport   />;
      case "vehicle":
        return <Vehicle />;
      case "trips":
        return <Trips />;
      // case "couriers":
      //   return <Couriers />;
      // case "requests":
      //   return <Requests />;
      case "base-location-reporting":
        return <BaseLocationReporting />;
      // case "exception-report":
      //   return <ExceptionReport />;
      case "master-card":
        return <MasterCards setSelectedTab={setSelectedTab} />;
      case "company-master":
        return <CompanyMaster />;
      case "location-master":
        return <LocationMaster />;
      case "department-master":
        return <DepartmentMaster />;
      case "cab-trip-status":
        return <CabTripStatusMaster />;
      case "ride-type-master":
        return <RideTypeMaster />;
      case "courier-status-master":
        return <CourierStatusMaster />;
      case "domain-name":
        return <DomainName />;
      case "employee-status":
        return <EmployeeStatus />;
      case "is-admin":
        return <IsAdmin />;
      case "capacity":
        return <Capacity />;
      case "transmission-type":
        return <TransmissionType />;
      case "rejection-reason":
        return <RejectionReason />;
      case "dollar-value":
        return <DollarValue />;
      case "id-type":
        return <IdType />;
      case "brand":
        return <Brand />;
      case "country-code":
        return <CountryCode />;
      default:
        return <Employees />;
    }
  };


  const menu = (
    <Menu  style={{ width: "200px" }}>
      <Menu.Item key="1">Notification 1</Menu.Item>
      <Menu.Item key="2">Notification 2</Menu.Item>
      <Menu.Item key="3">Notification 3</Menu.Item>
      <Menu.Item key="4">Notification 4</Menu.Item>
    </Menu>
  );

  // Check if the user has "all" access
  const hasAllAccess = userAccess.includes("all");
  // If "all" is in access, show all menu items

  // Access options mapping with corresponding menu items
  const accessOptionsMap = {
    employee: { key: "employees", icon: <TeamOutlined />, label: "Employees" },
    driver: { key: "driver", icon: <TruckOutlined />, label: "Driver" },
    vehicle: { key: "vehicle", icon: <CarOutlined />, label: "Vehicle" },
    trip: { key: "trips", icon: <EnvironmentOutlined />, label: "Intercity Request" },
    // courier: { key: "couriers", icon: <CarryOutOutlined />, label: "Courier" },
    // request: { key: "requests", icon: <FormOutlined />, label: "Request" },
    airport: { key: "airport", icon: <TranslationOutlined />, label: "Airport Booking" },
    "base location": {
      key: "base-location-reporting",
      icon: <HomeOutlined />,
      label: "Location",
    },
    // "exception report": {
    //   key: "exception-report",
    //   icon: <WarningOutlined />,
    //   label: "Exception Report",
    // },
    "master card": {
      key: "master-card",
      icon: <TeamOutlined />,
      label: "Setups",
    },
    "user-access": {
      key: "user-access",
      icon: <TeamOutlined />,
      label: "User Access",
    },
  };
  // <Menu.Item key="user-access" icon={<TeamOutlined />}>
  //     User Access
  // </Menu.Item>
  const menuItems = hasAllAccess
    ? Object.values(accessOptionsMap)
    : userAccess.map((access) => accessOptionsMap[access.toLowerCase()]);
  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <Header className="header">
        <div className="logo-vinMart">
          <img src={yourLogo} alt="VinMart Logo" />
        </div>
        {/* <div className="profile-section">
                    <Avatar size={40} icon={<UserOutlined />} />
                    <span className="profile-name">Somika</span>
                </div>
                 */}


       <div>

       {/* <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" style={{ width: "300px" }}>
        <a onClick={(e) => e.preventDefault()} style={{ width: "300px" }}>
          <Badge count={99}>
            <Avatar shape="square" size="large">
              <BellOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Avatar>
          </Badge>
        </a>
      </Dropdown> */}

        
           <Notify/>

         

        <Button type="primary" onClick={handleLogout}  style={{ marginLeft: '20px' }}>
          Logout
        </Button>
       </div>


      </Header>
      <Layout>
        <Sider className="sider">
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            {/* <Menu.Item key="employees" icon={<TeamOutlined />}>
                            Employees
                        </Menu.Item>
                        <Menu.Item key="driver" icon={<CarOutlined />}>
                            Driver
                        </Menu.Item>
                        <Menu.Item key="vehicle" icon={<CarOutlined />}>
                            Vehicle
                        </Menu.Item>
                        <Menu.Item key="trips" icon={<EnvironmentOutlined />}>
                            Trip
                        </Menu.Item>
                        <Menu.Item key="couriers" icon={<CarryOutOutlined />}>
                            Courier
                        </Menu.Item>
                        <Menu.Item key="requests" icon={<FormOutlined />}>
                            Request
                        </Menu.Item>
                        <Menu.Item key="base-location-reporting" icon={<HomeOutlined />}>
                            Location
                        </Menu.Item>
                        <Menu.Item key="exception-report" icon={<WarningOutlined />}>
                            Exception Report
                        </Menu.Item>
                        <Menu.Item key="master-card" icon={<TeamOutlined />}>
                            Master Card
                        </Menu.Item>
                        <Menu.Item key="user-access" icon={<TeamOutlined />}>
                            User Access
                        </Menu.Item> */}
            {menuItems.map((menuItem) => (
              <Menu.Item key={menuItem?.key} icon={menuItem?.icon}>
                {menuItem?.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content className="content">{renderContent()}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
