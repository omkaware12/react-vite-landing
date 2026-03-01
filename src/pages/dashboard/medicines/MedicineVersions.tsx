import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const MedicineVersions = () => {
  const navigate = useNavigate();
  const { medicineId } = useParams();
  const medId = parseInt(medicineId || "0");
  const medicine = store.getMedicines().find((m) => m.id === medId);
  const versions = store.getVersions().filter((v) => v.medicineId === medId);
  const [showForm, setShowForm] = useState(false);
  const [versionName, setVersionName] = useState("");

  if (!medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-gray-500">Medicine not found.</p>
      </div>
    );
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!versionName.trim()) {
      toast({ title: "Please enter a version name", variant: "destructive" });
      return;
    }
    store.addVersion({ medicineId: medId, versionName, steps: [] });
    toast({ title: "Version created" });
    setVersionName("");
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Versions — {medicine.name}
        </h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[hsl(174,60%,30%)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
          <Plus className="w-4 h-4" /> New Version
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm border p-6 mb-6 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Version Name</label>
            <input type="text" placeholder="e.g. v1.0" value={versionName} onChange={(e) => setVersionName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <button type="submit" className="bg-[hsl(174,60%,30%)] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Create Version
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Version Name</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Steps</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v, i) => (
              <tr key={v.id} className={i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"}>
                <td className="px-6 py-3">{i + 1}</td>
                <td className="px-6 py-3 font-medium">{v.versionName}</td>
                <td className="px-6 py-3">{v.steps.length} step(s)</td>
                <td className="px-6 py-3">
                  <button onClick={() => navigate(`/dashboard/medicines/${medId}/versions/${v.id}/steps`)} className="text-[hsl(174,60%,30%)] font-semibold text-sm hover:underline">
                    Manage Steps
                  </button>
                </td>
              </tr>
            ))}
            {versions.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No versions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineVersions;
