import { BASE_URL } from './config';

export const getAutoMode = async () => {
  try {
    const response = await fetch(`${BASE_URL}/mode`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.auto_mode;
  } catch (error) {
    console.error('Помилка отримання режиму:', error);
    throw error;
  }
};

export const updateAutoMode = async (autoMode) => {
  const response = await fetch(`${BASE_URL}/mode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auto_mode: autoMode }),
  });

  if (!response.ok) throw new Error('Network response was not ok');

  return await response.json();
};
