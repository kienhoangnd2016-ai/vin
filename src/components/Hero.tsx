import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreVehicles: () => void;
  onOpenCarFinder: () => void;
  onOpenTestDrive: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreVehicles,
  onOpenCarFinder,
  onOpenTestDrive,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#07090C] pt-20 pb-12"
      aria-label="Khu vực giới thiệu chính"
    >
      {/* Background Lighting & Atmospheric Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle top-down studio ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#087EBD]/15 rounded-full blur-[140px] opacity-70" />
        {/* Deep blue floor reflection glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-48 bg-gradient-to-t from-[#063B5C]/25 via-transparent to-transparent" />
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Editorial Typography & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            {/* Kicker with clean typographic separator */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-[0.2em] text-[#087EBD] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#087EBD] animate-pulse" />
              <span>KHÁM PHÁ THẾ HỆ XE ĐIỆN MỚI</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F7FA] leading-[1.08] mb-6">
              ĐIỆN HÓA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8EBEF] to-[#087EBD]">
                PHONG CÁCH SỐNG
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#9DA7B3] leading-relaxed max-w-lg mb-8 font-normal">
              Trải nghiệm chuẩn mực di chuyển tương lai cùng hệ sinh thái xe điện VinFast: công nghệ thông minh, vận hành tĩnh lặng và chi phí vượt trội.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8">
              <button
                onClick={onExploreVehicles}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] shadow-lg shadow-[#087EBD]/25 rounded-lg transition-all active:scale-[0.98] group whitespace-nowrap"
              >
                <span>KHÁM PHÁ DÒNG XE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCarFinder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider text-[#F5F7FA] bg-[#111720] hover:bg-[#171F29] border border-white/15 hover:border-white/30 rounded-lg transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <span>TÌM XE PHÙ HỢP</span>
              </button>
            </div>

            {/* Trust Quote / Model Highlight */}
            <div className="flex items-center gap-3 text-xs text-[#9DA7B3] border-t border-white/10 pt-4">
              <span className="font-semibold text-white">Mẫu xe tiêu điểm:</span>
              <span>VinFast VF 7 Plus AWD</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-[#087EBD] font-medium">Phi thuyền công nghệ</span>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Vehicle Render & Atmospheric Frame */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
            
            {/* Ambient Backlight Rim Effect */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-[#0D1117] shadow-2xl group">
              <img
                src="/src/assets/images/vinfast_vf7_hero_1790823902996.jpg"
                alt="VinFast VF 7 Electric Luxury SUV in dark studio lighting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Contrast Scrim at bottom to ensure spec legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-[#07090C]/20 to-transparent" />

              {/* Tag in corner */}
              <div className="absolute top-4 right-4 bg-[#07090C]/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[11px] font-semibold text-[#C7CDD4] tracking-wider uppercase">
                STUDIO SHOWROOM
              </div>

              {/* Overlay Interactive Button */}
              <div className="absolute bottom-4 right-4 hidden sm:block">
                <button
                  onClick={onOpenTestDrive}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-[#087EBD] backdrop-blur-md border border-white/20 hover:border-[#087EBD] rounded-lg transition-colors"
                >
                  Lái Thử VF 7
                </button>
              </div>
            </div>

            {/* Specifications Bar Below Hero Image */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5">
              
              <div className="bg-[#111720]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-[#087EBD]/50 transition-colors">
                <span className="block text-[11px] font-medium tracking-wider text-[#9DA7B3] uppercase">
                  QUÃNG ĐƯỜNG
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display font-bold text-xl sm:text-2xl text-[#F5F7FA] tabular-nums">
                    496
                  </span>
                  <span className="text-xs text-[#087EBD] font-semibold">km</span>
                </div>
                <span className="text-[10px] text-[#9DA7B3]/80 block mt-0.5">Tiêu chuẩn WLTP</span>
              </div>

              <div className="bg-[#111720]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-[#087EBD]/50 transition-colors">
                <span className="block text-[11px] font-medium tracking-wider text-[#9DA7B3] uppercase">
                  CÔNG SUẤT
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display font-bold text-xl sm:text-2xl text-[#F5F7FA] tabular-nums">
                    349
                  </span>
                  <span className="text-xs text-[#087EBD] font-semibold">HP</span>
                </div>
                <span className="text-[10px] text-[#9DA7B3]/80 block mt-0.5">260 kW · 500 Nm</span>
              </div>

              <div className="bg-[#111720]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-[#087EBD]/50 transition-colors">
                <span className="block text-[11px] font-medium tracking-wider text-[#9DA7B3] uppercase">
                  0 – 100 KM/H
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display font-bold text-xl sm:text-2xl text-[#F5F7FA] tabular-nums">
                    5.8
                  </span>
                  <span className="text-xs text-[#087EBD] font-semibold">s</span>
                </div>
                <span className="text-[10px] text-[#9DA7B3]/80 block mt-0.5">Tăng tốc tức thì</span>
              </div>

              <div className="bg-[#111720]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-[#087EBD]/50 transition-colors">
                <span className="block text-[11px] font-medium tracking-wider text-[#9DA7B3] uppercase">
                  DẪN ĐỘNG
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display font-bold text-xl sm:text-2xl text-[#F5F7FA]">
                    AWD
                  </span>
                  <span className="text-xs text-[#087EBD] font-semibold">2 Motor</span>
                </div>
                <span className="text-[10px] text-[#9DA7B3]/80 block mt-0.5">Toàn thời gian</span>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex justify-center mt-8">
          <a
            href="#quick-actions"
            aria-label="Cuộn xuống các công cụ hỗ trợ"
            className="flex flex-col items-center text-[#9DA7B3] hover:text-white transition-colors"
          >
            <span className="text-[10px] tracking-widest uppercase mb-1">KHÁM PHÁ TIẾP</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#087EBD]" />
          </a>
        </div>

      </div>
    </section>
  );
};
