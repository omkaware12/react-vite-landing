import { useNavigate } from "react-router-dom";
import DashboardActionCard from "@/components/DashboardActionCard";
import { Plus, List } from "lucide-react";

const PackagingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Packaging Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <DashboardActionCard title="Create Package" description="Add a new packaging type" icon={Plus} onClick={() => navigate("/dashboard/packaging/add")} />
        <DashboardActionCard title="All Packages" description="View and manage packages" icon={List} onClick={() => navigate("/dashboard/packaging/list")} />
      </div>
    </div>
  );
};

export default PackagingPage;
