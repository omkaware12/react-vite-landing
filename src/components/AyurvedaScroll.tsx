export default function AyurvedaScroll() {
  return (
    <section className="py-20 bg-ayurveda-parchment relative overflow-hidden">
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-ayurveda-brown mb-2">
          Ayurved <span className="text-secondary">take On Infertility</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
          A holistic approach that treats the root cause to restore reproductive
          health and ensure a Natural Parenthood journey.
        </p>

        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollBlock
            sanskrit={`"गर्भः संभवे समयः ऋतुकालोपपादितः।\nक्षेत्रं बीजं च अम्बुं च सहजं च परिश्रयः॥"`}
            translation="A healthy pregnancy occurs when the proper timing (Ritu), a healthy uterus (Kshetra), pure sperm/ovum (Beeja), adequate nourishment (Ambu), and natural emotional connection (Parishraya) are all present in harmony."
          />
          <ScrollBlock
            sanskrit={`"ऋतुकालानुकूलं हि बीजं शुभ्रं यदा भवेत्।\nतदा एव प्रजाजननं, नान्यथा कदाचन॥"`}
            translation="Only when healthy seed (sperm/ovum) is united during the proper fertile period (Ritu Kala), conception becomes successful. Otherwise, it does not occur."
          />
        </div>
      </div>
    </section>
  );
}

function ScrollBlock({ sanskrit, translation }: { sanskrit: string; translation: string }) {
  return (
    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-ayurveda-gold/30 shadow-sm">
      <p className="text-lg md:text-xl font-display text-ayurveda-brown leading-relaxed whitespace-pre-line mb-4 text-center italic">
        {sanskrit}
      </p>
      <div className="w-16 h-px bg-ayurveda-gold mx-auto mb-4" />
      <p className="text-muted-foreground text-center leading-relaxed">
        <span className="font-semibold text-secondary">Translation –</span>
        <br />
        {translation}
      </p>
    </div>
  );
}
