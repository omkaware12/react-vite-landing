import DashboardActionCard from "@/components/DashboardActionCard";
import { PackagePlus, List } from "lucide-react";

const BatchesPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-foreground mb-6">Batches</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <DashboardActionCard icon={PackagePlus} title="Create Batch" description="Select medicine, version & preview costs" to="/dashboard/batches/add" />
      <DashboardActionCard icon={List} title="View All Batches" description="List, filter, and manage batches" to="/dashboard/batches/list" />
    </div>
  </div>
);

export default BatchesPage;
