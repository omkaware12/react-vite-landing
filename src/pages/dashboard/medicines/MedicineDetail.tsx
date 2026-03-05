import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const MedicineDetail = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const medicine = store.getMedicines().find((m) => m.id === Number(medicineId));

  if (!medicine) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
        <p className="text-gray-500">Medicine not found.</p>
      </div>
    );
  }

  const handleDelete = () => {
    store.deleteMedicine(medicine.id);
    toast({ title: "Medicine deleted" });
    navigate("/dashboard/medicines/list");
  };

  const rows = [
    ["Medicine Name", medicine.name],
    ["Type", medicine.type],
    ["Form", medicine.form],
    ["Strength", String(medicine.strength)],
    ["Unit", medicine.unit],
    ["Description", medicine.description || "-"],
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-[hsl(174,60%,30%)] mb-6">Medicine Detail</h1>
        <div className="space-y-4">
          {rows.map(([label, value]) => (
            <div key={label} className="flex border-b pb-3">
              <span className="w-40 font-semibold text-gray-600 text-sm">{label}</span>
              <span className="text-sm text-gray-800">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={() => navigate(`/dashboard/medicines/${medicine.id}/edit`)} className="flex items-center gap-2 px-5 py-2.5 bg-[hsl(174,60%,30%)] text-white rounded-lg font-semibold text-sm hover:bg-[hsl(174,60%,25%)] transition-colors">
            <Pencil className="w-4 h-4" /> Update
          </button>
          <button onClick={() => navigate(`/dashboard/medicines/${medicine.id}/versions`)} className="px-5 py-2.5 border border-[hsl(174,60%,30%)] text-[hsl(174,60%,30%)] rounded-lg font-semibold text-sm hover:bg-[hsl(174,40%,97%)] transition-colors">
            Manage Versions
          </button>
          <button onClick={() => navigate(`/dashboard/medicines/${medicine.id}/machines`)} className="px-5 py-2.5 border border-[hsl(174,60%,30%)] text-[hsl(174,60%,30%)] rounded-lg font-semibold text-sm hover:bg-[hsl(174,40%,97%)] transition-colors">
            Manage Machines
          </button>
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Medicine</AlertDialogTitle>
                <AlertDialogDescription>Are you sure you want to delete "{medicine.name}"? This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
