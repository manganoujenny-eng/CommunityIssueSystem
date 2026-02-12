import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IssueForm } from "@/components/issues/issue-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentIssues } from "@/components/issues/recent-issues";

export function MemberView() {
    return (
        <Tabs defaultValue="report" className="space-y-4">
            <TabsList>
                <TabsTrigger value="report">Report Issue</TabsTrigger>
                <TabsTrigger value="my-issues">My Issues</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>
            <TabsContent value="report" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Report a New Issue</CardTitle>
                            <CardDescription>
                                Submit a detailed report about a community problem.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <IssueForm />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Updates on issues you've reported.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentIssues />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="my-issues">
                <Card>
                    <CardHeader>
                        <CardTitle>My Reported Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentIssues limit={10} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="announcements">
                <Card>
                    <CardHeader>
                        <CardTitle>Community Announcements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>No new announcements.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
