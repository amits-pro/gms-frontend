import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    userId: '',
    role: '',
    departmentName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Fetch the updated user data from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/${formDara.userId}'); // Example API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '150px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Card sx={{ width: '400px', marginTop: '20px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">User ID:</Typography>
              <Typography variant="body1">{userData.userId}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Role:</Typography>
              <Typography variant="body1">{userData.role}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Department Name:</Typography>
              <Typography variant="body1">{userData.departmentName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">First Name:</Typography>
              <Typography variant="body1">{userData.firstName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Last Name:</Typography>
              <Typography variant="body1">{userData.lastName}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{userData.email}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Phone:</Typography>
              <Typography variant="body1">{userData.phone}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

     
    </Box>
  );
};

export default UserProfile;
