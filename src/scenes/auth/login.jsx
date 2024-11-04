import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { jwtDecode } from 'jwt-decode'; 
import { useGSMContext } from '../../security/RoleContext';
import { useAuth } from './AuthContext';

const LoginForm = ({onLogin}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [credentials,setCredetials]=useState({userId:'',password:''});
  const navigate = useNavigate();  // Hook to handle navigation
  const { changeRole, changeUserId } = useGSMContext();
  
  
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false, // New state for Remember Me
  });

  const [recaptchaToken, setRecaptchaToken] = useState(''); // reCAPTCHA token

  const handleChange = (e) => {
    setCredetials({...credentials,[e.target.name]:e.target.value});
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked, // Update rememberMe state
    });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token); // Store reCAPTCHA token
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        ...formData,
      });
      localStorage.setItem("gms-token",response.data);
      const decodedData = jwtDecode(response.data)
      const role = decodedData.roles[0];
      console.log(role);
      const userId = decodedData.userId;

      // Redirect based on role
      if (role === 'Student') {
        navigate('/grievances');  // Navigate to admin dashboard
      } else if (role === 'Admin') {
        navigate('/admin-dashboard');  // Navigate to user dashboard
      } else if (role === 'faculty') {
        navigate('/user-nav');  // Navigate to manager dashboard
      } else if(role==='staff'){
        navigate('/dashboard');  // Default dashboard for other roles
      } else if(role==='Grievance Controller'){
        navigate('/grievance-controller/dashboard');  // Default dashboard for other roles
      } else if((role==='Grievance Supervisor') || (role==='Grievance Officer')) {
        navigate('/grievance-manager/dashboard');  // Default dashboard for other roles
      }


      changeRole(role);
      changeUserId(userId)
     

    } catch (error) {
      console.error('Login Error:', error);
      // Handle error
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        color: "primary",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ width: '400px' }}>
        {/* TextField for User Id */}
        <TextField
          fullWidth
          label="User Id"
          name="userId"
          value={formData.userId}
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

        {/* TextField for Password */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
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

        {/* Remember Me Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleRememberMeChange}
              name="rememberMe"
              sx={{
                color: theme.palette.mode === 'dark' ? colors.grey[100] : colors.grey[900],
                '&.Mui-checked': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : colors.primary[500], // White when selected in dark mode
                },
              }}
            />
          }
          label="Remember Me"
        />

        {/* Google reCAPTCHA - Add it right before the login button
        <ReCAPTCHA
          sitekey="6LdDr1cqAAAAAFi4Vf_j7qkBj_iID-OlYbAljbIT" // Your site key from Google
          onChange={handleRecaptchaChange}
        /> */}

        <Link to={"/forgot-password"}>Forgot Password ?</Link>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Login
        </Button>

        <Link to="/register">Account doesn't exist?</Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
