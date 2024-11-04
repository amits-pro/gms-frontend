import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const AllUsers= () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'User ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default AllUsers;
