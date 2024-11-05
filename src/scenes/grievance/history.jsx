import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const GrievanceHistory = () => {
  // State to hold the list of grievances
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch grievance data from an API when the component mounts
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        // Example API call to fetch the grievance data
        const response = await fetch('/api/grievances');
        const data = await response.json();
        setGrievances(data); // Assuming data is an array of grievances
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching grievances:', error);
        setLoading(false); // Stop loading even in case of error
      }
    };

    fetchGrievances();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'submittedBy', headerName: 'Submitted By', width: 150 },
    { field: 'date', headerName: 'Date Submitted', type: 'date', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'details', headerName: 'Details', width: 300 },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Grievance History
      </Typography>

      {/* Display loading spinner while data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ height: 400, width: '100%', padding: 2 }}>
          {/* DataGrid component to display grievances */}
          <DataGrid
            rows={grievances}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};

export default GrievanceHistory;
