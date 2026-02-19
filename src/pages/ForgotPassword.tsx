import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/otp/${role}`, { state: { email } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(174,60%,35%)] to-[hsl(174,60%,25%)] relative overflow-hidden">
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
              Forgot Password
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Enter your email address and we'll send you a link to reset your password
            </p>

            <div className="space-y-3 mb-8">
              {["Secure password reset process", "Email verification required", "Link expires in 24 hours", "Support available if needed"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[hsl(174,80%,60%)]" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
              <p className="text-white/80 text-sm">This is a secure administrative portal. All actions are logged.</p>
            </div>
          </div>

          {/* Right side */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
            <h2 className="font-playfair text-2xl font-bold text-[hsl(220,20%,20%)] text-center mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 text-center mb-8">
              We'll send you instructions to reset your password
            </p>

            <form onSubmit={handleSendReset} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rohatlayurved.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[hsl(174,60%,35%)] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[hsl(220,20%,15%)] text-white font-medium hover:bg-[hsl(220,20%,25%)] transition-colors"
              >
                Send Reset Link
              </button>

              <p className="text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link to={`/role-login/${role}`} className="text-[hsl(174,60%,35%)] hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
