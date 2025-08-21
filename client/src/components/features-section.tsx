export default function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-shield-alt",
      title: "Bảo mật tuyệt đối",
      description: "Thông tin khách hàng được mã hóa và bảo vệ với công nghệ hàng đầu",
      gradient: "from-night-purple to-night-accent"
    },
    {
      icon: "fas fa-clock",
      title: "Giao hàng tức thì",
      description: "Nhận thông tin tài khoản ngay sau khi thanh toán thành công",
      gradient: "from-night-blue to-night-purple"
    },
    {
      icon: "fas fa-headset",
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giải đáp mọi thắc mắc",
      gradient: "from-night-accent to-night-blue"
    }
  ];

  return (
    <section id="features" className="py-16 px-4 bg-night-darker/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-night-text">
            Tại sao chọn{" "}
            <span className="bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
              Nightmarket?
            </span>
          </h2>
          <p className="text-lg text-night-muted max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm tốt nhất với dịch vụ chuyên nghiệp và đáng tin cậy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <i className={`${feature.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-night-text">{feature.title}</h3>
              <p className="text-night-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
