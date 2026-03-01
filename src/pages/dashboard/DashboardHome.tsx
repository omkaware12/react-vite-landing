import { store } from "@/lib/store";
import { Atom, Settings, Fuel, Pill } from "lucide-react";

const metrics = [
  { label: "Total Raw Materials", icon: Atom, getter: () => store.getRawMaterials().length },
  { label: "Total Machines", icon: Settings, getter: () => store.getMachines().length },
  { label: "Total Fuels", icon: Fuel, getter: () => store.getFuels().length },
  { label: "Total Medicines", icon: Pill, getter: () => store.getMedicines().length },
];

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[hsl(174,40%,94%)] flex items-center justify-center shrink-0">
              <m.icon className="w-6 h-6 text-[hsl(174,60%,35%)]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{m.label}</p>
              <p className="text-2xl font-bold text-gray-800">{m.getter()}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray-500">Welcome to the Rohati Ayurved factory management system.</p>
    </div>
  );
};

export default DashboardHome;
