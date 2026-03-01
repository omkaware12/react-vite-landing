import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { store } from "@/lib/store";

const PAGE_SIZE = 10;

const MedicineList = () => {
  const navigate = useNavigate();
  const items = store.getMedicines();
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[hsl(174,60%,30%)] mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Medicines</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">#</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Medicine Name</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Type</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Form</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Strength</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Unit</th>
              <th className="px-6 py-3 text-[hsl(174,60%,30%)] font-semibold">Versions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((m, i) => (
              <tr key={m.id} className={i % 2 === 0 ? "bg-[hsl(174,40%,97%)]" : "bg-white"}>
                <td className="px-6 py-3">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-3">{m.name}</td>
                <td className="px-6 py-3">{m.type}</td>
                <td className="px-6 py-3">{m.form}</td>
                <td className="px-6 py-3">{m.strength}</td>
                <td className="px-6 py-3">{m.unit}</td>
                <td className="px-6 py-3">
                  <button onClick={() => navigate(`/dashboard/medicines/${m.id}/versions`)} className="text-[hsl(174,60%,30%)] font-semibold text-sm hover:underline">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">No medicines yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-lg bg-[hsl(174,60%,30%)] text-white text-sm font-medium disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default MedicineList;
