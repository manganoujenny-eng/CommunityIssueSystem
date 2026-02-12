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
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IssueActions } from "./issue-actions"

export async function IssueManagement() {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            reportedBy: true
        }
    })

    return (
        <div className="space-y-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {issues.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                No issues found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell className="font-medium">{issue.title}</TableCell>
                                <TableCell>{issue.category}</TableCell>
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
                                <TableCell>{issue.reportedBy.name}</TableCell>
                                <TableCell>
                                    {formatDate(issue.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <IssueActions issueId={issue.id} currentStatus={issue.status} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
