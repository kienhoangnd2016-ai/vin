import React from 'react';
import { Phone, Sparkles, Calendar } from 'lucide-react';

interface MobileStickyCtaProps {
  onOpenAdvisor: () => void;
  onOpenTestDrive: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({
  onOpenAdvisor,
  onOpenTestDrive,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07090C]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Hotline Call */}
        <a
          href="tel:1900232389"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#111720] border border-white/10 text-white hover:bg-[#171F29] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#087EBD] mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            GỌI NGAY
          </span>
        </a>

        {/* AI Advisor */}
        <button
          onClick={onOpenAdvisor}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#111720] border border-white/10 text-white hover:bg-[#171F29] transition-colors"
        >
          <Sparkles className="w-4 h-4 text-[#087EBD] mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            TƯ VẤN AI
          </span>
        </button>

        {/* Test Drive CTA */}
        <button
          onClick={onOpenTestDrive}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#087EBD] hover:bg-[#0A96D8] text-white shadow-md shadow-[#087EBD]/30 transition-all font-bold"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider">
            LÁI THỬ
          </span>
        </button>

      </div>
    </div>
  );
};
