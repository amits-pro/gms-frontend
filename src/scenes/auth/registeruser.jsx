import React, { useState } from 'react';
import {TextField,Button,Box,Typography,Grid,Select,MenuItem,FormControl,InputLabel} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const roleDeparmentMap = [
  {
    roleId: 1,
    role: "Student",
    departments: [
      {
        id:1,
        name: 'Engineering'
      },
      {
        id:2,
        name: 'Management'
      },
      {
        id:3,
        name: 'Humanities'
      },
      {
        id:4,
        name: 'Nursing'
      }
    ]
  },
  {
    roleId: 2,
    role: "Faculty",
    departments: [
      {
        id:1,
        name: 'Engineering'
      },
      {
        id:2,
        name: 'Management'
      },
      {
        id:3,
        name: 'Humanities'
      },
      {
        id:4,
        name: 'Nursing'
      }
    ]
  }, 
  {
    roleId: 3,
    role: "Grievance Controller",
    departments: [
      {
        id:5,
        name: 'Grievance Office'
      }
    ]
  },
  {
    roleId: 4,
    role: "Grievance Supervisor",
    departments: [
      {
        id:6,
        name: 'Admin'
      },
      {
        id:7,
        name: 'Finance'
      },
      {
        id:8,
        name: 'Security'
      },
      {
        id:9,
        name: 'Academics'
      }
    ]
  },
  {
    roleId: 5,
    role: "Grievance Officer",
    departments: [
      {
        id:6,
        name: 'Admin'
      },
      {
        id:7,
        name: 'Finance'
      },
      {
        id:8,
        name: 'Security'
      },
      {
        id:9,
        name: 'Academics'
      }
    ]
  },
  {
    roleId: 6,
    role: "Admin",
    departments: [
      {
        id:10,
        name: 'Admin'
      }
    ]
  }
]


const RegistrationForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    userId: '',
    role: '',
    salutation:'',
    department: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSalutation, setSalutation] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^\d{10,15}$/; // Adjust regex according to your requirements
    return regex.test(phone);
  };

  const handleRoleChange = (event) => {
    const roleId = event.target.value;
    setSelectedRole(roleId);
    setDepartments(roleDeparmentMap[roleId].departments);
    setSelectedDepartment(""); // Reset department selection

  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSalutationChange = (event) => {
    setSalutation(event.target.value);
  };

  const getDepartmentNameById = (departmentId) => {
    // Loop through each role in the roleDeparmentMap
    for (const role of roleDeparmentMap) {
      // Loop through each department within the role
      for (const department of role.departments) {
        // Check if the department's id matches the provided departmentId
        if (department.id === departmentId) {
          return department.name; // Return the name if a match is found
        }
      }
    }
    return null; // Return null if no department with the given id is found
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the phone number
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError('Phone number must be between 10 to 15 digits.');
      return;
    }
    
    setPhoneError(''); // Clear error message if validation passes
    formData.role = roleDeparmentMap[selectedRole].role;
    formData.department = getDepartmentNameById(selectedDepartment);
    formData.salutation = selectedSalutation;

    console.log(formData);

    try {
      await axios.post('http://localhost:8080/register', formData);
      console.log('Response:', formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
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
      <Typography variant="h2" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '800px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          </Grid>

          {/* Dropdown for Role */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel
                id="role"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                Role
              </InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                label="Role"
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
                {roleDeparmentMap.map((item) => (
                  <MenuItem key={item.roleId - 1} value={item.roleId - 1}>
                    {item.role}
                  </MenuItem>
                ))}
{/*            
 */}              </Select>
            </FormControl>
          </Grid>

          {/* Dropdown for Salutation */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel
                id="salutation"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                Salutation
              </InputLabel>
              <Select
                labelId="salutation"
                id="salutation"
                name="role"
                value={selectedSalutation}
                onChange={handleSalutationChange}
                label="Salutation"
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
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
           </Select>
            </FormControl>
          </Grid>
         
         
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
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
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
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
          </Grid>
          <Grid item xs={12}  >

            <FormControl fullWidth margin="normal" required>
              <InputLabel
                id="department"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                Department
              </InputLabel>
              <Select
                labelId="Department"
                id="department"
                name="Department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                label="Department"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  '& .MuiOutlinedInput-notchedOutline': {
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                }}
              >
                {departments.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
           </Select>
            </FormControl>  

            
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
          </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                required
                error={!!phoneError} // Display error state if validation fails
                helperText={phoneError} // Show error message
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
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
          </Grid>

        <Box>
          <Link to="/login">Account already exists?</Link>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          alignContent="centre"
          sx={{ marginTop: '20px',marginLeft:'160px', width: '50%',justifyContent:"center" }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
