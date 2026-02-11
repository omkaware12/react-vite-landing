import { Plus, Layers, List } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const RawMaterialPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Raw Material</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={Plus} title="Create Raw Material" description="Add a single raw material" />
      <DashboardActionCard icon={Layers} title="Create Raw Material in Bulk" description="Add multiple raw materials" />
      <DashboardActionCard icon={List} title="Show All Raw Materials" description="View & manage raw materials" />
    </div>
  </div>
);

export default RawMaterialPage;
