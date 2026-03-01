import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const VersionSteps = () => {
  const navigate = useNavigate();
  const { medicineId, versionId } = useParams();
  const medId = parseInt(medicineId || "0");
  const verIdNum = parseInt(versionId || "0");

  const versions = store.getVersions();
  const version = versions.find((v) => v.id === verIdNum && v.medicineId === medId);
  const processSteps = store.getProcessSteps();
  const medicine = store.getMedicines().find((m) => m.id === medId);

  const [showForm, setShowForm] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState("");
  const [stepOrder, setStepOrder] = useState("");
  const [repeatCount] = useState(1);
  const [quantity, setQuantity] = useState("");

  if (!version || !medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-gray-500">Version not found.</p>
      </div>
    );
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStepId || !stepOrder || !quantity) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    store.addStepToVersion(verIdNum, {
      medicineProcessStepId: parseInt(selectedStepId),
      stepOrder: parseInt(stepOrder),
      repeatCount,
      quantity: parseFloat(quantity),
    });
    toast({ title: "Step added to version" });
    setSelectedStepId("");
    setStepOrder("");
    setQuantity("");
    setShowForm(false);
  };

  // Re-read after potential mutation
  const currentVersion = store.getVersions().find((v) => v.id === verIdNum);
  const steps = currentVersion?.steps || [];

  const getStepName = (id: number) => processSteps.find((s) => s.id === id)?.name || `Step #${id}`;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{medicine.name} — {version.versionName}</h1>
          <p className="text-sm text-gray-500">Manage process steps for this version</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[hsl(174,60%,30%)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl shadow-sm border p-6 mb-6 max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Process Step</label>
            <select value={selectedStepId} onChange={(e) => setSelectedStepId(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
              <option value="">Select a process step</option>
              {processSteps.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Step Order</label>
              <input type="number" min="1" placeholder="1" value={stepOrder} onChange={(e) => setStepOrder(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Repeat Count</label>
              <input type="number" value={repeatCount} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <input type="number" step="0.01" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
          </div>
          <button type="submit" className="bg-[hsl(174,60%,30%)] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Add Step
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Order</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Process Step</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Repeat</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {[...steps].sort((a, b) => a.stepOrder - b.stepOrder).map((s, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"}>
                <td className="px-6 py-3">{s.stepOrder}</td>
                <td className="px-6 py-3">{getStepName(s.medicineProcessStepId)}</td>
                <td className="px-6 py-3">{s.repeatCount}</td>
                <td className="px-6 py-3">{s.quantity}</td>
              </tr>
            ))}
            {steps.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No steps added yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionSteps;
