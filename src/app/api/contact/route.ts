import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, whatsapp, creditType, amount, lgpdConsent } = body;

    if (!name || name.length < 3)
      return NextResponse.json(
        { error: "Nome deve ter pelo menos 3 caracteres." },
        { status: 400 }
      );
    if (!whatsapp)
      return NextResponse.json(
        { error: "WhatsApp e obrigatorio." },
        { status: 400 }
      );
    if (!creditType)
      return NextResponse.json(
        { error: "Tipo de credito e obrigatorio." },
        { status: 400 }
      );
    if (!lgpdConsent)
      return NextResponse.json(
        { error: "E necessario concordar com a Politica de Privacidade." },
        { status: 400 }
      );

    console.log("New contact submission:", { name, whatsapp, creditType, amount });

    return NextResponse.json({
      success: true,
      message:
        "Recebemos seu contato! Em breve um especialista ira te atender.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    );
  }
}
