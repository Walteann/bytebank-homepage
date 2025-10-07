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

    const res = NextResponse.json({ success: true });

    // Salva cookie HTTP-only
    res.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    return res;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ message: "Erro no login" }, { status: 500 });
  }
}
