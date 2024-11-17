import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGSMContext } from '../../security/RoleContext';
import { Box, Typography, Paper, Grid } from '@mui/material';
import BVLineChart from '../../global/linechart';
import BVPieChart from '../../global/pie-chart';

const GrievanceCharts = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useGSMContext();

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
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
            <Typography variant="h3" color="secondary" align="center">
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

  {/* Pie Chart 1 */}
  <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
    <BVPieChart data={{name:"Grievance By Department", values: reportsData.grievancesByDepartmentInDateRange}} />
  </div>

  {/* Line Chart */}
  <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
    <BVLineChart data={{name:"Grievance By Time", values: reportsData.grievancesInDateRange}} />
  </div>

  {/* Pie Chart 2 */}
  <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
    <BVPieChart data={{name:"Grievance By Status", values: reportsData.grievancesByStatusInDateRange}} />
  </div>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
  {/* Pie Chart 1 */}
  <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
     <BVPieChart data={{name:"Overall Grievances By Department", values: reportsData.overallGrievancesByDepartments}} />
  </div>

  {/* Line Chart */}
  <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
    <BVLineChart data={{name:"Overall Grievance By Time", values: reportsData.overallGrievancesByDate}} />
  </div>

  {/* Pie Chart 2 */}
  <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
    <BVPieChart data={{name:"Overall Grievances By Status", values: reportsData.overallGrievancesByStatus}} />
  </div>
</div>

</>

  );
};

export default GrievanceCharts;
