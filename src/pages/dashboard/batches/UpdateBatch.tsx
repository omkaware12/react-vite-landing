import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UpdateBatch = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const batch = store.getBatches().find((b) => b.id === Number(batchId));

  const [reason, setReason] = useState("");
  const [rmAdjustments, setRmAdjustments] = useState<{ rawMaterialId: number; additionalQuantity: number }[]>(
    batch?.rawMaterials.map((rm) => ({ rawMaterialId: rm.rawMaterialId, additionalQuantity: 0 })) || []
  );
  const [mcAdjustments, setMcAdjustments] = useState<{ machineId: number; additionalHours: number }[]>(
    batch?.machines.map((m) => ({ machineId: m.machineId, additionalHours: 0 })) || []
  );
  const [psAdjustments, setPsAdjustments] = useState<{ processStepId: number; additionalUnits: number }[]>(
    batch?.processSteps.map((p) => ({ processStepId: p.processStepId, additionalUnits: 0 })) || []
  );

  if (!batch) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-muted-foreground">Batch not found.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast({ title: "Reason is required", variant: "destructive" });
      return;
    }
    const hasChanges = rmAdjustments.some((r) => r.additionalQuantity !== 0) ||
      mcAdjustments.some((m) => m.additionalHours !== 0) ||
      psAdjustments.some((p) => p.additionalUnits !== 0);
    if (!hasChanges) {
      toast({ title: "No adjustments made", variant: "destructive" });
      return;
    }
    store.addBatchAdjustment({
      batchId: batch.id,
      reason,
      rawMaterials: rmAdjustments.filter((r) => r.additionalQuantity !== 0),
      machines: mcAdjustments.filter((m) => m.additionalHours !== 0),
      processSteps: psAdjustments.filter((p) => p.additionalUnits !== 0),
    });
    toast({ title: "Batch adjusted successfully" });
    navigate(`/dashboard/batches/${batch.id}`);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-6">Update Batch: {batch.batchNumber}</h1>

      <div className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader><CardTitle>Reason for Adjustment</CardTitle></CardHeader>
          <CardContent>
            <Label className="mb-2 block">Reason *</Label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Extra production, Machine downtime, Raw material wastage correction" className="w-full border rounded-lg px-4 py-3 text-sm min-h-[80px]" />
          </CardContent>
        </Card>

        {batch.rawMaterials.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Raw Material Adjustments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {batch.rawMaterials.map((rm, i) => (
                <div key={rm.rawMaterialId} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-48">{rm.rawMaterialName}</span>
                  <span className="text-xs text-muted-foreground w-32">Current: {rm.consumedQuantity}</span>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Additional Qty:</Label>
                    <Input type="number" step="0.01" className="w-28" value={rmAdjustments[i]?.additionalQuantity || ""} onChange={(e) => {
                      const updated = [...rmAdjustments];
                      updated[i] = { ...updated[i], additionalQuantity: parseFloat(e.target.value) || 0 };
                      setRmAdjustments(updated);
                    }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {batch.machines.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Machine Adjustments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {batch.machines.map((m, i) => (
                <div key={m.machineId} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-48">{m.machineName}</span>
                  <span className="text-xs text-muted-foreground w-32">Current: {m.timeUsed} hrs</span>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Additional Hours:</Label>
                    <Input type="number" step="0.01" className="w-28" value={mcAdjustments[i]?.additionalHours || ""} onChange={(e) => {
                      const updated = [...mcAdjustments];
                      updated[i] = { ...updated[i], additionalHours: parseFloat(e.target.value) || 0 };
                      setMcAdjustments(updated);
                    }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {batch.processSteps.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Process Step Adjustments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {batch.processSteps.map((ps, i) => (
                <div key={ps.processStepId} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-48">{ps.stepName}</span>
                  <span className="text-xs text-muted-foreground w-32">Current: {ps.totalQuantity} {ps.unit}</span>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Additional Units:</Label>
                    <Input type="number" step="0.01" className="w-28" value={psAdjustments[i]?.additionalUnits || ""} onChange={(e) => {
                      const updated = [...psAdjustments];
                      updated[i] = { ...updated[i], additionalUnits: parseFloat(e.target.value) || 0 };
                      setPsAdjustments(updated);
                    }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Button onClick={handleSubmit} className="bg-[hsl(var(--primary))] hover:opacity-90">Submit Adjustment</Button>
      </div>
    </div>
  );
};

export default UpdateBatch;
