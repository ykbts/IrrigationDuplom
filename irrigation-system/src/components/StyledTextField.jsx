import React, { useState } from 'react';
import { TextField } from '@mui/material';

const StyledTextField = ({ sx = {}, ...props }) => {
  const [hasText, setHasText] = useState(false);

  const handleChange = (event) => {
    setHasText(event.target.value.length > 0);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      onChange={handleChange}
      sx={{
        marginBottom: 3,
        '& input': { 
          color: hasText ? '#7BA929' : '#ABABAB', 
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '29px',
          '& fieldset': {
            borderColor: hasText ? '#7BA929' : '#ABABAB', 
            borderWidth: '0.6px',
          },
          '&:hover fieldset': {
            borderColor: '#7BA929', 
          },
          '&.Mui-focused fieldset': {
            borderColor: '#7BA929', 
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default StyledTextField;
