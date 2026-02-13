import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pill } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const CreateMedicine = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [form, setForm] = useState("");
  const [strength, setStrength] = useState("500");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !form || !unit) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    store.addMedicine({ name, type, form, strength: parseInt(strength) || 0, unit, description });
    toast({ title: "Medicine created successfully" });
    navigate("/dashboard/medicines");
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] flex items-center gap-2 justify-center">
            <Pill className="w-6 h-6" /> Create Medicine
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Medicine Name</label>
            <input type="text" placeholder="Enter medicine name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Medicine Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                <option value="">Select Type</option>
                <option value="KALPA">KALPA</option>
                <option value="AYURVEDIC">AYURVEDIC</option>
                <option value="HERBAL">HERBAL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Medicine Form</label>
              <select value={form} onChange={e => setForm(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                <option value="">Select Form</option>
                <option value="TABLET">TABLET</option>
                <option value="SYRUP">SYRUP</option>
                <option value="POWDER">POWDER</option>
                <option value="CAPSULE">CAPSULE</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Strength Value</label>
              <input type="number" value={strength} onChange={e => setStrength(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
              <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                <option value="">Select Unit</option>
                <option value="MG">MG</option>
                <option value="ML">ML</option>
                <option value="GM">GM</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea placeholder="Enter medicine description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border rounded-lg px-4 py-3 text-sm resize-none" />
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMedicine;
