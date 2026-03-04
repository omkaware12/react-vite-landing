import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const UpdateMedicine = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const medicine = store.getMedicines().find((m) => m.id === Number(medicineId));

  const [name, setName] = useState(medicine?.name || "");
  const [type, setType] = useState(medicine?.type || "");
  const [form, setForm] = useState(medicine?.form || "");
  const [strength, setStrength] = useState(String(medicine?.strength || ""));
  const [unit, setUnit] = useState(medicine?.unit || "");
  const [description, setDescription] = useState(medicine?.description || "");

  if (!medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
        <p className="text-gray-500">Medicine not found.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !form || !unit) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    store.updateMedicine(medicine.id, { name, type, form, strength: parseInt(strength) || 0, unit, description });
    toast({ title: "Medicine updated successfully" });
    navigate(`/dashboard/medicines/${medicine.id}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] text-center">Update Medicine</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Medicine Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                <option value="">Select</option>
                <option value="KALPA">KALPA</option>
                <option value="AYURVEDIC">AYURVEDIC</option>
                <option value="HERBAL">HERBAL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Form</label>
              <select value={form} onChange={(e) => setForm(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                <option value="">Select</option>
                <option value="TABLET">TABLET</option>
                <option value="SYRUP">SYRUP</option>
                <option value="POWDER">POWDER</option>
                <option value="CAPSULE">CAPSULE</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Strength</label>
              <input type="number" value={strength} onChange={(e) => setStrength(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                <option value="">Select</option>
                <option value="MG">MG</option>
                <option value="ML">ML</option>
                <option value="GM">GM</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border rounded-lg px-4 py-3 text-sm resize-none" />
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicine;
