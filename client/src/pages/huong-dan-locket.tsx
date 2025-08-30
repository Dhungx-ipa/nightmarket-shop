import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AdBanner from "@/components/ad-banner";
import { AlertTriangle, Play, Download, Settings, Shield, Image } from "lucide-react";

export default function HuongDanLocket() {
  return (
    <div className="min-h-screen bg-night-dark text-night-text">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-night-cyan mb-4">
              Hướng Dẫn Locket - Quay 15s
            </h1>
            <p className="text-xl text-night-text/80">
              Hướng dẫn chi tiết cách sử dụng VPN để trải nghiệm Locket Gold
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-orange-500 w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-orange-500 font-semibold text-lg mb-2">
                  Lưu ý quan trọng
                </h3>
                <p className="text-night-text/90 mb-2">
                  <strong>HÃY MỞ WEB TRÊN TRÌNH DUYỆT ĐỪNG MỞ TRÊN TIKTOK TRÁNH BỊ LỖI</strong>
                </p>
                <p className="text-night-text/90">
                  Hãy xem cách lên locket gold trước rồi mới làm cái này nha
                </p>
              </div>
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-night-cyan mb-6 flex items-center">
              <Play className="w-6 h-6 mr-2" />
              Video Hướng Dẫn
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/0-xHSZ3DywY"
                    title="Hướng dẫn Locket - Video 1"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="video-tutorial-1"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-night-text">Hướng dẫn up Locket Gold</h3>
                </div>
              </div>

              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/WtvEfzTi1xc"
                    title="Hướng dẫn Locket - Video 2"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="video-tutorial-2"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-night-text">Hướng dẫn up Locket Gold + Quay 15s</h3>
                </div>
              </div>
            </div>
          </div>

          <AdBanner className="my-8 bg-night-darker border-y border-night-purple/10" />

          {/* Visual Guide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-night-cyan mb-6 flex items-center">
              <Image className="w-6 h-6 mr-2" />
              Hướng Dẫn Bằng Hình Ảnh
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Guide 1 */}
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/IMG_3061_1756539902933.png" 
                    alt="Giao diện chính Shadowrocket" 
                    className="w-full h-auto object-contain bg-gray-100"
                    data-testid="img-shadowrocket-main"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-night-magenta mb-2">Giao diện Shadowrocket</h4>
                  <p className="text-night-text/80 text-sm">
                    Sau khi cài Shadowrocket, bạn sẽ thấy giao diện như này. Có thể thấy VPN server "Locket V6" đã được thêm vào.
                  </p>
                </div>
              </div>

              {/* Image Guide 2 */}
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/IMG_3062_1756539902933.png" 
                    alt="Chọn kiểu kết nối" 
                    className="w-full h-auto object-contain bg-gray-100"
                    data-testid="img-connection-type"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-night-magenta mb-2">Chọn Kiểu Kết Nối</h4>
                  <p className="text-night-text/80 text-sm">
                    Nhấn vào "Kiểu kết nối" (được khoanh đỏ) để cấu hình loại kết nối VPN.
                  </p>
                </div>
              </div>

              {/* Image Guide 3 */}
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/IMG_3064_1756539902933.png" 
                    alt="Chọn Proxy" 
                    className="w-full h-auto object-contain bg-gray-100"
                    data-testid="img-proxy-setting"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-night-magenta mb-2">Cài Đặt Proxy</h4>
                  <p className="text-night-text/80 text-sm">
                    Chọn "Proxy" (được khoanh đỏ) để đảm bảo kết nối hoạt động tốt với Locket.
                  </p>
                </div>
              </div>

              {/* Image Guide 4 */}
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/IMG_3065_1756539902933.png" 
                    alt="Xóa ứng dụng Locket" 
                    className="w-full h-auto object-contain bg-gray-100"
                    data-testid="img-delete-locket"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-night-magenta mb-2">Xóa App Locket Cũ</h4>
                  <p className="text-night-text/80 text-sm">
                    Nhấn giữ app Locket và chọn "Xóa ứng dụng" để gỡ phiên bản cũ trước khi bật VPN.
                  </p>
                </div>
              </div>

              {/* Image Guide 5 */}
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/IMG_3067_1756539902933.png" 
                    alt="Locket trong App Store" 
                    className="w-full h-auto object-contain bg-gray-100"
                    data-testid="img-locket-appstore"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-night-magenta mb-2">Cài Lại Locket</h4>
                  <p className="text-night-text/80 text-sm">
                    Sau khi bật VPN, vào App Store để tải lại Locket. Đảm bảo VPN đã được kết nối trước khi tải.
                  </p>
                </div>
              </div>

              {/* Image Guide 6 */}
              <div className="bg-night-darker border border-night-purple/20 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/IMG_3068_1756539902933.png" 
                    alt="VPN đã kết nối" 
                    className="w-full h-auto object-contain bg-gray-100"
                    data-testid="img-vpn-connected"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-night-magenta mb-2">VPN Đã Kết Nối</h4>
                  <p className="text-night-text/80 text-sm">
                    Khi thành công, bạn sẽ thấy chữ "VPN" trên thanh trạng thái và server đã được bật (nút màu tím).
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Steps Summary */}
            <div className="bg-gradient-to-r from-night-cyan/10 to-night-magenta/10 border border-night-cyan/20 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-night-cyan mb-4">📋 Tóm Tắt Các Bước</h3>
              <div className="grid md:grid-cols-2 gap-4 text-night-text/90 text-sm">
                <div className="space-y-2">
                  <p><span className="text-night-cyan font-medium">1.</span> Mở Shadowrocket và add server VPN</p>
                  <p><span className="text-night-cyan font-medium">2.</span> Vào Kiểu kết nối → chọn Proxy</p>
                  <p><span className="text-night-cyan font-medium">3.</span> Xóa app Locket cũ khỏi điện thoại</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-night-magenta font-medium">4.</span> Bật VPN trong Shadowrocket</p>
                  <p><span className="text-night-magenta font-medium">5.</span> Tải lại Locket từ App Store</p>
                  <p><span className="text-night-magenta font-medium">6.</span> Mở Locket và thưởng thức tính năng!</p>
                </div>
              </div>
            </div>
          </div>

          <AdBanner className="my-8 bg-night-darker border-y border-night-purple/10" />

          {/* Discord Services */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-night-cyan mb-4 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Dịch Vụ VPN & Apple ID
            </h2>
            <div className="bg-night-darker/50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-night-magenta mb-3">📞 Liên Hệ Thuê Dịch Vụ</h3>
              <p className="text-night-text/90 mb-3">
                <strong>VPN</strong> và <strong>Apple ID</strong> cần thuê tại Discord:
              </p>
              <a 
                href="https://discord.gg/3ef5D95sRP" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-colors font-medium"
                data-testid="discord-link"
              >
                🔗 Discord Server: https://discord.gg/3ef5D95sRP
              </a>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="bg-night-darker border border-night-purple/20 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-night-cyan mb-4 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Yêu Cầu Trước Khi Bắt Đầu
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-night-cyan rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-night-text/90">
                  <strong>Cần xoá locket đi và cài lại</strong> (trước khi bật VPN)
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-night-cyan rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-night-text/90">
                  Cần phải có app <strong>Shadowrocket</strong> trước
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-night-cyan rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-night-text/90">
                  <strong>Apple ID có Shadowrocket:</strong> Thuê tại Discord server bên trên
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-night-cyan rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-night-text/90">
                  <strong>VPN Premium:</strong> Thuê tại Discord server để có kết nối ổn định
                </p>
              </div>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-night-cyan mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Hướng Dẫn Chi Tiết
            </h2>

            {/* Step 1 */}
            <div className="bg-night-darker border border-night-purple/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-night-magenta mb-4">
                Bước 1: Thuê VPN Premium
              </h3>
              <div className="space-y-4">
                <p className="text-night-text/90">
                  Liên hệ thuê VPN tại Discord server: <a href="https://discord.gg/3ef5D95sRP" target="_blank" rel="noopener noreferrer" className="text-night-cyan hover:text-night-magenta transition-colors underline">https://discord.gg/3ef5D95sRP</a>
                </p>
                <p className="text-night-text/90">
                  VPN Premium sẽ có <strong>độ ổn định cao</strong> và <strong>tốc độ nhanh</strong> hơn VPN free
                </p>
                <p className="text-night-text/90">
                  Sau khi thuê VPN, bạn sẽ nhận được <strong>thông tin cấu hình VPN</strong> để add vào Shadowrocket
                </p>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3 mt-3">
                  <p className="text-orange-500 font-medium">💡 Lưu ý:</p>
                  <p className="text-night-text/90 text-sm mt-1">
                    VPN premium đảm bảo kết nối ổn định và ít bị gián đoạn hơn so với VPN miễn phí
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-night-darker border border-night-purple/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-night-magenta mb-4">
                Bước 2: Nhận Thông Tin VPN
              </h3>
              <div className="space-y-4">
                <p className="text-night-text/90">
                  Sau khi thuê VPN từ Discord, bạn sẽ nhận được <strong>link cấu hình VPN</strong>
                </p>
                <p className="text-night-text/90">
                  <strong>Copy link cấu hình</strong> này để thêm vào Shadowrocket
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-night-darker border border-night-purple/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-night-magenta mb-4">
                Bước 3: Cấu Hình Shadowrocket
              </h3>
              <div className="space-y-4">
                <p className="text-night-text/90">
                  Vô Shadowrocket chọn <strong>'Cho phép dán'</strong> và ấn <strong>'Thêm'</strong>
                </p>
                <p className="text-night-text/90">
                  Chọn vô vpn vừa mới add và <strong>bật VPN</strong>
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-night-darker border border-night-purple/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-night-magenta mb-4">
                Bước 4: Cài Đặt Locket
              </h3>
              <div className="space-y-4">
                <p className="text-night-text/90">
                  Sau đó hãy <strong>xoá Locket đi và tải lại Locket</strong> (không được vô app trước khi bật VPN)
                </p>
                <p className="text-night-text/90">
                  <strong>Bật VPN lên và vô app Locket</strong>
                </p>
                <p className="text-night-text/90">
                  Link cài locket phiên bản 2.8.0: Liên hệ Discord để lấy link
                </p>
              </div>
            </div>
          </div>

          <AdBanner className="my-8 bg-night-darker border-y border-night-purple/10" />

          {/* Tips */}
          <div className="bg-gradient-to-r from-night-purple/10 to-night-cyan/10 border border-night-purple/20 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold text-night-cyan mb-4">
              💡 Mẹo Sử Dụng
            </h3>
            <div className="space-y-2 text-night-text/90">
              <p>• Luôn bật VPN trước khi mở app Locket</p>
              <p>• Nếu không hoạt động, thử đổi server VPN khác</p>
              <p>• Đảm bảo kết nối internet ổn định</p>
              <p>• Nếu gặp lỗi, hãy xóa và cài lại app</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}