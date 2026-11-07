
"use client";

import { useState } from "react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { CustomerProvider } from "./customers/customer-provider";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <CustomerProvider>
            <div className="min-h-screen bg-background">
                <DashboardSidebar
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />

                <div className="min-h-screen lg:pl-64">
                    <DashboardHeader
                        onMenuClick={() => setMobileOpen(true)}
                    />

                    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </CustomerProvider>
    );
}
