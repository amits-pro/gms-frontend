import { Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';


const BVLineChart = ({ data }) => {

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
  
  export default BVLineChart;