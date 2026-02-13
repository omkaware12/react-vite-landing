import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

const CreateProcessStep = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) { toast({ title: "Please enter a name", variant: "destructive" }); return; }
    store.addProcessStep({ name, description });
    toast({ title: "Process step created" });
    navigate("/dashboard/medicines-process");
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 flex items-start justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-[hsl(174,60%,30%)] text-center">Create Process Step</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Step Name</label>
            <input type="text" placeholder="Enter step name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border rounded-lg px-4 py-3 text-sm resize-none" />
          </div>
          <button type="submit" className="w-full bg-[hsl(174,60%,30%)] text-white py-3 rounded-lg font-semibold hover:bg-[hsl(174,60%,25%)] transition-colors">
            Save Process Step
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProcessStep;
