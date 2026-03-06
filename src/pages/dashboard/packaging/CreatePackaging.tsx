import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const unitTypes = ["ml", "L", "g", "kg", "pieces", "tablets", "capsules"];

const CreatePackaging = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [unitType, setUnitType] = useState(unitTypes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !capacity) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    store.addPackaging({ packagingName: name, capacity: parseFloat(capacity), unitType, active: true });
    toast({ title: "Package created successfully" });
    navigate("/dashboard/packaging/list");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-6">Create Package</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Packaging Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bottle" className="w-full border rounded-lg px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Capacity</label>
          <input type="number" step="0.01" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g. 500" className="w-full border rounded-lg px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Unit Type</label>
          <select value={unitType} onChange={(e) => setUnitType(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
            {unitTypes.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full bg-[hsl(var(--primary))] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">Create Package</button>
      </form>
    </div>
  );
};

export default CreatePackaging;
