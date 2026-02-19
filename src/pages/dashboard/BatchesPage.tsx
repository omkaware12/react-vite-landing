import DashboardActionCard from "@/components/DashboardActionCard";
import { PackagePlus, Eye, List } from "lucide-react";

const BatchesPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Batches</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <DashboardActionCard icon={PackagePlus} title="Create Batch" description="Create a new batch" to="/dashboard/batches/add" />
      <DashboardActionCard icon={Eye} title="Preview Batch" description="Preview batch details" to="/dashboard/batches/preview" />
      <DashboardActionCard icon={List} title="Show All Batches" description="View all batches" to="/dashboard/batches/list" />
    </div>
  </div>
);

export default BatchesPage;
