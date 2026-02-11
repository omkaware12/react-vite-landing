import { Plus, List } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const MachinesPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Machines</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={Plus} title="Create Machine" description="Add a new machine" />
      <DashboardActionCard icon={List} title="Get All Machines" description="View all machines" />
    </div>
  </div>
);

export default MachinesPage;
