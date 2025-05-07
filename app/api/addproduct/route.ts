import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { productName, price, unit, type, stock, description } = await request.json();

        
    }
}