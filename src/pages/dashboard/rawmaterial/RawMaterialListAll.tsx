import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { store } from "@/lib/store";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const PAGE_SIZE = 10;

const RawMaterialListAll = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [, setTick] = useState(0);

  const items = store.getRawMaterials();
  const filtered = items.filter((r) => {
    const q = search.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const pageItems = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  const handleDelete = (id: number) => {
    store.deleteRawMaterial(id);
    toast({ title: "Raw material deleted" });
    setTick((t) => t + 1);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Raw Materials</h1>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by name, type, unit..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Material Name</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Category</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Unit</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((r, i) => (
              <tr key={r.id} className={`${i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"} cursor-pointer hover:bg-[hsl(174,40%,93%)] transition-colors`} onClick={() => navigate(`/dashboard/rawmaterial/${r.id}`)}>
                <td className="px-6 py-3">{(safeP - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-3">{r.name}</td>
                <td className="px-6 py-3">{r.type}</td>
                <td className="px-6 py-3">{r.unit}</td>
                <td className="px-6 py-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => navigate(`/dashboard/rawmaterial/${r.id}/edit`)} className="text-[hsl(174,60%,30%)] font-semibold text-sm hover:underline">Edit</button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-500 font-semibold text-sm hover:underline">Delete</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Raw Material</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to delete "{r.name}"? This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(r.id)} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">{search ? "No results found" : "No raw materials yet"}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safeP === 1} className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {safeP} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safeP === totalPages} className="px-4 py-2 rounded-lg bg-[hsl(174,60%,30%)] text-white text-sm font-medium disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default RawMaterialListAll;
