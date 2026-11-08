
import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "../../components/auth/login-form";

export const metadata: Metadata = {
    title: "Sign In | SaaS Starter Kit",
    description: "Sign in to your SaaS Starter Kit workspace.",
};

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            S
                        </span>
                        SaaS Starter Kit
                    </Link>
                </div>

                <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                    <LoginForm />
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    Build faster. Launch smarter.
                </p>
            </div>
        </main>
    );
}
