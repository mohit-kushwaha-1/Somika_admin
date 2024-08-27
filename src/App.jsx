import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MasterCards from './Components/AdminPanel/MasterCards';
// import MasterDetail from './Components/AdminPanel/MasterDetail';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import CompanyMaster from './Components/Masters/CompanyMaster';
import LocationMaster from './Components/Masters/LocationMaster';
import DepartmentMaster from './Components/Masters/DepartmentMaster';
import CabTripStatusMaster from './Components/Masters/CabTripStatusMaster';
import RideTypeMaster from './Components/Masters/RideTypeMaster';
import CourierStatusMaster from './Components/Masters/CourierStatusMaster';
import DomainName from './Components/Masters/DomainName';
import EmployeeStatus from './Components/Masters/EmployeeStatus';
import IsAdmin from './Components/Masters/IsAdmin';
import Capacity from './Components/Masters/Capacity';
import TransmissionType from './Components/Masters/TransmissionType';
import RejectionReason from './Components/Masters/RejectionReason';
import DollarValue from './Components/Masters/DollarValue';
import IdType from './Components/Masters/IdType';
// import DriverPostData from './Components/PostData/DriverPostData';
// import VehiclePostData from './Components/PostData/VehiclePostData';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdminPanel />} />
        <Route path="/" exact component={MasterCards} />
        {/* <Route path="/master/:masterType" element={<MasterDetail/>} /> */}
        <Route path='/company-master' element={<CompanyMaster />} />
        <Route path='/location-master' element={<LocationMaster />} />
        <Route path='/department-master' element={<DepartmentMaster/>} />
        <Route path='/cab-trip-status' element={<CabTripStatusMaster/>}/>
        <Route path='/ride-type-master' element={<RideTypeMaster/>} />
        <Route path='/courier-status-master' element={<CourierStatusMaster/>} />
        <Route path='/domain-name' element={<DomainName/>} />
        <Route path='/employee-status' element={<EmployeeStatus/>} />
        <Route path='/is-admin' element={<IsAdmin/>} />
        <Route path='/capacity' element={<Capacity/>} />
        <Route path='/transmission-type' element={<TransmissionType/>} />
        <Route path='/rejection-reason' element={<RejectionReason/>} />
        <Route path='/dollar-value' element={<DollarValue/>} />
        <Route path='/id-type' element={<IdType/>} />
        {/* <Route path='/driverData' element={<DriverPostData/>} /> */}
        {/* <Route path='/vehicleData' element={<VehiclePostData/>} /> */}

      </Routes>
    </Router>
  );
};

export default App;
