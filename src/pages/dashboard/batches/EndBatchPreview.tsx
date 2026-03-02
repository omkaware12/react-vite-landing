import { useNavigate, useParams } from "react-router-dom";
import { store } from "@/lib/store";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EndBatchPreview = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const { toast } = useToast();
  const batch = store.getBatches().find((b) => b.id === Number(batchId));

  const raw = sessionStorage.getItem("endBatchData");
  const endData = raw ? JSON.parse(raw) : null;

  if (!batch || !endData) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-muted-foreground">Preview data not found. Please go back and fill the form.</p>
      </div>
    );
  }

  const { producedQuantity, packingDetails, remark } = endData as {
    producedQuantity: number;
    packingDetails: { packingId: string; numberOfPackages: number }[];
    remark: string;
  };

  const completionDate = new Date().toISOString();

  const handleConfirm = () => {
    store.updateBatch(batch.id, {
      status: "Success",
      producedQuantity,
      packingDetails,
      remark,
      completionDate,
    });
    sessionStorage.removeItem("endBatchData");
    toast({ title: "Batch ended successfully", description: `Batch ${batch.batchNumber} marked as Success.` });
    navigate(`/dashboard/batches/${batchId}`);
  };

  return (
    <div>
      <button onClick={() => navigate(`/dashboard/batches/${batchId}/end`)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Edit
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-6">End Batch Preview: {batch.batchNumber}</h1>

      {/* Batch Summary */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Batch Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-muted-foreground">Batch ID</span><p className="font-semibold">{batch.id}</p></div>
            <div><span className="text-muted-foreground">Batch Number</span><p className="font-semibold">{batch.batchNumber}</p></div>
            <div><span className="text-muted-foreground">Medicine</span><p className="font-semibold">{batch.medicineName}</p></div>
            <div><span className="text-muted-foreground">Planned Quantity</span><p className="font-semibold">{batch.quantity} {batch.unit}</p></div>
            <div><span className="text-muted-foreground">Final Produced Quantity</span><p className="font-semibold text-[hsl(174,60%,30%)]">{producedQuantity} {batch.unit}</p></div>
            <div><span className="text-muted-foreground">Completion Date</span><p className="font-semibold">{new Date(completionDate).toLocaleString()}</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Packing Details */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Packing Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Packing ID</TableHead>
                <TableHead>Number of Packages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packingDetails.map((p: { packingId: string; numberOfPackages: number }, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{p.packingId}</TableCell>
                  <TableCell>{p.numberOfPackages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Remark */}
      {remark && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Remark</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{remark}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleConfirm} className="bg-[hsl(174,60%,30%)] hover:bg-[hsl(174,60%,25%)] gap-2">
          <CheckCircle className="w-4 h-4" /> Confirm & End Batch
        </Button>
        <Button variant="outline" onClick={() => navigate(`/dashboard/batches/${batchId}/end`)}>
          Back to Edit
        </Button>
      </div>
    </div>
  );
};

export default EndBatchPreview;
