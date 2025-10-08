'use server'

import { cookies } from 'next/headers'
import { SignInSchema } from '@/lib/schemas/auth'

// --- AXIOS MOCK ---
const axios = {
    post: async (url: string, data: any) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error: any = new Error(responseData.message || `Falha na requisição com status ${response.status}`);
            error.response = { status: response.status, data: responseData };
            throw error;
        }

        return { data: responseData, status: response.status };
    }
}
// --- FIM AXIOS MOCK ---

// const API_AUTH_URL = 'https://backend-392021924812.southamerica-east1.run.app/user/auth'
const API_AUTH_URL = 'https://teste-gui---backend-qwxhi2f4za-rj.a.run.app/user/auth'
interface AuthResponse {
    message: string;
    result?: {
        token: string;
    }
}

/**
 * Ação do servidor para processar o login e retornar o token
 */
export async function signInAction(formData: SignInSchema) {
    const { email, password } = formData;
    
    try {
        // 1. Requisição POST para autenticação
        const response = await axios.post(API_AUTH_URL, { email, password });
        const data: AuthResponse = response.data;
        
        // 2. Extrai o token
        const token = data.result?.token;

        if (!token) {
            throw new Error('Token de autenticação não recebido');
        }
        
        // 3. Salva o cookie (opcional, para uso interno do app homepage)
        cookies().set('authToken', token, {
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
        const axiosError = error as any;
        
        if (axiosError.response) {
            const apiMessage = axiosError.response.data?.message || `Erro ${axiosError.response.status} na autenticação`;
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