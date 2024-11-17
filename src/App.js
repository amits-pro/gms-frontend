import { Routes, Route, useNavigate } from "react-router-dom";
import FAQ from "./scenes/public/faq";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginForm from "./scenes/auth/login";
import RegistrationForm from "./scenes/auth/registeruser";
import { useState, useEffect } from "react";
import ForgotPassword from "./scenes/auth/forgot-password";
import About from "./scenes/public/about";
import Resources from "./scenes/public/resources";
import Homepage from "./scenes/homepage";
import AllUsers from "./scenes/admin/users";
import ProtectedRoute from "../src/security/ProtectedRoute";
import EditProfile from "./scenes/auth/edit-profile";
import AdminDashboard from "./scenes/admin/dashboard";
import ResetPassword from "./scenes/auth/reset-password";
import Footer from "./global/Footer"; // Import Footer component
import { RoleProvider } from "./security/RoleContext";
import GrievanceControllerDashboard from "./scenes/grivance controller/dashboard";
import AssignGrievance from "./scenes/grivance controller/assign-grievance";
import { DataProvider } from "./security/DataContext";
import GrievanceManagerDashboard from "./scenes/grievance manager/dashboard";
import GrievanceProgress from "./scenes/grievance manager/grievance-progress";
import UploadFAQ from "./scenes/admin/upload-faqs";
import GrievanceCharts from "./scenes/grivance controller/charts";
import UpdateUser from "./scenes/admin/update-user";
import GrievanceManagerCharts from "./scenes/grievance manager/charts";
import AllGrievances from "./scenes/grievance/listofgrievance";
import GrievanceForm from "./scenes/grievance/grievanceform";
import GrievanceUpdate from "./scenes/grievance/update";
import NavBar from "../src/global/NavBar";

function App() {
  const [theme, colorMode] = useMode();
  const [isHomeNav, setIsHomeNav] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/home") || currentPath.startsWith("/profile")) {
      setIsHomeNav(false);
    }
  }, []);

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoleProvider>
          <DataProvider>
            <NavBar />
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: '1 0 auto' }}>
                <Routes>
                  {/* Public Routes */}
                  <Route exact path="/" element={<LoginForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="/home" element={<Homepage setIsHomeNav={setIsHomeNav} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/allusers" element={<AllUsers />} />
                  <Route path="/faqs" element={<UploadFAQ />} />
                  <Route path="/edit-profile" element={<ProtectedRoute rolesRequired={['Student', 'Faculty', "Admin", "Grievance Controller", "Grievance Supervisor","Grievance Officer"]}><EditProfile /></ProtectedRoute>} />

                  {/* Student, faculty routes */}
                  <Route path="/grievanceform" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><GrievanceForm /></ProtectedRoute>} />
                  <Route path="/grievances" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><AllGrievances /></ProtectedRoute>} />
                  <Route path="/grievance-update" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><GrievanceUpdate /></ProtectedRoute>} />

                  {/* Admin routes */}
                  <Route path="/allusers" element={<ProtectedRoute rolesRequired={['Admin']}><AllUsers /></ProtectedRoute>} />
                  <Route path="/admin-dashboard" element={<ProtectedRoute rolesRequired={['Admin']}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/update-user" element={<ProtectedRoute rolesRequired={['Admin']}><UpdateUser /></ProtectedRoute>} />

                  {/* Grievance controller routes */}
                  <Route path="/grievance-controller/dashboard" element={<ProtectedRoute rolesRequired={['Grievance Controller']}><GrievanceControllerDashboard /></ProtectedRoute>} />
                  <Route path="/assign-grievance" element={<ProtectedRoute rolesRequired={['Grievance Controller']}><AssignGrievance /></ProtectedRoute>} />

                  {/* Grievance manager routes */}
                  <Route path="/grievance-manager/list" element={<ProtectedRoute rolesRequired={['Grievance Supervisor', 'Grievance Officer']}><GrievanceManagerDashboard /></ProtectedRoute>} />
                  <Route path="/grievance-progress" element={<ProtectedRoute rolesRequired={['Grievance Supervisor', 'Grievance Officer']}><GrievanceProgress /></ProtectedRoute>} />
                  <Route path="/manager-charts" element={<ProtectedRoute rolesRequired={['Grievance Supervisor', 'Grievance Officer']}><GrievanceManagerCharts /></ProtectedRoute>} />

                  {/* Reports accessible to specific roles */}
                  <Route path="/reports" element={<ProtectedRoute rolesRequired={['Grievance Controller','Grievance Supervisor','Grievance Officer']}><GrievanceCharts /></ProtectedRoute>} />
                </Routes>
              </Box>
              <Footer /> {/* Footer is added here to render on all pages */}
            </Box>
          </DataProvider>
        </RoleProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
