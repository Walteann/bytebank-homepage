import { message } from "../components/ui/message/message";
import {
  authUserData,
  createUser,
  createUserData,
} from "./api";
import { logger } from "../utils/logger";

/**
 * Realiza o login do usuário
 * 
 * SEGURANÇA:
 * - Chama a API que seta cookie HttpOnly
 * - NÃO armazena token no cliente
 */
export const signIn = async (authData: authUserData) => {
  try {
    logger.log("Iniciando login...");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
      credentials: "include", // Importante: inclui cookies
    });

    if (!response.ok) {
      logger.error("Falha no login");
      return null;
    }

    window.location.href = "/";
    return true;
  } catch (error) {
    logger.error("Erro inesperado durante o login:", error);
    return null;
  }
};

/**
 * Cria uma nova conta de usuário
 */
export const signUp = async (newUserData: createUserData) => {
  try {
    const createUserResponse = await createUser(newUserData);

    if (
      createUserResponse &&
      createUserResponse.result &&
      createUserResponse.result.token
    ) {
      // Token será setado via cookie HttpOnly pelo backend
      message.success("Conta criada com sucesso");
      return true;
    }
  } catch (error) {
    logger.error("Erro inesperado durante o cadastro:", error);
    return null;
  }
};
