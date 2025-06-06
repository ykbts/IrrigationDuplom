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
import { register } from '../api/authApi';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, email, password); // 👈 Використовуємо функцію з auth.js
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Щось пішло не так');
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
        padding: 2, // додано відступ для мобільних пристроїв
      }}
    >
      <Logo variant="default" />
      <Box
        sx={{
          width: { xs: '90%', sm: 420 }, // адаптивна ширина для мобільних пристроїв
          maxWidth: 420, // максимальна ширина
          height: 560,
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
          Реєстрація
        </Typography>

        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Логін
          </Typography>
          <StyledTextField
            placeholder="Створіть логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Електронна адреса
          </Typography>
          <StyledTextField
            placeholder="Введіть вашу електронну адресу"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="subtitle2" sx={{ color: '#121212', marginBottom: 0.5 }}>
            Пароль
          </Typography>
          <StyledTextField
            placeholder="Створіть пароль"
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
          onClick={handleRegister}
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
        >
          Зареєструватися
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Вже маєте акаунт?{' '}
          <Button
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              padding: 0,
              minWidth: 'unset',
              color: '#000',
            }}
          >
            Увійти
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
