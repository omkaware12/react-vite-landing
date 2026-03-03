import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FuelDetail = () => {
  const navigate = useNavigate();
  const { fuelId } = useParams();
  const fuel = store.getFuels().find((f) => f.id === Number(fuelId));

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

  const formatDate = (d: string) => {
    if (!d) return "—";
    const date = new Date(d);
    return date.toLocaleString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(",", "");
  };

  const handleDelete = () => {
    store.deleteFuel(fuel.id);
    toast({ title: "Fuel deleted successfully" });
    navigate("/dashboard/fuel/list");
  };

  const rows = [
    { label: "Fuel Type", value: fuel.fuelType },
    { label: "Cost Per Unit", value: `₹ ${fuel.costPerUnit.toFixed(2)}` },
    { label: "Fuel Unit", value: fuel.unit },
    { label: "Created At", value: formatDate(fuel.createdAt) },
    { label: "Updated At", value: formatDate(fuel.updatedAt) },
    { label: "Created By", value: fuel.createdBy || "—" },
    { label: "Updated By", value: fuel.updatedBy || "—" },
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(174,60%,30%)] mb-6 text-center">Fuel Details</h1>
        <div className="divide-y">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between py-3 text-sm">
              <span className="font-medium text-gray-600">{r.label}</span>
              <span className="text-gray-900 font-semibold">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate(`/dashboard/fuel/${fuel.id}/edit`)}
            className="flex-1 flex items-center justify-center gap-2 bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors"
          >
            <Pencil className="w-4 h-4" /> Update
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this fuel?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default FuelDetail;
