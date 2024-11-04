// src/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useGSMContext } from '../security/RoleContext';
import AdminNavBar from './AdminNavBar';
import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';
import GrievanceControllerNavBar from './GrievanceControllerNavBar';
import GrievanceManagerNavBar from './GrievanceManager';

const NavBar = () => {
    const { role, userId } = useGSMContext(); // Get the current role from context

    console.log("user id:" + userId);
  
    return (
      <>
        {role === 'Student' && <UserNavBar />}
        {role === 'admin' && <AdminNavBar />}
        {role === 'guest' && <GuestNavBar />}
        {role === 'Grievance Controller' && <GrievanceControllerNavBar />}
        {role === 'Grievance Officer' && <GrievanceManagerNavBar />}
        {role === 'Grievance Supervisor' && <GrievanceManagerNavBar />}
      </>
    );
  };
  
export default NavBar;
