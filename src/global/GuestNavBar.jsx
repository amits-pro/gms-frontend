import { Box, IconButton, useTheme, Tabs, Tab } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import logo from "../assets/applogo.png";
import { Link } from "react-router-dom";

const GuestNavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // For navigation

  // State to track the active tab
  const [selectedTab, setSelectedTab] = useState(0);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    // Navigation based on tab selection
    switch (newValue) {
    
      case 0:
        navigate("/login");
        break;
      case 1:
        navigate("/register");
        break;
      case 2:
        navigate("/faq");
        break;
      case 3:
        navigate("/resources");
        break;
      case 4:
        navigate("/about");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ flexWrap: "wrap" }}>
      {/* Logo and Tabs Container */}
      <Box display="flex" alignItems="center" sx={{ flexWrap: "wrap" }}>
        {/* Logo */}
        <Link to="/home">
          <img
            src={logo}
            alt="Grievance Management Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%", // Make it circular
              objectFit: "cover",  // Ensure the image covers the area
              marginRight: "20px", // Space between logo and tabs
            }}
          />
        </Link>
        {/* Tabs for Navigation */}
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
          <Tab label="Login" />
          <Tab label="Register User" />
          <Tab label="FAQ" />
          <Tab label="Resources" />
          <Tab label="About" />
        </Tabs>
      </Box>
      {/* Theme Toggle Icon */}
      <Box>
        <IconButton onClick={colorMode.toggleColorMode} sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
          {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default GuestNavBar;
