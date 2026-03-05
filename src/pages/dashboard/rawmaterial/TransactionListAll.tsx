import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { store } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { RawMaterialTransaction } from "@/lib/store";

const PAGE_SIZE = 10;

const TransactionListAll = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<RawMaterialTransaction | null>(null);

  const items = store.getTransactions();
  const filtered = items.filter((t) => {
    const q = search.toLowerCase();
    return t.materialName.toLowerCase().includes(q) || t.type.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const pageItems = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Transactions</h1>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by material, type..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Material</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Type</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Quantity</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Price/Unit</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((t, i) => (
              <tr key={t.id} className={`${i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"} cursor-pointer hover:bg-[hsl(174,40%,93%)] transition-colors`} onClick={() => setSelected(t)}>
                <td className="px-6 py-3">{(safeP - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-3">{t.materialName}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${t.type === "IN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.type}</span>
                </td>
                <td className="px-6 py-3">{t.quantity} {t.unit}</td>
                <td className="px-6 py-3">{t.pricePerUnit > 0 ? `₹${t.pricePerUnit}` : "-"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">{search ? "No results found" : "No transactions yet"}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safeP === 1} className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {safeP} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safeP === totalPages} className="px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium disabled:opacity-50">Next</button>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--primary))]">Transaction Detail</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              {[
                ["Transaction ID", String(selected.id)],
                ["Type", selected.type],
                ["Material", selected.materialName],
                ["Quantity", `${selected.quantity} ${selected.unit}`],
                ["Remaining Quantity", `${selected.remainingQuantity} ${selected.unit}`],
                ["Price Per Unit", selected.pricePerUnit > 0 ? `₹${selected.pricePerUnit}` : "-"],
                ["Created At", selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "-"],
                ["Created By", selected.createdBy || "Admin"],
              ].map(([label, value]) => (
                <div key={label} className="flex border-b pb-2">
                  <span className="w-40 font-semibold text-gray-600">{label}</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionListAll;
