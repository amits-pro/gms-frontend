import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme'; // Assuming you have a theme set up with tokens
import { useGSMContext } from '../../security/RoleContext';
import { useDataContext } from "../../security/DataContext";
import { Paper, CircularProgress, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';



const GrievanceUpdate = () => {
    const theme = useTheme();
    const { rowData } = useDataContext();
    console.log(rowData);
    const { userId } = useGSMContext();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(''); // Success message state

    // Define the default selected value (e.g., 'banana')
    const [selectedGrievanceType, setGrievanceType] = useState(rowData.grievanceType);
    const [selectedTitle, setTitle] = useState(rowData.title);
    const [selectedDescription, setDescription] = useState(rowData.description);
    const [selectedPriority, setPriority] = useState(rowData.priority);
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAssigned = (rowData.assignedTo) ? true: false; 
    const [remarks, setRemarks] = useState(rowData.remarks);
    const formHeader = (rowData.assignedTo) ? 'View Grievance': 'Edit Grievance'; 
    
      // Define columns for DataGrid
  const columns = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'remarks', headerName: 'Remarks', width: 500 },
    { field: 'grievanceType', headerName: 'Type', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 100 },
    { field: 'raisedOn', headerName: 'RaisedOn', width: 150 },
    { field: 'modifiedBy', headerName: 'Modified By', width: 150 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 125 },
    
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value)} 
          variant="outlined"
        />
      ),
    },        
  ];

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


    // Fetch grievance data from an API when the   mounts
  useEffect(() => {
    const fetchGrievances = async () => {
      if(loading) {
        try {

          const response = await axios.get(`http://localhost:8080/grievance-hist?id=${rowData.id}`);
          console.log('Login Success:', response.data);
          
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


    const colors = tokens(theme.palette.mode); // Get colors based on the theme mode
    const [formData, setFormData] = useState({
      id: rowData.id,
      userId: userId,
      title: rowData.title,
      description: rowData.description,
      grievanceType: rowData.grievanceType,
      priority: rowData.priority,
      status: 'New'
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      switch (name) {
        case 'title':
          setTitle(value);
          break;
        case 'description':
          setDescription(value);
          break;
        case 'grievanceType':
          setGrievanceType(value);
          break;
        case 'priority':
          setPriority(value);
          break;
        default:
          break;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    
    const handleGrievance = async (e) => {
      e.preventDefault();
      formData.userId = userId;
      console.log(formData);
      try {
        const response = await axios.put('http://localhost:8080/grievances', formData);
        setSuccessMessage('Grievance updated successfully!'); // Set success message
      // Navigate after a delay
      setTimeout(() => {
        navigate('/grievances');
      }, 2000); // 2-second delay
      } catch (error) {
        console.error('Grievance Update Error:', error);
      }
    };
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          width: '1600 px',
        }}
      > 
      <Typography variant="h4" gutterBottom align="center">
      {formHeader}
      </Typography>

        <Box component="form" onSubmit={handleGrievance} sx={{ width: '1000px' }}>
          <Grid container spacing={3}>
            {/* TextField for Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={selectedTitle}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isAssigned}
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White text in dark mode
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White label in dark mode
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border in dark mode
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border on hover in dark mode
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border on focus in dark mode
                    },
                  },
                }}
              />
            </Grid>
  
            {/* TextField for Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={selectedDescription}
                onChange={handleChange}
                margin="normal"
                multiline
                disabled={isAssigned}
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White text in dark mode
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White label in dark mode
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border in dark mode
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border on hover in dark mode
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border on focus in dark mode
                    },
                  },
                }}
              />
            </Grid>
  
            {/* Dropdown for Grievance Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="grievanceType-label" sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}>Grievance Type</InputLabel>
                <Select
                  labelId="grievanceType-label"
                  id="grievanceType"
                  name="grievanceType"
                  value={selectedGrievanceType}
                  onChange={handleChange}
                  label="Grievance Type"
                  disabled={isAssigned}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                >
                  <MenuItem value="Hostel">Hostel</MenuItem>
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Campus">Campus</MenuItem>
                  <MenuItem value="Administrative">Administrative</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                </Select>
              </FormControl>
            </Grid>
  
            {/* Dropdown for Priority */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="priority-label" sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}>Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  name="priority"
                  value={selectedPriority}
                  onChange={handleChange}
                  label="Priority"
                  disabled={isAssigned}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                value={remarks}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isAssigned}
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White text in dark mode
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White label in dark mode
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border in dark mode
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border on hover in dark mode
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White border on focus in dark mode
                    },
                  },
                }}
              />
            </Grid>
  
          </Grid>
          {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px', width: '1000px' }}
          >
            Update Grievance
          </Button>
        </Box>
        <Box sx={{ padding: 4, width: '1600px' }}>
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
      </Box>
    );
  };
  
  export default GrievanceUpdate;
  