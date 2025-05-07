// app/api/register/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json();

    // ตรวจสอบอีเมลซ้ำ
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "อีเมลนี้ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);


    // บันทึกข้อมูลผู้ใช้ลง Database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ", user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" },
      { status: 500 }
    );
  }
}
