import { useState, useRef } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OtpVerification = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || "user@rohatiayurved.com";
  const maskedEmail = email.replace(/(.{2})(.*)(@)/, "$1***$3");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const allFilled = otp.every((d) => d !== "");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/reset-password/${role}`);
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
              to={`/forgot-password/${role}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors mb-8 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to forgot password
            </Link>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Verify Your Email
            </h1>
            <p className="text-white/70 text-lg mb-8">
              We've sent a 6-digit verification code to your email address
            </p>

            <div className="space-y-3 mb-8">
              {["Enter the code sent to your email", "Code expires in 10 minutes", "Check your spam folder if not received", "Request a new code if needed"].map((item) => (
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
              Enter Verification Code
            </h2>
            <p className="text-gray-500 text-center mb-1">Please enter the 6-digit code sent to</p>
            <p className="text-[hsl(174,60%,35%)] font-medium text-center mb-8">{maskedEmail}</p>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-lg font-semibold rounded-lg border-2 border-[hsl(174,60%,35%)] outline-none focus:ring-2 focus:ring-[hsl(174,60%,35%)]"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={!allFilled}
                className="w-full py-3.5 rounded-lg bg-[hsl(220,20%,15%)] text-white font-medium hover:bg-[hsl(220,20%,25%)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Verify Code
              </button>

              <p className="text-center text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button type="button" className="text-[hsl(174,60%,35%)] hover:underline font-medium">
                  Resend Code
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
