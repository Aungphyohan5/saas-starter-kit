
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
    const isLoggedIn = !!request.auth;
    const pathname = request.nextUrl.pathname;

    const isDashboardRoute =
        pathname === "/" ||
        pathname.startsWith("/customers") ||
        pathname.startsWith("/analytics") ||
        pathname.startsWith("/subscriptions") ||
        pathname.startsWith("/settings");

    if (isDashboardRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", request.nextUrl.origin);

        loginUrl.searchParams.set("callbackUrl", pathname);

        return NextResponse.redirect(loginUrl);
    }

    if (
        isLoggedIn &&
        (pathname === "/login" || pathname === "/register")
    ) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/",
        "/customers/:path*",
        "/analytics/:path*",
        "/subscriptions/:path*",
        "/settings/:path*",
        "/login",
        "/register",
    ],
};
