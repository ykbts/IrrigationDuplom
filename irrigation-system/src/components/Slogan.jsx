import React from 'react';
import { Box } from '@mui/material';

const Slogan = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 16,
        left: 24,
        zIndex: 3,
        fontSize: { xs: 10, sm: 12 },
        color: '#E1E1E1',
        textTransform: 'uppercase',
        fontWeight: 300,
      }}
    >
      СИСТЕМА ПОЛИВУ ҐРУНТУ НА БАЗІ ШТУЧНОГО НАВЧАННЯ
    </Box>
  );
};

export default Slogan;
