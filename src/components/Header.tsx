import React, { useState, useEffect } from 'react';
import { Search, Heart, User, Menu, X, Car, Sparkles, ChevronRight, Phone } from 'lucide-react';
import { Vehicle } from '../data/vinfastData';

interface HeaderProps {
  favoritesCount: number;
  onOpenGarage: () => void;
  onOpenTestDrive: (vehicle?: Vehicle) => void;
  onOpenAdvisor: () => void;
  onOpenSearch: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  onOpenGarage,
  onOpenTestDrive,
  onOpenAdvisor,
  onOpenSearch,
  onToggleAdmin,
  isAdminOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'TRANG CHỦ', href: '#hero' },
    { label: 'DÒNG XE', href: '#vehicles' },
    { label: 'CẤU HÌNH', href: '#configurator' },
    { label: 'SO SÁNH', href: '#comparison' },
    { label: 'TRẢ GÓP', href: '#loan-calculator' },
    { label: 'CHI PHÍ', href: '#cost-calculator' },
    { label: 'TRẠM SẠC', href: '#route-planner' },
    { label: 'ƯU ĐÃI', href: '#promotions' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090C]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#07090C]/80 via-[#07090C]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark & Official Stylized Emblem */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087EBD]">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#171F29] to-[#0D1117] border border-white/15 group-hover:border-[#087EBD]/60 transition-colors">
              {/* VinFast Signature V-Wing Icon in Silver */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#E8EBEF] group-hover:text-white transition-colors" aria-hidden="true">
                <path d="M12 21.5L2 6.5h4.2l5.8 9.3 5.8-9.3H22L12 21.5z" opacity="0.95" />
                <path d="M12 17.5L5.5 7.5h2.8l3.7 6.1 3.7-6.1h2.8L12 17.5z" fill="#087EBD" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-[0.2em] text-[#F5F7FA] uppercase">
                VINFAST
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#9DA7B3] -mt-1 uppercase">
                Electric Luxury
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Text Links with Hover Accents) */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-wider text-[#C7CDD4] hover:text-white transition-colors relative py-1 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#087EBD] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Utility Affordances */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Tìm kiếm nhanh dòng xe"
              className="p-2 text-[#9DA7B3] hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Garage / Favorites Indicator */}
            <button
              onClick={onOpenGarage}
              aria-label={`Garage của tôi (${favoritesCount} xe)`}
              className="relative p-2 text-[#9DA7B3] hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-colors group"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-[#087EBD] fill-[#087EBD]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#087EBD] rounded-full border border-[#07090C]">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* AI Advisor Quick Button */}
            <button
              onClick={onOpenAdvisor}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#C7CDD4] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 hover:border-[#087EBD]/50 rounded-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#087EBD]" />
              <span className="whitespace-nowrap">Trợ Lý AI</span>
            </button>

            {/* Admin Toggle Button */}
            <button
              onClick={onToggleAdmin}
              aria-label="Cổng Quản Trị Showroom"
              title="Cổng Quản Trị Leads & Thống Kê"
              className={`p-2 rounded-lg border transition-colors ${
                isAdminOpen
                  ? 'bg-[#087EBD]/20 text-[#087EBD] border-[#087EBD]/50'
                  : 'text-[#9DA7B3] hover:text-white hover:bg-white/5 border-transparent hover:border-white/10'
              }`}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Secondary CTA: Tìm Xe Phù Hợp */}
            <a
              href="#car-finder"
              className="hidden md:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#F5F7FA] bg-[#111720] hover:bg-[#171F29] border border-white/15 hover:border-white/30 rounded-lg transition-colors whitespace-nowrap"
            >
              TÌM XE PHÙ HỢP
            </a>

            {/* Primary CTA: Đăng Ký Lái Thử */}
            <button
              onClick={() => onOpenTestDrive()}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] shadow-lg shadow-[#087EBD]/25 rounded-lg transition-all active:scale-[0.98] whitespace-nowrap"
            >
              ĐĂNG KÝ LÁI THỬ
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở thực đơn di động"
              className="xl:hidden p-2 text-[#9DA7B3] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-full bg-[#07090C]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold tracking-wider text-[#C7CDD4] hover:text-white py-2 border-b border-white/5"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#9DA7B3]" />
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvisor();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-[#F5F7FA] bg-[#111720] border border-white/15 rounded-lg"
              >
                <Sparkles className="w-4 h-4 text-[#087EBD]" />
                TRỢ LÝ XE THÔNG MINH AI
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTestDrive();
                }}
                className="w-full py-3 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-lg shadow-md"
              >
                ĐĂNG KÝ LÁI THỬ NGAY
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
