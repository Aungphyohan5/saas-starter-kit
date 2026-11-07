
"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Users,
    Filter,
    Plus,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { AddCustomerDialog } from "./add-customer-dialog";
import { CustomerDetailsDialog } from "./customer-details-dialog";
import { EditCustomerDialog } from "./edit-customer-dialog";
import { DeleteCustomerDialog } from "./delete-customer-dialog";
import { useCustomers } from "./customer-provider";

import type { Customer, CustomerStatus } from "@/types/customer";

const statusStyles: Record<CustomerStatus, string> = {
    Active:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Inactive:
        "bg-red-500/10 text-red-600 dark:text-red-400",
    Pending:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function CustomerTable() {
    const { customers } = useCustomers();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Search and filter customers
    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            const matchesSearch =
                customer.name.toLowerCase().includes(search.toLowerCase()) ||
                customer.email.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "All" ||
                customer.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [customers, search, statusFilter]);

    // Open customer details
    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setDetailsOpen(true);
    };

    // Open edit dialog
    const handleEditCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setEditOpen(true);
    };

    // Open delete confirmation
    const handleDeleteCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setDeleteOpen(true);
    };

    return (
        <div className="space-y-6">

            {/* Page heading */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Customers
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your customers and their subscription information.
                </p>
            </div>

            {/* Customer summary */}
            <div className="grid gap-4 sm:grid-cols-3">

                <Card className="rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Total Customers
                            </p>
                            <Users className="h-5 w-5 text-primary" />
                        </div>

                        <p className="mt-3 text-2xl font-bold">
                            {customers.length}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            All registered customers
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground">
                            Active Customers
                        </p>

                        <p className="mt-3 text-2xl font-bold">
                            {customers.filter((c) => c.status === "Active").length}
                        </p>

                        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                            Currently active
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground">
                            Pending Customers
                        </p>

                        <p className="mt-3 text-2xl font-bold">
                            {customers.filter((c) => c.status === "Pending").length}
                        </p>

                        <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                            Awaiting activation
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* Customer table */}
            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardContent className="space-y-5 p-5">

                    {/* Table heading and controls */}
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                            <div>
                                <h2 className="text-base font-semibold">
                                    All Customers
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    View and manage your customer records.
                                </p>
                            </div>

                            <Button
                                onClick={() => setDialogOpen(true)}
                                className="gap-2 rounded-xl"
                            >
                                <Plus className="h-4 w-4" />
                                Add Customer
                            </Button>
                        </div>

                        {/* Search and filter */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                            <div className="relative sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search customers..."
                                    className="h-10 rounded-xl pl-9"
                                />
                            </div>

                            <div className="relative">
                                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    aria-label="Filter customers by status"
                                    className="h-10 w-full appearance-none rounded-xl border border-input bg-background pl-9 pr-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring sm:w-40"
                                >
                                    <option value="All">All statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Customer dialogs */}
                    <AddCustomerDialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                    />

                    <CustomerDetailsDialog
                        customer={selectedCustomer}
                        open={detailsOpen}
                        onClose={() => setDetailsOpen(false)}
                    />

                    <EditCustomerDialog
                        customer={selectedCustomer}
                        open={editOpen}
                        onClose={() => setEditOpen(false)}
                    />

                    <DeleteCustomerDialog
                        customer={selectedCustomer}
                        open={deleteOpen}
                        onClose={() => {
                            setDeleteOpen(false);
                            setSelectedCustomer(null);
                        }}
                    />

                    {/* Customer table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-sm">

                            <thead>
                                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                                    <th className="px-3 py-3 font-medium">Customer</th>
                                    <th className="px-3 py-3 font-medium">Customer ID</th>
                                    <th className="px-3 py-3 font-medium">Plan</th>
                                    <th className="px-3 py-3 font-medium">Status</th>
                                    <th className="px-3 py-3 font-medium">Joined Date</th>
                                    <th className="px-3 py-3 text-right font-medium">Total Spent</th>
                                    <th className="px-3 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/30"
                                    >

                                        {/* Customer */}
                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                    {customer.initials}
                                                </div>

                                                <div>
                                                    <p className="font-medium">
                                                        {customer.name}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Customer ID */}
                                        <td className="px-3 py-4 font-mono text-xs text-muted-foreground">
                                            {customer.id}
                                        </td>

                                        {/* Plan */}
                                        <td className="px-3 py-4">
                                            {customer.plan}
                                        </td>

                                        {/* Status */}
                                        <td className="px-3 py-4">
                                            <Badge
                                                variant="secondary"
                                                className={statusStyles[customer.status]}
                                            >
                                                {customer.status}
                                            </Badge>
                                        </td>

                                        {/* Joined Date */}
                                        <td className="px-3 py-4 text-muted-foreground">
                                            {new Date(customer.joinedAt).toLocaleDateString(
                                                "en-CA",
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    timeZone: "UTC",
                                                }
                                            )}
                                        </td>

                                        {/* Total Spent */}
                                        <td className="px-3 py-4 text-right font-semibold">
                                            $
                                            {customer.totalSpent.toLocaleString("en-CA", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-3 py-4">
                                            <div className="flex justify-end gap-2">

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg"
                                                    onClick={() => handleViewCustomer(customer)}
                                                >
                                                    <Eye className="mr-1.5 h-4 w-4" />
                                                    View
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg"
                                                    onClick={() => handleEditCustomer(customer)}
                                                >
                                                    <Pencil className="mr-1.5 h-4 w-4" />
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                    onClick={() => handleDeleteCustomer(customer)}
                                                >
                                                    <Trash2 className="mr-1.5 h-4 w-4" />
                                                    Delete
                                                </Button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                                {/* Empty state */}
                                {filteredCustomers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center">
                                            <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />

                                            <p className="font-medium">
                                                No customers found
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or status filter.
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                    {/* Table footer */}
                    <div className="flex flex-col justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
                        <p>
                            Showing {filteredCustomers.length} of {customers.length} customers
                        </p>

                        <p>Sample customer data</p>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
