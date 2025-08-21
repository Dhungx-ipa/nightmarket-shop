import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServiceGrid from "@/components/service-grid";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-night-dark text-night-text">
      <Navigation />
      <HeroSection />
      <ServiceGrid />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
