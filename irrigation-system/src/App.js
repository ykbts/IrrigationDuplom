import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import AddDevicePage from './pages/AddDevicePage';
import { WebSocketProvider } from './WebSocketContext';
import ProtectedRoute from './ProtectedRoute'; // правильний шлях!
import AnalyticsPage from './pages/AnalyticsPage';
import DevicesPage from './pages/DevicesPage';

function App() {
  return (
    <Router>
      <WebSocketProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-device"
            element={
              <ProtectedRoute>
                <AddDevicePage />
              </ProtectedRoute>
            }
          />
            <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
            <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <DevicesPage />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </WebSocketProvider>
    </Router>
  );
}

export default App;
