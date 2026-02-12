import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const issueSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    category: z.enum(["WATER", "ROAD", "SANITATION", "ELECTRICITY", "OTHER"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
    location: z.string().optional(),
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, category, priority, location } = issueSchema.parse(body);

        const issue = await prisma.issue.create({
            data: {
                title,
                description,
                category,
                priority,
                location,
                reportedById: session.user.id,
            },
        });

        return NextResponse.json(issue);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 400 });
        }
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
