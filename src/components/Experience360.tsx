import React, { useState } from 'react';
import { Eye, ShieldCheck, Cpu, Compass, Info, Check } from 'lucide-react';

export const Experience360: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior' | 'technology' | 'safety'>('interior');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const tabs = [
    { id: 'interior', label: 'NỘI THẤT & KHOANG LÁI', icon: Eye },
    { id: 'exterior', label: 'NGOẠI THẤT DUY MỸ', icon: Compass },
    { id: 'technology', label: 'TRỢ LÁI ADAS & VIVI', icon: Cpu },
    { id: 'safety', label: 'PIN & AN TOÀN 5 SAO', icon: ShieldCheck },
  ];

  const contentMap = {
    interior: {
      image: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
      title: 'Khoang Lái Số Hóa & Tinh Tế',
      description: 'Thiết kế tối giản hướng đến người lái với vật liệu da cao cấp, màn hình cảm ứng trung tâm độ phân giải cao và hệ thống đèn viền LED đa sắc sang trọng.',
      hotspots: [
        {
          id: 0,
          x: '48%',
          y: '42%',
          title: 'Màn Hình Cảm Ứng 15.6 Inch',
          desc: 'Trung tâm điều khiển mọi tính năng thông minh của xe: điều hòa 3 vùng, trợ lý ảo ViVi, giải trí trực tuyến và cập nhật phần mềm không dây FOTA.',
        },
        {
          id: 1,
          x: '30%',
          y: '35%',
          title: 'Hiển Thị Kính Lái HUD',
          desc: 'Chiếu thông tin tốc độ, biển báo giao thông và chỉ dẫn điều hướng trực tiếp lên kính chắn gió giúp tài xế luôn tập trung quan sát.',
        },
        {
          id: 2,
          x: '65%',
          y: '60%',
          title: 'Ghế Da Thực Vật Công Thái Học',
          desc: 'Tích hợp chức năng sưởi, thông gió đa điểm và massage thư giãn, mang lại cảm giác êm ái trên những chặng đường dài.',
        },
      ],
    },
    exterior: {
      image: '/src/assets/images/vinfast_vf7_hero_1790823902996.jpg',
      title: 'Ngôn Ngữ Thiết Kế Vũ Trụ Gomotiv',
      description: 'Đường nét khí động học sắc sảo, dải đèn LED cánh chim đặc trưng tạo nên dấu ấn nhận diện độc bản kiêu hãnh của thương hiệu Việt Nam trên trường quốc tế.',
      hotspots: [
        {
          id: 0,
          x: '40%',
          y: '50%',
          title: 'Đèn LED Cánh Chim VinFast',
          desc: 'Dải đèn LED ban ngày vươn rộng kiêu hãnh ôm trọn logo chữ V trung tâm, biểu tượng của sự vươn tầm và phát triển.',
        },
        {
          id: 1,
          x: '75%',
          y: '45%',
          title: 'Mâm Thể Thao 20 Inch',
          desc: 'Thiết kế mâm hợp kim phay xước hai tông màu tối ưu hóa luồng khí động học và giảm thiểu lực cản gió.',
        },
      ],
    },
    technology: {
      image: '/src/assets/images/vinfast_vf9_flagship_1790823916473.jpg',
      title: 'Hệ Thống Trợ Lái ADAS Level 2 Toàn Diện',
      description: 'Tập hợp hơn 20 tính năng hỗ trợ lái tiên tiến: hỗ trợ di chuyển khi ùn tắc, kiểm soát hành trình thích ứng, cảnh báo va chạm trước và tự động đỗ xe thông minh.',
      hotspots: [
        {
          id: 0,
          x: '30%',
          y: '30%',
          title: 'Radar Sóng Milimet & Camera 360',
          desc: 'Quét liên tục không gian xung quanh xe trong bán kính 200m để nhận diện phương tiện, người đi bộ và chướng ngại vật tức thì.',
        },
        {
          id: 1,
          x: '60%',
          y: '45%',
          title: 'Tự Động Giữ Làn & Chuyển Làn',
          desc: 'Chỉ cần gạt xi-nhan trên cao tốc, hệ thống sẽ tự động quét điểm mù và chuyển làn an toàn.',
        },
      ],
    },
    safety: {
      image: '/src/assets/images/vinfast_charging_hub_1790823943941.jpg',
      title: 'Công Nghệ Pin Tiên Tiến & Khung Gầm Thép Dập Nóng',
      description: 'Khối pin LFP và CATL được bảo vệ trong bộ khung nhôm đúc chịu lực cao, tiêu chuẩn chống nước IP68 và đạt chứng chỉ an toàn 5 sao NHTSA / Euro NCAP.',
      hotspots: [
        {
          id: 0,
          x: '50%',
          y: '70%',
          title: 'Khung Bảo Vệ Pin Chống Va Đập',
          desc: 'Vỏ pin được thiết kế chống cháy nổ, kiểm soát nhiệt độ chất lỏng tự động và chịu được ngập nước sâu 0.5m trong 30 phút.',
        },
        {
          id: 1,
          x: '45%',
          y: '30%',
          title: '11 Túi Khí Bảo Vệ Toàn Diện',
          desc: 'Bao gồm túi khí rèm, túi khí đầu gối và túi khí trung tâm giữa hai ghế trước hạn chế tối đa chấn thương.',
        },
      ],
    },
  };

  const current = contentMap[activeTab];

  return (
    <section id="experience" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <span>TRẢI NGHIỆM CHI TIẾT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            KHÁM PHÁ MỌI GÓC CẠNH
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Tương tác trực quan các điểm nhấn công nghệ, khoang nội thất chuẩn thương gia và kết cấu an toàn hàng đầu thế giới.
          </p>
        </div>

        {/* Perspective Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setActiveHotspot(0);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  isTabActive
                    ? 'bg-[#087EBD] text-white shadow-lg shadow-[#087EBD]/25'
                    : 'bg-[#0D1117] text-[#9DA7B3] hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Viewport Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual Frame with Hotspots */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#0D1117] border border-white/10 shadow-2xl group">
            <img
              src={current.image}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07090C]/80 via-transparent to-transparent pointer-events-none" />

            {/* Hotspots */}
            {current.hotspots.map((hs) => {
              const isActive = activeHotspot === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs.id)}
                  aria-label={hs.title}
                  style={{ left: hs.x, top: hs.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 ${
                    isActive
                      ? 'bg-[#087EBD] ring-4 ring-[#087EBD]/40 scale-110 shadow-[0_0_20px_#087EBD]'
                      : 'bg-[#07090C]/80 hover:bg-[#087EBD] border border-white/30 text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </button>
              );
            })}

            {/* Floating Tag */}
            <div className="absolute bottom-4 left-4 z-10 bg-[#07090C]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs text-white">
              <span>{current.title}</span>
            </div>
          </div>

          {/* Right Column: Hotspot Detail Box */}
          <div className="lg:col-span-4 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#087EBD] uppercase block mb-1">
                TIÊU ĐIỂM CÔNG NGHỆ
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9DA7B3] mt-2 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Selected Hotspot Detail Card */}
            {activeHotspot !== null && current.hotspots[activeHotspot] && (
              <div className="p-4 rounded-xl bg-[#111720] border border-[#087EBD]/40 shadow-inner animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#087EBD]" />
                  <span>{current.hotspots[activeHotspot].title}</span>
                </div>
                <p className="text-xs text-[#C7CDD4] leading-relaxed">
                  {current.hotspots[activeHotspot].desc}
                </p>
              </div>
            )}

            {/* Hotspots Selector List */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[11px] text-[#9DA7B3] uppercase block mb-1">
                Chạm để xem các tính năng:
              </span>
              {current.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    activeHotspot === hs.id
                      ? 'bg-[#087EBD]/20 text-[#087EBD] border border-[#087EBD]/40'
                      : 'text-[#9DA7B3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{hs.title}</span>
                  {activeHotspot === hs.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
