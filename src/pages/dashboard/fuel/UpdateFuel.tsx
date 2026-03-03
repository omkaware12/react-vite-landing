import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const UpdateFuel = () => {
  const navigate = useNavigate();
  const { fuelId } = useParams();
  const fuel = store.getFuels().find((f) => f.id === Number(fuelId));
  const [costPerUnit, setCostPerUnit] = useState(fuel ? String(fuel.costPerUnit) : "");

  if (!fuel) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-center text-gray-400 mt-12">Fuel not found.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!costPerUnit) {
      toast({ title: "Please enter cost per unit", variant: "destructive" });
      return;
    }
    store.updateFuel(fuel.id, { costPerUnit: parseFloat(costPerUnit) });
    toast({ title: "Fuel updated successfully" });
    navigate(`/dashboard/fuel/${fuel.id}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] text-center">Update Fuel</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
            <input type="text" value={fuel.fuelType} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Unit</label>
            <input type="text" value={fuel.unit} disabled className="w-full border rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cost Per Unit (₹)</label>
            <input type="number" step="0.01" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Update Fuel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFuel;
