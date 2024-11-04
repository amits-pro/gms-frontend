import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import * as tf from '@tensorflow/tfjs';

const AdminDashboard = () => {
  // State to hold the TensorFlow.js prediction result
  const [predictedGrievances, setPredictedGrievances] = useState(null);

  // Use TensorFlow.js to predict future grievances based on some dummy data
  useEffect(() => {
    const loadModelAndPredict = async () => {
      // Creating a simple sequential model as an example
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

      // Compile the model
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

      // Dummy data representing previous grievances submitted
      const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
      const ys = tf.tensor2d([100, 120, 140, 160], [4, 1]);

      // Train the model
      await model.fit(xs, ys, { epochs: 100 });

      // Predict the number of grievances for the next period (e.g., the next month or week)
      const prediction = model.predict(tf.tensor2d([5], [1, 1]));
      const predictedNumber = prediction.dataSync()[0];

      setPredictedGrievances(Math.round(predictedNumber)); // Set predicted value in state
    };

    loadModelAndPredict();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Dashboard
      </Typography>

      {/* Admin Action Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box display="flex" alignItems="center">
              <GroupOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', marginRight: 2 }} />
              <Typography variant="h6">User Management</Typography>
            </Box>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Manage users and their roles.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => window.location.href = '/user-management'}
            >
              Manage Users
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box display="flex" alignItems="center">
              <ReportOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', marginRight: 2 }} />
              <Typography variant="h6">View Reports</Typography>
            </Box>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Access and analyze grievance reports.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => window.location.href = '/reports'}
            >
              View Reports
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box display="flex" alignItems="center">
              <NotificationsOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', marginRight: 2 }} />
              <Typography variant="h6">Notifications</Typography>
            </Box>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              View system-wide notifications.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => window.location.href = '/notifications'}
            >
              View Notifications
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Stats and Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Total Grievances
            </Typography>
            <Typography variant="h3" color="primary" align="center">
              120
            </Typography>
            <Typography variant="body1" align="center">
              Total grievances submitted so far.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Resolved Grievances
            </Typography>
            <Typography variant="h3" color="secondary" align="center">
              85
            </Typography>
            <Typography variant="body1" align="center">
              Grievances resolved till date.
            </Typography>
          </Paper>
        </Grid>

        {/* TensorFlow.js Prediction for Future Grievances */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Predicted Future Grievances
            </Typography>
            <Typography variant="h3" color="error" align="center">
              {predictedGrievances !== null ? predictedGrievances : 'Predicting...'}
            </Typography>
            <Typography variant="body1" align="center">
              Predicted number of grievances expected next month.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
