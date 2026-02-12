import { Overview } from "@/components/analytics/overview";
import { RecentActivity } from "@/components/analytics/recent-activity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                    <p className="text-muted-foreground">
                        System-wide analytics and performance reports.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href="/dashboard">
                        <Button variant="outline">
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Issue Trends</CardTitle>
                        <CardDescription>Monthly reported issues over time.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                        <CardDescription>Recent system actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentActivity />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
