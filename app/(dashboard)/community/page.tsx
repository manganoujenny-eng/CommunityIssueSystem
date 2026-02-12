import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Community</h2>
                    <p className="text-muted-foreground">
                        Connect with neighbors and stay updated.
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
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Announcements</CardTitle>
                        <CardDescription>Latest news from the community leaders.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start space-x-4 rounded-md border p-4">
                            <ActivityIcon className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Park Cleanup Day
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Join us this Saturday for the monthly park cleanup. Refreshments provided!
                                </p>
                                <p className="text-xs text-muted-foreground pt-2">Posted 2 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 rounded-md border p-4">
                            <ActivityIcon className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Town Hall Meeting
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Discussing the new budget proposal. All members welcome.
                                </p>
                                <p className="text-xs text-muted-foreground pt-2">Posted 1 week ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Contributors</CardTitle>
                        <CardDescription>Members making a difference.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                <p className="text-sm text-muted-foreground">
                                    Volunteer
                                </p>
                            </div>
                            <div className="ml-auto font-medium">Lvl 5</div>
                        </div>
                        <div className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                <AvatarFallback>JL</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                <p className="text-sm text-muted-foreground">
                                    Organizer
                                </p>
                            </div>
                            <div className="ml-auto font-medium">Lvl 8</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
