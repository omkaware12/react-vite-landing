import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const MedicineRawMaterials = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const medicine = store.getMedicines().find((m) => m.id === Number(medicineId));
  const rawMaterials = store.getRawMaterials();
  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState<number | "">("");
  const [quantity, setQuantity] = useState("");
  const [, setTick] = useState(0);

  if (!medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
        <p className="text-muted-foreground">Medicine not found.</p>
      </div>
    );
  }

  const allLinks = store.getMedicineRawMaterials();
  const medicineLinks = allLinks.filter((l) => l.medicineId === Number(medicineId));

  const handleAdd = () => {
    if (!selectedRawMaterialId || !quantity || Number(quantity) <= 0) {
      toast({ title: "Please select raw material and enter quantity", variant: "destructive" });
      return;
    }
    store.addMedicineRawMaterial({
      medicineId: Number(medicineId),
      rawMaterialId: Number(selectedRawMaterialId),
      quantity: parseFloat(quantity),
    });
    toast({ title: "Raw material assigned to medicine" });
    setSelectedRawMaterialId("");
    setQuantity("");
    setTick((t) => t + 1);
  };

  const handleUpdateQty = (id: number, newQty: string) => {
    const val = parseFloat(newQty);
    if (!isNaN(val) && val > 0) {
      store.updateMedicineRawMaterial(id, val);
      setTick((t) => t + 1);
    }
  };

  const handleRemove = (id: number) => {
    store.deleteMedicineRawMaterial(id);
    toast({ title: "Raw material removed from medicine" });
    setTick((t) => t + 1);
  };

  const handleRemoveAll = () => {
    store.deleteAllMedicineRawMaterials(Number(medicineId));
    toast({ title: "All raw materials removed from medicine" });
    setTick((t) => t + 1);
  };

  const getRawMaterial = (id: number) => rawMaterials.find((r) => r.id === id);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">
            Raw Materials for: {medicine.name}
          </h1>
          {medicineLinks.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-1 px-4 py-2 bg-destructive text-white rounded-lg text-sm font-semibold hover:opacity-90">
                  <Trash2 className="w-4 h-4" /> Remove All
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove All Raw Materials</AlertDialogTitle>
                  <AlertDialogDescription>Remove all raw materials linked to this medicine? This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemoveAll} className="bg-destructive hover:bg-destructive/90">Remove All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {medicineLinks.length > 0 ? (
          <div className="bg-muted/30 rounded-xl border overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-4 py-2 font-semibold text-muted-foreground">#</th>
                  <th className="px-4 py-2 font-semibold text-muted-foreground">Raw Material</th>
                  <th className="px-4 py-2 font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-2 font-semibold text-muted-foreground">Unit</th>
                  <th className="px-4 py-2 font-semibold text-muted-foreground">Quantity</th>
                  <th className="px-4 py-2 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicineLinks.map((link, i) => {
                  const rm = getRawMaterial(link.rawMaterialId);
                  return (
                    <tr key={link.id} className={i % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{rm?.name || "Unknown"}</td>
                      <td className="px-4 py-2">{rm?.type || "-"}</td>
                      <td className="px-4 py-2">{rm?.unit || "-"}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={link.quantity}
                          onChange={(e) => handleUpdateQty(link.id, e.target.value)}
                          className="w-24 border rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Raw Material</AlertDialogTitle>
                              <AlertDialogDescription>Remove "{rm?.name}" from this medicine?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemove(link.id)} className="bg-destructive hover:bg-destructive/90">Remove</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm mb-6">No raw materials assigned yet.</p>
        )}

        <div className="border-t pt-6">
          <h3 className="text-md font-semibold text-foreground mb-4">Add Raw Material</h3>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-muted-foreground mb-1">Raw Material</label>
              <select value={selectedRawMaterialId} onChange={(e) => setSelectedRawMaterialId(e.target.value ? Number(e.target.value) : "")} className="w-full border rounded-lg px-4 py-2.5 text-sm bg-white">
                <option value="">-- Select --</option>
                {rawMaterials.map((r) => (
                  <option key={r.id} value={r.id}>{r.name} ({r.unit})</option>
                ))}
              </select>
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-muted-foreground mb-1">Quantity</label>
              <input type="number" step="0.01" min="0.01" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 text-sm" placeholder="0" />
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

export default MedicineRawMaterials;
