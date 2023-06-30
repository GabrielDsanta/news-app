import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': process.env.API_KEY,
  },
});