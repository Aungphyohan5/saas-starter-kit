
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.$connect();

        const result = await prisma.$queryRaw`SELECT NOW() AS current_time`;

        return NextResponse.json({
            success: true,
            message: "Successfully connected to Neon PostgreSQL!",
            databaseTime: result,
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Database connection failed.",
            },
            { status: 500 }
        );
    }
}
