// armazena o token
export let authToken: string | null = null;

// define o token
export const setAuthToken = (token: string) => {
  authToken = token;
};
