import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MachineDetail = () => {
  const navigate = useNavigate();
  const { machineId } = useParams();
  const machine = store.getMachines().find((m) => m.id === Number(machineId));

  if (!machine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-center text-gray-400 mt-12">Machine not found.</p>
      </div>
    );
  }

  const formatDate = (d: string) => {
    if (!d) return "—";
    const date = new Date(d);
    return date.toLocaleString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(",", "");
  };

  const handleDelete = () => {
    store.deleteMachine(machine.id);
    toast({ title: "Machine deleted successfully" });
    navigate("/dashboard/machines/list");
  };

  const rows = [
    { label: "Machine Name", value: machine.name },
    { label: "Fuel Type", value: machine.fuelType },
    { label: "Electricity Type", value: machine.electricityType || "—" },
    { label: "Motor Consumption (HP)", value: machine.motorConsumptionInHp },
    { label: "Heater Consumption (KW)", value: machine.heaterConsumptionInKw },
    { label: "Gas Consumption (Kgs)", value: machine.gasConsumptionInKgs },
    { label: "Electricity Units/Hour", value: machine.electricityUnitPerHour },
    { label: "Electricity Cost/Machine Hour", value: `₹ ${(machine.electricityCostPerMachineHour ?? 0).toFixed(2)}` },
    { label: "Gas Cost/Machine Hour", value: `₹ ${(machine.gasCostPerMachineHour ?? 0).toFixed(2)}` },
    { label: "Total Machine Cost/Hour", value: `₹ ${(machine.totalMachineCostPerHour ?? 0).toFixed(2)}` },
    { label: "Created By", value: machine.createdBy || "—" },
    { label: "Created At", value: formatDate(machine.createdAt) },
    { label: "Updated At", value: formatDate(machine.updatedAt) },
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(174,60%,30%)] mb-6 text-center">Machine Details</h1>
        <div className="divide-y">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between py-3 text-sm">
              <span className="font-medium text-gray-600">{r.label}</span>
              <span className="text-gray-900 font-semibold">{String(r.value)}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate(`/dashboard/machines/${machine.id}/edit`)}
            className="flex-1 flex items-center justify-center gap-2 bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors"
          >
            <Pencil className="w-4 h-4" /> Update
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this machine?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
