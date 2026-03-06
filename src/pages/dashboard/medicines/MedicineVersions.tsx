import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const MedicineVersions = () => {
  const navigate = useNavigate();
  const { medicineId } = useParams();
  const medId = parseInt(medicineId || "0");
  const medicine = store.getMedicines().find((m) => m.id === medId);
  const [showForm, setShowForm] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [, setTick] = useState(0);

  if (!medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-muted-foreground">Medicine not found.</p>
      </div>
    );
  }

  const versions = store.getVersions().filter((v) => v.medicineId === medId);

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
    setTick((t) => t + 1);
  };

  const handleDelete = (id: number) => {
    store.deleteVersion(id);
    toast({ title: "Version deleted" });
    setTick((t) => t + 1);
  };

  const handleUpdate = (id: number) => {
    if (!editName.trim()) return;
    store.updateVersion(id, { versionName: editName });
    toast({ title: "Version updated" });
    setEditingId(null);
    setTick((t) => t + 1);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Versions — {medicine.name}</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Version
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm border p-6 mb-6 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Version Name</label>
            <input type="text" placeholder="e.g. v1.0" value={versionName} onChange={(e) => setVersionName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <button type="submit" className="bg-[hsl(var(--primary))] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Create Version
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Version Name</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Steps</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v, i) => (
              <tr key={v.id} className={i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"}>
                <td className="px-6 py-3">{i + 1}</td>
                <td className="px-6 py-3 font-medium">
                  {editingId === v.id ? (
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="border rounded px-2 py-1 text-sm w-40" />
                  ) : v.versionName}
                </td>
                <td className="px-6 py-3">{v.steps.length} step(s)</td>
                <td className="px-6 py-3 flex items-center gap-3">
                  {editingId === v.id ? (
                    <>
                      <button onClick={() => handleUpdate(v.id)} className="text-green-600 hover:text-green-800"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditingId(null)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate(`/dashboard/medicines/${medId}/versions/${v.id}/steps`)} className="text-[hsl(var(--primary))] font-semibold text-sm hover:underline">
                        Manage Steps
                      </button>
                      <button onClick={() => { setEditingId(v.id); setEditName(v.versionName); }} className="text-[hsl(var(--primary))] hover:opacity-70"><Pencil className="w-4 h-4" /></button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Version</AlertDialogTitle>
                            <AlertDialogDescription>Delete "{v.versionName}" and all its steps? This cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(v.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {versions.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No versions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineVersions;
