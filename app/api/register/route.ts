import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["MEMBER", "LEADER", "ADMIN"]).optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, role } = registerSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || "MEMBER",
            },
        });

        // Create a profile for the user
        await prisma.profile.create({
            data: {
                userId: user.id,
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 400 });
        }
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
