import { useState, useEffect } from "react";
import { X, Gamepad2, ArrowRight, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function RentalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleVisitNow = () => {
    window.open("https://dvgame.net/join/333", "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-md bg-gradient-to-br from-night-darker to-night-dark border-night-purple/30 text-night-text"
        data-testid="dialog-rental-popup"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          data-testid="button-close-popup"
        >
          <X className="h-4 w-4 text-night-muted hover:text-night-text" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-night-purple to-night-accent rounded-full flex items-center justify-center animate-glow mb-2">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
            Thuê ID Apple Có Game
          </DialogTitle>
          
          <DialogDescription className="text-night-text space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-night-accent" />
              <span className="font-semibold">Chỉ thuê ID Apple có game</span>
            </div>
            <p className="text-night-muted">
              Uy tín - Giá tốt - Hỗ trợ 24/7
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="bg-night-purple/10 border border-night-purple/20 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-3">
            <Gift className="w-5 h-5 text-night-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-night-text mb-1">Ưu đãi đặc biệt</h4>
              <p className="text-sm text-night-muted">
                Nhận ngay giá ưu đãi khi thuê ID Apple có game qua link của chúng tôi
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 border-night-purple/30 text-night-text hover:bg-night-purple/10"
            data-testid="button-maybe-later"
          >
            Để sau
          </Button>
          
          <Button
            onClick={handleVisitNow}
            className="flex-1 bg-gradient-to-r from-night-purple to-night-accent hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-night-purple/50 transition-all"
            data-testid="button-visit-now"
          >
            Thuê ngay
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <p className="text-xs text-center text-night-muted mt-2">
          Đa dạng games cho mọi người chọn
        </p>
      </DialogContent>
    </Dialog>
  );
}
