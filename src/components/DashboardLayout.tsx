import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
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
  Package,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface SidebarGroup {
  label: string;
  icon: React.ElementType;
  basePath: string;
  children: SidebarItem[];
}

type SidebarEntry = SidebarItem | SidebarGroup;

const isGroup = (entry: SidebarEntry): entry is SidebarGroup =>
  "children" in entry;

const sidebarEntries: SidebarEntry[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Fuel", icon: Fuel, path: "/dashboard/fuel" },
  { label: "Medicines", icon: Pill, path: "/dashboard/medicines" },
  { label: "Machines", icon: Settings, path: "/dashboard/machines" },
  {
    label: "Raw Material",
    icon: Atom,
    basePath: "/dashboard/rawmaterial",
    children: [
      { label: "Overview", icon: Atom, path: "/dashboard/rawmaterial" },
      { label: "Transaction", icon: ArrowLeftRight, path: "/dashboard/rawmaterial/transaction" },
      { label: "Inventory", icon: Archive, path: "/dashboard/rawmaterial/inventory" },
      { label: "Add to Medicines", icon: PlusSquare, path: "/dashboard/add-rawmaterial-medicines" },
    ],
  },
  { label: "Process Steps", icon: Workflow, path: "/dashboard/medicines-process" },
  { label: "Batches", icon: Package, path: "/dashboard/batches" },
];

const SidebarLink = ({ item }: { item: SidebarItem }) => (
  <li>
    <NavLink
      to={item.path}
      end={item.path === "/dashboard" || item.path === "/dashboard/rawmaterial"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm leading-5 transition-colors ${
          isActive
            ? "bg-white/20 font-semibold text-white"
            : "hover:bg-white/10 text-white/80"
        }`
      }
    >
      <item.icon className="w-4.5 h-4.5 shrink-0" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  </li>
);

const SidebarGroupItem = ({ group }: { group: SidebarGroup }) => {
  const location = useLocation();
  const isChildActive = group.children.some(
    (c) => location.pathname === c.path || location.pathname.startsWith(c.path + "/")
  ) || location.pathname.startsWith(group.basePath);
  const [open, setOpen] = useState(isChildActive);

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm leading-5 transition-colors ${
          isChildActive ? "bg-white/10 text-white" : "hover:bg-white/10 text-white/80"
        }`}
      >
        <group.icon className="w-4.5 h-4.5 shrink-0" />
        <span className="truncate flex-1 text-left">{group.label}</span>
        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <ul className="ml-5 pl-3 border-l border-white/15 mt-1 flex flex-col gap-0.5">
          {group.children.map((child) => (
            <SidebarLink key={child.path} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = localStorage.getItem("userRole") || "admin";
  const roleName = role === "admin" ? "Admin" : role === "supervisor" ? "Supervisor" : "Viewer";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[hsl(174,60%,30%)] text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-5 py-4 border-b border-white/10">
          <h2 className="font-playfair text-xl font-bold tracking-wide">Admin</h2>
        </div>
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <ul className="flex flex-col gap-0.5">
            {sidebarEntries.map((entry) =>
              isGroup(entry) ? (
                <SidebarGroupItem key={entry.basePath} group={entry} />
              ) : (
                <SidebarLink key={entry.path} item={entry} />
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
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
