"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { useSession } from "next-auth/react"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const role = session?.user?.role

    const routes = [
        {
            href: "/dashboard",
            label: "Overview",
            active: pathname === "/dashboard",
        },
        {
            href: "/issues",
            label: "Issues",
            active: pathname.startsWith("/issues"),
        },
        {
            href: "/financials",
            label: "Financials",
            active: pathname.startsWith("/financials"),
        },
        {
            href: "/reports",
            label: "Reports",
            active: pathname.startsWith("/reports"),
        },
        {
            href: "/about",
            label: "Help",
            active: pathname === "/about",
        },
    ]

    const filteredRoutes = routes.filter(route => {
        if (role === 'MEMBER') {
            return !['/issues', '/financials', '/reports'].includes(route.href);
        }
        return true;
    });

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {filteredRoutes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
