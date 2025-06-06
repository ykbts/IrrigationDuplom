import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = ({ variant = 'default' }) => {
  const navigate = useNavigate();

  const isDark = variant === 'dark';
  const background = isDark ? '#000' : '#E1E1E1';

  const handleClick = () => {
    localStorage.removeItem('auth');
    navigate('/'); // перехід на головну сторінку
  };

  const logoIcon = (
    <Box
      sx={{
        fontSize: 28,
        fontWeight: 600,
        background,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      className="material-symbols-outlined"
    >
      hive
    </Box>
  );

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'absolute',
        top: 16,
        left: 24,
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
      }}
    >
      {isDark ? (
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: '#E9E9E9',
          borderRadius: 2, // 16px
          padding: '6px 10px',
        }}
      >
        {logoIcon}
      </Box>
      ) : (
        logoIcon
      )}

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          background,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        SoilCare
      </Typography>
    </Box>
  );
};

export default Logo;
