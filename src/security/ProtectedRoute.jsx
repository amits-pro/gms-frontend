// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGSMContext } from './RoleContext';

const ProtectedRoute = ({ rolesRequired, children }) => {
  const { role, userId } = useGSMContext();
  console.log(role);
  console.log(rolesRequired);
  // Check if user role is in the list of required roles and if userId is valid
  if (!rolesRequired.includes(role) || userId === -1) {
    return <Navigate to="/login" />;  // Redirect if role doesn't match or user is invalid
  }

  return children;
};

export default ProtectedRoute;
