"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, AlertCircle, DollarSign, BarChart3, Users, Settings } from "lucide-react"
import { useSession } from "next-auth/react"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const role = session?.user?.role

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Issues",
            icon: AlertCircle,
            href: "/issues",
            active: pathname.startsWith("/issues"),
        },
        {
            label: "Financials",
            icon: DollarSign,
            href: "/financials",
            active: pathname.startsWith("/financials"),
        },
        {
            label: "Reports",
            icon: BarChart3,
            href: "/reports",
            active: pathname.startsWith("/reports"),
        },
        {
            label: "Community",
            icon: Users,
            href: "/community",
            active: pathname.startsWith("/community"),
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/settings",
            active: pathname.startsWith("/settings"),
        },
    ]

    const filteredRoutes = routes.filter(route => {
        if (role === 'MEMBER') {
            return !['/issues', '/financials', '/reports'].includes(route.href);
        }
        return true;
    });

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Menu
                    </h2>
                    <div className="space-y-1">
                        {filteredRoutes.map((route) => (
                            <Link key={route.href} href={route.href}>
                                <Button
                                    variant={route.active ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                >
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
