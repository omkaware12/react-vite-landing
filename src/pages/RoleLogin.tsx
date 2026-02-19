import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const roleConfig = {
  admin: {
    title: "Admin Login",
    portal: "Admin Portal",
    subtitle: "Enter your credentials to access the admin panel",
    description: "Access the administration dashboard and system controls",
    features: ["System Management", "User & Role Control", "Analytics & Reports", "Security Monitoring"],
    placeholder: "admin@rohatiayurved.com",
    buttonLabel: "Sign In to Admin Dashboard",
    notice: "This is a secure administrative portal. All actions are logged.",
  },
  supervisor: {
    title: "Supervisor Login",
    portal: "Supervisor Portal",
    subtitle: "Enter your credentials to access the supervisor dashboard",
    description: "Access supervision tools and operational controls",
    features: ["Team Oversight", "Case Review & Approvals", "Performance Monitoring", "Operational Reports"],
    placeholder: "supervisor@rohatiayurved.com",
    buttonLabel: "Sign In to Supervisor Dashboard",
    notice: "This is a secure supervisory portal. All actions are logged.",
  },
  viewer: {
    title: "Viewer Login",
    portal: "Viewer Portal",
    subtitle: "Enter your credentials to continue",
    description: "View assigned records, reports, and authorized information",
    features: ["Read-Only Access", "View Reports & Records", "Audit & Reference Data", "Secure Information Access"],
    placeholder: "viewer@rohatiayurved.com",
    buttonLabel: "Sign In to Viewer Dashboard",
    notice: "This portal provides restricted, read-only access. All activity is monitored.",
  },
};

const RoleLogin = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const config = roleConfig[role as keyof typeof roleConfig];
  if (!config) {
    navigate("/login");
    return null;
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userRole", role!);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(174,60%,35%)] to-[hsl(174,60%,25%)] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute bottom-10 -right-20 w-60 h-60 rounded-full bg-white/5" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-white/5" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors mb-8 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to role selection
            </Link>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              {config.title}
            </h1>
            <p className="text-white/70 text-lg mb-8">{config.description}</p>

            <div className="space-y-3 mb-8">
              {config.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[hsl(174,80%,60%)]" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
              <p className="text-white/80 text-sm">{config.notice}</p>
            </div>
          </div>

          {/* Right side - form card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
            <h2 className="font-playfair text-2xl font-bold text-[hsl(220,20%,20%)] text-center mb-2">
              {config.portal}
            </h2>
            <p className="text-gray-500 text-center mb-8">{config.subtitle}</p>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={config.placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[hsl(174,60%,35%)] focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link
                    to={`/forgot-password/${role}`}
                    className="text-sm text-[hsl(174,60%,35%)] hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[hsl(174,60%,35%)] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[hsl(220,20%,15%)] text-white font-medium hover:bg-[hsl(220,20%,25%)] transition-colors"
              >
                {config.buttonLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleLogin;
