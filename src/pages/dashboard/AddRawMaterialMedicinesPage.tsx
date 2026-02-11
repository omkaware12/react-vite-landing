import { PlusSquare } from "lucide-react";
import DashboardActionCard from "@/components/DashboardActionCard";

const AddRawMaterialMedicinesPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Raw Material to Medicines</h1>
    <div className="space-y-4 max-w-3xl">
      <DashboardActionCard icon={PlusSquare} title="Link Raw Material" description="Associate raw materials with medicines" />
    </div>
  </div>
);

export default AddRawMaterialMedicinesPage;
