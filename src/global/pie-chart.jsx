import { PieChart, Pie, Legend, Tooltip, Cell} from 'recharts';

// Colors for the Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BVPieChart = ({ data }) => {
    
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

  export default BVPieChart;