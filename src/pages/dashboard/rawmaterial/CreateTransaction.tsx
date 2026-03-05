import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = (searchParams.get("type") || "IN") as "IN" | "OUT";

  const rawMaterials = store.getRawMaterials();
  const [rawMaterialId, setRawMaterialId] = useState<number | "">("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const selectedMaterial = rawMaterialId ? rawMaterials.find((r) => r.id === rawMaterialId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawMaterialId || !quantity || Number(quantity) <= 0) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    if (typeParam === "IN" && (!pricePerUnit || Number(pricePerUnit) <= 0)) {
      toast({ title: "Please enter price per unit", variant: "destructive" });
      return;
    }
    if (typeParam === "OUT") {
      const inv = store.getInventoryByMaterial(Number(rawMaterialId));
      const available = inv?.availableQuantity || 0;
      if (Number(quantity) > available) {
        toast({ title: `Insufficient inventory. Available: ${available} ${selectedMaterial?.unit || ""}`, variant: "destructive" });
        return;
      }
    }

    store.addTransaction({
      rawMaterialId: Number(rawMaterialId),
      materialName: selectedMaterial?.name || "",
      category: selectedMaterial?.type || "",
      quantity: Number(quantity),
      remainingQuantity: 0, // calculated in store
      pricePerUnit: typeParam === "IN" ? Number(pricePerUnit) : 0,
      unit: selectedMaterial?.unit || "",
      supplier: "",
      type: typeParam,
      date: new Date().toISOString(),
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
    });

    toast({ title: `${typeParam} transaction created successfully` });
    navigate("/dashboard/rawmaterial/transaction/list");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl">
        <h1 className="text-2xl font-bold text-[hsl(var(--primary))] mb-6">
          Create {typeParam} Transaction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type</label>
            <input type="text" value={typeParam} readOnly className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Raw Material *</label>
            <select
              value={rawMaterialId}
              onChange={(e) => setRawMaterialId(e.target.value ? Number(e.target.value) : "")}
              className="w-full border rounded-lg px-4 py-3 text-sm bg-white"
              required
            >
              <option value="">-- Select Raw Material --</option>
              {rawMaterials.map((r) => (
                <option key={r.id} value={r.id}>{r.name} ({r.unit})</option>
              ))}
            </select>
          </div>
          {typeParam === "OUT" && selectedMaterial && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              Available: {store.getInventoryByMaterial(Number(rawMaterialId))?.availableQuantity || 0} {selectedMaterial.unit}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
            <input type="number" step="0.01" min="0.01" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" className="w-full border rounded-lg px-4 py-3 text-sm" required />
          </div>
          {typeParam === "IN" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Per Unit *</label>
              <input type="number" step="0.01" min="0.01" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} placeholder="Enter price per unit" className="w-full border rounded-lg px-4 py-3 text-sm" required />
            </div>
          )}
          <button type="submit" className="w-full py-3 bg-[hsl(var(--primary))] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
            Create {typeParam} Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
