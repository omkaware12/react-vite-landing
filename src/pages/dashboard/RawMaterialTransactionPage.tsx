import { ArrowLeftRight, List, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const RawMaterialTransactionPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Raw Material Transaction</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={ArrowDownCircle} title="Create IN Transaction" description="Add raw material to inventory" to="/dashboard/rawmaterial/transaction/create?type=IN" />
      <DashboardActionCard icon={ArrowUpCircle} title="Create OUT Transaction" description="Consume raw material from inventory" to="/dashboard/rawmaterial/transaction/create?type=OUT" />
      <DashboardActionCard icon={List} title="Get All Transactions" description="View transaction history" to="/dashboard/rawmaterial/transaction/list" />
    </div>
  </div>
);

export default RawMaterialTransactionPage;
