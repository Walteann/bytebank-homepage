import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Endpoint de login seguro
 * Recebe email/password, autentica na API externa e seta cookie HttpOnly
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(`${API_BASE_URL}/user/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Credenciais inválidas",
        },
        { status: apiResponse.status }
      );
    }

    const token = data.result?.token;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token de autenticação não recebido" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro no login:", error);
    }
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
