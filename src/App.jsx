import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MasterCards from './Components/AdminPanel/MasterCards';
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
import Brand from './Components/Masters/Brand';
import UserAccess from './Components/AdminPanel/UserAccess';
import CountryCode from './Components/Masters/CountryCode';
import Login from './Components/Login';


const ProtectedRoute = ({ children }) =>
{
  const authToken = localStorage.getItem('authToken');
  return authToken ? children : <Navigate to="/login" />;
};

const App = () =>
{
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Navigate to="/login" />} />

  
        <Route path="/login" element={<Login />} />

       
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/master-cards"
          element={
            <ProtectedRoute>
              <MasterCards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-master"
          element={
            <ProtectedRoute>
              <CompanyMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/location-master"
          element={
            <ProtectedRoute>
              <LocationMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-master"
          element={
            <ProtectedRoute>
              <DepartmentMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cab-trip-status"
          element={
            <ProtectedRoute>
              <CabTripStatusMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ride-type-master"
          element={
            <ProtectedRoute>
              <RideTypeMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courier-status-master"
          element={
            <ProtectedRoute>
              <CourierStatusMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/domain-name"
          element={
            <ProtectedRoute>
              <DomainName />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-status"
          element={
            <ProtectedRoute>
              <EmployeeStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/is-admin"
          element={
            <ProtectedRoute>
              <IsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/capacity"
          element={
            <ProtectedRoute>
              <Capacity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transmission-type"
          element={
            <ProtectedRoute>
              <TransmissionType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rejection-reason"
          element={
            <ProtectedRoute>
              <RejectionReason />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dollar-value"
          element={
            <ProtectedRoute>
              <DollarValue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/id-type"
          element={
            <ProtectedRoute>
              <IdType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brand"
          element={
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          }
        />
        <Route
          path="/country-code"
          element={
            <ProtectedRoute>
              <CountryCode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-access"
          element={
            <ProtectedRoute>
              <UserAccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
