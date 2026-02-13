import { Plus, Layers, List } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const MedicinesPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Medicines</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={Plus} title="Create Medicine" description="Add a single medicine" to="/dashboard/medicines/add" />
      <DashboardActionCard icon={Layers} title="Create Medicine in Bulk" description="Add medicines in bulk" />
      <DashboardActionCard icon={List} title="Get All Medicines" description="View all medicines" to="/dashboard/medicines/list" />
    </div>
  </div>
);

export default MedicinesPage;
