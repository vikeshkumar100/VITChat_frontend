import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'http://localhost:8080',
});

export const googleauth=(code)=>loginApi.get(`/auth/google?code=${code}`);