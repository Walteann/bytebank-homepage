'use server'

import type { SignInFormData as SignInSchema } from '@/features/auth/schemas/sign-in.schema'


// --- TIPOS ---
interface FetchResponse {
    data: unknown;
    status: number;
}

interface ApiErrorResponse {
    message?: string;
    [key: string]: unknown;
}

interface CustomError extends Error {
    response?: {
        status: number;
        data: ApiErrorResponse;
    };
}

// --- AXIOS MOCK ---
const axios = {
    post: async (url: string, data: Record<string, unknown>): Promise<FetchResponse> => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const responseData: unknown = await response.json();

        if (!response.ok) {
            const error = new Error(
                (responseData as ApiErrorResponse).message || 
                `Falha na requisição com status ${response.status}`
            ) as CustomError;
            error.response = { 
                status: response.status, 
                data: responseData as ApiErrorResponse 
            };
            throw error;
        }

        return { data: responseData, status: response.status };
    }
}
// --- FIM AXIOS MOCK ---

interface AuthResponse {
    message: string;
    result?: {
        token: string;
    }
}

interface SignInResult {
    success: boolean;
    token?: string;
    message: string;
}

/**
 * Ação do servidor para processar o login e retornar o token
 */
export async function signInAction(formData: SignInSchema): Promise<SignInResult> {
    const { email, password } = formData;
    
    try {
        // 1. Requisição POST para autenticação
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth`, { email, password });
        const data = response.data as AuthResponse;

        // 2. Extrai o token
        const token = data.result?.token;

        if (!token) {
            return {
                success: false,
                message: 'Token de autenticação não recebido'
            };
        }

        // 3. RETORNA o token em vez de redirecionar
        return {
            success: true,
            token: token,
            message: 'Login realizado com sucesso'
        };
        
    } catch (error) {
        const axiosError = error as CustomError;
        
        if (axiosError.response) {
            const apiMessage = axiosError.response.data?.message ||
                              `Erro ${axiosError.response.status} na autenticação`;

            return {
                success: false,
                message: apiMessage
            };
        }

        return {
            success: false,
            message: 'Erro inesperado ao fazer login'
        };
    }
}