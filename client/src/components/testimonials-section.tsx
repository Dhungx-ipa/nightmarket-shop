export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Khách hàng VIP",
      content: "Dịch vụ tuyệt vời, giá cả phải chăng và hỗ trợ khách hàng rất tận tình. Đã sử dụng hơn 6 tháng và rất hài lòng.",
      gradient: "from-night-purple to-night-accent"
    },
    {
      name: "Trần Thị B",
      role: "Khách hàng thường",
      content: "Giao hàng nhanh, tài khoản ổn định. Combo VIP thực sự tiết kiệm được nhiều tiền so với mua lẻ.",
      gradient: "from-night-blue to-night-purple"
    },
    {
      name: "Lê Văn C",
      role: "Khách hàng mới",
      content: "Lần đầu sử dụng dịch vụ này và rất ấn tượng. Quy trình đơn giản, tài khoản chất lượng cao.",
      gradient: "from-night-accent to-night-blue"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-night-text">
            Khách hàng nói gì về{" "}
            <span className="bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
              chúng tôi
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="service-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full mr-3`}></div>
                <div>
                  <h4 className="font-semibold text-night-text">{testimonial.name}</h4>
                  <p className="text-sm text-night-muted">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-night-muted">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
