
"use client";

import { X, Mail, CalendarDays, CreditCard, User } from "lucide-react";
import type { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CustomerDetailsDialogProps = {
    customer: Customer | null;
    open: boolean;
    onClose: () => void;
};

export function CustomerDetailsDialog({
    customer,
    open,
    onClose,
}: CustomerDetailsDialogProps) {
    if (!open || !customer) return null;

    const statusStyles = {
        Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        Inactive: "bg-red-500/10 text-red-600 dark:text-red-400",
        Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="customer-details-title"
                className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h2
                            id="customer-details-title"
                            className="text-xl font-semibold"
                        >
                            Customer Details
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            View customer account information.
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="mt-6 flex items-center gap-4 rounded-xl bg-muted/50 p-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                        {customer.initials}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate font-semibold">{customer.name}</h3>
                        <p className="truncate text-sm text-muted-foreground">
                            {customer.email}
                        </p>
                        <Badge
                            variant="secondary"
                            className={`mt-2 ${statusStyles[customer.status]}`}
                        >
                            {customer.status}
                        </Badge>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Customer ID</p>
                            <p className="text-sm font-medium">{customer.id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Subscription Plan</p>
                            <p className="text-sm font-medium">{customer.plan}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Joined Date</p>
                            <p className="text-sm font-medium">
                                {new Date(customer.joinedAt).toLocaleDateString("en-CA", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    timeZone: "UTC",
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Email Address</p>
                            <p className="text-sm font-medium">{customer.email}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-xl border border-border p-4">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="mt-1 text-2xl font-bold">
                        ${customer.totalSpent.toLocaleString("en-CA", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button onClick={onClose} className="rounded-xl">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
