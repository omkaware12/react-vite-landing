import { ArrowLeftRight, List } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const RawMaterialTransactionPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Raw Material Transaction</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={ArrowLeftRight} title="Transaction (IN / OUT)" description="Add or consume raw material" to="/dashboard/rawmaterial/transaction/select" />
      <DashboardActionCard icon={List} title="Get All Transactions" description="View transaction history" to="/dashboard/rawmaterial/list" />
    </div>
  </div>
);

export default RawMaterialTransactionPage;
