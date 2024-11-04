import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGSMContext } from '../../security/RoleContext';
import { useDataContext } from "../../security/DataContext";
import { useTheme } from '@mui/material';
import { Paper, CircularProgress, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const GrievanceProgress = () => {
  
  const theme = useTheme();
  const { rowData } = useDataContext();
  const { userId } = useGSMContext();
  const navigate = useNavigate();
  // Initial state with form data
  const [formData, setFormData] = useState({
    grievanceId: '',
    assignedBy: '',
    grievanceType: '',
    priority: '',
    remarks: '',
    assignedTo: '',
    role: '',
    status: ''
  });

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

  const isResolved = (rowData.status === "Resolved") ? true: false;
  const formHeader = (rowData.status === "Resolved") ? 'View Grievance': 'Update Grievance';
  

  const [grievances, setGrievances] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update formData based on rowData when rowData changes
  useEffect(() => {


    
    setFormData(prevFormData => ({
      ...prevFormData,
      status: rowData.status || '', 
      grievanceType: rowData.grievanceType || '',
      grievanceId: rowData.id || '',
      priority: rowData.priority || '',
      remarks: rowData.remarks || '',
      assignedTo: rowData.assignedTo || '',
      role: rowData.assignedUserRole || '',
      assignedBy: userId
    }));
  }, [rowData]);

  const fetchUserData = async (type) => {
    try {
      const response = await axios.get(`http://localhost:8080/grievance-officers?grievanceType=${type}`);
      formData.role = '';
      setOfficers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (rowData.grievanceType) fetchUserData(rowData.grievanceType);
  }, [rowData.grievanceType]);

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


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      // Conditional actions based on field name
      if (name === 'assignedTo') {
        console.log('change');
        const newRole = getRoleById(value) || '';
        updatedFormData = { ...updatedFormData, role: newRole };
      } else if (name === 'grievanceType') {
        fetchUserData(value);
      }

      return updatedFormData;
    });
  };

  const getRoleById = (id) => {
    const officer = officers.find((officer) => officer.id === id);
    return officer ? officer.role : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.id = userId;
    console.log(formData);
    try {
      await axios.put('http://localhost:8080/grievance-assign', formData);
      navigate('/grievance-manager/dashboard'); 
    } catch (error) {
      console.error('Assignation Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
      }}
    >
      <Typography variant="h4" gutterBottom>
      {formHeader}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '1200px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={rowData.title || ''}
              margin="normal"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={rowData.description || ''}
              margin="normal"
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="grievanceType-label" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                Grievance Type
              </InputLabel>
              <Select
                labelId="grievanceType-label"
                id="grievanceType"
                name="grievanceType"
                value={formData.grievanceType}
                onChange={handleChange}
                label="Grievance Type"
                disabled = {isResolved}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
                }}
              >
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Financial">Financial</MenuItem>
                <MenuItem value="Technical">Technical</MenuItem>
                <MenuItem value="Administrative">Administrative</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="priority-label" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                Priority
              </InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                label="Priority"
                disabled = {isResolved}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
                }}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="status-label" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
                disabled = {isResolved}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
                }}
              >
                <MenuItem value="Decline">Decline</MenuItem>
                <MenuItem value="In Progess">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="assignedTo-label" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                Assign To
              </InputLabel>
              <Select
                labelId="assignedTo-label"
                id="assign-to"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                label="Assign To"
                disabled = {isResolved}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
                }}
              >
                {officers.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              margin="normal"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              type="text"
              value={formData.remarks}
              onChange={handleChange}
              margin="normal"
              disabled = {isResolved}
              />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Update
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

export default GrievanceProgress;
