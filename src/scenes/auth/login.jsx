// LoginForm.js
import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { jwtDecode } from 'jwt-decode';
import { useGSMContext } from '../../security/RoleContext';
import Captcha from '../../global/Captcha';

const LoginForm = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { changeRole, changeUserId } = useGSMContext();
  const captchaRef = useRef(null); // Ref for Captcha component

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false,
    captchaAnswer: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (captchaRef.current && captchaRef.current.validateCaptcha()) {
      console.log('Form submitted with:', formData);
      try {
        const response = await axios.post('http://localhost:8080/login', { ...formData });
        localStorage.setItem("gms-token", response.data);
        const decodedData = jwtDecode(response.data);
        const role = decodedData.roles[0];
        const userId = decodedData.userId;

        // Navigate based on role
        switch (role) {
          case 'Student':
            navigate('/grievances');
            break;
          case 'Admin':
            navigate('/allusers');
            break;
          case 'faculty':
            navigate('/user-nav');
            break;
          case 'staff':
            navigate('/dashboard');
            break;
          case 'Grievance Controller':
            navigate('/grievance-controller/dashboard');
            break;
          case 'Grievance Supervisor':
          case 'Grievance Officer':
            navigate('/grievance-manager/dashboard');
            break;
          default:
            navigate('/dashboard');
        }

        changeRole(role);
        changeUserId(userId);
      } catch (error) {
        console.error('Login Error:', error);
      }
    } else {
      console.log('CAPTCHA validation failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        color: 'primary',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ width: '300px' }}>
        <TextField
          fullWidth
          label="User Id"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginLeft: '100px', width: '40%', display: 'flex' }}
        >
          Login
        </Button>
      </Box>
      <Link to="/register" style={{ marginTop: '10px', marginLeft: '150px' }}>
        Account doesn't exist?
      </Link>
      <Captcha
        ref={captchaRef} // Attach ref to Captcha
        value={formData.captchaAnswer}
        onChange={handleChange}
      />
    </Box>
  );
};

export default LoginForm;
