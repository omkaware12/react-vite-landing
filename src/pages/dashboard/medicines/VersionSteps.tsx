import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const VersionSteps = () => {
  const navigate = useNavigate();
  const { medicineId, versionId } = useParams();
  const medId = parseInt(medicineId || "0");
  const verIdNum = parseInt(versionId || "0");

  const medicine = store.getMedicines().find((m) => m.id === medId);
  const processSteps = store.getProcessSteps();

  const [showForm, setShowForm] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState("");
  const [stepOrder, setStepOrder] = useState("");
  const [repeatCount] = useState(1);
  const [quantity, setQuantity] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editOrder, setEditOrder] = useState("");
  const [editQty, setEditQty] = useState("");
  const [, setTick] = useState(0);

  const version = store.getVersions().find((v) => v.id === verIdNum && v.medicineId === medId);

  if (!version || !medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-muted-foreground">Version not found.</p>
      </div>
    );
  }

  const steps = version.steps || [];

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
    setTick((t) => t + 1);
  };

  const handleDeleteStep = (idx: number) => {
    store.deleteStepFromVersion(verIdNum, idx);
    toast({ title: "Step removed" });
    setTick((t) => t + 1);
  };

  const handleUpdateStep = (idx: number) => {
    const order = parseInt(editOrder);
    const qty = parseFloat(editQty);
    if (!order || !qty) return;
    store.updateStepInVersion(verIdNum, idx, { stepOrder: order, quantity: qty });
    toast({ title: "Step updated" });
    setEditingIdx(null);
    setTick((t) => t + 1);
  };

  const getStepName = (id: number) => processSteps.find((s) => s.id === id)?.name || `Step #${id}`;
  const sorted = [...steps].map((s, i) => ({ ...s, _idx: i })).sort((a, b) => a.stepOrder - b.stepOrder);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{medicine.name} — {version.versionName}</h1>
          <p className="text-sm text-muted-foreground">Manage process steps for this version</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl shadow-sm border p-6 mb-6 max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Process Step</label>
            <select value={selectedStepId} onChange={(e) => setSelectedStepId(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
              <option value="">Select a process step</option>
              {processSteps.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Step Order</label>
              <input type="number" min="1" placeholder="1" value={stepOrder} onChange={(e) => setStepOrder(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Repeat Count</label>
              <input type="number" value={repeatCount} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-muted cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Quantity</label>
              <input type="number" step="0.01" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
          </div>
          <button type="submit" className="bg-[hsl(var(--primary))] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Add Step
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Order</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Process Step</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Repeat</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Quantity</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"}>
                <td className="px-6 py-3">
                  {editingIdx === s._idx ? (
                    <input type="number" value={editOrder} onChange={(e) => setEditOrder(e.target.value)} className="w-16 border rounded px-2 py-1 text-sm" />
                  ) : s.stepOrder}
                </td>
                <td className="px-6 py-3">{getStepName(s.medicineProcessStepId)}</td>
                <td className="px-6 py-3">{s.repeatCount}</td>
                <td className="px-6 py-3">
                  {editingIdx === s._idx ? (
                    <input type="number" step="0.01" value={editQty} onChange={(e) => setEditQty(e.target.value)} className="w-20 border rounded px-2 py-1 text-sm" />
                  ) : s.quantity}
                </td>
                <td className="px-6 py-3 flex items-center gap-2">
                  {editingIdx === s._idx ? (
                    <>
                      <button onClick={() => handleUpdateStep(s._idx)} className="text-green-600"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditingIdx(null)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditingIdx(s._idx); setEditOrder(String(s.stepOrder)); setEditQty(String(s.quantity)); }} className="text-[hsl(var(--primary))]"><Pencil className="w-4 h-4" /></button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Step</AlertDialogTitle>
                            <AlertDialogDescription>Remove "{getStepName(s.medicineProcessStepId)}" from this version?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteStep(s._idx)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {steps.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No steps added yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionSteps;
