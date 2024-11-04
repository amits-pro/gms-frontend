import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel, Divider, Grid, Paper } from '@mui/material';

const Settings = () => {
  // State management for settings
  const [settings, setSettings] = useState({
    navigationSounds: true,
    appNotifications: false,
    darkMode: false,
    autoUpdate: true,
    emailNotifications: true,
    privacyControl: false,
    userRoleManagement: false,
  });

  const handleToggleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '10px', sm: '20px', md: '40px' },
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Grievance Management Settings
      </Typography>

      {/* Responsive Grid Container for Settings */}
      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '800px', width: '100%' }}>
        {/* Each Setting as a Card for better UI */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.navigationSounds}
                  onChange={handleToggleChange}
                  name="navigationSounds"
                  color="primary"
                />
              }
              label="Enable Navigation Sounds"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.appNotifications}
                  onChange={handleToggleChange}
                  name="appNotifications"
                  color="primary"
                />
              }
              label="Enable App Notifications"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleToggleChange}
                  name="emailNotifications"
                  color="primary"
                />
              }
              label="Enable Email Notifications for Grievance Updates"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.darkMode}
                  onChange={handleToggleChange}
                  name="darkMode"
                  color="primary"
                />
              }
              label="Enable Dark Mode"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoUpdate}
                  onChange={handleToggleChange}
                  name="autoUpdate"
                  color="primary"
                />
              }
              label="Enable Auto Updates"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.privacyControl}
                  onChange={handleToggleChange}
                  name="privacyControl"
                  color="primary"
                />
              }
              label="Enable Privacy Control for Grievance Information"
            />
          </Paper>
        </Grid>

   

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: 'center', mt: 2 }}
          >
            These settings help customize the experience for managing grievances at Banasthali Vidyapeeth.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
