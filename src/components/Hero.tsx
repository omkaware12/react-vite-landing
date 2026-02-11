import { Leaf, ShieldCheck, FlaskConical, BadgeCheck } from "lucide-react";

const features = [
  { icon: Leaf, label: "100% Herbal Ingredients" },
  { icon: ShieldCheck, label: "GMP Certified Facility" },
  { icon: FlaskConical, label: "Quality Tested" },
  { icon: BadgeCheck, label: "AYUSH Approved" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-ayurveda-green via-ayurveda-green-light to-ayurveda-green">
      {/* Decorative circles */}
      <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-ayurveda-gold/10 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-ayurveda-orange/10 blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-24 pb-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
          Pure Ayurveda.
          <br />
          <span className="text-ayurveda-gold">Powered by Nature.</span>
        </h1>

        <h2 className="text-lg md:text-xl text-primary-foreground/80 font-medium mb-4">
          Trusted Ayurvedic Manufacturing
        </h2>

        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 leading-relaxed">
          We manufacture authentic Ayurvedic medicines using traditional
          formulations, modern GMP-certified processes, and ethically sourced
          medicinal herbs.
        </p>

        <a
          href="#expertise"
          className="inline-block bg-ayurveda-orange hover:bg-ayurveda-orange-light text-primary-foreground font-semibold px-8 py-3 rounded-full transition-colors shadow-lg"
        >
          Explore Our Expertise
        </a>
      </div>

      {/* Feature cards */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl py-5 px-4 text-center transition-transform hover:scale-105"
            >
              <Icon className="text-ayurveda-gold" size={28} />
              <span className="text-primary-foreground text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
