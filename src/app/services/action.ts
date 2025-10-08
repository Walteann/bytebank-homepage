'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers' // Necessário para manipular cookies do lado do servidor
import { SignInSchema } from '@/lib/schemas/auth'

// --- AXIOS MOCK (Substitua pela importação real em seu projeto) ---
// Em um projeto real, você faria: import axios from 'axios';
// Aqui, simulamos o comportamento de post do Axios usando o fetch padrão.
const axios = {
    post: async (url: string, data: any) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            // O Axios lança um erro para status que não são 2xx. Emulamos isso.
            const error: any = new Error(responseData.message || `Falha na requisição com status ${response.status}`);
            error.response = { status: response.status, data: responseData };
            throw error;
        }

        // O Axios retorna a resposta no objeto 'data'
        return { data: responseData, status: response.status };
    }
}
// --- FIM AXIOS MOCK ---

// URL da Dashboard (porta 3000)
const DASHBOARD_URL = 'http://localhost:3000/' 
// Endpoint de autenticação fornecido
const API_AUTH_URL = 'https://backend-392021924812.southamerica-east1.run.app/user/auth' 

// Interface para tipagem da resposta da API (CORRIGIDO para a estrutura aninhada: { message, result: { token } })
interface AuthResponse {
    message: string;
    result?: { // Tornando 'result' opcional para manipulação de erros, embora esperado em sucesso
        token: string;
    }
}

/**
 * Ação do servidor para processar o login usando Axios (simulado), 
 * buscar o token e redirecionar.
 */
export async function signInAction(formData: SignInSchema) {
    const { email, password } = formData;
    
    try {
        // 1. Usar AXIOS para a requisição POST
        const response = await axios.post(API_AUTH_URL, { email, password });

        // Em Axios, os dados da resposta JSON estão em response.data
        const data: AuthResponse = response.data;
        
        // 2. Tenta extrair o token CORRETAMENTE da propriedade 'result'
        const token = data.result?.token;

        if (!token) {
            // Este erro agora só ocorrerá se 'result' estiver faltando ou 'token' estiver vazio/nulo.
            throw new Error('O token de autenticação não foi recebido na resposta da API. Verifique a estrutura da resposta JSON.');
        }
        
        // 3. **Estabelecer a Sessão/Cookie:**
        cookies().set('authToken', token, {
            httpOnly: true, // Crucial para segurança
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
        });

        console.log(`Login bem-sucedido para: ${email}. Cookie 'auth_token' definido.`);

        // 4. **Redirecionamento para a Dashboard (URL Absoluta):**
        redirect(DASHBOARD_URL); 
        
    } catch (error) {
        // TRATAMENTO CRÍTICO: Verifica se é o erro de redirecionamento
        if (error && (error as Error).message.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        
        // Trata erros de requisição (erros lançados pelo Axios, ou o mock do Axios)
        const axiosError = error as any;
        
        if (axiosError.response) {
            // Erro de resposta HTTP (e.g., 401 Unauthorized)
            const apiMessage = axiosError.response.data?.message || `Erro ${axiosError.response.status} na autenticação. Verifique suas credenciais.`;
            console.error('Erro da API:', apiMessage);
            throw new Error(apiMessage);
        }

        // Outros erros (network, token ausente não capturado acima, etc.)
        console.error('Erro na Server Action de Login:', (error as Error).message);
        throw error;
    }
}