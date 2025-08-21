import { useQuery } from "@tanstack/react-query";
import { type Service } from "@shared/schema";
import ServiceCard from "./service-card";

export default function ServiceGrid() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-12 bg-night-darker/50 rounded-lg w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-night-darker/50 rounded-lg w-80 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="service-card rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-night-darker/50 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-400">Không thể tải dịch vụ. Vui lòng thử lại sau.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-night-text">
            Dịch vụ cho thuê{" "}
            <span className="bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
              premium
            </span>
          </h2>
          <p className="text-lg text-night-muted max-w-2xl mx-auto">
            Chọn từ các gói dịch vụ được tối ưu hóa với giá cả cạnh tranh và chất lượng đảm bảo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
