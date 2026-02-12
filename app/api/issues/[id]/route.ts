import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const updateSchema = z.object({
    status: z.enum(["PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
    assignedToId: z.string().optional(),
});

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "LEADER" && session.user.role !== "ADMIN")) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { status, assignedToId } = updateSchema.parse(body);

        const issue = await prisma.issue.update({
            where: { id: params.id },
            data: {
                status,
                assignedToId,
                resolvedAt: status === "RESOLVED" || status === "CLOSED" ? new Date() : null,
            },
        });

        return NextResponse.json(issue);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 400 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
