import { useState, useEffect } from "react";
import { X, Gamepad2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RentalNotificationBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("rental-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("rental-banner-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-night-purple/20 via-night-blue/20 to-night-accent/20 border-t border-night-purple/30 backdrop-blur-sm">
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-night-purple to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-night-purple to-night-accent rounded-lg flex items-center justify-center animate-glow">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Sparkles className="w-4 h-4 text-night-accent flex-shrink-0" />
                <p className="text-night-text font-medium text-sm md:text-base">
                  <span className="text-night-accent font-bold">Thuê ID Game</span> - 
                  Muốn thuê ID Apple có game?
                </p>
              </div>
              <p className="text-night-muted text-xs md:text-sm mt-0.5">
                Chỉ thuê ID Apple có game - Uy tín, giá tốt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-night-purple to-night-accent hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-night-purple/50 transition-all"
              data-testid="button-rental-link"
            >
              <a 
                href="https://dvgame.net/join/333" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                Thuê ngay
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleDismiss}
              className="h-8 w-8 text-night-muted hover:text-night-text"
              data-testid="button-dismiss-banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
