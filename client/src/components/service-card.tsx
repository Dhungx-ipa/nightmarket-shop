import { Button } from "@/components/ui/button";
import { type Service } from "@shared/schema";
import { 
  SiApple, 
  SiNetflix, 
  SiDiscord, 
  SiYoutube, 
  SiSpotify 
} from "react-icons/si";

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {

  const handleContactDiscord = () => {
    window.open("https://discord.gg/juY9tw5AJY", "_blank");
  };

  const getBrandIcon = () => {
    const iconProps = { size: 32, className: "text-white" };
    
    switch (service.name) {
      case "Apple ID":
        return <SiApple {...iconProps} />;
      case "Netflix Premium":
        return <SiNetflix {...iconProps} />;
      case "Discord Nitro":
        return <SiDiscord {...iconProps} />;
      case "YouTube Premium":
        return <SiYoutube {...iconProps} />;
      case "Spotify Premium":
        return <SiSpotify {...iconProps} />;
      default:
        return <i className={`${service.iconClass} text-2xl text-white`}></i>;
    }
  };

  const getStatusBadge = () => {
    switch (service.status) {
      case "available":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            <i className="fas fa-circle text-green-400 mr-1 text-xs"></i>
            Còn hàng
          </span>
        );
      case "limited":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
            <i className="fas fa-circle text-yellow-400 mr-1 text-xs"></i>
            Sắp hết
          </span>
        );
      case "popular":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-night-accent/20 text-night-accent">
            <i className="fas fa-crown text-night-accent mr-1 text-xs"></i>
            Phổ biến nhất
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
            <i className="fas fa-circle text-red-400 mr-1 text-xs"></i>
            Hết hàng
          </span>
        );
    }
  };

  const cardClasses = "service-card rounded-2xl p-6 transition-all duration-300 hover:scale-105 animate-float";
  const buttonClasses = "w-full bg-gradient-to-r from-night-purple to-night-accent py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-night-purple/25 transition-all duration-300";

  return (
    <div className={cardClasses} style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center mb-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${service.iconBgGradient} rounded-xl flex items-center justify-center mr-4`}>
          {getBrandIcon()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-night-text">{service.name}</h3>
          {getStatusBadge()}
        </div>
      </div>
      
      <p className="text-night-muted mb-4">{service.description}</p>
      
      <div className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-night-muted">
            <i className="fas fa-check text-green-400 mr-2"></i>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      
      <Button 
        className={buttonClasses}
        onClick={handleContactDiscord}
      >
        <i className="fab fa-discord mr-2"></i>
        Liên hệ
      </Button>
    </div>
  );
}
