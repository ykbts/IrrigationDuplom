import { BASE_URL } from './config';

export const fetchSensorData = async (deviceId, range) => {
  try {
    const response = await fetch(`${BASE_URL}/sensor-data/${deviceId}?range=${range}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch sensor data:', error);
    throw error;
  }
};
