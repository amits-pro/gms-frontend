// Captcha.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Avatar } from '@mui/material';
import logo from "../assets/applogo.png";

const Captcha = forwardRef(({ value, onChange }, ref) => {
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, correctAnswer: 0 });
  const [captchaValid, setCaptchaValid] = useState(true);

  // Function to generate a new CAPTCHA question
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    setCaptcha({ num1, num2, correctAnswer });
  };

  // Generate CAPTCHA on initial render
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validate the CAPTCHA answer
  const validateCaptcha = () => {
    const isValid = parseInt(value, 10) === captcha.correctAnswer;
    setCaptchaValid(isValid);
    if (!isValid) generateCaptcha(); // Regenerate CAPTCHA if the answer is incorrect
    return isValid;
  };

  // Expose validateCaptcha method via ref
  useImperativeHandle(ref, () => ({
    validateCaptcha,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        mt: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Are you human?
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={logo} alt="App Logo" sx={{ width: 36, height: 36 }} />
        
        <Typography variant="body1">
          What is {captcha.num1} + {captcha.num2}?
        </Typography>
      </Box>

      <TextField
        label="Your Answer"
        type="number"
        name="captchaAnswer"
        value={value}
        onChange={onChange}
        error={!captchaValid}
        helperText={!captchaValid ? 'Incorrect answer, please try again.' : ''}
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
      />
    </Box>
  );
});

export default Captcha;
