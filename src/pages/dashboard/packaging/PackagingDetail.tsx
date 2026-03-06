import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const unitTypes = ["ml", "L", "g", "kg", "pieces", "tablets", "capsules"];

const PackagingDetail = () => {
  const navigate = useNavigate();
  const { packagingId } = useParams();
  const pkg = store.getPackaging().find((p) => p.id === Number(packagingId));
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(pkg?.packagingName || "");
  const [capacity, setCapacity] = useState(String(pkg?.capacity || ""));
  const [unitType, setUnitType] = useState(pkg?.unitType || unitTypes[0]);

  if (!pkg) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
        <p className="text-muted-foreground">Package not found.</p>
      </div>
    );
  }

  const handleUpdate = () => {
    if (!name.trim() || !capacity) return;
    store.updatePackaging(pkg.id, { packagingName: name, capacity: parseFloat(capacity), unitType });
    toast({ title: "Package updated" });
    setEditing(false);
  };

  const handleDelete = () => {
    store.deletePackaging(pkg.id);
    toast({ title: "Package deleted" });
    navigate("/dashboard/packaging/list");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">{pkg.packagingName}</h1>
          <div className="flex gap-2">
            <button onClick={() => setEditing(!editing)} className="text-[hsl(var(--primary))] hover:opacity-70"><Pencil className="w-5 h-5" /></button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-destructive hover:text-destructive/80"><Trash2 className="w-5 h-5" /></button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Package</AlertDialogTitle>
                  <AlertDialogDescription>Are you sure you want to delete this package? This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Packaging Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Capacity</label>
              <input type="number" step="0.01" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Unit Type</label>
              <select value={unitType} onChange={(e) => setUnitType(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm bg-white">
                {unitTypes.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <button onClick={handleUpdate} className="bg-[hsl(var(--primary))] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90">Save Changes</button>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Packaging ID</span><span className="font-semibold">{pkg.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Packaging Name</span><span className="font-semibold">{pkg.packagingName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span className="font-semibold">{pkg.capacity}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Unit Type</span><span className="font-semibold">{pkg.unitType}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Active</span><span className="font-semibold">{pkg.active ? "Yes" : "No"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Created At</span><span className="font-semibold">{new Date(pkg.createdAt).toLocaleString()}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagingDetail;
