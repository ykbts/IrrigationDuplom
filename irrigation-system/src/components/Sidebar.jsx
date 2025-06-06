import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Logo from './Logo';
import { Dashboard, Event, Devices } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { label: 'Дашборд', icon: <Dashboard />, value: 'dashboard' },
    { label: 'Аналітика', icon: <Event />, value: 'analytics' },
    { label: 'Мої прилади', icon: <Devices />, value: 'devices' },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        backgroundColor: '#F7F7F7',
        boxShadow: '4px 0px 63.44px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 3,
        boxSizing: 'border-box',
        zIndex: 2,
      }}
    >
      {/* Верхня частина — логотип і меню */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 8 }}>
          <Logo variant="dark" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {menuItems.map((item) => (
            <Box
              key={item.value}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                fontWeight: activeTab === item.value ? 600 : 400,
                color: activeTab === item.value ? '#000' : '#555',
                backgroundColor: activeTab === item.value ? '#E9E9E9' : 'transparent',
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => onTabChange(item.value)}
            >
              <span>{item.icon}</span>
              <Typography>{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: '#121212',
            color: '#fff',
            textTransform: 'none',
            borderRadius: 2.5,
            paddingY: 1.5,
            marginBottom: 3,
            width: 120,
            height: 60,
            fontSize: 20,
            '&:hover': {
              backgroundColor: '#7BA929',
              color: '#fff',
            },
          }}
        >
          Вийти
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar; 