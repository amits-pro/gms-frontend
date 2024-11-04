import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGSMContext } from '../../security/RoleContext';
import { useDataContext } from "../../security/DataContext";
import { useTheme } from '@mui/material';

const AssignGrievance = () => {
  
  const theme = useTheme();
  const { rowData } = useDataContext();
  const { userId } = useGSMContext();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  // Initial state with form data
  const [formData, setFormData] = useState({
    id: '',
    assignedBy: '',
    grievanceType: '',
    priority: '',
    remarks: '',
    assignedTo: '',
    role: ''
  });

  const [grievances, setGrievances] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update formData based on rowData when rowData changes
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      grievanceId: rowData.id || '',
      grievanceType: rowData.grievanceType || '',
      priority: rowData.priority || '',
      remarks: rowData.remarks || '',
      assignedTo: rowData.assignedTo || '',
      role: rowData.assignedUserRole || '',
      assignedBy: userId,
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
    formData.status = 'Assigned';
    console.log(formData);
    try {
      await axios.put('http://localhost:8080/grievance-assign', formData);
      setSuccessMessage('Grievance assigned successfully!'); // Set success message

      // Navigate after a delay
      setTimeout(() => {
        navigate('/grievance-controller/dashboard');
      }, 2000); // 2-second delay
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
        Assign Grievance
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '800px' }}>
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="assignedTo-label" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                Assigned To
              </InputLabel>
              <Select
                labelId="assignedTo-label"
                id="assign-to"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                label="Assigned To"
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

          <Grid item xs={12}>
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
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default AssignGrievance;
