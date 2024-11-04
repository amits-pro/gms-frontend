import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Report = () => {
  // State to hold historical grievance data and predictions
  const [grievanceData, setGrievanceData] = useState([]);
  const [predictedGrievances, setPredictedGrievances] = useState(null);
  const [loading, setLoading] = useState(true);

  // TensorFlow model training and prediction logic
  useEffect(() => {
    const fetchGrievanceData = async () => {
      // Simulate fetching historical data (replace this with actual API call)
      const historicalData = [100, 120, 150, 170, 190, 210, 230]; // Grievances over the past months
      setGrievanceData(historicalData);
      
      // TensorFlow.js model training
      const xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7], [7, 1]); // Months
      const ys = tf.tensor2d(historicalData, [7, 1]); // Grievances

      // Simple linear model to predict future grievances
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

      // Train the model
      await model.fit(xs, ys, { epochs: 100 });

      // Predict the number of grievances for the next month (8th month)
      const prediction = model.predict(tf.tensor2d([8], [1, 1]));
      const predictedNumber = prediction.dataSync()[0];

      setPredictedGrievances(Math.round(predictedNumber));
      setLoading(false); // Stop the loading spinner
    };

    fetchGrievanceData();
  }, []);

  // Chart.js data for grievance trends
  const grievanceChartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7'],
    datasets: [
      {
        label: 'Grievances Filed',
        data: grievanceData,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Grievance Report - Banasthali Vidyapeeth
      </Typography>

      {/* Loading Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Grievance Trend Chart */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Grievance Filing Trends
              </Typography>
              <Line data={grievanceChartData} />
            </Paper>
          </Grid>

          {/* Key Statistics */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Total Grievances Filed
              </Typography>
              <Typography variant="h3" color="primary" align="center">
                {grievanceData.reduce((a, b) => a + b, 0)}
              </Typography>
              <Typography variant="body1" align="center">
                Grievances submitted over the past 7 months.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Resolved Grievances
              </Typography>
              <Typography variant="h3" color="secondary" align="center">
                150
              </Typography>
              <Typography variant="body1" align="center">
                Total resolved grievances till date.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Predicted Grievances (Next Month)
              </Typography>
              <Typography variant="h3" color="error" align="center">
                {predictedGrievances !== null ? predictedGrievances : 'Predicting...'}
              </Typography>
              <Typography variant="body1" align="center">
                Based on the current trend, predicted grievances for next month.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Report;
