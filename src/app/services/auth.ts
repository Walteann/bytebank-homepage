import { message } from "../components/ui/message/message";
import {
  authUserData,
  createUser,
  createUserData,
} from "./api";
import { API_BASE_URL, setAuthToken } from "./api-config";

export const signIn = async (authData: authUserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      console.error("Falha no login");
      return null;
    }

    window.location.href = "/";
    return true;
  } catch (error) {
    console.error("Erro inesperado durante o login:", error);
    return null;
  }
};

export const signUp = async (newUserData: createUserData) => {
  try {
    const createUserResponse = await createUser(newUserData);

    if (
      createUserResponse &&
      createUserResponse.result &&
      createUserResponse.result.token
    ) {
      setAuthToken(createUserResponse.result.token);
      message.success("Conta criada com sucesso");
      return createUserResponse.result.token;
    }
  } catch (error) {
    console.error("Erro inesperado durante o login automático:", error);
    return null;
  }
};
