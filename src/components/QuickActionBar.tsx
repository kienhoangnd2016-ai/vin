import React from 'react';
import { Car, Scale, Calculator, Zap, Calendar } from 'lucide-react';

interface QuickActionBarProps {
  onOpenTestDrive: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onOpenTestDrive }) => {
  const tools = [
    {
      id: 'finder',
      icon: Car,
      title: 'TÌM XE PHÙ HỢP',
      subtitle: 'Trắc nghiệm 6 bước tìm mẫu xe lý tưởng',
      href: '#car-finder',
      isAction: false,
    },
    {
      id: 'comparison',
      icon: Scale,
      title: 'SO SÁNH XE',
      subtitle: 'Đối chiếu thông số & phân tích AI',
      href: '#comparison',
      isAction: false,
    },
    {
      id: 'loan',
      icon: Calculator,
      title: 'TÍNH TRẢ GÓP',
      subtitle: 'Ước tính lãi suất & khoản trả hàng tháng',
      href: '#loan-calculator',
      isAction: false,
    },
    {
      id: 'cost',
      icon: Zap,
      title: 'TÍNH CHI PHÍ SỬ DỤNG',
      subtitle: 'So sánh tiền điện & xăng thực tế 5 năm',
      href: '#cost-calculator',
      isAction: false,
    },
    {
      id: 'test-drive',
      icon: Calendar,
      title: 'ĐĂNG KÝ LÁI THỬ',
      subtitle: 'Trải nghiệm trực tiếp tại showroom gần nhất',
      href: '#',
      isAction: true,
      onClick: onOpenTestDrive,
    },
  ];

  return (
    <section id="quick-actions" className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0D1117]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 sm:p-3 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const content = (
              <div className="flex items-center lg:flex-col lg:items-start p-3 sm:p-3.5 rounded-xl bg-[#111720]/60 hover:bg-[#171F29] border border-white/5 hover:border-[#087EBD]/60 transition-all duration-300 group cursor-pointer text-left">
                <div className="w-10 h-10 rounded-lg bg-[#07090C] border border-white/10 flex items-center justify-center text-[#9DA7B3] group-hover:text-[#087EBD] group-hover:border-[#087EBD]/50 group-hover:shadow-[0_0_15px_rgba(8,126,189,0.35)] transition-all shrink-0 mr-3.5 lg:mr-0 lg:mb-2.5">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-[#F5F7FA] group-hover:text-white transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-[#9DA7B3] mt-0.5 line-clamp-1">
                    {tool.subtitle}
                  </p>
                </div>
              </div>
            );

            if (tool.isAction) {
              return (
                <button
                  key={tool.id}
                  onClick={tool.onClick}
                  className="focus:outline-none w-full"
                >
                  {content}
                </button>
              );
            }

            return (
              <a key={tool.id} href={tool.href} className="focus:outline-none">
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
