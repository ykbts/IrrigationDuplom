import { BASE_URL } from './config';

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Помилка входу');
  }

  return response.json();
};

export const register = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Помилка реєстрації');
  }

  return response.json();
};