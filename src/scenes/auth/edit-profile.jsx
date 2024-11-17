import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGSMContext } from '../../security/RoleContext';
import { useDataContext } from "../../security/DataContext";


const EditProfile = () => {

  // Initial state with form data
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    userId: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const { userId } = useGSMContext();
  const { rowData } = useDataContext();
  const { location } = useLocation();
  

  

  const navigate = useNavigate();

  // Fetch user data and populate form (assuming API returns user data based on some ID or context)
  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/user-profile?userId=${userId}`); // Example endpoint
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/users', formData);
      setSuccessMessage('User updated successfully!');
      console.log(response.data.role);
      let navigateTo = '';
      switch(response.data.role) {
        case "Student":
          navigateTo = '/grievances';
          break;  
         case "Grievance Controller":
          navigateTo = '/reports';
          break;
         case "Grievance Supervisor":
            navigateTo = '/reports';
            break;
          case "Admin":
              navigateTo = '/allusers';
              break;
  
      }
      setTimeout(() => {
        navigate(navigateTo);
      }, 2000); // 2-second delay
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        outlineColor:'white',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Update Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '600px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              margin="normal"
              outlineColor="white"
              disabled // User ID cannot be changed
            />
          </Grid>

          {/* First Name (disabled) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              disabled // First Name cannot be changed
            />
          </Grid>

          {/* Last Name (disabled) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              disabled // Last Name cannot be changed
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
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
          color="secondary"
          sx={{ marginTop: '20px', width: '50%',marginLeft:'150px' }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
