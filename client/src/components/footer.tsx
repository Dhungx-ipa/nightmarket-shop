export default function Footer() {
  const services = [
    "Apple ID",
    "Netflix Premium",
    "Discord Nitro",
    "YouTube Premium",
    "Spotify Premium"
  ];

  const support = [
    "Hướng dẫn sử dụng",
    "Câu hỏi thường gặp",
    "Chính sách bảo hành",
    "Liên hệ hỗ trợ"
  ];

  const info = [
    "Về chúng tôi",
    "Điều khoản dịch vụ",
    "Chính sách bảo mật",
    "Chương trình đối tác"
  ];

  return (
    <footer id="contact" className="bg-night-darker py-12 px-4 border-t border-night-purple/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" fill="white"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
                Nightmarket
              </span>
            </div>
            <p className="text-night-muted mb-4">
              Nền tảng cho thuê dịch vụ số premium hàng đầu Việt Nam với giá cả cạnh tranh nhất.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-night-muted hover:text-night-purple transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-night-muted hover:text-night-purple transition-colors">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" className="text-night-muted hover:text-night-purple transition-colors">
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-night-text">Dịch vụ</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-night-muted hover:text-night-purple transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-night-text">Hỗ trợ</h3>
            <ul className="space-y-2">
              {support.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-night-muted hover:text-night-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-night-text">Thông tin</h3>
            <ul className="space-y-2">
              {info.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-night-muted hover:text-night-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-night-purple/20 pt-8 text-center">
          <p className="text-night-muted">
            © 2024 Nightmarket. Tất cả quyền được bảo lưu. Made with ❤️ in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
}
