"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface IssueActionsProps {
    issueId: string
    currentStatus: string
}

export function IssueActions({ issueId, currentStatus }: IssueActionsProps) {
    const router = useRouter()

    async function updateStatus(status: string) {
        try {
            const res = await fetch(`/api/issues/${issueId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            if (!res.ok) throw new Error("Failed to update")

            toast({
                title: "Status Updated",
                description: `Issue status changed to ${status}`,
            })
            router.refresh()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not update status",
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(issueId)}>
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => updateStatus("PENDING")}>
                    Mark Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateStatus("IN_PROGRESS")}>
                    Mark In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateStatus("RESOLVED")}>
                    Mark Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateStatus("CLOSED")}>
                    Mark Closed
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
