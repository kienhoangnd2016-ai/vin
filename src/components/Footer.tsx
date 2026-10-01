import React from 'react';
import { Phone, Mail, MapPin, Shield, Zap, Sparkles } from 'lucide-react';
import { VINFAST_VEHICLES } from '../data/vinfastData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070A] border-t border-white/10 text-[#9DA7B3] text-xs pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#111720] border border-white/15 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                  <path d="M12 21.5L2 6.5h4.2l5.8 9.3 5.8-9.3H22L12 21.5z" opacity="0.9" />
                  <path d="M12 17.5L5.5 7.5h2.8l3.7 6.1 3.7-6.1h2.8L12 17.5z" fill="#087EBD" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-[0.2em] text-white uppercase">
                VINFAST AUTO
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-[#9DA7B3]">
              VinFast — Thương hiệu xe điện thông minh toàn cầu của Việt Nam. Tiên phong thúc đẩy cuộc cách mạng di chuyển xanh vì một tương lai bền vững cho mọi người.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#C7CDD4]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#087EBD]" />
                <span className="font-semibold text-white">Hotline CSKH 24/7: 1900 23 23 89</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#087EBD]" />
                <span>support.vn@vinfastauto.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#087EBD] shrink-0 mt-0.5" />
                <span>Tòa nhà Symphony, Chu Huy Mân, Vinhomes Riverside, Long Biên, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Dòng xe Col */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-4">
              DÒNG XE ĐIỆN
            </h4>
            <ul className="space-y-2.5">
              {VINFAST_VEHICLES.map((v) => (
                <li key={v.id}>
                  <a href="#vehicles" className="hover:text-white transition-colors">
                    {v.name} ({v.segment})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Công cụ Col */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-4">
              CÔNG CỤ MUA XE
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#car-finder" className="hover:text-white transition-colors">
                  Tìm Xe Phù Hợp
                </a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-white transition-colors">
                  Cấu Hình Xe 3D
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">
                  So Sánh Xe & AI
                </a>
              </li>
              <li>
                <a href="#loan-calculator" className="hover:text-white transition-colors">
                  Dự Tính Trả Góp
                </a>
              </li>
              <li>
                <a href="#cost-calculator" className="hover:text-white transition-colors">
                  Chi Phí Sử Dụng 5 Năm
                </a>
              </li>
              <li>
                <a href="#route-planner" className="hover:text-white transition-colors">
                  Bản Đồ Trạm Sạc V-Green
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ & Chính sách */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-4">
              CHÍNH SÁCH HẬU MÃI
            </h4>
            <ul className="space-y-2.5">
              <li>Bảo hành xe 10 năm hoặc 200.000 km</li>
              <li>Bảo hành pin 10 năm không giới hạn km</li>
              <li>Cứu hộ pin 24/7 toàn quốc</li>
              <li>Dịch vụ sửa chữa lưu động Mobile Service</li>
              <li>Chính sách thu cũ đổi xe điện</li>
              <li>Miễn phí 100% lệ phí trước bạ</li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Legal Notice */}
        <div className="py-6 border-b border-white/5 space-y-2 text-[11px] text-[#9DA7B3]/80 leading-relaxed">
          <p>
            *Lưu ý: Mọi thông tin về giá bán, thông số kỹ thuật, hình ảnh minh họa và các chính sách ưu đãi trên website mang tính chất tham khảo tại thời điểm phát hành và có thể được điều chỉnh theo thông báo chính thức từ VinFast Việt Nam mà không cần báo trước. Quý khách vui lòng xác nhận thông tin cụ thể cùng tư vấn viên tại hệ thống showroom ủy quyền trước khi ký kết hợp đồng.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>© {new Date().getFullYear()} VinFast Auto. Bản quyền thuộc về Tập đoàn Vingroup.</span>
          <div className="flex items-center gap-6 text-[#9DA7B3]">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-white transition-colors">Quy chế hoạt động</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
