
"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    BarChart3,
    Settings,
    HelpCircle,
    Zap,
    ChevronDown,
    X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const mainNavigation = [
    { label: "Overview", href: "/", icon: LayoutDashboard },
    { label: "Customers", href: "/customers", icon: Users },
    { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const secondaryNavigation = [
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help & Support", href: "/help", icon: HelpCircle },
];

type DashboardSidebarProps = {
    mobileOpen: boolean;
    onClose: () => void;
};

export function DashboardSidebar({
    mobileOpen,
    onClose,
}: DashboardSidebarProps) {
    return (
        <>
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
                    mobileOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-6">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Zap className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-bold tracking-tight text-sidebar-foreground">
                                SaaS Starter
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Admin Dashboard
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="border-b border-sidebar-border p-4">
                    <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3 text-left transition-colors hover:bg-sidebar-accent"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Zap className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-sidebar-foreground">
                                    Acme Inc.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Free workspace
                                </p>
                            </div>
                        </div>

                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>

                <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
                    <div>
                        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Workspace
                        </p>

                        <div className="space-y-1">
                            {mainNavigation.map((item) => {
                                const Icon = item.icon;
                                const active = item.href === "/";

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                            active
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                        )}
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Preferences
                        </p>

                        <div className="space-y-1">
                            {secondaryNavigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                <div className="border-t border-sidebar-border p-4">
                    <div className="rounded-xl bg-primary/5 p-4">
                        <div className="mb-2 flex items-center gap-2 text-primary">
                            <Zap className="h-4 w-4" />
                            <span className="text-xs font-semibold">
                                Upgrade your plan
                            </span>
                        </div>

                        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                            Unlock more features and grow your business.
                        </p>

                        <button
                            type="button"
                            className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Explore plans
                        </button>
                    </div>

                    <p className="mt-4 text-center text-[11px] text-muted-foreground">
                        SaaS Starter Kit · v1.0.0
                    </p>
                </div>
            </aside>
        </>
    );
}
