import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import DevicesIcon from '@mui/icons-material/Devices'; // або інша іконка
import DeviceCard from '../components/DeviceCard'; 
import { getDevicesByUser } from '../api/deviceApi'; 


const DevicesPage = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(  Number(localStorage.getItem('device_id')));
  

  const handleTabChange = (tab) => {
    navigate(`/${tab}`);
  };
    const handleClick = () => {
    navigate('/add-device');
  };

  const handleSelectDevice = (deviceId) => {
    localStorage.setItem('device_id', deviceId);
  setSelectedDeviceId(Number(deviceId));
  };

useEffect(() => {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    console.error('user_id не знайдено в localStorage');
    return;
  }

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const devicesData = await getDevicesByUser(userId);
      setDevices(devicesData);
    } catch (err) {
      console.error('Помилка завантаження пристроїв:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchDevices();
}, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'rgba(255,255,255,0.9)' }}>
      <Sidebar activeTab="devices" onTabChange={handleTabChange} />
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Пристрої
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : devices.length > 0 ? (
<Grid container spacing={3}>
  {devices.map((device) => (
    <Grid item xs={12} sm={6} md={4} key={device.device_id}>
      <DeviceCard
        device={device}
        isSelected={selectedDeviceId === device.id}
        onSelect={handleSelectDevice}
      />
    </Grid>
  ))}
<Button
  sx={{
    width: 170,
    height: 270,
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: 3,
    transition: '0.3s',
    fontSize: 80,           // великий розмір плюса
    color: 'black',         // початковий колір тексту
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'black',  // фон чорний при наведенні
      color: 'white',            // текст білий при наведенні
      boxShadow: 3,
    },
  }}
  onClick={handleClick}
>
  +
</Button>

</Grid>
        ) : (
          <Typography>Пристрої не знайдені...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DevicesPage;
