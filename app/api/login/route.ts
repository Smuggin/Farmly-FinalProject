// app/api/login/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // ตรวจสอบว่าผู้ใช้มีใน Database หรือไม่
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!user || !isPasswordValid) {
      return NextResponse.json(
        { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // หากเข้าสู่ระบบสำเร็จ
    return NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 }
    );
  }
}
