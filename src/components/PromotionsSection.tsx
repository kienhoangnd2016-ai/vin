import React from 'react';
import { VINFAST_PROMOTIONS, Promotion } from '../data/vinfastData';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface PromotionsSectionProps {
  onSelectPromotion: (promo: Promotion) => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onSelectPromotion }) => {
  return (
    <section id="promotions" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHÍNH SÁCH ĐỘC QUYỀN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            ĐẶC QUYỀN TIÊN PHONG
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Những chương trình hỗ trợ tài chính và ưu đãi trạm sạc đột phá, mang đến sự an tâm tuyệt đối trên từng cây số.
          </p>
        </div>

        {/* Luxury Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {VINFAST_PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="bg-[#0D1117] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#087EBD]/60 hover:shadow-[0_10px_30px_rgba(8,126,189,0.15)] transition-all duration-300 group"
            >
              <div>
                {/* Badge & Period */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-[#087EBD] bg-[#087EBD]/15 px-2.5 py-1 rounded border border-[#087EBD]/30 uppercase">
                    {promo.badge}
                  </span>
                  <span className="text-[11px] text-[#9DA7B3]">
                    {promo.period}
                  </span>
                </div>

                {/* Campaign Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#087EBD] transition-colors">
                  {promo.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9DA7B3] leading-relaxed mb-6">
                  {promo.summary}
                </p>

                {/* Details Points */}
                <ul className="space-y-2.5 text-xs text-[#C7CDD4] border-t border-white/5 pt-5 mb-6">
                  {promo.details.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#087EBD] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card CTA Button */}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => onSelectPromotion(promo)}
                  className="w-full py-3 px-4 text-xs font-bold tracking-wider text-white bg-[#111720] hover:bg-[#087EBD] border border-white/15 hover:border-[#087EBD] rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-md uppercase"
                >
                  <span>{promo.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
