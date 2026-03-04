import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AddRawMaterialMedicinesPage = () => {
  const medicines = store.getMedicines();
  const rawMaterials = store.getRawMaterials();
  const [selectedMedicineId, setSelectedMedicineId] = useState<number | "">("");
  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState<number | "">("");
  const [quantity, setQuantity] = useState("");
  const [, setTick] = useState(0);

  const allLinks = store.getMedicineRawMaterials();
  const medicineLinks = selectedMedicineId ? allLinks.filter((l) => l.medicineId === selectedMedicineId) : [];

  const handleAdd = () => {
    if (!selectedMedicineId || !selectedRawMaterialId || !quantity) {
      toast({ title: "Please select medicine, raw material, and enter quantity", variant: "destructive" });
      return;
    }
    store.addMedicineRawMaterial({
      medicineId: Number(selectedMedicineId),
      rawMaterialId: Number(selectedRawMaterialId),
      quantity: parseFloat(quantity) || 0,
    });
    toast({ title: "Raw material linked to medicine" });
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

  const getMedicineName = (id: number) => medicines.find((m) => m.id === id)?.name || "Unknown";
  const getRawMaterialName = (id: number) => rawMaterials.find((r) => r.id === id)?.name || "Unknown";
  const getRawMaterialUnit = (id: number) => rawMaterials.find((r) => r.id === id)?.unit || "";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Raw Material to Medicines</h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Medicine</label>
          <select
            value={selectedMedicineId}
            onChange={(e) => { setSelectedMedicineId(e.target.value ? Number(e.target.value) : ""); }}
            className="w-full border rounded-lg px-4 py-3 text-sm bg-white"
          >
            <option value="">-- Select Medicine --</option>
            {medicines.map((m) => (
              <option key={m.id} value={m.id}>{m.name} ({m.type})</option>
            ))}
          </select>
        </div>

        {selectedMedicineId && (
          <>
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Raw Materials for: <span className="text-[hsl(174,60%,30%)]">{getMedicineName(Number(selectedMedicineId))}</span>
              </h3>

              {medicineLinks.length > 0 ? (
                <div className="bg-gray-50 rounded-xl border overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 font-semibold text-gray-600">#</th>
                        <th className="px-4 py-2 font-semibold text-gray-600">Raw Material</th>
                        <th className="px-4 py-2 font-semibold text-gray-600">Quantity</th>
                        <th className="px-4 py-2 font-semibold text-gray-600">Unit</th>
                        <th className="px-4 py-2 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicineLinks.map((link, i) => (
                        <tr key={link.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-2">{i + 1}</td>
                          <td className="px-4 py-2">{getRawMaterialName(link.rawMaterialId)}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              step="0.01"
                              value={link.quantity}
                              onChange={(e) => handleUpdateQty(link.id, e.target.value)}
                              className="w-24 border rounded px-2 py-1 text-sm"
                            />
                          </td>
                          <td className="px-4 py-2">{getRawMaterialUnit(link.rawMaterialId)}</td>
                          <td className="px-4 py-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="text-red-500 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Raw Material</AlertDialogTitle>
                                  <AlertDialogDescription>Remove "{getRawMaterialName(link.rawMaterialId)}" from this medicine?</AlertDialogDescription>
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
                <p className="text-gray-400 text-sm mb-6">No raw materials linked to this medicine yet.</p>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-md font-semibold text-gray-700 mb-4">Add New Raw Material</h3>
              <div className="flex gap-3 items-end flex-wrap">
                <div className="flex-1 min-w-[180px]">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Raw Material</label>
                  <select
                    value={selectedRawMaterialId}
                    onChange={(e) => setSelectedRawMaterialId(e.target.value ? Number(e.target.value) : "")}
                    className="w-full border rounded-lg px-4 py-2.5 text-sm bg-white"
                  >
                    <option value="">-- Select --</option>
                    {rawMaterials.map((r) => (
                      <option key={r.id} value={r.id}>{r.name} ({r.unit})</option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
                  <input type="number" step="0.01" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 text-sm" />
                </div>
                <button onClick={handleAdd} className="flex items-center gap-1 px-5 py-2.5 bg-[hsl(174,60%,30%)] text-white rounded-lg font-semibold text-sm hover:bg-[hsl(174,60%,25%)] transition-colors">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddRawMaterialMedicinesPage;
