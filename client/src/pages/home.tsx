import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServiceGrid from "@/components/service-grid";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import AdBanner from "@/components/ad-banner";

export default function Home() {
  return (
    <div className="min-h-screen bg-night-dark text-night-text">
      <Navigation />
      <HeroSection />
      <AdBanner className="bg-night-darker border-b border-night-purple/10" />
      <ServiceGrid />
      <FeaturesSection />
      <AdBanner className="bg-night-darker border-t border-night-purple/10" />
      <Footer />
    </div>
  );
}
