import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { formatDate } from "@/lib/utils"

interface RecentIssuesProps {
    limit?: number
}

export async function RecentIssues({ limit }: RecentIssuesProps) {
    const session = await getServerSession(authOptions)

    if (!session) return null

    const issues = await prisma.issue.findMany({
        where: {
            reportedById: session.user.role === 'MEMBER' ? session.user.id : undefined
        },
        orderBy: {
            createdAt: "desc",
        },
        take: limit || 10,
        include: {
            reportedBy: true
        }
    })

    // Hack for demo if no DB connection or empty DB
    const demoIssues = issues.length > 0 ? issues : []

    return (
        <div className="space-y-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {demoIssues.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                                No issues found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        demoIssues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell className="font-medium">{issue.title}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        issue.status === 'RESOLVED' ? 'default' :
                                            issue.status === 'IN_PROGRESS' ? 'secondary' : 'outline'
                                    }>
                                        {issue.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        issue.priority === 'URGENT' ? 'destructive' : 'outline'
                                    }>
                                        {issue.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatDate(issue.createdAt)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
