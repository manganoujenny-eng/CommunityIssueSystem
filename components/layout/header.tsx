import { MainNav } from "@/components/layout/main-nav"
import { UserNav } from "@/components/layout/user-nav"
import { ModeToggle } from "@/components/layout/mode-toggle"
import Link from "next/link"

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <Link href="/" className="font-bold text-xl mr-8 flex items-center">
                    CRIRS
                </Link>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </div>
    )
}
