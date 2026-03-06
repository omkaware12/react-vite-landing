import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "@/lib/store";
import { ArrowLeft, Edit, FileText, FlaskConical, Cog, Users, DollarSign, ClipboardList, Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const statusBadge = (status: string) => {
  switch (status) {
    case "In Progress": return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
    case "Success": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>;
    case "Failed": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
    default: return <Badge variant="secondary">{status}</Badge>;
  }
};

const BatchDetail = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const { toast } = useToast();
  const batch = store.getBatches().find((b) => b.id === Number(batchId));
  const [editing, setEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<"In Progress" | "Success" | "Failed">(batch?.status || "In Progress");
  const [editQuantity, setEditQuantity] = useState(String(batch?.quantity || ""));
  const [editDate, setEditDate] = useState(batch?.productionDate || "");
  const [showBom, setShowBom] = useState(false);

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

  const handleUpdate = () => {
    store.updateBatch(batch.id, {
      status: editStatus as "In Progress" | "Success" | "Failed",
      quantity: Number(editQuantity),
      productionDate: editDate,
    });
    toast({ title: "Batch updated successfully" });
    setEditing(false);
  };

  return (
    <div>
      <button onClick={() => navigate("/dashboard/batches/list")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Batch: {batch.batchNumber}</h1>
        <div className="flex gap-2">
          {batch.status === "In Progress" && (
            <Button onClick={() => navigate(`/dashboard/batches/${batchId}/end`)} className="bg-destructive hover:bg-destructive/90 gap-2">
              End Batch
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate(`/dashboard/batches/${batchId}/jobcard`)} className="gap-2">
            <ClipboardList className="w-4 h-4" /> View Job Card
          </Button>
          {batch.status === "Success" && (
            <Button variant="outline" onClick={() => setShowBom(!showBom)} className="gap-2">
              <FileText className="w-4 h-4" /> {showBom ? "Hide BOM" : "View BOM"}
            </Button>
          )}
          <Button variant="outline" onClick={() => setEditing(!editing)} className="gap-2">
            <Edit className="w-4 h-4" /> {editing ? "Cancel" : "Update Batch"}
          </Button>
          {batch.status === "In Progress" && (
            <Button variant="outline" onClick={() => navigate(`/dashboard/batches/${batchId}/update`)} className="gap-2">
              <Wrench className="w-4 h-4" /> Adjust Batch
            </Button>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as "In Progress" | "Success" | "Failed")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="In Progress">In Progress</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Production Date</Label>
                <Input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              </div>
            </div>
            <Button onClick={handleUpdate} className="bg-[hsl(174,60%,30%)] hover:bg-[hsl(174,60%,25%)]">Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {/* Basic Info */}
      <Card className="mb-6">
        <CardHeader className="pb-3"><CardTitle className="text-lg">Batch Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-muted-foreground">Batch ID</span><p className="font-semibold">{batch.id}</p></div>
            <div><span className="text-muted-foreground">Batch Number</span><p className="font-semibold">{batch.batchNumber}</p></div>
            <div><span className="text-muted-foreground">Medicine</span><p className="font-semibold">{batch.medicineName}</p></div>
            <div><span className="text-muted-foreground">Version</span><p className="font-semibold">{batch.versionName}</p></div>
            <div><span className="text-muted-foreground">Quantity</span><p className="font-semibold">{batch.quantity} {batch.unit}</p></div>
            <div><span className="text-muted-foreground">Status</span><div className="mt-1">{statusBadge(batch.status)}</div></div>
            <div><span className="text-muted-foreground">Production Date</span><p className="font-semibold">{batch.productionDate}</p></div>
            <div><span className="text-muted-foreground">Created At</span><p className="font-semibold">{new Date(batch.createdAt).toLocaleDateString()}</p></div>
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-muted-foreground">Material Cost</span><p className="font-bold text-[hsl(174,60%,30%)]">₹{batch.totalMaterialCost}</p></div>
            <div><span className="text-muted-foreground">Machine Cost</span><p className="font-bold text-[hsl(174,60%,30%)]">₹{batch.totalMachineCost}</p></div>
            <div><span className="text-muted-foreground">Labour Cost</span><p className="font-bold text-[hsl(174,60%,30%)]">₹{batch.totalLabourCost}</p></div>
            <div><span className="text-muted-foreground">Total Batch Cost</span><p className="font-bold text-lg text-[hsl(174,60%,30%)]">₹{batch.totalBatchCost}</p></div>
          </div>
        </CardContent>
      </Card>

      {/* BOM View for completed batches */}
      {showBom && batch.status === "Success" && (
        <Card className="mb-6 border-[hsl(174,60%,30%)] border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Bill of Materials (BOM)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm"><strong>Medicine:</strong> {batch.medicineName} | <strong>Version:</strong> {batch.versionName} | <strong>Quantity:</strong> {batch.quantity} {batch.unit}</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity/Time</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batch.rawMaterials.map((rm) => (
                  <TableRow key={`rm-${rm.rawMaterialId}`}>
                    <TableCell><Badge variant="outline">Raw Material</Badge></TableCell>
                    <TableCell>{rm.rawMaterialName}</TableCell>
                    <TableCell>{rm.requiredQuantity}</TableCell>
                    <TableCell>₹{rm.pricePerUnit}</TableCell>
                    <TableCell className="font-semibold">₹{rm.totalCost}</TableCell>
                  </TableRow>
                ))}
                {batch.machines.map((m) => (
                  <TableRow key={`mc-${m.machineId}`}>
                    <TableCell><Badge variant="outline">Machine</Badge></TableCell>
                    <TableCell>{m.machineName}</TableCell>
                    <TableCell>{m.timeUsed} hrs</TableCell>
                    <TableCell>₹{m.costPerTimeUnit}/hr</TableCell>
                    <TableCell className="font-semibold">₹{m.totalCost}</TableCell>
                  </TableRow>
                ))}
                {batch.processSteps.map((ps) => (
                  <TableRow key={`ps-${ps.processStepId}`}>
                    <TableCell><Badge variant="outline">Labour</Badge></TableCell>
                    <TableCell>{ps.stepName}</TableCell>
                    <TableCell>{ps.totalQuantity} {ps.unit}</TableCell>
                    <TableCell>₹{ps.pricePerUnit}/{ps.unit}</TableCell>
                    <TableCell className="font-semibold">₹{ps.totalCost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-right font-bold text-lg text-[hsl(174,60%,30%)]">Total: ₹{batch.totalBatchCost}</div>
          </CardContent>
        </Card>
      )}

      {/* Raw Materials Breakdown */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg"><FlaskConical className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Raw Materials Used</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Required Qty</TableHead>
                <TableHead>Consumed Qty</TableHead>
                <TableHead>Price/Unit</TableHead>
                <TableHead>Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batch.rawMaterials.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-4">No raw materials</TableCell></TableRow>
              ) : batch.rawMaterials.map((rm) => (
                <TableRow key={rm.rawMaterialId}>
                  <TableCell className="font-medium">{rm.rawMaterialName}</TableCell>
                  <TableCell>{rm.requiredQuantity}</TableCell>
                  <TableCell>{rm.consumedQuantity}</TableCell>
                  <TableCell>₹{rm.pricePerUnit}</TableCell>
                  <TableCell className="font-semibold">₹{rm.totalCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 text-right text-sm font-bold text-[hsl(174,60%,30%)]">Total: ₹{batch.totalMaterialCost}</div>
        </CardContent>
      </Card>

      {/* Machines Breakdown */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg"><Cog className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Machines Used</CardTitle>
        </CardHeader>
        <CardContent>
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
              {batch.machines.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-4">No machines</TableCell></TableRow>
              ) : batch.machines.map((m) => (
                <TableRow key={m.machineId}>
                  <TableCell className="font-medium">{m.machineName}</TableCell>
                  <TableCell>{m.timeUsed} hrs</TableCell>
                  <TableCell>₹{m.costPerTimeUnit}</TableCell>
                  <TableCell className="font-semibold">₹{m.totalCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 text-right text-sm font-bold text-[hsl(174,60%,30%)]">Total: ₹{batch.totalMachineCost}</div>
        </CardContent>
      </Card>

      {/* Process Steps Breakdown */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg"><Users className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Process Steps (Labour)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Step</TableHead>
                <TableHead>Repeat</TableHead>
                <TableHead>Total Qty</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Price/Unit</TableHead>
                <TableHead>Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batch.processSteps.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-4">No process steps</TableCell></TableRow>
              ) : batch.processSteps.map((ps) => (
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
          <div className="mt-3 text-right text-sm font-bold text-[hsl(174,60%,30%)]">Total: ₹{batch.totalLabourCost}</div>
        </CardContent>
      </Card>

      {/* Final Summary */}
      <Card className="border-[hsl(174,60%,30%)] border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg"><DollarSign className="w-5 h-5 text-[hsl(174,60%,35%)]" /> Cost Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Raw Material Cost</span><span className="font-semibold">₹{batch.totalMaterialCost}</span></div>
            <div className="flex justify-between"><span>Machine Cost</span><span className="font-semibold">₹{batch.totalMachineCost}</span></div>
            <div className="flex justify-between"><span>Labour Cost</span><span className="font-semibold">₹{batch.totalLabourCost}</span></div>
            <hr />
            <div className="flex justify-between text-lg font-bold text-[hsl(174,60%,30%)]">
              <span>Total Batch Cost</span><span>₹{batch.totalBatchCost}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchDetail;
