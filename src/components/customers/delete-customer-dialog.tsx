
"use client";

import { AlertTriangle } from "lucide-react";
import type { Customer } from "@/types/customer";
import { useCustomers } from "./customer-provider";
import { Button } from "@/components/ui/button";

type DeleteCustomerDialogProps = {
    customer: Customer | null;
    open: boolean;
    onClose: () => void;
};

export function DeleteCustomerDialog({
    customer,
    open,
    onClose,
}: DeleteCustomerDialogProps) {
    const { deleteCustomer } = useCustomers();

    if (!open || !customer) return null;

    const handleDelete = () => {
        deleteCustomer(customer.id);
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
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-customer-title"
                className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                    <AlertTriangle className="h-6 w-6" />
                </div>

                <h2
                    id="delete-customer-title"
                    className="mt-4 text-xl font-semibold"
                >
                    Delete Customer?
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-foreground">
                        {customer.name}
                    </span>
                    ? This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="rounded-xl"
                    >
                        Delete Customer
                    </Button>
                </div>
            </div>
        </div>
    );
}
