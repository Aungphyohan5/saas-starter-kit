
import { DashboardLayout } from "@/components/dashboard-layout";
import { CustomerTable } from "@/components/customers/customer-table";

export default function CustomersPage() {
    return (
        <DashboardLayout>
            <CustomerTable />
        </DashboardLayout>
    );
}
