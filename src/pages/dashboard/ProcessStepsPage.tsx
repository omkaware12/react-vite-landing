import { Plus, List } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const ProcessStepsPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Medicine Process</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={Plus} title="Create Process Step" description="Add a new medicine process step" to="/dashboard/medicines-process/add" />
      <DashboardActionCard icon={List} title="Get All Process Steps" description="View all process steps" to="/dashboard/medicines-process/list" />
    </div>
  </div>
);

export default ProcessStepsPage;
