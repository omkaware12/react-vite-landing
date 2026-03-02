import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "@/lib/store";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PackingEntry {
  packingId: string;
  numberOfPackages: number;
}

const EndBatch = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const batch = store.getBatches().find((b) => b.id === Number(batchId));

  const [producedQuantity, setProducedQuantity] = useState("");
  const [packingDetails, setPackingDetails] = useState<PackingEntry[]>([
    { packingId: "", numberOfPackages: 0 },
  ]);
  const [remark, setRemark] = useState("");

  if (!batch || batch.status !== "In Progress") {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-muted-foreground">Batch not found or not in progress.</p>
      </div>
    );
  }

  const addPackingEntry = () => {
    setPackingDetails([...packingDetails, { packingId: "", numberOfPackages: 0 }]);
  };

  const removePackingEntry = (index: number) => {
    if (packingDetails.length <= 1) return;
    setPackingDetails(packingDetails.filter((_, i) => i !== index));
  };

  const updatePackingEntry = (index: number, field: keyof PackingEntry, value: string | number) => {
    const updated = [...packingDetails];
    updated[index] = { ...updated[index], [field]: value };
    setPackingDetails(updated);
  };

  const canPreview =
    producedQuantity &&
    Number(producedQuantity) > 0 &&
    packingDetails.every((p) => p.packingId.trim() !== "" && p.numberOfPackages > 0);

  const handlePreview = () => {
    const endBatchData = {
      producedQuantity: Number(producedQuantity),
      packingDetails,
      remark,
    };
    sessionStorage.setItem("endBatchData", JSON.stringify(endBatchData));
    navigate(`/dashboard/batches/${batchId}/end/preview`);
  };

  return (
    <div>
      <button onClick={() => navigate(`/dashboard/batches/${batchId}`)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batch Detail
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-2">End Batch: {batch.batchNumber}</h1>
      <p className="text-muted-foreground mb-6">
        Medicine: <strong>{batch.medicineName}</strong> · Planned Quantity: <strong>{batch.quantity} {batch.unit}</strong>
      </p>

      {/* Total Produced Quantity */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Total Produced Quantity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 max-w-sm">
            <div className="flex-1 space-y-2">
              <Label>Final Produced Quantity</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter quantity"
                value={producedQuantity}
                onChange={(e) => setProducedQuantity(e.target.value)}
              />
            </div>
            <span className="h-10 flex items-center text-sm text-muted-foreground font-medium">{batch.unit}</span>
          </div>
        </CardContent>
      </Card>

      {/* Packing Details */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Packing Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {packingDetails.map((entry, index) => (
            <div key={index} className="flex items-end gap-3">
              <div className="flex-1 space-y-2">
                <Label>Packing ID</Label>
                <Input
                  placeholder="e.g. PKG-001"
                  value={entry.packingId}
                  onChange={(e) => updatePackingEntry(index, "packingId", e.target.value)}
                />
              </div>
              <div className="w-40 space-y-2">
                <Label>No. of Packages</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={entry.numberOfPackages || ""}
                  onChange={(e) => updatePackingEntry(index, "numberOfPackages", Number(e.target.value))}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={packingDetails.length <= 1}
                onClick={() => removePackingEntry(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addPackingEntry} className="gap-1">
            <Plus className="w-4 h-4" /> Add Packing Entry
          </Button>
        </CardContent>
      </Card>

      {/* Remark */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Remark</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Production notes, deviations, quality remarks..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handlePreview}
          disabled={!canPreview}
          className="bg-[hsl(174,60%,30%)] hover:bg-[hsl(174,60%,25%)]"
        >
          Preview & Confirm
        </Button>
        <Button variant="outline" onClick={() => navigate(`/dashboard/batches/${batchId}`)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EndBatch;
