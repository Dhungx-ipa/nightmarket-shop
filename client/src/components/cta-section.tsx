import { Button } from "@/components/ui/button";

export default function CTASection() {
  const handleGetStarted = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSupport = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 hero-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-night-text">
          Sẵn sàng trải nghiệm{" "}
          <span className="bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
            dịch vụ premium?
          </span>
        </h2>
        <p className="text-xl text-night-muted mb-8">
          Tham gia cùng hàng nghìn khách hàng đã tin tưởng lựa chọn Nightmarket
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gradient-to-r from-night-purple to-night-accent px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-night-purple/30 transition-all duration-300"
            onClick={handleGetStarted}
          >
            <i className="fas fa-rocket mr-2"></i>
            Bắt đầu ngay
          </Button>
          <Button 
            variant="outline"
            className="border border-night-purple/50 px-8 py-4 rounded-xl text-night-text font-semibold text-lg hover:bg-night-purple/10 transition-all duration-300"
            onClick={handleContactSupport}
          >
            <i className="fas fa-comments mr-2"></i>
            Tư vấn miễn phí
          </Button>
        </div>
      </div>
    </section>
  );
}
