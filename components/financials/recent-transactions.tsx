import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { formatCurrency, formatDate } from "@/lib/utils"

export async function RecentTransactions() {
    const transactions = await prisma.transaction.findMany({
        orderBy: {
            date: "desc",
        },
        take: 5,
        include: {
            createdBy: true
        }
    })

    // Hack for demo if no DB connection
    const demoTransactions = transactions.length >= 0 ? transactions : []

    return (
        <div className="space-y-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Desc</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {demoTransactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                                No transactions.
                            </TableCell>
                        </TableRow>
                    ) : (
                        demoTransactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell className="font-medium">{tx.description}</TableCell>
                                <TableCell className={tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
                                    {tx.type}
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatCurrency(tx.amount)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
