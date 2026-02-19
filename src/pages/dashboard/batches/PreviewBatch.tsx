import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store";
import { ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const PreviewBatch = () => {
  const navigate = useNavigate();
  const medicines = store.getMedicines();
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [preview, setPreview] = useState(false);

  const selectedMedicine = medicines.find((m) => m.name === medicineName);

  return (
    <div>
      <button onClick={() => navigate("/dashboard/batches")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Preview Batch</h1>
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-lg space-y-5">
        <div className="space-y-2">
          <Label>Select Medicine</Label>
          <select
            value={medicineName}
            onChange={(e) => { setMedicineName(e.target.value); setPreview(false); }}
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
          <Input type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value); setPreview(false); }} />
        </div>
        <Button onClick={() => setPreview(true)} disabled={!medicineName || !quantity} className="w-full">Preview</Button>
      </div>

      {preview && selectedMedicine && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mt-6 max-w-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Batch Preview</h2>
          <Table>
            <TableBody>
              <TableRow><TableCell className="font-medium">Medicine</TableCell><TableCell>{selectedMedicine.name}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Type</TableCell><TableCell>{selectedMedicine.type}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Form</TableCell><TableCell>{selectedMedicine.form}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Strength</TableCell><TableCell>{selectedMedicine.strength} {selectedMedicine.unit}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Quantity</TableCell><TableCell>{quantity}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Status</TableCell><TableCell>Pending</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PreviewBatch;
