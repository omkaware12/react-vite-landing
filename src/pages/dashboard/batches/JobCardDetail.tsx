import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { store, JobCardProcessStep } from "@/lib/store";
import { ArrowLeft, FlaskConical, Cog, Users, DollarSign, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const stepStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case "FAILED": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
    default: return <Badge className="bg-muted text-muted-foreground hover:bg-muted">Pending</Badge>;
  }
};

const JobCardDetail = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const { toast } = useToast();

  const jobCards = store.getJobCards();
  const jobCard = jobCards.find((jc) => jc.batchId === Number(batchId));
  const batch = store.getBatches().find((b) => b.id === Number(batchId));

  const [steps, setSteps] = useState<JobCardProcessStep[]>(jobCard?.processSteps || []);
  const [failureRemarkStep, setFailureRemarkStep] = useState<number | null>(null);
  const [failureRemark, setFailureRemark] = useState("");

  if (!jobCard || !batch) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-muted-foreground">Job Card not found for this batch.</p>
      </div>
    );
  }

  const hasFailed = steps.some((s) => s.status === "FAILED");

  const getStepEnabled = (index: number): boolean => {
    if (hasFailed) return false;
    if (steps[index].status !== "PENDING") return false;
    if (index === 0) return true;
    return steps[index - 1].status === "COMPLETED";
  };

  const handleComplete = (index: number) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], status: "COMPLETED" };
    setSteps(updated);
    store.updateJobCard(jobCard.id, { processSteps: updated });
    toast({ title: `Step "${updated[index].stepName}" marked as Completed` });
  };

  const handleFailClick = (index: number) => {
    setFailureRemarkStep(index);
    setFailureRemark("");
  };

  const handleConfirmFail = () => {
    if (failureRemarkStep === null) return;
    const updated = [...steps];
    updated[failureRemarkStep] = {
      ...updated[failureRemarkStep],
      status: "FAILED",
      failureRemark: failureRemark || undefined,
    };
    setSteps(updated);
    store.updateJobCard(jobCard.id, { processSteps: updated });
    store.updateBatch(batch.id, { status: "Failed" });
    toast({ title: `Step "${updated[failureRemarkStep].stepName}" marked as Failed`, variant: "destructive" });
    setFailureRemarkStep(null);
  };

  const allCompleted = steps.length > 0 && steps.every((s) => s.status === "COMPLETED");

  return (
    <div>
      <button onClick={() => navigate(`/dashboard/batches/${batchId}`)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batch
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Card #{jobCard.id}</h1>
          <p className="text-sm text-muted-foreground">Batch: {jobCard.batchNumber} | Created: {new Date(jobCard.createdAt).toLocaleString()}</p>
        </div>
        {allCompleted && (
          <Badge className="bg-green-100 text-green-800 text-base px-4 py-1">All Steps Completed</Badge>
        )}
        {hasFailed && (
          <Badge className="bg-red-100 text-red-800 text-base px-4 py-1 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" /> Process Failed
          </Badge>
        )}
      </div>

      {/* Raw Materials */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FlaskConical className="w-5 h-5 text-primary" /> Raw Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Quantity Used</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobCard.rawMaterials.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-4">No raw materials</TableCell></TableRow>
              ) : jobCard.rawMaterials.map((rm) => (
                <TableRow key={rm.rawMaterialId}>
                  <TableCell className="font-medium">{rm.rawMaterialName}</TableCell>
                  <TableCell>{rm.quantityUsed}</TableCell>
                  <TableCell className="font-semibold">₹{rm.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 text-right text-sm font-bold text-primary">Total: ₹{jobCard.totalRawMaterialCost}</div>
        </CardContent>
      </Card>

      {/* Machines */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cog className="w-5 h-5 text-primary" /> Machines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine</TableHead>
                <TableHead>Time Used</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobCard.machines.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-4">No machines</TableCell></TableRow>
              ) : jobCard.machines.map((m) => (
                <TableRow key={m.machineId}>
                  <TableCell className="font-medium">{m.machineName}</TableCell>
                  <TableCell>{m.timeUsed} hrs</TableCell>
                  <TableCell className="font-semibold">₹{m.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 text-right text-sm font-bold text-primary">Total: ₹{jobCard.totalMachineCost}</div>
        </CardContent>
      </Card>

      {/* Process Steps with Sequential Execution */}
      <Card className="mb-6 border-primary border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-primary" /> Process Steps (Sequential Execution)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {steps.sort((a, b) => a.stepOrder - b.stepOrder).map((step, index) => {
              const enabled = getStepEnabled(index);
              const isCompleted = step.status === "COMPLETED";
              const isFailed = step.status === "FAILED";

              return (
                <div
                  key={step.processStepId}
                  className={`p-4 rounded-lg border transition-all ${
                    isCompleted ? "bg-green-50 border-green-200" :
                    isFailed ? "bg-red-50 border-red-200" :
                    enabled ? "bg-background border-primary/40 shadow-sm" :
                    "bg-muted/30 border-muted opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        isCompleted ? "bg-green-200 text-green-800" :
                        isFailed ? "bg-red-200 text-red-800" :
                        enabled ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {step.stepOrder}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">{step.stepName}</p>
                        <p className="text-xs text-muted-foreground">Time: {step.timeRequired} | Cost: ₹{step.cost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {stepStatusBadge(step.status)}
                      {enabled && !isCompleted && !isFailed && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 border-green-300 text-green-700 hover:bg-green-50"
                            onClick={() => handleComplete(index)}
                          >
                            <CheckCircle2 className="w-4 h-4" /> Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 border-red-300 text-red-700 hover:bg-red-50"
                            onClick={() => handleFailClick(index)}
                          >
                            <XCircle className="w-4 h-4" /> Fail
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  {isFailed && step.failureRemark && (
                    <p className="mt-2 text-sm text-red-700 bg-red-100 p-2 rounded">
                      <strong>Failure Remark:</strong> {step.failureRemark}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Failure Remark Modal Inline */}
          {failureRemarkStep !== null && (
            <div className="mt-4 p-4 border border-red-200 rounded-lg bg-red-50 space-y-3">
              <p className="font-semibold text-red-800">
                Mark "{steps[failureRemarkStep]?.stepName}" as Failed
              </p>
              <Textarea
                placeholder="Enter failure reason (optional)..."
                value={failureRemark}
                onChange={(e) => setFailureRemark(e.target.value)}
                className="bg-background"
              />
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" onClick={handleConfirmFail}>
                  Confirm Failure
                </Button>
                <Button size="sm" variant="outline" onClick={() => setFailureRemarkStep(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 text-right text-sm font-bold text-primary">Total Process Cost: ₹{jobCard.totalProcessCost}</div>
        </CardContent>
      </Card>

      {/* Cost Summary */}
      <Card className="border-primary border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-primary" /> Cost Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Total Raw Material Cost</span><span className="font-semibold">₹{jobCard.totalRawMaterialCost}</span></div>
            <div className="flex justify-between"><span>Total Machine Cost</span><span className="font-semibold">₹{jobCard.totalMachineCost}</span></div>
            <div className="flex justify-between"><span>Total Process Cost</span><span className="font-semibold">₹{jobCard.totalProcessCost}</span></div>
            <hr />
            <div className="flex justify-between text-lg font-bold text-primary">
              <span>Grand Total Cost</span><span>₹{jobCard.grandTotalCost}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCardDetail;
