
"use client";

import {
    ArrowDownRight,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Users,
    Activity,
    MoreHorizontal,
    Download,
} from "lucide-react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 14500 },
    { month: "Mar", revenue: 13200 },
    { month: "Apr", revenue: 18000 },
    { month: "May", revenue: 16500 },
    { month: "Jun", revenue: 22000 },
    { month: "Jul", revenue: 20500 },
    { month: "Aug", revenue: 26000 },
    { month: "Sep", revenue: 23500 },
    { month: "Oct", revenue: 29000 },
    { month: "Nov", revenue: 32000 },
    { month: "Dec", revenue: 36500 },
];

const transactions = [
    {
        name: "Olivia Martin",
        email: "olivia@example.com",
        initials: "OM",
        plan: "Pro Plan",
        amount: "$49.00",
        status: "Completed",
    },
    {
        name: "Jackson Lee",
        email: "jackson@example.com",
        initials: "JL",
        plan: "Starter Plan",
        amount: "$19.00",
        status: "Completed",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella@example.com",
        initials: "IN",
        plan: "Business Plan",
        amount: "$99.00",
        status: "Pending",
    },
    {
        name: "William Kim",
        email: "william@example.com",
        initials: "WK",
        plan: "Pro Plan",
        amount: "$49.00",
        status: "Completed",
    },
    {
        name: "Sofia Davis",
        email: "sofia@example.com",
        initials: "SD",
        plan: "Starter Plan",
        amount: "$19.00",
        status: "Failed",
    },
];

const stats = [
    {
        title: "Total Revenue",
        value: "$48,294",
        change: "+12.8%",
        description: "Compared to last month",
        icon: DollarSign,
        positive: true,
    },
    {
        title: "Total Customers",
        value: "2,420",
        change: "+8.2%",
        description: "Compared to last month",
        icon: Users,
        positive: true,
    },
    {
        title: "Active Subscriptions",
        value: "1,845",
        change: "+5.4%",
        description: "Compared to last month",
        icon: CreditCard,
        positive: true,
    },
    {
        title: "Monthly Recurring Revenue",
        value: "$12,840",
        change: "-2.1%",
        description: "Compared to last month",
        icon: Activity,
        positive: false,
    },
];

export function DashboardOverview() {
    return (
        <div className="space-y-8">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-1 text-sm text-muted-foreground">
                        Welcome back, Admin
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Dashboard Overview
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Here's what's happening with your business today.
                    </p>
                </div>

                <Button className="w-fit gap-2 rounded-xl">
                    <Download className="h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* KPI cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card
                            key={stat.title}
                            className="rounded-2xl border-border/70 shadow-sm"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-end justify-between gap-2">
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        {stat.value}
                                    </h2>

                                    <Badge
                                        variant="secondary"
                                        className={
                                            stat.positive
                                                ? "gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                : "gap-1 bg-red-500/10 text-red-600 dark:text-red-400"
                                        }
                                    >
                                        {stat.positive ? (
                                            <ArrowUpRight className="h-3 w-3" />
                                        ) : (
                                            <ArrowDownRight className="h-3 w-3" />
                                        )}
                                        {stat.change}
                                    </Badge>
                                </div>

                                <p className="mt-2 text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Revenue chart */}
            <div className="grid gap-6 xl:grid-cols-3">
                <Card className="rounded-2xl border-border/70 shadow-sm xl:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Revenue Analytics
                            </CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Monthly revenue performance
                            </p>
                        </div>

                        <Button variant="outline" size="sm" className="rounded-lg">
                            This year
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <div className="mb-5">
                            <p className="text-3xl font-bold">$284,520</p>
                            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                +18.4% compared to last year
                            </p>
                        </div>

                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={revenueData}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="revenueGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="var(--primary)"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--primary)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="var(--border)"
                                    />

                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                        dy={10}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            background: "var(--card)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "12px",
                                            color: "var(--foreground)",
                                        }}
                                        formatter={(value) => [
                                            `$${Number(value).toLocaleString()}`,
                                            "Revenue",
                                        ]}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="var(--primary)"
                                        strokeWidth={2.5}
                                        fill="url(#revenueGradient)"
                                        activeDot={{ r: 5 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription breakdown */}
                <Card className="rounded-2xl border-border/70 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">
                            Subscription Overview
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Active subscription distribution
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Total subscriptions
                                </span>
                                <span className="text-xl font-bold">1,845</span>
                            </div>

                            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                                <div className="w-[55%] bg-primary" />
                                <div className="w-[30%] bg-blue-400" />
                                <div className="w-[15%] bg-emerald-400" />
                            </div>
                        </div>

                        {[
                            {
                                name: "Pro Plan",
                                count: "1,015",
                                percentage: "55%",
                                color: "bg-primary",
                            },
                            {
                                name: "Starter Plan",
                                count: "553",
                                percentage: "30%",
                                color: "bg-blue-400",
                            },
                            {
                                name: "Business Plan",
                                count: "277",
                                percentage: "15%",
                                color: "bg-emerald-400",
                            },
                        ].map((plan) => (
                            <div
                                key={plan.name}
                                className="flex items-center justify-between gap-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${plan.color}`}
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{plan.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {plan.count} subscribers
                                        </p>
                                    </div>
                                </div>

                                <span className="text-sm font-semibold">
                                    {plan.percentage}
                                </span>
                            </div>
                        ))}

                        <Button variant="outline" className="w-full rounded-xl">
                            View subscriptions
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recent transactions */}
            <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            Recent Transactions
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Latest payments from your customers
                        </p>
                    </div>

                    <Button variant="ghost" size="icon" aria-label="More transaction options">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                                    <th className="pb-3 font-medium">Customer</th>
                                    <th className="pb-3 font-medium">Plan</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 text-right font-medium">Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.email}
                                        className="border-b border-border/60 last:border-0"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                    {transaction.initials}
                                                </div>

                                                <div>
                                                    <p className="font-medium">
                                                        {transaction.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {transaction.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 text-muted-foreground">
                                            {transaction.plan}
                                        </td>

                                        <td className="py-4">
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    transaction.status === "Completed"
                                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                        : transaction.status === "Pending"
                                                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                }
                                            >
                                                {transaction.status}
                                            </Badge>
                                        </td>

                                        <td className="py-4 text-right font-semibold">
                                            {transaction.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
