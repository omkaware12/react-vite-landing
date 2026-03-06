import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { store } from "@/lib/store";

const PAGE_SIZE = 10;

const PackagingList = () => {
  const navigate = useNavigate();
  const allItems = store.getPackaging();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = allItems.filter((p) => {
    const q = search.toLowerCase();
    return p.packagingName.toLowerCase().includes(q) || p.unitType.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const pageItems = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(var(--primary))] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-4">All Packages</h1>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search by name or unit type..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Packaging Name</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Capacity</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Unit Type</th>
              <th className="px-6 py-3 text-[hsl(var(--primary))] font-semibold">Active</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p, i) => (
              <tr key={p.id} className={`${i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"} cursor-pointer hover:bg-[hsl(174,40%,93%)] transition-colors`} onClick={() => navigate(`/dashboard/packaging/${p.id}`)}>
                <td className="px-6 py-3">{(safeP - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-3">{p.packagingName}</td>
                <td className="px-6 py-3">{p.capacity}</td>
                <td className="px-6 py-3">{p.unitType}</td>
                <td className="px-6 py-3">{p.active ? "Yes" : "No"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">{search ? "No results found" : "No packages yet"}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safeP === 1} className="px-4 py-2 rounded-lg bg-muted text-sm font-medium disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {safeP} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safeP === totalPages} className="px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default PackagingList;
