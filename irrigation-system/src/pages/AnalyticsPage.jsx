import React, { useEffect, useState } from 'react';
import { Box, Typography, Select, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import ChartBlock from '../components/ChartBlock';
import StatSummary from '../components/StatSummary';
import { fetchSensorData } from '../api/sensorApi';


const AnalyticsPage = () => {
  const navigate = useNavigate();
  const deviceId = localStorage.getItem('device_id');

  const [data, setData] = useState([]);
  const [range, setRange] = useState('30d');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === 'dashboard') {
      navigate('/dashboard');
    } if (tab === 'analytics') {
      navigate('/analytics');
    }
    else if (tab === 'devices') {
      navigate('/devices');
    }
};

  useEffect(() => {
    if (!deviceId) return;

    setLoading(true);
    fetchSensorData(deviceId, range)
      .then(data => {
        const sorted = data.sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at))
          .map(item => ({
            ...item,
            name: new Date(item.recorded_at).toLocaleString('uk-UA', {
              day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
            }),
          }));
        setData(sorted);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [deviceId, range]);

  const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 2.5,
      border: '1px solid #BDBDC6',
    },
  },
  MenuListProps: {
    sx: {
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: '#00000020',
          color: '#000',
        },
        '&.Mui-selected': {
          backgroundColor: 'transparent !important',
          color: 'inherit',
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#00000020 !important',
        },
        '&:focus': {
          backgroundColor: 'transparent !important',
          outline: 'none',
          boxShadow: 'none',
        },
        '&:focus-visible': {
          backgroundColor: 'transparent !important',
          outline: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
};

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'rgba(255,255,255,0.9)' }}>
      <Sidebar activeTab="analytics" onTabChange={handleTabChange} />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Box sx={{ p: 4 }}>
          <Box sx={{ p: 5, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2.5, border: '1px solid #BDBDC6' }}>
            <Box mb={2} display="flex" justifyContent="space-between">
              <Typography variant="h5" fontWeight={600}>Аналітика</Typography>
              <Select
                size="small"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                MenuProps={menuProps}
                sx={{
                  '& fieldset': {
                    borderColor: '#BDBDC6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#BDBDC6 !important', // прибрати синю рамку
                  },
                }}
              >
                <MenuItem value="24h">Останні 24 години</MenuItem>
                <MenuItem value="7d">Останні 7 днів</MenuItem>
                <MenuItem value="30d">Останні 30 днів</MenuItem>
              </Select>
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center"><CircularProgress /></Box>
            ) : data.length > 0 ? (
              <>
                <StatSummary data={data} />
                <ChartBlock title="Вологість ґрунту" dataKey="soil_moisture" color="#000" data={data} />
                <ChartBlock title="Температура" dataKey="temperature" color="#000" data={data} />
                <ChartBlock title="Вологість повітря" dataKey="humidity" color="#000" data={data} />
              </>
            ) : (
              <Typography>Дані не знайдено або ще не завантажені...</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
