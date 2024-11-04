import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material'; // Import the theme hook
import { tokens } from '../../theme'; // Assuming you're using a custom theme
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const theme = useTheme(); // Access theme
  const colors = tokens(theme.palette.mode); // Get color tokens for light/dark modes
  const navigate=useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/forgot-password', { email });
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Forgot Password Error:', error);
      setMessage('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>

      <Box component="form" onSubmit={handleForgotPassword} sx={{ width: '400px' }}>
        {/* TextField for Email Address */}
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {message && (
          <Typography color={message.includes('failed') ? 'error' : 'primary'} variant="body2" gutterBottom>
            {message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          Send Reset Link
        </Button>
      </Box>

      <Link to="/login">Back to Login</Link>
    </Box>
  );
};

export default ForgotPassword;
