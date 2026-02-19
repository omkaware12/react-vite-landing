import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { store } from "@/lib/store";
import { ArrowLeft } from "lucide-react";

const CreateBatch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const medicines = store.getMedicines();

  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName || !quantity) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    store.addBatch({ medicineName, quantity: Number(quantity), status: "Pending" });
    toast({ title: "Batch Created", description: "New batch has been created successfully" });
    setMedicineName("");
    setQuantity("");
  };

  return (
    <div>
      <button onClick={() => navigate("/dashboard/batches")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Batch</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 max-w-lg space-y-5">
        <div className="space-y-2">
          <Label>Select Medicine</Label>
          <select
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">-- Select Medicine --</option>
            {medicines.map((m) => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Create Batch</Button>
      </form>
    </div>
  );
};

export default CreateBatch;
