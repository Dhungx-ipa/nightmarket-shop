import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ExternalLink, Loader2, Home, Settings, Key, Film } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Module } from "@shared/schema";
import AdBanner from "@/components/ad-banner";

export default function ModulesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: modules = [], isLoading, error } = useQuery<Module[]>({
    queryKey: ['/api/modules'],
  });

  const copyToClipboard = async (text: string, moduleId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(moduleId);
      toast({
        title: "Đã sao chép!",
        description: "Link module đã được sao chép vào clipboard",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép link",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'updated': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Mới';
      case 'updated': return 'Cập nhật';
      default: return 'Hoạt động';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 flex items-center justify-center">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            <p className="text-white text-lg font-medium">Đang tải modules...</p>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">Không thể tải modules</p>
          <p className="text-gray-400">Vui lòng thử lại sau</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Navigation Bar */}
      <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" fill="white"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-night-purple to-night-accent bg-clip-text text-transparent">
                Nightmarket
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-home">
                <Home className="h-4 w-4" />
                <span>Trang chủ</span>
              </Link>
              <Link href="/modules" className="flex items-center space-x-2 text-night-accent font-semibold" data-testid="nav-modules">
                <Settings className="h-4 w-4" />
                <span>Modules</span>
              </Link>
              <Link href="/idfree" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-idfree">
                <Key className="h-4 w-4" />
                <span>ID Free</span>
              </Link>
              <a href="https://pxd.onrender.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-pxd">
                <Film className="h-4 w-4" />
                <span>PXD</span>
              </a>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors" data-testid="nav-home-mobile">
                <Home className="h-5 w-5" />
              </Link>
              <Link href="/modules" className="text-night-accent" data-testid="nav-modules-mobile">
                <Settings className="h-5 w-5" />
              </Link>
              <Link href="/idfree" className="text-gray-300 hover:text-white transition-colors" data-testid="nav-idfree-mobile">
                <Key className="h-5 w-5" />
              </Link>
              <a href="https://pxd.onrender.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" data-testid="nav-pxd-mobile">
                <Film className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center shadow-lg mr-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" fill="white"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Nightmarket Modules</h1>
              <p className="text-gray-300">Bộ sưu tập modules cao cấp cho các ứng dụng VPN</p>
            </div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-yellow-200 mb-8">
            <p className="flex items-center justify-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Nhấn vào link để tự động mở trong ứng dụng VPN tương ứng
            </p>
          </div>
        </div>

        <AdBanner className="bg-gradient-to-br from-gray-900/50 via-purple-900/30 to-blue-900/50 backdrop-blur-sm border-t border-b border-white/10" />

        {modules.length === 0 ? (
          <div className="text-center">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-12 shadow-2xl max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-night-purple to-night-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fas fa-puzzle-piece text-white text-3xl"></i>
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">Chưa có modules nào</h3>
              <p className="text-gray-400 text-lg">Admin có thể thêm modules từ trang quản trị</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <Card key={module.id} className="bg-black/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25" data-testid={`card-module-${module.id}`}>
                <CardHeader className="pb-4 relative overflow-hidden">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-night-purple/50 transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" fill="white"/>
                        </svg>
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg font-bold mb-2 group-hover:text-night-accent transition-colors duration-300" data-testid={`text-module-name-${module.id}`}>
                          {module.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-night-purple/20 to-night-accent/20 text-night-accent border border-night-purple/30" data-testid={`text-module-category-${module.id}`}>
                          {module.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge 
                      className={`${getStatusColor(module.status)} text-white shadow-lg`}
                      data-testid={`badge-module-status-${module.id}`}
                    >
                      {getStatusText(module.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative">
                  <CardDescription className="text-gray-300 mb-6 min-h-[3rem] leading-relaxed" data-testid={`text-module-description-${module.id}`}>
                    {module.description}
                  </CardDescription>
                  
                  <div className="flex flex-col space-y-3">
                    <Button
                      onClick={() => window.open(module.link, '_blank')}
                      className="w-full bg-gradient-to-r from-night-purple to-night-accent hover:from-night-purple/80 hover:to-night-accent/80 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-night-purple/50 transition-all duration-300 transform hover:scale-105"
                      data-testid={`button-install-${module.id}`}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Cài đặt Module
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(module.link, module.id)}
                      className="w-full border border-night-purple/30 text-night-accent hover:bg-night-purple/10 hover:border-night-accent/50 py-3 rounded-xl transition-all duration-300"
                      data-testid={`button-copy-${module.id}`}
                    >
                      {copiedId === module.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-400" />
                          <span className="text-green-400">Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Sao chép Link
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AdBanner className="mt-12 bg-gradient-to-br from-gray-900/50 via-purple-900/30 to-blue-900/50 backdrop-blur-sm border-t border-b border-white/10" />

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <i className="fas fa-info-circle text-white text-2xl"></i>
            </div>
            <h3 className="text-white font-bold text-xl mb-6">Hướng dẫn sử dụng</h3>
            <div className="text-gray-300 space-y-4">
              <div className="flex items-start space-x-3 text-left">
                <div className="w-6 h-6 bg-night-purple rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p>Đảm bảo đã cài đặt ứng dụng VPN tương ứng (ShadowRocket, Quantumult X, Surge...)</p>
              </div>
              <div className="flex items-start space-x-3 text-left">
                <div className="w-6 h-6 bg-night-purple rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p>Nhấn nút "Cài đặt Module" để tự động import</p>
              </div>
              <div className="flex items-start space-x-3 text-left">
                <div className="w-6 h-6 bg-night-purple rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p>Hoặc sao chép link và paste vào ứng dụng VPN</p>
              </div>
              <div className="flex items-start space-x-3 text-left">
                <div className="w-6 h-6 bg-night-purple rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <p>Kích hoạt module trong phần Cấu hình của ứng dụng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}