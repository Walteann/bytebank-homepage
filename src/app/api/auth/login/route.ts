import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AuthResponse {
  message: string;
  result?: {
    token: string;
  };
}

/**
 * Endpoint de login seguro
 * - Autentica com o backend externo
 * - Seta cookie HttpOnly (não acessível via JavaScript)
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Autentica com o backend externo
    const response = await fetch(`${API_BASE_URL}/user/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok || !data?.result?.token) {
      return NextResponse.json(
        { success: false, message: data?.message || "Login falhou" },
        { status: 401 }
      );
    }

    const token = data.result.token;

    // Seta cookie HttpOnly seguro
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
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
      { success: false, message: "Erro no login" },
      { status: 500 }
    );
  }
}
