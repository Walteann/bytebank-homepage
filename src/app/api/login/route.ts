import { authenticateUser } from "@/app/services/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const authResponse = await authenticateUser({ email, password });

    if (!authResponse?.result?.token) {
      return NextResponse.json({ message: "Login falhou" }, { status: 401 });
    }

    const token = authResponse.result.token;

    // Setar cookie HttpOnly seguro - NÃO expõe token ao JavaScript do cliente
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true, // Impede acesso via JavaScript (proteção XSS)
      secure: process.env.NODE_ENV === "production", // HTTPS apenas em produção
      sameSite: "lax", // Permite navegação cross-origin do mesmo site (necessário para microfrontend)
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/", // Cookie disponível em todo o domínio
    });

    return NextResponse.json({ 
      success: true,
      message: "Login realizado com sucesso"
    });

  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro no login:", error);
    }
    return NextResponse.json({ message: "Erro no login" }, { status: 500 });
  }
}