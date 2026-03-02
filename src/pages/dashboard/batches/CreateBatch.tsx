import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { store, BatchRawMaterial, BatchMachine, BatchProcessStep } from "@/lib/store";
import { ArrowLeft, FlaskConical, Cog, Users, DollarSign } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CreateBatch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const medicines = store.getMedicines();
  const allVersions = store.getVersions();
  const processSteps = store.getProcessSteps();
  const rawMaterials = store.getRawMaterials();
  const machines = store.getMachines();

  const [medicineId, setMedicineId] = useState("");
  const [versionId, setVersionId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [batchUnit, setBatchUnit] = useState("Kg");
  const [showPreview, setShowPreview] = useState(false);

  const selectedMedicine = medicines.find((m) => m.id === Number(medicineId));
  const versions = allVersions.filter((v) => v.medicineId === Number(medicineId));
  const selectedVersion = allVersions.find((v) => v.id === Number(versionId));

  const preview = useMemo(() => {
    if (!selectedMedicine || !selectedVersion || !quantity) return null;
    const qty = Number(quantity);

    // Generate raw material breakdown (simulated based on available raw materials)
    const batchRawMaterials: BatchRawMaterial[] = rawMaterials.slice(0, 3).map((rm, i) => {
      const reqQty = Math.round(qty * (1 + i * 0.5) * 10) / 10;
      const price = 50 + i * 25;
      const available = Math.round(reqQty * (0.6 + Math.random() * 0.8) * 10) / 10;
      return {
        rawMaterialId: rm.id,
        rawMaterialName: rm.name,
        requiredQuantity: reqQty,
        consumedQuantity: Math.min(available, reqQty),
        pricePerUnit: price,
        totalCost: Math.round(reqQty * price * 100) / 100,
      };
    });

    // Generate machine breakdown
    const batchMachines: BatchMachine[] = machines.slice(0, 2).map((m, i) => {
      const timeUsed = Math.round(qty * (0.5 + i * 0.3) * 10) / 10;
      const costPerTime = 100 + i * 50;
      return {
        machineId: m.id,
        machineName: m.name,
        timeUsed,
        costPerTimeUnit: costPerTime,
        totalCost: Math.round(timeUsed * costPerTime * 100) / 100,
      };
    });

    // Process step breakdown from version steps
    const batchProcessSteps: BatchProcessStep[] = selectedVersion.steps
      .sort((a, b) => a.stepOrder - b.stepOrder)
      .map((vs) => {
        const ps = processSteps.find((p) => p.id === vs.medicineProcessStepId);
        const totalQty = vs.quantity * vs.repeatCount * qty;
        const price = ps?.pricePerUnit || 0;
        return {
          processStepId: vs.medicineProcessStepId,
          stepName: ps?.name || `Step #${vs.medicineProcessStepId}`,
          stepOrder: vs.stepOrder,
          repeatCount: vs.repeatCount,
          totalQuantity: Math.round(totalQty * 100) / 100,
          pricePerUnit: price,
          totalCost: Math.round(totalQty * price * 100) / 100,
          unit: ps?.unit || "minute",
        };
      });

    const totalMaterialCost = batchRawMaterials.reduce((s, r) => s + r.totalCost, 0);
    const totalMachineCost = batchMachines.reduce((s, m) => s + m.totalCost, 0);
    const totalLabourCost = batchProcessSteps.reduce((s, p) => s + p.totalCost, 0);

    return {
      rawMaterials: batchRawMaterials,
      machines: batchMachines,
      processSteps: batchProcessSteps,
      totalMaterialCost: Math.round(totalMaterialCost * 100) / 100,
      totalMachineCost: Math.round(totalMachineCost * 100) / 100,
      totalLabourCost: Math.round(totalLabourCost * 100) / 100,
      totalBatchCost: Math.round((totalMaterialCost + totalMachineCost + totalLabourCost) * 100) / 100,
    };
  }, [selectedMedicine, selectedVersion, quantity, rawMaterials, machines, processSteps]);

  const handlePreview = () => {
    if (!medicineId || !versionId || !quantity) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    setShowPreview(true);
  };

  const handleConfirm = () => {
    if (!preview || !selectedMedicine || !selectedVersion) return;
    const batchCount = store.getBatches().length;
    store.addBatch({
      batchNumber: `BATCH-${String(batchCount + 1).padStart(4, "0")}`,
      medicineId: selectedMedicine.id,
      medicineName: selectedMedicine.name,
      medicineDescription: selectedMedicine.description || "",
      versionId: selectedVersion.id,
      versionName: selectedVersion.versionName,
      quantity: Number(quantity),
      unit: batchUnit,
      status: "In Progress",
      rawMaterials: preview.rawMaterials,
      machines: preview.machines,
      processSteps: preview.processSteps,
      totalMaterialCost: preview.totalMaterialCost,
      totalMachineCost: preview.totalMachineCost,
      totalLabourCost: preview.totalLabourCost,
      totalBatchCost: preview.totalBatchCost,
      productionDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    });
    toast({ title: "Batch Created", description: `Batch has been created successfully` });
    navigate("/dashboard/batches/list");
  };

  return (
    <div>
      <button onClick={() => navigate("/dashboard/batches")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-6">Create Batch</h1>

      {/* Selection Form */}
      <Card className="max-w-lg mb-6">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Select Medicine</Label>
            <select
              value={medicineId}
              onChange={(e) => { setMedicineId(e.target.value); setVersionId(""); setShowPreview(false); }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">-- Select Medicine --</option>
              {medicines.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>

          {medicineId && (
            <div className="space-y-2">
              <Label>Select Version (Process)</Label>
              <select
                value={versionId}
                onChange={(e) => { setVersionId(e.target.value); setShowPreview(false); }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">-- Select Version --</option>
                {versions.map((v) => <option key={v.id} value={v.id}>{v.versionName} ({v.steps.length} steps)</option>)}
              </select>
              {versions.length === 0 && (
                <p className="text-xs text-destructive">No versions found for this medicine. Please create one first.</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Batch Quantity</Label>
              <Input type="number" placeholder="e.g. 10" value={quantity} onChange={(e) => { setQuantity(e.target.value); setShowPreview(false); }} />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <select
                value={batchUnit}
                onChange={(e) => setBatchUnit(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Kg">Kg</option>
                <option value="Liters">Liters</option>
                <option value="Units">Units</option>
                <option value="Grams">Grams</option>
              </select>
            </div>
          </div>

          <Button onClick={handlePreview} className="w-full" disabled={!medicineId || !versionId || !quantity}>
            Generate Preview
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {showPreview && preview && selectedMedicine && selectedVersion && (
        <div className="space-y-6">
          {/* Medicine Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FlaskConical className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Medicine Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="text-muted-foreground">Name</span><p className="font-semibold">{selectedMedicine.name}</p></div>
                <div><span className="text-muted-foreground">Type</span><p className="font-semibold">{selectedMedicine.type}</p></div>
                <div><span className="text-muted-foreground">Version</span><p className="font-semibold">{selectedVersion.versionName}</p></div>
                <div><span className="text-muted-foreground">Batch Qty</span><p className="font-semibold">{quantity} {batchUnit}</p></div>
              </div>
            </CardContent>
          </Card>

          {/* Raw Materials */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FlaskConical className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Raw Material Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {preview.rawMaterials.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Required Qty</TableHead>
                      <TableHead>Available Qty</TableHead>
                      <TableHead>Missing Qty</TableHead>
                      <TableHead>Price/Unit</TableHead>
                      <TableHead>Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.rawMaterials.map((rm) => {
                      const missing = Math.max(0, rm.requiredQuantity - rm.consumedQuantity);
                      return (
                        <TableRow key={rm.rawMaterialId}>
                          <TableCell className="font-medium">{rm.rawMaterialName}</TableCell>
                          <TableCell>{rm.requiredQuantity}</TableCell>
                          <TableCell>{rm.consumedQuantity}</TableCell>
                          <TableCell className={missing > 0 ? "text-destructive font-semibold" : "text-green-600"}>{missing > 0 ? missing : "—"}</TableCell>
                          <TableCell>₹{rm.pricePerUnit}</TableCell>
                          <TableCell className="font-semibold">₹{rm.totalCost}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No raw materials configured</p>
              )}
              <div className="mt-3 text-right text-sm font-bold text-[hsl(174,60%,30%)]">
                Total Raw Material Cost: ₹{preview.totalMaterialCost}
              </div>
            </CardContent>
          </Card>

          {/* Machines */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cog className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Machine Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {preview.machines.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Machine</TableHead>
                      <TableHead>Time Used</TableHead>
                      <TableHead>Cost/Time Unit</TableHead>
                      <TableHead>Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.machines.map((m) => (
                      <TableRow key={m.machineId}>
                        <TableCell className="font-medium">{m.machineName}</TableCell>
                        <TableCell>{m.timeUsed} hrs</TableCell>
                        <TableCell>₹{m.costPerTimeUnit}</TableCell>
                        <TableCell className="font-semibold">₹{m.totalCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No machines configured</p>
              )}
              <div className="mt-3 text-right text-sm font-bold text-[hsl(174,60%,30%)]">
                Total Machine Cost: ₹{preview.totalMachineCost}
              </div>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Process Step Details (Labour)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {preview.processSteps.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Step Name</TableHead>
                      <TableHead>Repeat</TableHead>
                      <TableHead>Total Qty</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Price/Unit</TableHead>
                      <TableHead>Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.processSteps.map((ps) => (
                      <TableRow key={ps.processStepId}>
                        <TableCell>{ps.stepOrder}</TableCell>
                        <TableCell className="font-medium">{ps.stepName}</TableCell>
                        <TableCell>{ps.repeatCount}</TableCell>
                        <TableCell>{ps.totalQuantity}</TableCell>
                        <TableCell>{ps.unit}</TableCell>
                        <TableCell>₹{ps.pricePerUnit}</TableCell>
                        <TableCell className="font-semibold">₹{ps.totalCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No process steps in this version</p>
              )}
              <div className="mt-3 text-right text-sm font-bold text-[hsl(174,60%,30%)]">
                Total Labour Cost: ₹{preview.totalLabourCost}
              </div>
            </CardContent>
          </Card>

          {/* Final Cost Summary */}
          <Card className="border-[hsl(174,60%,30%)] border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Final Cost Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Total Raw Material Cost</span><span className="font-semibold">₹{preview.totalMaterialCost}</span></div>
                <div className="flex justify-between"><span>Total Machine Cost</span><span className="font-semibold">₹{preview.totalMachineCost}</span></div>
                <div className="flex justify-between"><span>Total Labour Cost</span><span className="font-semibold">₹{preview.totalLabourCost}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold text-[hsl(174,60%,30%)]">
                  <span>Total Batch Cost</span>
                  <span>₹{preview.totalBatchCost}</span>
                </div>
              </div>
              <Button onClick={handleConfirm} className="w-full mt-6 bg-[hsl(174,60%,30%)] hover:bg-[hsl(174,60%,25%)]">
                Confirm & Create Batch
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreateBatch;
