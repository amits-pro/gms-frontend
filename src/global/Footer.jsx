import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Instagram, Facebook } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body1" gutterBottom>
        Banasthali Vidyapeeth
      </Typography>

      {/* Social Media Icons */}
      <Box>
        <IconButton
          href="https://www.instagram.com/banasthali_vidyapith_official/" // Replace with your Instagram URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }} // Ensure icon color is white
        >
          <Instagram />
        </IconButton>

        <IconButton
          href="https://www.facebook.com/banasthali.org" // Replace with your Facebook URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }} // Ensure icon color is white
        >
          <Facebook />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
