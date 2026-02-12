import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IssueManagement } from "@/components/issues/issue-management";
import { FinancialForm } from "@/components/financials/financial-form";
import { RecentTransactions } from "@/components/financials/recent-transactions";

export function LeaderView() {
    return (
        <Tabs defaultValue="issues" className="space-y-4">
            <TabsList>
                <TabsTrigger value="issues">Issue Management</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="issues" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Issue Queue</CardTitle>
                        <CardDescription>
                            Manage and update status of reported issues.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <IssueManagement />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="financials" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Record Transaction</CardTitle>
                            <CardDescription>Log income or expenses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FinancialForm />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RecentTransactions />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="reports">
                <Card>
                    <CardHeader>
                        <CardTitle>Team Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Report generation module coming soon.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
