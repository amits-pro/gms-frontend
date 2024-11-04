// src/RoleContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context
const GSMContext = createContext();

// Custom hook for easier access to RoleContext
export const useGSMContext = () => useContext(GSMContext);

// Context Provider Component
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('guest'); // Default role
  const [userId, setUserId] = useState('-1'); // Default role

  const changeRole = (newRole) => setRole(newRole);
  const changeUserId = (userId) => setUserId(userId);

  return (
    <GSMContext.Provider value={{ role, userId, changeRole, changeUserId }}>
      {children}
    </GSMContext.Provider>
  );
};
