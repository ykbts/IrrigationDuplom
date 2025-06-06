// components/CustomTooltip.jsx
import { Box, Typography } from '@mui/material';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <Box sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2.5, border: '1px solid #BDBDC6', p: 3 }}>
        <Typography variant="body2"><strong>{data.timestamp}</strong></Typography>
        <Typography variant="body2">Вологість ґрунту: {data.soil_moisture}</Typography>
        <Typography variant="body2">Вологість повітря: {data.humidity}</Typography>
        <Typography variant="body2">Температура: {data.temperature}°C</Typography>
      </Box>
    );
  }
  return null;
};

export default CustomTooltip;
