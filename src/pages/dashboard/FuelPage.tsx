import { Plus, List } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const FuelPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Fuel</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={Plus} title="Create Fuel" description="Add fuel entry" to="/dashboard/fuel/add" />
      <DashboardActionCard icon={List} title="Get All Fuel" description="View fuel records" to="/dashboard/fuel/list" />
    </div>
  </div>
);

export default FuelPage;
