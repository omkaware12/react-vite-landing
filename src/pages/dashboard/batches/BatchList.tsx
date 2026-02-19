import { useNavigate } from "react-router-dom";
import { store } from "@/lib/store";
import { ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const BatchList = () => {
  const navigate = useNavigate();
  const batches = store.getBatches();

  return (
    <div>
      <button onClick={() => navigate("/dashboard/batches")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Batches</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">No batches found</TableCell></TableRow>
            ) : (
              batches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.id}</TableCell>
                  <TableCell>{b.medicineName}</TableCell>
                  <TableCell>{b.quantity}</TableCell>
                  <TableCell>{b.status}</TableCell>
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
