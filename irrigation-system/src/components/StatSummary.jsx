// components/StatSummary.jsx
import { Grid, Card, CardContent, Typography } from '@mui/material';

const calculateAverage = (data, key) => {
  const valid = data.map(item => item[key]).filter(val => typeof val === 'number' && !isNaN(val));
  if (valid.length === 0) return '—';
  const avg = valid.reduce((sum, val) => sum + val, 0) / valid.length;
  return avg.toFixed(2);
};

const StatSummary = ({ data }) => (
  <Grid container spacing={2} mb={4}>
    <Grid item xs={12} sm={4}>
      <Card sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2.5, border: '1px solid #BDBDC6' }}>
        <CardContent> <Typography>Сер. вологість ґрунту: {calculateAverage(data, 'soil_moisture')}</Typography></CardContent></Card>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Card sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2.5, border: '1px solid #BDBDC6' }}>
        <CardContent><Typography>Сер. вологість повітря: {calculateAverage(data, 'humidity')}</Typography></CardContent></Card>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Card sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2.5, border: '1px solid #BDBDC6' }}>
        <CardContent><Typography>Сер. температура: {calculateAverage(data, 'temperature')}°C</Typography></CardContent></Card>
    </Grid>
  </Grid>
);

export default StatSummary;
