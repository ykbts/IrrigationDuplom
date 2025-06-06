import React, { useState, useEffect } from 'react';
import { Typography, Switch, Box, CircularProgress } from '@mui/material';
import { updateAutoMode } from '../api/modeApi';

const AutoModeSwitch = ({ isAutoMode, setIsAutoMode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event) => {
    const newValue = event.target.checked;
    setIsLoading(true);

    try {
      const data = await updateAutoMode(newValue);
      console.log(data.message);

      setIsAutoMode(newValue);
    } catch (error) {
      console.error('Помилка при надсиланні запиту:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography fontSize={14} fontWeight={600}>
        MLРежим
      </Typography>
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: '#121212' }} />
      ) : (
        <Switch
          checked={isAutoMode}
          onChange={handleChange}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#121212',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#121212',
            },
          }}
        />
      )}
    </Box>
  );
};

export default AutoModeSwitch;
