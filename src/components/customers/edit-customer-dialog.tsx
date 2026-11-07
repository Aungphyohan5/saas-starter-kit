
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useCustomers } from "./customer-provider";
import type { Customer, CustomerPlan, CustomerStatus } from "@/types/customer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditCustomerDialogProps = {
    customer: Customer | null;
    open: boolean;
    onClose: () => void;
};

export function EditCustomerDialog({
    customer,
    open,
    onClose,
}: EditCustomerDialogProps) {
    const { updateCustomer } = useCustomers();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [plan, setPlan] = useState<CustomerPlan>("Starter");
    const [status, setStatus] = useState<CustomerStatus>("Active");
    const [error, setError] = useState("");

    useEffect(() => {
        if (customer && open) {
            setName(customer.name);
            setEmail(customer.email);
            setPlan(customer.plan);
            setStatus(customer.status);
            setError("");
        }
    }, [customer, open]);

    if (!open || !customer) return null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName || !trimmedEmail) {
            setError("Please fill in all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        const initials = trimmedName
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

        updateCustomer(customer.id, {
            name: trimmedName,
            email: trimmedEmail,
            initials,
            plan,
            status,
        });

        onClose();
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
                aria-labelledby="edit-customer-title"
                className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h2
                            id="edit-customer-title"
                            className="text-xl font-semibold"
                        >
                            Edit Customer
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Update customer account information.
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

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-customer-name">Full Name</Label>
                        <Input
                            id="edit-customer-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter customer name"
                            className="rounded-xl"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-customer-email">Email Address</Label>
                        <Input
                            id="edit-customer-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email address"
                            className="rounded-xl"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-customer-plan">Subscription Plan</Label>
                        <select
                            id="edit-customer-plan"
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
                        <Label htmlFor="edit-customer-status">Account Status</Label>
                        <select
                            id="edit-customer-status"
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

                    {error && (
                        <p className="text-sm text-red-500" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>

                        <Button type="submit" className="rounded-xl">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
