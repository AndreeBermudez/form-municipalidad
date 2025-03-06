import axios from 'axios';

export const instance  = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authMunicipalidadToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});