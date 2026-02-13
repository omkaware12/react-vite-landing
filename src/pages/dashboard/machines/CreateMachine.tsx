import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const CreateMachine = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [gasConsumption, setGasConsumption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !fuelType || !gasConsumption) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    store.addMachine({ name, fuelType, gasConsumption: parseFloat(gasConsumption) });
    toast({ title: "Machine created successfully" });
    navigate("/dashboard/machines");
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] text-center">Create Machine</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Machine Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
            <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
              <option value="">Select fuel</option>
              <option value="GAS">GAS</option>
              <option value="ELECTRICITY">ELECTRICITY</option>
              <option value="DIESEL">DIESEL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gas Consumption (KG)</label>
            <input type="number" step="0.01" value={gasConsumption} onChange={e => setGasConsumption(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Create Machine
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMachine;
