import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import StyledTextField from '../components/StyledTextField';
import { useNavigate } from 'react-router-dom'; // ✅ Додано
import Logo from '../components/Logo';
import { login } from '../api/authApi';
import { getDevicesByUser } from '../api/deviceApi';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // ✅ Використання navigate

const handleLogin = async () => {
  if (!username || !password) {
    alert('Будь ласка, введіть ваш логін та пароль.');
    return;
  }

  try {
    const data = await login(username, password);
    const userId = data.user_id;
    localStorage.setItem('user_id', userId);

    const devices = await getDevicesByUser(userId);

    if (devices.length > 0) {
      const defaultDeviceId = devices[0].id;
      localStorage.setItem('device_id', defaultDeviceId);
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    } else {
      localStorage.setItem('auth', 'true');
      navigate('/add-device');
    }

  } catch (err) {
    alert(err.message);
    console.error('Login error:', err);
  }
};


  const handleRegister = () => {
    navigate('/signup'); // ✅ Навігація на сторінку реєстрації
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2, // додано відступ для мобільних пристроїв
      }}
    >
      <Logo variant="default" />
      <Box
        sx={{
          width: { xs: '90%', sm: 420 }, // адаптивна ширина для малих екранів
          maxWidth: 420, // максимальна ширина
          height: 460,
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
          Вхід
        </Typography>

        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Логін
          </Typography>
          <StyledTextField
            placeholder="Введіть ваш логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Пароль
          </Typography>
<StyledTextField
  placeholder="Введіть ваш пароль"
  type={showPassword ? 'text' : 'password'}
  value={password}
  onChange={(e) => setPassword(e.target.value)}

            sx={{ marginBottom: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            marginBottom: 3,
            '&:hover': {
              backgroundColor: '#7BA929',
              color: '#fff',
            },
          }}
          onClick={handleLogin}
        >
          Увійти
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Не маєте акаунту?{' '}
          <Button
            onClick={handleRegister} // ✅ Правильне використання
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              padding: 0,
              minWidth: 'unset',
              color: '#000',
            }}
          >
            Зареєструватися
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
