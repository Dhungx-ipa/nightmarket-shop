import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const hasInstalled = localStorage.getItem("pwa-installed") === "true";
    const hasDismissed = localStorage.getItem("pwa-prompt-dismissed") === "true";
    
    if (hasInstalled || hasDismissed) {
      return;
    }

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    if (isStandalone) {
      localStorage.setItem("pwa-installed", "true");
      setShowPrompt(false);
    }

    setTimeout(() => {
      if (!isStandalone && !hasDismissed && !hasInstalled) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      localStorage.setItem("pwa-installed", "true");
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-prompt-dismissed", "true");
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-gradient-to-br from-night-purple to-night-accent p-4 rounded-xl shadow-2xl border border-white/20">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Download className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base" data-testid="text-install-title">
                Cài đặt Nightmarket
              </h3>
              <p className="text-white/80 text-sm" data-testid="text-install-description">
                Thêm vào màn hình chính
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8 text-white hover:bg-white/20 no-default-hover-elevate"
            data-testid="button-dismiss-install"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-white/90 text-sm mb-4" data-testid="text-install-benefits">
          Truy cập nhanh hơn, hoạt động offline và trải nghiệm như ứng dụng gốc
        </p>
        {isIOS ? (
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 text-white/90 text-sm">
              <p className="font-semibold mb-2 flex items-center">
                <Share className="h-4 w-4 mr-2" />
                Hướng dẫn cài đặt trên iOS:
              </p>
              <ol className="space-y-1 ml-1 text-xs">
                <li>1. Nhấn nút <strong>Chia sẻ</strong> (Share) ở thanh công cụ</li>
                <li>2. Cuộn xuống và chọn <strong>"Thêm vào Màn hình chính"</strong></li>
                <li>3. Nhấn <strong>Thêm</strong> để hoàn tất</li>
              </ol>
            </div>
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="w-full border-white/30 text-white hover:bg-white/10"
              data-testid="button-got-it"
            >
              Đã hiểu
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-white text-night-purple font-semibold hover:bg-white/90"
              data-testid="button-install-pwa"
            >
              <Download className="h-4 w-4 mr-2" />
              Cài đặt ngay
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="border-white/30 text-white hover:bg-white/10"
              data-testid="button-maybe-later"
            >
              Để sau
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
