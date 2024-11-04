import React, { useState, useEffect } from 'react';
import { Box, Typography, Switch, FormControlLabel, Divider, Slider } from '@mui/material';

const Settings = () => {
  // State management for settings
  const [settings, setSettings] = useState({
    navigationSounds: true,
    appNotifications: false,
    darkMode: false,
    autoUpdate: true,
  });

  const [brightness, setBrightness] = useState(100); // Default brightness at 100%

  const handleToggleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  // Adjust the body brightness style based on the brightness state
  useEffect(() => {
    document.body.style.filter = `brightness(${brightness}%)`;
  }, [brightness]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        height: '100vh',
        backgroundColor: 'background.default',
        overflowY: 'scroll',
      }}
    >
      <Typography variant="h4" gutterBottom>
        App Settings
      </Typography>

      {/* Navigation Sounds */}
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

      <Divider sx={{ width: '100%', marginY: '10px' }} />

      {/* App Notifications */}
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

      <Divider sx={{ width: '100%', marginY: '10px' }} />

      {/* Dark Mode */}
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

      <Divider sx={{ width: '100%', marginY: '10px' }} />

      {/* Auto Update */}
      <FormControlLabel
        control={
          <Switch
            checked={settings.autoUpdate}
            onChange={handleToggleChange}
            name="autoUpdate"
            color="primary"
          />
        }
        label="Enable Auto Update"
      />

      <Divider sx={{ width: '100%', marginY: '10px' }} />

      {/* Brightness Control */}
      <Typography gutterBottom>Adjust Brightness</Typography>
      <Slider
        value={brightness}
        onChange={handleBrightnessChange}
        aria-labelledby="brightness-slider"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default Settings;
