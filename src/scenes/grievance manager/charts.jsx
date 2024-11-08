import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useGSMContext } from '../../security/RoleContext';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';


// Colors for the Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const MyPieChart = ({ data }) => {
    
  const { name, values } = data;
    const updatedGrievances = values.map(item => ({
      ...item, // Spread the rest of the properties
      value: Number(item.value) // Convert value to a number
    }));  
  const totalValue = updatedGrievances.reduce(
    (sum, entry) => sum + entry.value,
    0
  );

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '90%', margin: '20px' }}>
      <h2>{name}</h2>
      <PieChart width={400} height={400}>
  <Pie
    data={updatedGrievances}
    cx={200}
    cy={200}
    labelLine={false}
    label={({ name, value }) => `${name}: ${(value / totalValue * 100).toFixed(2)}%`}
    outerRadius={80}
    fill="#8884d8"
    dataKey="value"
  >
    {updatedGrievances.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip
    formatter={(value) => [`${value} (${((value / totalValue) * 100).toFixed(2)}%)`, 'Value']}
  />
  <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 20 }} />
</PieChart>

    </div>
  );
};

const MyLineChart = ({ data }) => {

  const {name, values} = data;

  if (!data) return null;
  const grievances = values.map(item => ({
      ...item, // Spread the rest of the properties
      value: Number(item.value) // Convert value to a number
    }));  
  const totalValue = grievances.reduce(
    (sum, entry) => sum + entry.value,
    0
  );


  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '90%', margin: '20px' }}>
      <h2>{name }</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={grievances}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const GrievanceManagerCharts = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useGSMContext();

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        console.log('get report');
        const url = "http://localhost:8080/grievance-report?fromDate=2024-10-26&toDate=2024-11-05&userId=" + userId;
        const response = await axios.get(url);
        setReportsData(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching grievances:', error);
        setLoading(false); 
      }
    };

    fetchGrievances();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
<>
<h2 style={{ textAlign: 'center', color: 'blue' }}>{reportsData.dashboardTitle}</h2>

<Box>
{/* Additional Stats and Info */}
<Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Total Grievances
            </Typography>
            <Typography variant="h3" color="primary" align="center">
              {reportsData.overAllGrievanceCount}
            </Typography>
            <Typography variant="body1" align="center">
              Total grievances submitted so far.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Assigned Grievances
            </Typography>
            <Typography variant="h3" color="secondary" align="center">
            {reportsData.assignedGrievanceCount}
            </Typography>
            <Typography variant="body1" align="center">
              Grievances assigned till date.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              In Progress Grievances
            </Typography>
            <Typography variant="h3" color="secondary" align="center">
            {reportsData.inProgessGrievanceCount}
            </Typography>
            <Typography variant="body1" align="center">
              Grievances in progress till date.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Resolved Grievances
            </Typography>
            <Typography variant="h3" color="secondary" align="center">
            {reportsData.resolvedGrievanceCount}
            </Typography>
            <Typography variant="body1" align="center">
              Grievances resolved till date.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Declined Grievances
            </Typography>
            <Typography variant="h3" color="secondary" align="center">
            {reportsData.declinedGrievanceCount}
            </Typography>
            <Typography variant="body1" align="center">
              Grievances declined till date.
            </Typography>
          </Paper>
        </Grid>
        </Grid>
    </Box>


<div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>

  {/* Line Chart */}
  <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
    <MyLineChart data={{name:"Grievance By Time", values: reportsData.grievancesInDateRange}} />
  </div>

  {/* Pie Chart 2 */}
  <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
    <MyPieChart data={{name:"Grievance By Status", values: reportsData.grievancesByStatusInDateRange}} />
  </div>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
  {/* Line Chart */}
  <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
    <MyLineChart data={{name:"Overall Grievance By Time", values: reportsData.overallGrievancesByDate}} />
  </div>

  {/* Pie Chart 2 */}
  <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
    <MyPieChart data={{name:"Overall Grievances By Status", values: reportsData.overallGrievancesByStatus}} />
  </div>
</div>

</>

  );
};

export default GrievanceManagerCharts;
