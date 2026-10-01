import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { formatVND } from '../utils/formatters';
import { Heart, ArrowUpRight, Sliders, Zap, Shield, Sparkles } from 'lucide-react';

interface VehicleShowcaseProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenConfigurator: (vehicle: Vehicle) => void;
  onOpenTestDrive: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  favoriteIds: string[];
}

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({
  onSelectVehicle,
  onOpenConfigurator,
  onOpenTestDrive,
  onToggleFavorite,
  favoriteIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'urban' | 'crossover' | 'flagship'>('all');

  const filteredVehicles = activeCategory === 'all'
    ? VINFAST_VEHICLES
    : VINFAST_VEHICLES.filter((v) => v.category === activeCategory);

  const categories = [
    { id: 'all', label: 'TẤT CẢ DÒNG XE' },
    { id: 'urban', label: 'ĐÔ THỊ LINH HOẠT' },
    { id: 'crossover', label: 'CROSSOVER & THỂ THAO' },
    { id: 'flagship', label: 'FLAGSHIP & HẠNG SANG' },
  ];

  return (
    <section id="vehicles" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#087EBD] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087EBD]" />
              <span>BỘ SƯU TẬP XE ĐIỆN VINFAST</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
              KHÁM PHÁ DÒNG XE
            </h2>
            <p className="text-sm sm:text-base text-[#9DA7B3] mt-2 max-w-xl">
              Từ xe đô thị linh hoạt đến SUV cỡ lớn đẳng cấp thương gia. Mỗi chiếc xe là một tác phẩm công nghệ định hình kỷ nguyên di chuyển mới.
            </p>
          </div>

          {/* Segment Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0D1117] border border-white/10 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#087EBD] text-white shadow-md shadow-[#087EBD]/30'
                    : 'text-[#9DA7B3] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Large Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredVehicles.map((vehicle) => {
            const isFav = favoriteIds.includes(vehicle.id);

            return (
              <div
                key={vehicle.id}
                className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden hover:border-[#087EBD]/50 hover:shadow-[0_10px_30px_rgba(8,126,189,0.15)] transition-all duration-300 flex flex-col group"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111720]">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80" />

                  {/* Top Badges: Segment & Favorite */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="text-[11px] font-semibold text-[#E8EBEF] bg-[#07090C]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      {vehicle.segment}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(vehicle.id);
                      }}
                      aria-label={isFav ? 'Bỏ lưu xe' : 'Lưu vào Garage'}
                      className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
                        isFav
                          ? 'bg-[#087EBD] text-white border-[#087EBD]'
                          : 'bg-[#07090C]/70 text-[#9DA7B3] hover:text-white border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Highlight Specs Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E8EBEF]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#9DA7B3]">Tầm hoạt động:</span>
                      <span className="font-bold tabular-nums text-white">{vehicle.rangeKm} km</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#9DA7B3]">Công suất:</span>
                      <span className="font-bold tabular-nums text-white">{vehicle.powerHp} HP</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header info */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-[#F5F7FA] group-hover:text-[#087EBD] transition-colors">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-[#9DA7B3] mt-0.5 line-clamp-1">
                          {vehicle.tagline}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#C7CDD4] px-2 py-0.5 rounded bg-[#111720] border border-white/5 whitespace-nowrap">
                        {vehicle.seats} Chỗ
                      </span>
                    </div>

                    {/* Price Range */}
                    <div className="my-4 pt-3 border-t border-white/5">
                      <span className="text-[11px] uppercase tracking-wider text-[#9DA7B3] block mb-1">
                        Giá tham khảo
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                          {formatVND(vehicle.priceFrom)}
                        </span>
                        <span className="text-xs text-[#9DA7B3]">
                          - {formatVND(vehicle.priceTo)}
                        </span>
                      </div>
                    </div>

                    {/* Highlights Points */}
                    <ul className="space-y-1.5 mb-6 text-xs text-[#C7CDD4]">
                      {vehicle.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#087EBD] mt-0.5">·</span>
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons Cluster */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        className="py-2.5 px-3 text-xs font-semibold text-[#F5F7FA] bg-[#111720] hover:bg-[#171F29] border border-white/10 hover:border-white/20 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>KHÁM PHÁ</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenConfigurator(vehicle)}
                        className="py-2.5 px-3 text-xs font-semibold text-[#C7CDD4] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5 text-[#087EBD]" />
                        <span>CẤU HÌNH</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenTestDrive(vehicle)}
                      className="w-full py-2.5 px-4 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-lg transition-colors shadow-md shadow-[#087EBD]/20 text-center uppercase"
                    >
                      ĐĂNG KÝ LÁI THỬ
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
