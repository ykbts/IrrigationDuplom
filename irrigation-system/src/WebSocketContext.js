import React, { createContext, useEffect, useState, useRef } from 'react';
import mqtt from 'mqtt';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const clientRef = useRef(null);
  const [deviceData, setDeviceData] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    const options = {
      host: 'aa00183f4c5e4036b2c60e6ac50e3105.s1.eu.hivemq.cloud',
      port: 8884,
      protocol: 'wss',
      username: 'IrrigationSystem',
      password: 'IrrigationSystem1',
      path: '/mqtt',
    };

    const client = mqtt.connect(`wss://${options.host}:${options.port}${options.path}`, options);
    clientRef.current = client;

    client.on('connect', () => {
      setConnectionStatus('Connected');
      client.subscribe('iot/telemetry/+');
      client.subscribe('iot/control/+');
    });

    client.on('error', (error) => {
      setConnectionStatus('Connection failed');
      console.error(error);
    });

    client.on('message', (topic, message) => {
      const msg = message.toString();
      const [, type, deviceId] = topic.split('/');

      if (!deviceId) return;

      if (type === 'telemetry') {
        try {
          const data = JSON.parse(msg);
          setDeviceData(prev => ({
            ...prev,
            [deviceId]: {
              ...(prev[deviceId] || {}),
              temperature: data.temperature,
              humidity: data.humidity,
              moisture: data.moisture,
            },
          }));
        } catch (err) {
          console.error('JSON parse error:', err);
        }
      } else if (type === 'control') {
        setDeviceData(prev => ({
          ...prev,
          [deviceId]: {
            ...(prev[deviceId] || {}),
            pumpStatus: msg,
            isPumpOn: msg === 'pump/on',
          },
        }));
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const publish = (topic, message) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish(topic, message);
    } else {
      console.warn('MQTT client is not connected');
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        deviceData,
        connectionStatus,
        publish,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
