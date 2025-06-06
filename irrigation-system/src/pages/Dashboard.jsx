
import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import Sidebar from '../components/Sidebar';
import ControlButton from '../components/ControlButton';
import SensorCard from '../components/SensorCard';
import AutoModeSwitch from '../components/AutoModeSwitch';
import { Thermostat, WaterDrop, Grass, Settings } from '@mui/icons-material';
import { WebSocketContext } from '../WebSocketContext'; // з pages/ на рівень вище
import { useNavigate } from 'react-router-dom';
import { getAutoMode, updateAutoMode } from '../api/modeApi';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const { deviceData, publish } = useContext(WebSocketContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    const storedDeviceId = localStorage.getItem('device_id');
    setDeviceId(storedDeviceId);

    const img = new Image();
    img.src = '/images/Soil.png';
    img.onload = () => {
      setIsImageLoaded(true);
    };

    // Отримуємо початковий стан авто-режиму через API
    getAutoMode()
      .then((mode) => {
        setIsAutoMode(mode);
      })
      .catch((error) => console.error('Помилка отримання режиму:', error));
  }, []);

    const handleAutoModeChange = async (newMode) => {
    try {
      await updateAutoMode(newMode);
      setIsAutoMode(newMode);
    } catch (error) {
      console.error('Помилка оновлення режиму:', error);
      // Можна додати повідомлення користувачу про помилку
    }
  };

  const currentDevice = deviceData?.[deviceId] || {};

  const temperature = currentDevice.temperature;
  const humidity = currentDevice.humidity;
  const moisture = currentDevice.moisture;
  const isPumpOn = currentDevice.isPumpOn;
  const navigate = useNavigate();
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
  if (!isImageLoaded) {
    // Показуємо індикатор завантаження, поки зображення не завантажиться
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        <CircularProgress sx={{ color: '#7BA929' }} />
      </Box>
    );
  }
  const renderContent = () => {
      return (
        <Box sx={{ position: 'relative', zIndex: 1, p: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight={600} sx={{ marginRight: 3 }}>
              Показники <br /> сенсорів
            </Typography>
            <SensorCard label="Температура повітря" value={`${temperature ?? '—'}°`} icon={<Thermostat />} />
            <SensorCard label="Вологість повітря" value={`${humidity ?? '—'}%`} icon={<WaterDrop />} />
            <SensorCard label="Вологість ґрунту" value={moisture ?? '—'} icon={<Grass />} />
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Стан насоса */}
            <Paper
              sx={{
                border: '1px solid #BDBDC6',
                borderRadius: 2.5,
                color: '#fff',
                padding: 3,
                width: 300,
                height: 200,
                backgroundColor: '#1C1C1C',
                position: 'relative', // Для абсолютного позиціонування тексту
              }}
            >
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Box sx={{ fontSize: 30, marginRight: 1 }}>
                  <Settings />
                </Box>
                <Typography fontSize={14}>Стан Насоса</Typography>
              </Box>
              <Typography
                fontSize={20}
                fontWeight={600}
                sx={{
                  position: 'absolute',
                  bottom: 10, // Вирівнювання по низу
                  left: 10,   // Вирівнювання по лівому краю
                }}
              >
                Полив {isPumpOn ? 'Увімкнений' : 'Вимкнений'}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                border: '1px solid #BDBDC6',
                borderRadius: 2.5,
                padding: 3,
                width: 300,
                height: 200,
                backgroundColor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', // Для абсолютного позиціонування тексту
              }}
            >
              {isAutoMode ? (
                <Typography
                  fontSize={18}
                  color="#121212"
                  textAlign="center"
                  sx={{
                    position: 'absolute',
                    bottom: 10, // Вирівнювання по низу
                    left: 10,   // Вирівнювання по лівому краю
                  }}
                >
                  Полив контролюється ML-моделлю
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <ControlButton label="ON" onClick={() => publish(`iot/control/${deviceId}`, 'pump/on')} />
                <ControlButton label="OFF" onClick={() => publish(`iot/control/${deviceId}`, 'pump/off')} />

                </Box>
              )}
            </Paper>
          </Box>

          {/* Перемикач АвтоРежиму */}
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              border: '1px solid #BDBDC6',
              borderRadius: 2.5,
              padding: 2,
              width: 140,
              height: 30,
              backgroundColor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 2,
            }}
          >
        <AutoModeSwitch isAutoMode={isAutoMode} setIsAutoMode={handleAutoModeChange} />
          </Box>
        </Box>
      );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative', backgroundColor: '#fff' }}>
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
        <Box
          component="img"
          src="/images/Soil.png"
          alt="soil background"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
