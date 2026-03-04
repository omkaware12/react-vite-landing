import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ProcessStepDetail = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const step = store.getProcessSteps().find((p) => p.id === Number(stepId));

  if (!step) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
        <p className="text-gray-500">Process step not found.</p>
      </div>
    );
  }

  const handleDelete = () => {
    store.deleteProcessStep(step.id);
    toast({ title: "Process step deleted" });
    navigate("/dashboard/medicines-process/list");
  };

  const rows = [
    ["Step Name", step.name],
    ["Description", step.description || "-"],
    ["Price Per Unit", `₹${step.pricePerUnit}`],
    ["Time Unit", step.unit],
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-[hsl(174,60%,30%)] mb-6">Process Step Detail</h1>
        <div className="space-y-4">
          {rows.map(([label, value]) => (
            <div key={label} className="flex border-b pb-3">
              <span className="w-40 font-semibold text-gray-600 text-sm">{label}</span>
              <span className="text-sm text-gray-800 capitalize">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Process Step</AlertDialogTitle>
                <AlertDialogDescription>Are you sure you want to delete "{step.name}"? This action cannot be undone.</AlertDialogDescription>
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

export default ProcessStepDetail;
