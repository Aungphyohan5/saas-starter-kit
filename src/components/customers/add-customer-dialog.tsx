
"use client";

import { useState, type FormEvent } from "react";
import { X, UserPlus } from "lucide-react";

import { useCustomers } from "./customer-provider";
import type {
    CustomerPlan,
    CustomerStatus,
} from "@/types/customer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AddCustomerDialogProps = {
    open: boolean;
    onClose: () => void;
};

export function AddCustomerDialog({
    open,
    onClose,
}: AddCustomerDialogProps) {
    const { addCustomer } = useCustomers();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [plan, setPlan] = useState<CustomerPlan>("Starter");
    const [status, setStatus] = useState<CustomerStatus>("Active");
    const [error, setError] = useState("");

    if (!open) return null;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName || !trimmedEmail) {
            setError("Please complete all required fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        const nameParts = trimmedName.split(/\s+/);
        const initials = nameParts
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();

        addCustomer({
            name: trimmedName,
            email: trimmedEmail,
            initials,
            plan,
            status,
            joinedAt: new Date().toISOString().slice(0, 10),
            totalSpent: 0,
        });

        setName("");
        setEmail("");
        setPlan("Starter");
        setStatus("Active");
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-customer-title"
                className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-border p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <UserPlus className="h-5 w-5" />
                        </div>

                        <div>
                            <h2
                                id="add-customer-title"
                                className="text-lg font-semibold"
                            >
                                Add Customer
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Create a new customer record.
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 p-5">
                        <div className="space-y-2">
                            <Label htmlFor="customer-name">
                                Full Name *
                            </Label>
                            <Input
                                id="customer-name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="e.g. Olivia Martin"
                                autoComplete="name"
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="customer-email">
                                Email Address *
                            </Label>
                            <Input
                                id="customer-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="olivia@example.com"
                                autoComplete="email"
                                maxLength={254}
                                required
                            />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="customer-plan">
                                    Subscription Plan
                                </Label>
                                <select
                                    id="customer-plan"
                                    value={plan}
                                    onChange={(event) =>
                                        setPlan(event.target.value as CustomerPlan)
                                    }
                                    className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="Starter">Starter</option>
                                    <option value="Pro">Pro</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="customer-status">
                                    Customer Status
                                </Label>
                                <select
                                    id="customer-status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value as CustomerStatus)
                                    }
                                    className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                            >
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-border p-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Customer
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
