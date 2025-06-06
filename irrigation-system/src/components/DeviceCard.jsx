import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const deviceImages = [
  '/images/device1.webp',
  '/images/device2.webp',
  '/images/device3.webp',
  '/images/device4.webp',
  '/images/device5.webp',
];

const DeviceCard = ({ device, isSelected, onSelect }) => {
  const imageIndex = device.id % deviceImages.length;
  const imageUrl = deviceImages[imageIndex];

  return (
    <Card
      onClick={() => onSelect(device.id)}
      sx={{
        width: 170,      // фіксована ширина
        height: 270,
        cursor: 'pointer',
        border: isSelected ? '2px solid #000' : '1px solid #ccc',
        borderRadius: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
<CardMedia
  component="div"    // контейнер
  sx={{
    height: 140,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <img
    src={imageUrl}
    alt={device.device_name}
    style={{
      maxHeight: 100,   // зменшений розмір самого зображення
      maxWidth: 100,
      objectFit: 'contain',
    }}
  />
</CardMedia>

      <CardContent>
        <Typography variant="h6">{device.device_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {device.device_description}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          ID: {device.device_code}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
