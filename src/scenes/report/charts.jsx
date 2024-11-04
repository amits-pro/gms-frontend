import React from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Sample data for the Pie Chart
const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// Sample data for the Line Chart
const lineData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

// Colors for the Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Function to calculate the total value for Pie Chart
const getTotal = (data) => {
  return data.reduce((sum, entry) => sum + entry.value, 0);
};

const MyPieChart = () => {
  const totalValue = getTotal(pieData); // Calculate total value

  return (
    <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', width: '90%', margin: '20px' }}>
      <h2>Grievances - Department Wise</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, value }) => `${name}: ${(value / totalValue * 100).toFixed(2)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} (${((value / totalValue) * 100).toFixed(2)}%)`, 'Value']} />
        <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 20 }} />
      </PieChart>
    </div>
  );
};

const MyLineChart = () => {
  return (
    <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', width: '90%', margin: '20px' }}>
      <h2>Grievances Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <MyPieChart />
      <MyLineChart />
    </div>
  );
};

export default Dashboard;
