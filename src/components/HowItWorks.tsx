import { Sprout, Leaf, FlaskConical, BadgeCheck, ArrowRight } from "lucide-react";

const steps = [
  { icon: Sprout, title: "Herb Selection", desc: "Ethically sourced medicinal herbs from trusted farms." },
  { icon: Leaf, title: "Traditional Processing", desc: "Prepared using classical Ayurvedic methods." },
  { icon: FlaskConical, title: "Quality Testing", desc: "Lab tested for purity, safety, and effectiveness." },
  { icon: BadgeCheck, title: "Certified Delivery", desc: "AYUSH approved products ready for safe use." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-ayurveda-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-2">
          How Our Ayurveda Works
        </h2>
        <p className="text-center text-muted-foreground max-w-lg mx-auto mb-14">
          From nature to medicine — crafted with care and tradition
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="flex items-center gap-4">
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block text-secondary shrink-0 mx-4" size={24} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
