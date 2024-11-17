import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme'; // Assuming you have a theme set up with tokens
import { useGSMContext } from '../../security/RoleContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation


const UploadFAQ = () => {
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

  
    // JSON data as a multiline string using template literals
    const faqExample = `[      
    {
        question: "What is a grievance?",
        answer: "A grievance is a formal complaint raised by an individual regarding any issue they are facing in the institution. It could be related to academics, facilities, harassment, or any other concern."
      },
      {
        question: "How do I submit a grievance?",
        answer: "You can submit your grievance through the online Grievance Management Portal by logging into your account, filling out the form with details about the issue, and submitting it for review."
      },
      {
        question: "What happens after I submit a grievance?",
        answer: "After submitting, your grievance will be reviewed by the relevant authorities, and you'll receive updates on the status of your grievance via the portal or email notifications."
      },
    ]`;

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
        marginTop: '50px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Upload FAQs
      </Typography>
      <Box component="form" onSubmit={handleGrievance} sx={{ width: '1000px' }}>
        <Grid container spacing={1}>
          {/* TextField for Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="FAQs"
              name="faqs"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              multiline
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
              label="Example"
              name="example"
              value={faqExample}
              onChange={handleChange}
              margin="normal"
              multiline
              required
              disabled                
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

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ marginTop: '20px', width: '50%', marginLeft:'240px'}}
        >
          Upload
        </Button >
      </Box>
    </Box>
  );
};

export default UploadFAQ;
