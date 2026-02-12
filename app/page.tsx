import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { CheckCircle2, BarChart3, Users, ShieldCheck, ArrowRight, Zap, Megaphone } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import prisma from "@/lib/prisma";

async function getSystemStats() {
    try {
        const [issueCount, resolvedCount, totalFunds, announcements, expenses] = await Promise.all([
            prisma.issue.count(),
            prisma.issue.count({ where: { status: 'RESOLVED' } }),
            prisma.transaction.aggregate({
                where: { type: 'INCOME' },
                _sum: { amount: true }
            }),
            prisma.announcement.findMany({
                orderBy: { createdAt: 'desc' },
                take: 3
            }),
            prisma.transaction.aggregate({
                where: { type: 'EXPENSE' },
                _sum: { amount: true }
            })
        ]);

        return {
            issues: { total: issueCount, resolved: resolvedCount },
            funds: {
                total: totalFunds._sum.amount || 0,
                expenses: expenses._sum.amount || 0
            },
            announcements
        };
    } catch (error) {
        console.error("Failed to fetch system stats:", error);
        return null;
    }
}

export default async function Home() {
    const stats = await getSystemStats();

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-secondary/20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Community Resource And <span className="text-primary">Issue Reporting System</span>
                                </h1>
                                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                                    A unified platform to report local issues, track community funds transparently, and drive data-backed improvements for your neighborhood.
                                </p>
                            </div>
                            <div className="space-x-4 pt-4">
                                <Link href="/login">
                                    <Button size="lg" className="h-12 px-8 text-lg">
                                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dynamic Stats Section */}
                <section className="w-full py-12 bg-background border-y">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold">{stats ? stats.issues.total : '150+'}</h3>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Issues Reported</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold">{stats ? stats.issues.resolved : '120+'}</h3>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Issues Resolved</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold">{formatCurrency(stats ? stats.funds.total : 50000)}</h3>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Community Grants</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-green-600">Active</h3>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Community Status</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Announcements Section */}
                <section className="w-full py-12 md:py-24 bg-secondary/10">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Latest Updates</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Community Announcements</h2>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    Stay informed about what's happening in your neighborhood.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {stats && stats.announcements.length > 0 ? (
                                stats.announcements.map((announcement) => (
                                    <Card key={announcement.id} className="border-0 shadow-md">
                                        <CardHeader>
                                            <Megaphone className="h-8 w-8 text-primary mb-2" />
                                            <CardTitle className="line-clamp-1">{announcement.title}</CardTitle>
                                            <CardDescription>{new Date(announcement.createdAt).toLocaleDateString()}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-3">{announcement.content}</p>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <>
                                    <Card className="border-0 shadow-md">
                                        <CardHeader>
                                            <Megaphone className="h-8 w-8 text-primary mb-2" />
                                            <CardTitle>Welcome to CRIRS</CardTitle>
                                            <CardDescription>Just Now</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">The system is live! Sign up today to start reporting issues and tracking community progress.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-md">
                                        <CardHeader>
                                            <Megaphone className="h-8 w-8 text-primary mb-2" />
                                            <CardTitle>Grant Application Open</CardTitle>
                                            <CardDescription>2 Days Ago</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">Applications for the new infrastructure grant are now open. Community leaders are encouraged to apply.</p>
                                        </CardContent>
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Key Features Grid */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    From reporting a pothole to auditing the annual budget, CRIRS provides the tools for a better community.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <Card className="border-0 shadow-sm bg-muted/50">
                                <CardHeader>
                                    <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                                    <CardTitle>Issue Reporting</CardTitle>
                                    <CardDescription>Report and track community issues efficiently.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Easily report problems with water, roads, sanitation, and more. Upload photos, set locations, and get real-time status updates as issues are resolved.</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-muted/50">
                                <CardHeader>
                                    <BarChart3 className="h-10 w-10 text-primary mb-2" />
                                    <CardTitle>Financial Transparency</CardTitle>
                                    <CardDescription>Monitor community funds and expenditures.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">View detailed financial reports, track donations, grants, and expenses. Ensure every dollar is accounted for with our open ledger system.</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-muted/50">
                                <CardHeader>
                                    <Zap className="h-10 w-10 text-primary mb-2" />
                                    <CardTitle>Data-Driven Insights</CardTitle>
                                    <CardDescription>Make better decisions with analytics.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Leaders get access to comprehensive dashboards and predictive insights to prioritize resources effectively using heatmap technologies.</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-muted/50">
                                <CardHeader>
                                    <Users className="h-10 w-10 text-primary mb-2" />
                                    <CardTitle>Community Engagement</CardTitle>
                                    <CardDescription>Connect with your neighbors.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Participate in polls, read announcements, and join volunteer groups. Foster a stronger sense of belonging.</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-muted/50">
                                <CardHeader>
                                    <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                                    <CardTitle>Secure & Private</CardTitle>
                                    <CardDescription>Your data is safe with us.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Built with enterprise-grade security. Role-based access control ensures only authorized personnel see sensitive data.</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-muted/50">
                                <CardHeader>
                                    <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                                    <CardTitle>Mobile Ready</CardTitle>
                                    <CardDescription>Access on any device.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Fully responsive design allows you to report issues from your phone while on the go, or manage finances from your desktop.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                                    Simple steps to make a big impact.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">1</div>
                                <h3 className="text-xl font-bold">Sign Up</h3>
                                <p className="text-muted-foreground">Create an account as a resident or community leader.</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">2</div>
                                <h3 className="text-xl font-bold">Report & Track</h3>
                                <p className="text-muted-foreground">Submit issues or update financial records easily.</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">3</div>
                                <h3 className="text-xl font-bold">See Results</h3>
                                <p className="text-muted-foreground">Watch as your community improves through collective action.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Your Community</h2>
                                <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Be part of the solution. Sign up today to start contributing to a better community.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2 pt-4">
                                <div className="flex justify-center space-x-4">
                                    <Link href="/register">
                                        <Button className="w-full bg-background text-primary hover:bg-background/90" size="lg">Sign Up Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">© 2024 CRIRS. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
