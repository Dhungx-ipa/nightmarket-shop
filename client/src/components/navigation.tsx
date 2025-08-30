import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Settings, Key, Film, ExternalLink } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
            <Link href="/" className="flex items-center space-x-2 text-night-accent font-semibold" data-testid="nav-home">
              <Home className="h-4 w-4" />
              <span>Trang chủ</span>
            </Link>
            <Link href="/modules" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-modules">
              <Settings className="h-4 w-4" />
              <span>Modules</span>
            </Link>
            <Link href="/idfree" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-idfree">
              <Key className="h-4 w-4" />
              <span>ID Free</span>
            </Link>
            <a href="https://pxd.nightmarket.site" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-pxd">
              <Film className="h-4 w-4" />
              <span>PhimXuyenDem</span>
            </a>
            <a href="https://sidestore.io/#get-started" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors" data-testid="nav-sidestore">
              <ExternalLink className="h-4 w-4" />
              <span>SideStore</span>
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/" className="text-night-accent" data-testid="nav-home-mobile">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/modules" className="text-gray-300 hover:text-white transition-colors" data-testid="nav-modules-mobile">
              <Settings className="h-5 w-5" />
            </Link>
            <Link href="/idfree" className="text-gray-300 hover:text-white transition-colors" data-testid="nav-idfree-mobile">
              <Key className="h-5 w-5" />
            </Link>
            <a href="https://pxd.nightmarket.site" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" data-testid="nav-pxd-mobile">
              <Film className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
