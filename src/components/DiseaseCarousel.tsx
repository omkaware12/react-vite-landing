import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
  {
    title: "PCOD",
    desc: "Polycystic Ovarian Disease is one of the most common causes of female infertility. Our Ayurvedic approach treats the root hormonal imbalance.",
  },
  {
    title: "Uterine Disorders",
    desc: "Conditions like fibroids, polyps, and endometriosis affecting the uterus are treated through classical Panchakarma and herbal therapies.",
  },
  {
    title: "Male Infertility",
    desc: "Low sperm count, motility issues, and other male reproductive problems are addressed with proven Ayurvedic formulations.",
  },
  {
    title: "Female Infertility",
    desc: "From low AMH to tubal blockage, we provide comprehensive Ayurvedic treatment for all types of female infertility.",
  },
];

export default function DiseaseCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => Math.min(prev + 1, data.length - 1));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="py-20 bg-ayurveda-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-2">
          <span className="text-secondary">Know</span> Your Diseases!
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          Understand the root cause behind complex infertility, from Low AMH to
          Sperm issues, and how we treat them.
        </p>

        <div className="relative flex items-center gap-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="overflow-hidden flex-1">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${index * 33.333}%)` }}
            >
              {data.map((item, i) => (
                <div
                  key={i}
                  className="min-w-[280px] md:min-w-[calc(33.333%-16px)] bg-background rounded-2xl p-6 shadow-md border border-border flex flex-col"
                >
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-6">
                    {item.desc}
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <span className="text-lg font-bold text-secondary">15+</span>
                      <p className="text-xs text-muted-foreground">Specialists</p>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-secondary">500+</span>
                      <p className="text-xs text-muted-foreground">Procedures</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={next}
            disabled={index >= data.length - 1}
            className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 transition-opacity"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
