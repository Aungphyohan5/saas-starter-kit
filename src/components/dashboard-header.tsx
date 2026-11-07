
"use client";

import {
    Bell,
    Menu,
    Search,
    ChevronDown,
    UserRound,
    Settings,
    LogOut,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DashboardHeaderProps = {
    onMenuClick: () => void;
};

export function DashboardHeader({
    onMenuClick,
}: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 lg:hidden"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="relative hidden w-full max-w-md sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search anything..."
                        className="h-10 rounded-xl border-border bg-muted/50 pl-10 focus-visible:ring-primary"
                    />

                    <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground md:block">
                        ⌘ K
                    </kbd>
                </div>

                <p className="truncate text-sm font-medium text-muted-foreground sm:hidden">
                    Dashboard
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <ThemeToggle />

                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-xl"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                </Button>

                <div className="mx-1 hidden h-8 w-px bg-border sm:block" />

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-muted"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        AP
                    </div>

                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-muted-foreground">
                            Administrator
                        </p>
                    </div>

                    <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
                </button>
            </div>
        </header>
    );
}
