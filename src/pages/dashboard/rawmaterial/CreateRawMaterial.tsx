import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const CreateRawMaterial = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !unit) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    store.addRawMaterial({ name, type, unit });
    toast({ title: "Raw Material created successfully" });
    navigate("/dashboard/rawmaterial");
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] text-center">Create Raw Material</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Raw Material Name</label>
            <input type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Raw Material Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
              <option value="">Select Type</option>
              <option value="HERB">HERB</option>
              <option value="MINERAL">MINERAL</option>
              <option value="CHEMICAL">CHEMICAL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
            <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
              <option value="">Select Unit</option>
              <option value="KG">KG</option>
              <option value="GM">GM</option>
              <option value="LITRE">LITRE</option>
              <option value="ML">ML</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Save Raw Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRawMaterial;
