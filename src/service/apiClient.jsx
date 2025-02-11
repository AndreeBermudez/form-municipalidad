// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // La URL base se configurará vía variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
