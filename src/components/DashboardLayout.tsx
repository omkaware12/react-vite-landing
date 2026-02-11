import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Fuel,
  Pill,
  Settings,
  Atom,
  ArrowLeftRight,
  Archive,
  PlusSquare,
  Workflow,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Fuel", icon: Fuel, path: "/dashboard/fuel" },
  { label: "Medicines", icon: Pill, path: "/dashboard/medicines" },
  { label: "Machines", icon: Settings, path: "/dashboard/machines" },
  { label: "Raw Material", icon: Atom, path: "/dashboard/rawmaterial" },
  { label: "Raw Material Transaction", icon: ArrowLeftRight, path: "/dashboard/rawmaterial/transaction" },
  { label: "Raw Material Inventory", icon: Archive, path: "/dashboard/rawmaterial/inventory" },
  { label: "Add Raw Material to Medicines", icon: PlusSquare, path: "/dashboard/add-rawmaterial-medicines" },
  { label: "Process Steps", icon: Workflow, path: "/dashboard/medicines-process" },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = localStorage.getItem("userRole") || "admin";
  const roleName = role === "admin" ? "Admin" : role === "supervisor" ? "Supervisor" : "Viewer";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[hsl(174,60%,30%)] text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="p-5 pb-4">
          <h2 className="font-playfair text-xl font-bold">Admin</h2>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/20 font-medium"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-60">
        {/* Top bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[hsl(174,60%,25%)] flex items-center justify-center text-white font-bold text-sm">
                  RA
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Rohti {roleName}</p>
                  <p className="text-xs text-gray-500">Company</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-14 bg-white rounded-lg shadow-lg border py-2 w-40 z-50">
                  <button
                    onClick={() => {
                      localStorage.removeItem("userRole");
                      navigate("/login");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
