import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    title: "Overcoming PCOS: After Many Failed Treatments, Ayurved Gave Me \"Good News\"",
    text: "After struggling with PCOD and multiple failed treatments, we finally found hope through Ayurveda. The holistic care and natural approach helped us conceive naturally.",
    name: "Pooja Lende",
    meta: "PCOD • 2 months ago",
  },
  {
    title: "11 Years of Marriage, 7 Miscarriages – Conceived Naturally in 5 Months",
    text: "After years of heartbreak and repeated losses, Ayurveda restored our hope. Within five months of treatment, we conceived naturally.",
    name: "Mamta Kocharekar, Mumbai",
    meta: "PCOD • 2 months ago",
  },
  {
    title: "Natural Healing Brought Us Joy After Years of Waiting",
    text: "The Ayurvedic approach focused on the root cause, lifestyle, and nutrition. We finally welcomed our baby naturally.",
    name: "Sneha Patil",
    meta: "Infertility • 3 months ago",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-2">
          <span className="text-secondary">Our</span> Testimonials
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
          The happy families we've built speak for our success in turning dreams
          into parenthood.
        </p>

        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button
            onClick={prev}
            className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex-1 bg-card rounded-2xl border border-border shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="text-5xl text-ayurveda-gold font-display leading-none mb-4">"</div>
              <h3 className="text-xl font-display font-bold text-foreground mb-4">
                {t.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{t.text}</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.meta}</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-ayurveda-gold text-ayurveda-gold" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={next}
            className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
