
import React, { useState } from 'react';
import { Layout, Menu, Avatar, } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, CarOutlined, EnvironmentOutlined, CarryOutOutlined, FormOutlined, HomeOutlined, WarningOutlined, } from '@ant-design/icons';
import Employees from './Employees';
import Drivers from './Drivers';
import Vehicle from './Vehicle';
import Trips from './Trips';
import Couriers from './Couriers';
import Requests from './Requests';
import BaseLocationReporting from './BaseLocationReporting';
import ExceptionReport from './ExceptionReport';
import '../Styles/AdminPanel.css';
import ProfileDetail from './ProfileDetail';
import MasterCards from './MasterCards';

import CompanyMaster from '../Masters/CompanyMaster';
import LocationMaster from '../Masters/LocationMaster';
import DepartmentMaster from '../Masters/DepartmentMaster';
import CabTripStatusMaster from '../Masters/CabTripStatusMaster';
import RideTypeMaster from '../Masters/RideTypeMaster';
import CourierStatusMaster from '../Masters/CourierStatusMaster';
import DomainName from '../Masters/DomainName';
import EmployeeStatus from '../Masters/EmployeeStatus';
import IsAdmin from '../Masters/IsAdmin';
import Capacity from '../Masters/Capacity';
import TransmissionType from '../Masters/TransmissionType';
import RejectionReason from '../Masters/RejectionReason';
import DollarValue from '../Masters/DollarValue';
import IdType from '../Masters/IdType';
const { Header, Sider, Content } = Layout;

const AdminPanel = () => {
    const [selectedTab, setSelectedTab] = useState('dashboard');
    const handleMenuClick = (e) => {
        setSelectedTab(e.key);
    };

    // const renderContent = () => {
    //     switch (selectedTab) {
    //         case 'dashboard':
    //             return <ProfileDetail />;
    //         case 'driver':
    //             return <Drivers />;
    //         case 'vehicle':
    //             return <Vehicle />;
    //         case 'trips':
    //             return <Trips />;
    //         case 'couriers':
    //             return <Couriers />;
    //         case 'requests':
    //             return <Requests />;
    //         case 'base-location-reporting':
    //             return <BaseLocationReporting />;
    //         case 'exception-report':
    //             return <ExceptionReport />;
    //         case 'master-card':
    //             return <MasterCards />;
    //         default:
    //             return <Employees />;
    //     }
    // };


    const renderContent = () => {
        switch (selectedTab) {
            case 'dashboard':
                return <ProfileDetail />;
            case 'driver':
                return <Drivers />;
            case 'vehicle':
                return <Vehicle />;
            case 'trips':
                return <Trips />;
            case 'couriers':
                return <Couriers />;
            case 'requests':
                return <Requests />;
            case 'base-location-reporting':
                return <BaseLocationReporting />;
            case 'exception-report':
                return <ExceptionReport />;
            case 'master-card':
                return <MasterCards setSelectedTab={setSelectedTab} />;
            case 'company-master':
                return <CompanyMaster />;
            case 'location-master':
                return <LocationMaster />;
            case 'department-master':
                return <DepartmentMaster />;
            case 'cab-trip-status':
                return <CabTripStatusMaster />;
            case 'ride-type-master':
                return <RideTypeMaster />;
            case 'courier-status-master':
                return <CourierStatusMaster />;
            case 'domain-name':
                return <DomainName />;
            case 'employee-status':
                return <EmployeeStatus />;
            case 'is-admin':
                return <IsAdmin />;
            case 'capacity':
                return <Capacity />;
            case 'transmission-type':
                return <TransmissionType />;
            case 'rejection-reason':
                return <RejectionReason />;
            case 'dollar-value':
                return <DollarValue />;
            case 'id-type':
                return <IdType />;
            default:
                return <Employees />;
        }
    };
    


    return (
        <>
            <Layout style={{ minHeight: '100vh', maxWidth: '100vw' }}>
                <Header className="header">
                    <div className="profile-section">
                        <Avatar size={40} icon={<UserOutlined />} />
                        <span className="profile-name">Somika</span>
                        {/* <Button type="primary" className="logout-button" >
                            Logout
                        </Button> */}
                    </div>
                </Header>
                <Layout>
                    <Sider className="sider">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['dashboard']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={handleMenuClick}
                        >
                            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                                Dashboard
                            </Menu.Item>
                            <Menu.Item key="employees" icon={<TeamOutlined />}>
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
                                Base Location
                            </Menu.Item>
                            <Menu.Item key="exception-report" icon={<WarningOutlined />}>
                                Exception Report
                            </Menu.Item>
                            <Menu.Item key="master-card" icon={<TeamOutlined />}>
                                Master Card
                            </Menu.Item>

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px' }}>
                        <Content className="content">
                            {renderContent()}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

export default AdminPanel
