import { Box, IconButton, useTheme, Tabs, Tab } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import { useNavigate, useLocation } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import logo from "../assets/applogo.png";
import { Link } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useGSMContext } from "../security/RoleContext"; 
import { Cases } from "@mui/icons-material";


const AdminNavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // For navigation
  const { changeRole, changeUserId } = useGSMContext();
  const location = useLocation();
  // State to track the active tab
  const [selectedTab, setSelectedTab] = useState(0);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    // Navigation based on tab selection
    switch (newValue) {
/*       case 0:
        navigate("/admin-dashboard"); // Navigate to the Dashboard
        break;
 */    case 0:
        navigate("/allusers"); // Navigate to All Users
        break;
        case 1:
          navigate("/faqs"); // Navigate to Grievance History
          break;
     default:
        navigate("/home"); // Default navigation
    }
  };

  const handleLogout = () =>  {
    localStorage.removeItem('authToken');
    navigate("/login");
    changeRole("guest");
    changeUserId(-1);

  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ flexWrap: "wrap" }}>
      {/* Logo and Tabs Container */}
      <Box display="flex" alignItems="center" sx={{ flexWrap: "wrap" }}>
        {/* Logo */}
        <Link to="/home">
          <img
            src={logo}
            alt="Admin Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%", // Make it circular
              objectFit: "cover",  // Ensure the image covers the area
              marginRight: "20px", // Space between logo and tabs
            }}
          />
        </Link>

        {/* TABS FOR ADMIN NAVIGATION */}
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="primary"
          sx={{
            minHeight: "48px", // Responsive height for tabs
            overflowX: "auto", // Enable scrolling if screen width is small
            '& .MuiTab-root': {
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Font size responsive to screen size
            },
          }}
        >
         {/* <Tab label="Dashboard" /> */}         
          <Tab label="All Users" />
          <Tab label="Upload FAQs" />
          {/* 
          <Tab label="Reports" /> */}
        </Tabs>
      </Box>

      {/* Right Icons */}
      <Box display="flex" alignItems="center">
      <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
          </IconButton>

      <Link to="/edit-profile" state={{ referrer: location.pathname }} style={{ color: 'inherit', textDecoration: 'none' }}>
          <IconButton color="inherit">
            <PersonOutlinedIcon />
          </IconButton>
      </Link> 

      <IconButton onClick={handleLogout} color="inherit">
          <LogoutOutlinedIcon />
       </IconButton>


      </Box>

        
    </Box>
  );
};

export default AdminNavBar;
