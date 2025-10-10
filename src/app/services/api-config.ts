export const API_BASE_URL = 'https://tech-challenge-2-awjb.onrender.com';

// armazena o token
export let authToken: string | null = null;

// define o token
export const setAuthToken = (token: string) => {
  authToken = token;
};
