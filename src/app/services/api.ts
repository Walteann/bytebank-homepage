/**
 * API Services - ByteBank Homepage
 * 
 * SEGURANÇA:
 * - Não expõe tokens ao JavaScript do cliente
 * - Autenticação é feita via cookies HttpOnly
 */

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface createUserData {
  username: string;
  email: string;
  password: string;
}

export interface authUserData {
  email: string;
  password: string;
}

/**
 * Cria um novo usuário
 */
export const createUser = async (userData: createUserData) => {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

/**
 * Autentica um usuário
 * Usado internamente pelo endpoint /api/login
 */
export const authenticateUser = async (authData: authUserData) => {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/user/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  return response.json();
};
