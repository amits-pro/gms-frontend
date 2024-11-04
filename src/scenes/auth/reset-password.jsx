import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material'; // Import the theme hook
import { tokens } from '../../theme'; // Assuming you're using a custom theme

const ResetPassword = () => {
  const theme = useTheme(); // Access theme
  const colors = tokens(theme.palette.mode); // Get color tokens for light/dark modes

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/reset-password', { newPassword });
      setMessage('Password reset successful. Please log in with your new password.');
    } catch (error) {
      console.error('Reset Password Error:', error);
      setMessage('Failed to reset password. Please try again.');
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
        Reset Password
      </Typography>

      <Box component="form" onSubmit={handleResetPassword} sx={{ width: '400px' }}>
        {/* TextField for New Password */}
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
            },
          }}
        />

        {/* TextField for Confirm New Password */}
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
            },
          }}
        />

        {/* Display message */}
        {message && (
          <Typography color={message.includes('failed') || message.includes('match') ? 'error' : 'primary'} variant="body2" gutterBottom>
            {message}
          </Typography>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          Reset Password
        </Button>
      </Box>

      <Link to="/login">Back to Login</Link>
    </Box>
  );
};

export default ResetPassword;
