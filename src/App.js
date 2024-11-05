import { Routes, Route } from "react-router-dom";
import FAQ from "./scenes/public/faq";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginForm from "./scenes/auth/login";
import RegistrationForm from "./scenes/auth/registeruser";
import Footer from "./global/Footer";
import { useState, useEffect } from "react";
import ForgotPassword from "./scenes/auth/forgot-password";
import About from "./scenes/public/about";
import Resources from "./scenes/public/resources";
import Homepage from "./scenes/homepage";
import AllUsers from "./scenes/admin/users";
import ProtectedRoute from "../src/security/ProtectedRoute";
import UpdateUser from "./scenes/auth/update-user";
import Report from "./scenes/report";
import AdminDashboard from "./scenes/admin/dashboard";
import Settings from "./global/Settings";
import GrievanceHistory from "./scenes/grievance/history";
import GrievanceForm from "./scenes/grievance/form";
import ResetPassword from "./scenes/auth/reset-password";
import NavBar from "./global/NavBar";
import { RoleProvider } from "./security/RoleContext";
import GrievanceUpdate from "./scenes/grievance/update";
import GrievanceControllerDashboard from "./scenes/grivance controller/dashboard";
import AssignGrievance from "./scenes/grivance controller/assign-grievance";
import { DataProvider } from "./security/DataContext";
import GrievanceManagerDashboard from "./scenes/grievance manager/dashboard";
import GrievanceProgress from "./scenes/grievance manager/grievance-progress";
import UserGrievanceDashboard from "./scenes/grievance/dashboard";
import PieChartExample from "./scenes/report/charts";
import UploadFAQ from "./scenes/admin/upload-faqs";

function App() {
  const [theme, colorMode] = useMode();
  const [isHomeNav, setIsHomeNav] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  

  // Fetch user role after login
  useEffect(() => {
  }, []);

  // Example: When user navigates to admin or user pages, disable HomeNav
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/dashboard") || currentPath.startsWith("/profile")) {
      setIsHomeNav(false); // Hide HomeNav after login or on protected routes
    }
  }, []);

  return (
    <RoleProvider>
      <DataProvider>
      <NavBar></NavBar>
          <Routes>
            {/* Public Routes */}
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
            
            {/* student, faculty routes */}
            <Route path="/grievance" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><GrievanceForm /></ProtectedRoute>} />
            <Route path="/grievances" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><UserGrievanceDashboard /></ProtectedRoute>} />
            <Route path="/grievance-update" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><GrievanceUpdate /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute rolesRequired={['Student', 'Faculty']}><UpdateUser /></ProtectedRoute>} />

            {/* admin routes */}
            <Route path="/allusers" element={<ProtectedRoute rolesRequired={['Admin']}><AllUsers /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<UpdateUser/>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute rolesRequired={['Admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<Settings />} />

            {/* grivance controller routes */}
            <Route path="/grievance-controller/dashboard" element={<ProtectedRoute rolesRequired={['Grievance Controller']}><GrievanceControllerDashboard /></ProtectedRoute>} />
            <Route path="/assign-grievance" element={<ProtectedRoute rolesRequired={['Grievance Controller']}><AssignGrievance /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute rolesRequired={['Grievance Controller']}><PieChartExample /></ProtectedRoute>} />

            {/* grivance manager routes */}
            <Route path="/grievance-manager/dashboard" element={<ProtectedRoute rolesRequired={['Grievance Supervisor', 'Grievance Officer']}><GrievanceManagerDashboard /></ProtectedRoute>} />
            <Route path="/grievance-progress" element={<ProtectedRoute rolesRequired={['Grievance Supervisor', 'Grievance Officer']}><GrievanceProgress /></ProtectedRoute>} />
        </Routes>
      </DataProvider>
    </RoleProvider>
  );
}

export default App;
