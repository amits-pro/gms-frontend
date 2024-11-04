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


const GrievanceControllerDashboard = () => {
  // State to hold the list of grievances and loading state
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId} = useGSMContext();
  const navigate = useNavigate();
  const { setRowData } = useDataContext();
  

  // Fetch grievance data from an API when the component mounts
  useEffect(() => {
    const fetchGrievances = async () => {
      if(loading) {
        try {

          const response = await axios.get(`http://localhost:8080/grievances?userId=${userId}`);
          setGrievances(response.data); // Assuming data is an array of grievances
          setLoading(false); // Stop loading
  
        } catch (error) {
          console.error('Error fetching grievances:', error);
          setLoading(false); // Stop loading in case of error
        }
      }
    };

    fetchGrievances();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Detail', width: 400 },
    { field: 'grievanceType', headerName: 'Type', width: 150 },
    { field: 'raisedBy', headerName: 'Raised By', width: 150 },
    { field: 'raisedOn', headerName: 'Raised On', type: 'date', width: 150 },
    { field: 'assignedUser', headerName: 'Assigned To', type: 'date', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 150 },
    
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value)} 
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
            <IconButton
                color="primary"
                onClick={() => handleEditClick(params.row)}
                title="Edit"
            >
                <FontAwesomeIcon icon={faEdit} />
            </IconButton>
        </Stack>
    ),
    },    
  ];

  // Handle the edit action
    const handleEditClick = (row) => {
      setRowData(row);
      navigate('/assign-grievance');
    };

// Handle the edit action
const handleDeleteClick = (row) => {
  // Open edit dialog or route to edit page with row data
  console.log('Delete row:', row);
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
      <Typography variant="h4" gutterBottom align="center">
        Grievance Controller - Dashboard
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
            rows={grievances}
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

export default GrievanceControllerDashboard;


