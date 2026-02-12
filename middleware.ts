import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
            return null
        }

        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }

            return NextResponse.redirect(
                new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
            );
        }

        // Role-based protection
        if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        if (req.nextUrl.pathname.startsWith("/leader") && token?.role !== "LEADER" && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        // Member restrictions
        if (token?.role === "MEMBER") {
            const restrictedRoutes = ["/issues", "/financials", "/reports"];
            if (restrictedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: async ({ token }) => {
                return true
            },
        },
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/issues/:path*",
        "/financials/:path*",
        "/reports/:path*",
        "/community/:path*",
        "/settings/:path*",
        "/admin/:path*",
        "/leader/:path*",
        "/login",
        "/register"
    ],
}
