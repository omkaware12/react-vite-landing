import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import DiseaseCarousel from "@/components/DiseaseCarousel";
import Diseases from "@/components/Diseases";
import AyurvedaScroll from "@/components/AyurvedaScroll";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ExpertiseSection />
      <DiseaseCarousel />
      <Diseases />
      <AyurvedaScroll />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
