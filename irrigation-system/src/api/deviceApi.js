import { BASE_URL } from './config';

export const getDevicesByUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/device/by_user/${userId}`);

  if (response.ok) {
    return response.json();
  }

  const data = await response.json();

  // Якщо немає пристроїв — повертаємо пустий масив, не помилку
  if (response.status === 404 && data.detail === 'No devices found for this user') {
    return [];
  }

  // В інших випадках — кидаємо помилку
  throw new Error(data.detail || 'Помилка при перевірці пристроїв');
};

export const addDevice = async ({ token, userId, deviceName, deviceCode, deviceDescription }) => {
  const response = await fetch('http://localhost:8000/device/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      user_id: userId,
      device_name: deviceName,
      device_code: deviceCode,
      device_description: deviceDescription,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Помилка при додаванні пристрою');
  }

  return data;
};