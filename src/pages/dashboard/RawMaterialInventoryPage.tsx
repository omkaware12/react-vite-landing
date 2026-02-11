import { Archive } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const RawMaterialInventoryPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Raw Material Inventory</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={Archive} title="View Inventory" description="Current raw material stock levels" />
    </div>
  </div>
);

export default RawMaterialInventoryPage;
