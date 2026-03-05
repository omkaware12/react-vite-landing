import { useState } from "react";
import { Search } from "lucide-react";
import { store } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { RawMaterialInventory } from "@/lib/store";

const PAGE_SIZE = 10;

const RawMaterialInventoryPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<RawMaterialInventory | null>(null);

  // Build inventory from raw materials + inventory store
  const rawMaterials = store.getRawMaterials();
  const inventoryItems = store.getInventory();

  // Merge: show all raw materials with their inventory
  const allItems: RawMaterialInventory[] = rawMaterials.map((rm) => {
    const inv = inventoryItems.find((i) => i.rawMaterialId === rm.id);
    return {
      id: inv?.id || rm.id,
      rawMaterialId: rm.id,
      rawMaterialName: rm.name,
      availableQuantity: inv?.availableQuantity || 0,
      lastUpdatedAt: inv?.lastUpdatedAt || "-",
    };
  });

  const filtered = allItems.filter((item) =>
    item.rawMaterialName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const pageItems = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Raw Material Inventory</h1>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by material name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Raw Material</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Available Qty</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item, i) => (
              <tr key={item.rawMaterialId} className={`${i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"} cursor-pointer hover:bg-[hsl(174,40%,93%)] transition-colors`} onClick={() => setSelected(item)}>
                <td className="px-6 py-3">{(safeP - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-3">{item.rawMaterialName}</td>
                <td className="px-6 py-3">{item.availableQuantity}</td>
                <td className="px-6 py-3">{item.lastUpdatedAt !== "-" ? new Date(item.lastUpdatedAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">{search ? "No results" : "No inventory data"}</td></tr>
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
            <DialogTitle className="text-[hsl(var(--primary))]">Inventory Detail</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              {[
                ["Inventory ID", String(selected.id)],
                ["Raw Material", selected.rawMaterialName],
                ["Available Quantity", String(selected.availableQuantity)],
                ["Last Updated", selected.lastUpdatedAt !== "-" ? new Date(selected.lastUpdatedAt).toLocaleString() : "-"],
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

export default RawMaterialInventoryPage;
