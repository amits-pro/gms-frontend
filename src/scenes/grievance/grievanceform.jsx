import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme'; // Assuming you have a theme set up with tokens
import { useGSMContext } from '../../security/RoleContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation


const GrievanceForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Get colors based on the theme mode
  const navigate = useNavigate();  // Hook to handle navigation
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    description: '',
    grievanceType: '',
    priority: '',
    status: ''
  });

  const { userId } = useGSMContext();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGrievance = async (e) => {
    e.preventDefault();
    formData.userId = userId;
    formData.status = 'New';
    try {
      const response = await axios.post('http://localhost:8080/grievances', formData);
      navigate("/grievances");
    } catch (error) {
      console.error('Grievance Submission Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '160px',
      
      }}
    >
      <Typography variant="h3" gutterBottom>
        Grievance Form
      </Typography>
      <Box component="form" onSubmit={handleGrievance} sx={{ width: '1000px' }}>
        <Grid container spacing={2} alignContent="center">
          {/* TextField for Title */}
          <Grid item xs={12}  >
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
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
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              required
              
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White text in dark mode
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // White label in dark mode
                },
                '& fieldset': {
                    '& .MuiOutlinedInput-root': {
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
                value={formData.grievanceType}
                onChange={handleChange}
                label="Grievance Type"
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
                <MenuItem value="Personal">Hostel</MenuItem>
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Finance">Financial</MenuItem>
                <MenuItem value="Technical">Campus</MenuItem>
                <MenuItem value="Security">Security</MenuItem>
                <MenuItem value="Administrative">Administrative</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Dropdown for Priority */}
          <Grid item xs={6} >
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="priority-label" sx={{
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}>Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                label="Priority"
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

        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ marginTop: '20px', width: '50%', marginLeft:'180px' }}
        >
          Submit Grievance
        </Button>
      </Box>
    </Box>
  );
};

export default GrievanceForm;
