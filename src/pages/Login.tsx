import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { LayoutDashboard, Users, Eye } from "lucide-react";

const roles = [
  {
    id: "admin",
    title: "Factory Admin",
    description: "System control & overall factory management",
    icon: LayoutDashboard,
    features: ["Production Oversight", "User Management", "Reports & Analytics"],
    buttonLabel: "Continue as Admin",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    description: "Daily operations & team supervision",
    icon: Users,
    features: ["Batch Monitoring", "Staff Coordination", "Quality Checks"],
    buttonLabel: "Continue as Supervisor",
  },
  {
    id: "viewer",
    title: "Viewer",
    description: "Read-only access to factory data",
    icon: Eye,
    features: ["View Reports", "Production Status", "Audit Records"],
    buttonLabel: "Continue as Viewer",
  },
];

const Login = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    localStorage.setItem("userRole", roleId);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(174,60%,35%)] to-[hsl(174,60%,25%)] relative overflow-hidden">
      <Navbar />

      {/* Decorative circles */}
      <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute bottom-10 -right-20 w-60 h-60 rounded-full bg-white/5" />

      <div className="pt-32 pb-20 px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
            Factory Login
          </h1>
          <p className="text-white/70 text-lg">Select your role to continue</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-xl"
            >
              <div className="w-16 h-16 rounded-xl bg-[hsl(174,40%,94%)] flex items-center justify-center mb-6">
                <role.icon className="w-8 h-8 text-[hsl(174,60%,35%)]" />
              </div>

              <h2 className="font-playfair text-2xl font-bold text-[hsl(220,20%,20%)] mb-2">
                {role.title}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{role.description}</p>

              <div className="w-full space-y-3 mb-8">
                {role.features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-gray-50 rounded-lg py-3 px-4 text-sm text-gray-600"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleRoleSelect(role.id)}
                className="w-full py-3 rounded-full bg-[hsl(220,20%,15%)] text-white font-medium hover:bg-[hsl(220,20%,25%)] transition-colors"
              >
                {role.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
