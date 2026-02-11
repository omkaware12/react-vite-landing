import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
}

const DashboardActionCard = ({ icon: Icon, title, description, to }: DashboardActionCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => to && navigate(to)}
      className="w-full flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
    >
      <div className="w-12 h-12 rounded-xl bg-[hsl(174,40%,94%)] flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-[hsl(174,60%,35%)]" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
};

export default DashboardActionCard;
