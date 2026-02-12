import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container py-12 px-4 md:px-6">
                <div className="flex items-center space-x-4 mb-8">
                    <Link href="/">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Help & About</h1>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">About CRIRS</h2>
                        <p className="text-muted-foreground">
                            The Community Resource and Issue Reporting System (CRIRS) is designed to bridge the gap between community members and local leaders. Our platform empowers residents to report infrastructure issues, track the allocation of community funds, and foster a more transparent and responsive neighborhood environment.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How do I report an issue?</AccordionTrigger>
                                <AccordionContent>
                                    Navigate to the "Issues" tab after logging in. Click on "Report Issue", fill in the details including the type of issue (e.g., Water, Road) and its location, and submit. You can track its status in "My Issues".
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Who can see my report?</AccordionTrigger>
                                <AccordionContent>
                                    Your report is visible to Community Leaders and Admins immediately. Other members can see it if it's marked as public, which helps in avoiding duplicate reports for the same problem.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>How is the budget data updated?</AccordionTrigger>
                                <AccordionContent>
                                    Financial data is updated by authorized Community Leaders and Treasurers. Every transaction, donation, and expense is recorded to ensure complete transparency.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>How can I apply for a grant?</AccordionTrigger>
                                <AccordionContent>
                                    Grant opportunities are posted in the "Announcements" section on the homepage and dashboard. Application instructions will be provided within each announcement.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Contact Support</h2>
                        <p className="text-muted-foreground">
                            Need further assistance? Reach out to our support team.
                        </p>
                        <div className="flex flex-col space-y-2">
                            <p><strong>Email:</strong> support@crirs.org</p>
                            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                            <p><strong>Address:</strong> 123 Community Lane, Cityville</p>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
                <p className="text-xs text-muted-foreground">© 2026 CRIRS. All rights reserved.</p>
            </footer>
        </div>
    );
}
