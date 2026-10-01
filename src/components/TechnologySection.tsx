import React from 'react';
import { Cpu, ShieldCheck, Zap, Radio, Sparkles, Smartphone, Eye } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const techFeatures = [
    {
      icon: Cpu,
      title: 'HỆ THỐNG TRỢ LÁI ADAS LEVEL 2',
      desc: 'Tự động kiểm soát hành trình thích ứng, hỗ trợ di chuyển khi ùn tắc giao thông, cảnh báo chệch làn và phanh khẩn cấp tự động bảo vệ hành khách.',
      metric: '20+ Tính Năng',
      submetric: 'Hỗ trợ lái chủ động',
    },
    {
      icon: Radio,
      title: 'TRỢ LÝ ẢO TIẾNG VIỆT VIVI',
      desc: 'Nhận diện giọng nói đa vùng miền tự nhiên với độ chính xác cao. Điều khiển điều hòa, mở cốp, điều hướng lộ trình và trò chuyện thân thiện.',
      metric: '100% Giọng Việt',
      submetric: 'Hiểu ngữ cảnh thông minh',
    },
    {
      icon: Zap,
      title: 'HỆ DẪN ĐỘNG 2 MOTOR AWD',
      desc: 'Công suất cực đại lên tới 402 mã lực và 620 Nm mô-men xoắn tức thời. Tăng tốc 0–100 km/h chỉ từ 5.5s với độ êm ái tuyệt đối.',
      metric: '402 Mã Lực',
      submetric: 'Mô-men xoắn tức thì',
    },
    {
      icon: ShieldCheck,
      title: 'AN TOÀN TIÊU CHUẨN 5 SAO QUỐC TẾ',
      desc: 'Bộ khung thép dập nóng cường độ siêu cao kết hợp cùng khối pin đặt dưới sàn hạ thấp trọng tâm, chống lật xe và giảm chấn va đập.',
      metric: '5 Sao NCAP',
      submetric: 'Euro NCAP & NHTSA',
    },
    {
      icon: Eye,
      title: 'HIỂN THỊ KÍNH LÁI HUD & MÀN HÌNH 15.6"',
      desc: 'Số hóa hoàn toàn khoang lái, loại bỏ nút bấm cơ học rườm rà. Hiển thị thông số trên kính lái giúp người lái luôn giữ mắt trên cung đường.',
      metric: '15.6 Inch',
      submetric: 'Độ phân giải cực cao',
    },
    {
      icon: Smartphone,
      title: 'CẬP NHẬT PHẦN MỀM TỪ XA FOTA',
      desc: 'Chiếc xe liên tục hoàn thiện và thông minh hơn theo thời gian. Quản lý sạc, khóa/mở cửa và định vị xe trực tiếp qua ứng dụng VinFast.',
      metric: 'FOTA Không Dây',
      submetric: 'Nâng cấp tính năng liên tục',
    },
  ];

  return (
    <section id="technology" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KỶ NGUYÊN DI CHUYỂN MỚI</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            CÔNG NGHỆ ĐƯỢC SINH RA ĐỂ PHỤC VỤ BẠN
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Không chỉ là phương tiện di chuyển, mỗi chiếc VinFast là một không gian công nghệ thông minh, an toàn và hòa nhịp cùng phong cách sống tương lai.
          </p>
        </div>

        {/* Feature Cards Bento-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D1117] border border-white/10 rounded-2xl p-7 hover:border-[#087EBD]/50 hover:bg-[#111720] transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#07090C] border border-white/10 flex items-center justify-center text-[#9DA7B3] group-hover:text-[#087EBD] group-hover:border-[#087EBD]/50 transition-colors mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-base font-bold text-white tracking-wide mb-2.5 group-hover:text-[#087EBD] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9DA7B3] leading-relaxed mb-6 font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-baseline justify-between">
                  <span className="font-display text-lg font-bold text-white tabular-nums">
                    {feat.metric}
                  </span>
                  <span className="text-[11px] text-[#9DA7B3]">
                    {feat.submetric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
