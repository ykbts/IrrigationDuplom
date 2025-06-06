import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import StyledTextField from '../components/StyledTextField';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { addDevice } from '../api/deviceApi';  // Імпортуємо

const AddDevicePage = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceCode, setDeviceCode] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const navigate = useNavigate();

  const handleAddDevice = async () => {
    if (!deviceName || !deviceCode) {
      alert('Будь ласка, введіть назву та код пристрою.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = parseInt(localStorage.getItem('user_id'), 10);

      if (!userId) {
        alert('Користувач не авторизований. Будь ласка, увійдіть.');
        navigate('/login');
        return;
      }

      const data = await addDevice({
        token,
        userId,
        deviceName,
        deviceCode,
        deviceDescription,
      });

      alert('Пристрій успішно додано!');
      localStorage.setItem('device_id', data.id);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Сталася помилка при з’єднанні з сервером');
      console.error('Помилка при додаванні пристрою:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Logo variant="default" />
      <Box
        sx={{
          width: { xs: '90%', sm: 420 },
          maxWidth: 420,
          backgroundColor: '#fff',
          borderRadius: '29px',
          boxShadow: 3,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Додати пристрій
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Дайте назву пристрою
          </Typography>
          <StyledTextField
            placeholder="Наприклад: Помічник"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Код пристрою
          </Typography>
          <StyledTextField
            placeholder="Код, який відображено на пристрої"
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Короткий опис
          </Typography>
          <StyledTextField
            placeholder="Наприклад: поливальна система"
            value={deviceDescription}
            onChange={(e) => setDeviceDescription(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#121212',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '29px',
            paddingY: 1.5,
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#7BA929',
              color: '#fff',
            },
          }}
          onClick={handleAddDevice}
        >
          Додати пристрій
        </Button>
      </Box>
    </Box>
  );
};

export default AddDevicePage;
