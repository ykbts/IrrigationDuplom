import React from 'react';
import { Box, Typography, Paper } from '@mui/material'; // Added Paper import

const SensorCard = ({ label, value, icon }) => (
  <Paper
    elevation={0}
    sx={{
      border: '1px solid #BDBDC6',
      borderRadius: 2.5,
      padding: 3,
      width: 120,
      height: 120,
      backgroundColor: 'rgba(255,255,255,0.9)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    <Box sx={{ display: 'flex', mb: 1 }}>
      <Box sx={{ fontSize: 30, marginRight: 1 }}>{icon}</Box>
      <Typography fontSize={14}>{label}</Typography>
    </Box>
    <Typography
      fontSize={40}
      fontWeight={600}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 30,
      }}
    >
      {value}
    </Typography>
  </Paper>
);

export default SensorCard;  // Ensure default export
