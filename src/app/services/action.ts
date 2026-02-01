'use server'

import { SignInSchema } from './../lib/schemas/auth'

/**
 * Server Actions - ByteBank Homepage
 * 
 * SEGURANÇA:
 * - Este arquivo contém apenas funções auxiliares
 * - O login principal agora é feito via /api/login que seta cookie HttpOnly
 * - Logs são condicionais ao ambiente de desenvolvimento
 */

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

// --- FETCH WRAPPER ---
const fetchApi = {
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

interface AuthResponse {
    message: string;
    result?: {
        token: string;
    }
}

interface SignInResult {
    success: boolean;
    message: string;
}

/**
 * @deprecated Esta função não é mais usada diretamente.
 * O login agora é feito via /api/login que seta cookie HttpOnly.
 * Mantida para compatibilidade.
 */
export async function signInAction(formData: SignInSchema): Promise<SignInResult> {
    const { email, password } = formData;
    
    try {
        const response = await fetchApi.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth`, 
            { email, password }
        );
        const data = response.data as AuthResponse;
        
        const token = data.result?.token;

        if (!token) {
            return {
                success: false,
                message: 'Token de autenticação não recebido'
            };
        }

        if (process.env.NODE_ENV === 'development') {
            console.log(`Login bem-sucedido para: ${email}`);
        }

        return {
            success: true,
            message: 'Login realizado com sucesso'
        };
        
    } catch (error) {
        const fetchError = error as CustomError;
        
        if (fetchError.response) {
            const apiMessage = fetchError.response.data?.message || 
                              `Erro ${fetchError.response.status} na autenticação`;
            
            if (process.env.NODE_ENV === 'development') {
                console.error('Erro da API:', apiMessage);
            }
            
            return {
                success: false,
                message: apiMessage
            };
        }

        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na Server Action:', (error as Error).message);
        }
        
        return {
            success: false,
            message: 'Erro inesperado ao fazer login'
        };
    }
}