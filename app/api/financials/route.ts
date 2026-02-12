import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const transactionSchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.enum(["DONATION", "LEVY", "REPAIR", "LABOR", "EQUIPMENT", "OTHER"]),
    amount: z.number().positive(),
    description: z.string().min(5),
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "LEADER" && session.user.role !== "ADMIN")) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { type, category, amount, description } = transactionSchema.parse(body);

        const transaction = await prisma.transaction.create({
            data: {
                type,
                category,
                amount,
                description,
                createdById: session.user.id,
            },
        });

        return NextResponse.json(transaction);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 400 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
