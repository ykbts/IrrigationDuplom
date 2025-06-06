import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Logo from '../components/Logo';
import Slogan from '../components/Slogan';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/flower.png';
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  if (!isImageLoaded) {
  
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
        }}
      >
        <CircularProgress sx={{ color: '#7BA929' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#121212',
        color: '#fff',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'Krub, sans-serif',
      }}
    >
      <Logo variant="default" />

      <Box
        component="img"
        src="/images/flower.png"
        alt="Квітка"
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          height: '100%',
          maxWidth: { xs: '70%', sm: '60%', md: 'auto' },
          objectFit: 'contain',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          left: { xs: '5%', sm: '10%' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 2, sm: 6, md: 10 },
          width: { xs: '90%', sm: 'auto' },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 28, sm: 36, md: 48 },
            fontWeight: 700,
            my: 2,
            lineHeight: 1.2,
            textAlign: 'left',
          }}
        >
          Полив під <br /> контролем
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 10, sm: 12 },
            fontWeight: 400,
            mb: 4,
            whiteSpace: 'pre-line',
            textAlign: 'left',
          }}
        >
          Розумний догляд за ґрунтом: полив,{'\n'}коли справді потрібно
        </Typography>

        {}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7BA929',
              color: '#121212',
              fontSize: { xs: 10, sm: 12 },
              fontWeight: 400,
              borderRadius: '30px',
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              minWidth: { xs: '120px', sm: '140px', md: '160px' },
              height: { xs: '36px', sm: '42px', md: '48px' },
              '&:hover': {
                backgroundColor: '#7BA929',
                color: '#fff',
              },
              textTransform: 'none',
            }}
            onClick={handleLogin}
          >
            Увійти
          </Button>

          <Button
            variant="outlined"
            sx={{
              backgroundColor: '#121212',
              fontSize: { xs: 10, sm: 12 },
              fontWeight: 400,
              borderRadius: '30px',
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              minWidth: { xs: '120px', sm: '140px', md: '160px' },
              height: { xs: '36px', sm: '42px', md: '48px' },
              borderColor: '#fff',
              color: '#fff',
              '&:hover': {
                borderColor: '#7BA929',
                color: '#7BA929',
              },
              textTransform: 'none',
            }}
            onClick={handleRegister}
          >
            Зареєструватися
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

export default LandingPage;
