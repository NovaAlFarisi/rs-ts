import config from '@/config';
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: config.API_URL,
});

export default api;
