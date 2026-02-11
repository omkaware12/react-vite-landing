export default function Diseases() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-2">
          <span className="text-secondary">Most Complex Diseases</span> That We Treat
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          Understand the root cause behind complex infertility, from Low AMH to
          Sperm issues, and how we treat them.
        </p>

        {/* Infertility */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <DiseaseCard
            title="Female Infertility"
            items={[
              "Low AMH",
              "Recurrent IVF / IUI Failure",
              "Tubal Blockage (Fallopian Tube Block)",
              "Thin Endometrium (Poor Uterine Lining)",
              "PCOD / PCOS",
              "Endometriosis & Adenomyosis",
              "Premature Ovarian Failure",
              "Hormonal Imbalance (High FSH / LH)",
              "Unexplained Infertility",
              "Recurrent Miscarriages",
            ]}
          />
          <DiseaseCard
            title="Male Infertility"
            items={[
              "Azoospermia (Zero Sperm Count)",
              "Oligospermia (Low Sperm Count)",
              "Asthenozoospermia (Low Sperm Motility)",
              "Teratozoospermia (Abnormal Sperm Morphology)",
              "Varicocele",
              "Sexual Dysfunction (ED / Premature Ejaculation)",
            ]}
          />
        </div>

        <h3 className="text-2xl font-display font-bold text-center text-foreground mb-8">
          Non Infertility Issues
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <DiseaseCard
            title="Female"
            items={[
              "Irregular Periods",
              "Painful Periods (Dysmenorrhea)",
              "White Discharge (Leucorrhoea)",
              "Thyroid Management",
              "PCOD / PCOS (Non-Infertility)",
              "Menopause",
              "Skin Issues",
              "Digestive Disorders",
              "Anemia & Weakness",
              "Weight Management",
              "Urinary Tract Issues",
            ]}
          />
          <DiseaseCard
            title="Male"
            items={[
              "General Weakness",
              "Digestive Disorders",
              "Vitality & Strength",
              "Stress & Insomnia",
              "Joint & Back Pain",
              "Diabetes",
              "Liver & Kidney Health",
              "IBS & Gastritis",
              "Urinary Tract Issues",
              "Weight Management",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function DiseaseCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      <h3 className="text-xl font-display font-bold text-primary mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-card-foreground">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
