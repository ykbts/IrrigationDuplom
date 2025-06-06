import { Box, Typography } from '@mui/material';
import {
  ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const ChartBlock = ({ title, dataKey, color, data }) => (
  <Box mb={4} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2.5, border: '1px solid #BDBDC6', p: 3 }}>
    <Typography variant="body1" fontWeight={500} mb={2}>{title}</Typography>
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

export default ChartBlock;
