'use server'

import { cookies } from 'next/headers'
import { SignInSchema } from './../lib/schemas/auth'

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

// const API_AUTH_URL = 'https://teste-gui---backend-qwxhi2f4za-rj.a.run.app/user/auth'
const API_AUTH_URL = 'https://backend-392021924812.southamerica-east1.run.app/user/auth'
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
        const response = await axios.post(API_AUTH_URL, { email, password });
        const data = response.data as AuthResponse;
        
        // 2. Extrai o token
        const token = data.result?.token;

        if (!token) {
            return {
                success: false,
                message: 'Token de autenticação não recebido'
            };
        }
        
        // 3. Salva o cookie (opcional, para uso interno do app homepage)
        const cookieStore = await cookies();
        cookieStore.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        console.log(`✅ Login bem-sucedido para: ${email}`);

        // 4. RETORNA o token em vez de redirecionar
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
            console.error('❌ Erro da API:', apiMessage);
            
            return {
                success: false,
                message: apiMessage
            };
        }

        console.error('❌ Erro na Server Action:', (error as Error).message);
        
        return {
            success: false,
            message: 'Erro inesperado ao fazer login'
        };
    }
}