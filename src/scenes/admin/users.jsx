import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, Chip, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useGSMContext } from '../../security/RoleContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Stack } from '@mui/material';
import { useDataContext } from "../../security/DataContext";


const AllUsers = () => {
  // State to hold the list of grievances and loading state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId} = useGSMContext();
  const navigate = useNavigate();
  const { setRowData } = useDataContext();

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users?userId=${userId}`);
      setUsers(response.data); // Assuming data is an array of grievances
      setLoading(false); // Stop loading
      console.log(users);
      } catch (error) {
      console.error('Error fetching grievances:', error);
      setLoading(false); // Stop loading in case of error
    }

  };

  // Fetch grievance data from an API when the component mounts
  useEffect(() => {
    const fetchGrievances = async () => {
      if(loading) {
        getAllUsers();
      }
    };

    fetchGrievances();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 250 },
    { field: 'department', headerName: 'Department', width: 250 },
    { field: 'role', headerName: 'Role', type: 'date', width: 350 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
            <IconButton
                color="secondary"
                onClick={() => handleEditClick(params.row)}
                title="Edit"
            >
                <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton
                color="secondary"
                onClick={() => handleDeleteClick(params.row)}
                title="Delete"
            >
                <FontAwesomeIcon icon={faTrash} />
            </IconButton>
        </Stack>
    ),
    },    
  ];

  // Handle the edit action
    const handleEditClick = (row) => {
      console.log(row);
      setRowData(row);
      navigate('/update-user');
    };

// Handle the edit action
const handleDeleteClick = async (row) => {
  // Open edit dialog or route to edit page with row data
  console.log(row.id);
  try {
    const response = await axios.delete(`http://localhost:8080/users?userId=${row.id}`);
    const users = await getAllUsers();
    setUsers(users.data); // Assuming data is an array of grievances
    } catch (error) {
    setLoading(false); // Stop loading in case of error
  }

};

  // Function to get chip color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'In Progress':
        return 'info';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
       All Users 
      </Typography>

      {/* Display loading spinner while data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ height: 400, width: '100%', padding: 2 }}>
          {/* DataGrid component to display grievance status */}
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};

export default AllUsers;


