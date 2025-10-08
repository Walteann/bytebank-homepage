import { authenticateUser } from "@/app/services/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const authResponse = await authenticateUser({ email, password });

    if (!authResponse?.result?.token) {
      return NextResponse.json({ message: "Login falhou" }, { status: 401 });
    }

    const token = authResponse.result.token;

    // Retorna apenas o token para o cliente decidir o que fazer
    return NextResponse.json({ 
      success: true,
      token: token 
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ message: "Erro no login" }, { status: 500 });
  }
}