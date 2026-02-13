import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

interface Row {
  name: string;
  type: string;
  unit: string;
}

const BulkRawMaterial = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([{ name: "", type: "", unit: "" }]);

  const updateRow = (idx: number, field: keyof Row, value: string) => {
    setRows(prev => prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const removeRow = (idx: number) => {
    if (rows.length > 1) setRows(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const valid = rows.filter(r => r.name && r.type && r.unit);
    if (valid.length === 0) {
      toast({ title: "Please fill at least one row", variant: "destructive" });
      return;
    }
    valid.forEach(r => store.addRawMaterial(r));
    toast({ title: `${valid.length} raw materials created` });
    navigate("/dashboard/rawmaterial");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Create Raw Materials (Bulk)</h2>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input type="text" placeholder="Raw Material Name" value={row.name} onChange={e => updateRow(i, "name", e.target.value)} className="flex-1 border rounded-lg px-4 py-3 text-sm bg-gray-50" />
              <select value={row.type} onChange={e => updateRow(i, "type", e.target.value)} className="border rounded-lg px-4 py-3 text-sm bg-white w-40">
                <option value="">Type</option>
                <option value="HERB">HERB</option>
                <option value="MINERAL">MINERAL</option>
                <option value="CHEMICAL">CHEMICAL</option>
              </select>
              <select value={row.unit} onChange={e => updateRow(i, "unit", e.target.value)} className="border rounded-lg px-4 py-3 text-sm bg-white w-40">
                <option value="">Unit</option>
                <option value="KG">KG</option>
                <option value="GM">GM</option>
                <option value="LITRE">LITRE</option>
                <option value="ML">ML</option>
              </select>
              <button onClick={() => removeRow(i)} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={() => setRows(prev => [...prev, { name: "", type: "", unit: "" }])} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
            + Add Row
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-[hsl(174,60%,30%)] text-white rounded-lg text-sm font-medium hover:bg-[hsl(174,60%,25%)]">
            Save All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkRawMaterial;
