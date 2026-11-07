
"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import {
    customers as initialCustomers,
    type Customer,
} from "@/types/customer";

type CustomerInput = Omit<Customer, "id">;

type CustomerContextType = {
    customers: Customer[];
    addCustomer: (customer: CustomerInput) => void;
    updateCustomer: (id: string, updates: Partial<Customer>) => void;
    deleteCustomer: (id: string) => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined,
);

export function CustomerProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [customers, setCustomers] = useState<Customer[]>(
        initialCustomers,
    );

    const addCustomer = (customer: CustomerInput) => {
        const newCustomer: Customer = {
            ...customer,
            id: `CUS-${Date.now()}`,
        };

        setCustomers((current) => [newCustomer, ...current]);
    };

    const updateCustomer = (
        id: string,
        updates: Partial<Customer>,
    ) => {
        setCustomers((current) =>
            current.map((customer) =>
                customer.id === id
                    ? { ...customer, ...updates }
                    : customer,
            ),
        );
    };

    const deleteCustomer = (id: string) => {
        setCustomers((current) =>
            current.filter((customer) => customer.id !== id),
        );
    };

    return (
        <CustomerContext.Provider
            value={{
                customers,
                addCustomer,
                updateCustomer,
                deleteCustomer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export function useCustomers() {
    const context = useContext(CustomerContext);

    if (!context) {
        throw new Error(
            "useCustomers must be used inside CustomerProvider",
        );
    }

    return context;
}
