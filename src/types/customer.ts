
export type CustomerStatus = "Active" | "Inactive" | "Pending";

export type CustomerPlan = "Starter" | "Pro" | "Business";

export type Customer = {
    id: string;
    name: string;
    email: string;
    initials: string;
    plan: CustomerPlan;
    status: CustomerStatus;
    joinedAt: string;
    totalSpent: number;
};

export const customers: Customer[] = [
    {
        id: "CUS-001",
        name: "Olivia Martin",
        email: "olivia@example.com",
        initials: "OM",
        plan: "Pro",
        status: "Active",
        joinedAt: "2026-10-12",
        totalSpent: 588,
    },
    {
        id: "CUS-002",
        name: "Jackson Lee",
        email: "jackson@example.com",
        initials: "JL",
        plan: "Starter",
        status: "Active",
        joinedAt: "2026-10-15",
        totalSpent: 190,
    },
    {
        id: "CUS-003",
        name: "Isabella Nguyen",
        email: "isabella@example.com",
        initials: "IN",
        plan: "Business",
        status: "Pending",
        joinedAt: "2026-10-18",
        totalSpent: 297,
    },
    {
        id: "CUS-004",
        name: "William Kim",
        email: "william@example.com",
        initials: "WK",
        plan: "Pro",
        status: "Active",
        joinedAt: "2026-10-20",
        totalSpent: 441,
    },
    {
        id: "CUS-005",
        name: "Sofia Davis",
        email: "sofia@example.com",
        initials: "SD",
        plan: "Starter",
        status: "Inactive",
        joinedAt: "2026-10-22",
        totalSpent: 95,
    },
    {
        id: "CUS-006",
        name: "Noah Wilson",
        email: "noah@example.com",
        initials: "NW",
        plan: "Business",
        status: "Active",
        joinedAt: "2026-10-25",
        totalSpent: 891,
    },
];
