import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 hero-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-night-purple via-night-accent to-night-blue bg-clip-text text-transparent">
              Cho thuê dịch vụ số
            </span>
            <br />
            <span className="text-night-text">premium giá tốt</span>
          </h1>
          <p className="text-xl text-night-muted mb-8 max-w-3xl mx-auto">
            Truy cập các dịch vụ premium như Netflix, Spotify, YouTube Premium với chi phí thấp nhất thị trường. 
            Đáng tin cậy, an toàn và hỗ trợ 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-gradient-to-r from-night-purple to-night-accent px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-night-purple/30 transition-all duration-300 animate-glow">
              <i className="fas fa-rocket mr-2"></i>
              Khám phá ngay
            </Button>
            <Button variant="outline" className="border border-night-purple/50 px-8 py-4 rounded-xl text-night-text font-semibold text-lg hover:bg-night-purple/10 transition-all duration-300">
              <i className="fas fa-phone mr-2"></i>
              Tư vấn miễn phí
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-night-purple mb-2">5000+</div>
            <div className="text-night-muted">Khách hàng tin tưởng</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-night-accent mb-2">5</div>
            <div className="text-night-muted">Dịch vụ premium</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-night-blue mb-2">99.9%</div>
            <div className="text-night-muted">Thời gian hoạt động</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-night-purple mb-2">24/7</div>
            <div className="text-night-muted">Hỗ trợ khách hàng</div>
          </div>
        </div>
      </div>
    </section>
  );
}
