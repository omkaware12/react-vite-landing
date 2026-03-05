import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const MedicineMachines = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const medicine = store.getMedicines().find((m) => m.id === Number(medicineId));
  const machines = store.getMachines();
  const [selectedMachineId, setSelectedMachineId] = useState<number | "">("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<"minutes" | "hours">("minutes");
  const [, setTick] = useState(0);

  if (!medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
        <p className="text-gray-500">Medicine not found.</p>
      </div>
    );
  }

  const allLinks = store.getMedicineMachines();
  const medicineLinks = allLinks.filter((l) => l.medicineId === Number(medicineId));

  const handleAdd = () => {
    if (!selectedMachineId || !quantity || Number(quantity) <= 0) {
      toast({ title: "Please select machine and enter quantity", variant: "destructive" });
      return;
    }
    const qty = Number(quantity);
    const convertedHours = unit === "minutes" ? qty / 60 : qty;
    store.addMedicineMachine({
      medicineId: Number(medicineId),
      machineId: Number(selectedMachineId),
      quantity: qty,
      unit,
      convertedHours,
    });
    toast({ title: "Machine assigned to medicine" });
    setSelectedMachineId("");
    setQuantity("");
    setTick((t) => t + 1);
  };

  const handleRemove = (id: number) => {
    store.deleteMedicineMachine(id);
    toast({ title: "Machine removed from medicine" });
    setTick((t) => t + 1);
  };

  const getMachineName = (id: number) => machines.find((m) => m.id === id)?.name || "Unknown";

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-[hsl(var(--primary))] mb-6">
          Machines for: {medicine.name}
        </h1>

        {medicineLinks.length > 0 ? (
          <div className="bg-gray-50 rounded-xl border overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 font-semibold text-gray-600">#</th>
                  <th className="px-4 py-2 font-semibold text-gray-600">Machine</th>
                  <th className="px-4 py-2 font-semibold text-gray-600">Quantity</th>
                  <th className="px-4 py-2 font-semibold text-gray-600">Unit</th>
                  <th className="px-4 py-2 font-semibold text-gray-600">Converted Hours</th>
                  <th className="px-4 py-2 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicineLinks.map((link, i) => (
                  <tr key={link.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{getMachineName(link.machineId)}</td>
                    <td className="px-4 py-2">{link.quantity}</td>
                    <td className="px-4 py-2 capitalize">{link.unit}</td>
                    <td className="px-4 py-2">{link.convertedHours.toFixed(2)} Hours</td>
                    <td className="px-4 py-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Machine</AlertDialogTitle>
                            <AlertDialogDescription>Remove "{getMachineName(link.machineId)}" from this medicine?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemove(link.id)} className="bg-red-500 hover:bg-red-600">Remove</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mb-6">No machines assigned yet.</p>
        )}

        <div className="border-t pt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-4">Add Machine</h3>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-600 mb-1">Machine</label>
              <select value={selectedMachineId} onChange={(e) => setSelectedMachineId(e.target.value ? Number(e.target.value) : "")} className="w-full border rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">-- Select --</option>
                {machines.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="w-28">
              <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
              <input type="number" step="0.01" min="0.01" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 text-sm" placeholder="0" />
            </div>
            <div className="w-28">
              <label className="block text-sm font-medium text-gray-600 mb-1">Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value as "minutes" | "hours")} className="w-full border rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <button onClick={handleAdd} className="flex items-center gap-1 px-5 py-2.5 bg-[hsl(var(--primary))] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineMachines;
