import {
  CalendarCheck,
  Trophy,
  MapPin,
  PhoneCall,
  Award,
  Users,
  Leaf,
  Activity,
  TrendingUp,
} from "lucide-react";

const expertiseItems = [
  "Complex & Long-Standing Infertility Cases",
  "Ayurvedic Alternative to IVF & IUI",
  "Improves IVF & IUI Success Rates",
  "Root-Cause-Based Ayurvedic Treatment",
  "Accurate & Holistic Diagnosis",
  "Classical Panchakarma Therapies",
  "100% Authentic Ayurvedic Principles",
  "Structured & Time-Bound Protocols",
  "Personalized Lifestyle & Diet Plans",
  "One-to-One Doctor Consultations",
];

const actionCards = [
  { icon: CalendarCheck, label: "Book Appointment", variant: "orange" as const },
  { icon: Trophy, label: "Success Story", variant: "default" as const },
  { icon: MapPin, label: "Locate Clinic", variant: "default" as const },
  { icon: PhoneCall, label: "Contact Us", variant: "orange" as const },
];

const stats = [
  { icon: Award, number: "25+", label: "Years Collective\nExperience" },
  { icon: Users, number: "25000+", label: "Patients\nTreated" },
  { icon: Leaf, number: "100%", label: "Natural\nTreatment" },
  { icon: Activity, number: "2000+", label: "Panchakarma\nDone" },
  { icon: TrendingUp, number: "93%", label: "Success\nRate" },
];

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Expertise list */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Our <span className="text-secondary">Expertise</span>
            </h2>
            <p className="text-muted-foreground font-medium mb-8">
              Result Oriented • Scientific • Proven
            </p>
            <ul className="space-y-3">
              {expertiseItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-foreground"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Action cards */}
          <div className="grid grid-cols-2 gap-4">
            {actionCards.map(({ icon: Icon, label, variant }) => (
              <button
                key={label}
                className={`flex flex-col items-center justify-center gap-3 rounded-xl py-8 px-4 transition-all hover:scale-105 shadow-md cursor-pointer ${
                  variant === "orange"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-card text-card-foreground border border-border"
                }`}
              >
                <Icon size={28} />
                <span className="font-semibold text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 bg-ayurveda-green rounded-2xl py-8 px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map(({ icon: Icon, number, label }) => (
              <div key={number} className="flex flex-col items-center gap-2">
                <Icon className="text-ayurveda-gold" size={30} />
                <span className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                  {number}
                </span>
                <p className="text-primary-foreground/70 text-sm whitespace-pre-line leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
