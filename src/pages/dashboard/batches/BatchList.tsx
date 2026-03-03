import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/lib/store";
import { ArrowLeft, Eye, StopCircle, ClipboardList } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusOptions = ["In Progress", "Success", "Failed"] as const;

const statusBadge = (status: string) => {
  switch (status) {
    case "In Progress": return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
    case "Success": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>;
    case "Failed": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
    default: return <Badge variant="secondary">{status}</Badge>;
  }
};

const BatchList = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("In Progress");
  const allBatches = store.getBatches();
  const batches = statusFilter ? allBatches.filter((b) => b.status === statusFilter) : allBatches;

  return (
    <div>
      <button onClick={() => navigate("/dashboard/batches")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">All Batches</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch #</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No batches found</TableCell></TableRow>
            ) : (
              batches.map((b) => (
                <TableRow key={b.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/dashboard/batches/${b.id}`)}>
                  <TableCell className="font-medium">{b.batchNumber}</TableCell>
                  <TableCell>{b.medicineName}</TableCell>
                  <TableCell>{b.versionName}</TableCell>
                  <TableCell>{b.quantity} {b.unit}</TableCell>
                  <TableCell className="font-semibold">₹{b.totalBatchCost}</TableCell>
                  <TableCell>{statusBadge(b.status)}</TableCell>
                  <TableCell>{b.productionDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/batches/${b.id}`); }} className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/batches/${b.id}/jobcard`); }} className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                        <ClipboardList className="w-3.5 h-3.5" /> Job Card
                      </button>
                      {b.status === "In Progress" && (
                        <button onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/batches/${b.id}/end`); }} className="text-destructive hover:underline text-sm font-medium flex items-center gap-1">
                          <StopCircle className="w-3.5 h-3.5" /> End Batch
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BatchList;
