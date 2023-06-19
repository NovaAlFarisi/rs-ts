import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://rs-bed-availibility.vercel.app/api',
});

export default api;
