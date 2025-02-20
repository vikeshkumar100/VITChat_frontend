import axios from 'axios';
const url=import.meta.env.VITE_API_URL;

const loginApi = axios.create({
  baseURL: url,
});

export const googleauth=(code)=>loginApi.get(`/auth/google?code=${code}`);