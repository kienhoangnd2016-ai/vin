import React from 'react';
import { Vehicle } from '../data/vinfastData';
import { formatVND, formatVNDExact } from '../utils/formatters';
import { X, Sliders, Calendar, Calculator, Check, ShieldCheck, Zap, Heart } from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onOpenConfigurator: (vehicle: Vehicle) => void;
  onOpenTestDrive: (vehicle: Vehicle) => void;
  onOpenLoan: (vehicle: Vehicle) => void;
  isFavorite: boolean;
  onToggleFavorite: (vehicleId: string) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onOpenConfigurator,
  onOpenTestDrive,
  onOpenLoan,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0D1117] border border-white/15 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Top Sticky Bar */}
        <div className="px-6 py-4 bg-[#111720] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#087EBD] bg-[#087EBD]/15 px-2.5 py-1 rounded uppercase tracking-wider">
              {vehicle.segment}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {vehicle.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              aria-label={isFavorite ? 'Bỏ lưu' : 'Lưu vào Garage'}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-[#087EBD] text-white border-[#087EBD]'
                  : 'bg-[#07090C] text-[#9DA7B3] hover:text-white border-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              aria-label="Đóng"
              className="p-2 text-[#9DA7B3] hover:text-white bg-[#07090C] hover:bg-[#171F29] border border-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Image Frame */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#07090C] border border-white/10 shadow-xl">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-medium text-[#9DA7B3]">{vehicle.tagline}</span>
              <span className="font-bold text-[#087EBD]">{vehicle.seats} Chỗ ngồi</span>
            </div>
          </div>

          {/* Price Range & Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#111720] border border-white/5">
              <span className="text-[10px] uppercase text-[#9DA7B3] block">Giá tham khảo</span>
              <span className="font-display text-base sm:text-lg font-bold text-white tabular-nums">
                {formatVND(vehicle.priceFrom)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111720] border border-white/5">
              <span className="text-[10px] uppercase text-[#9DA7B3] block">Tầm hoạt động</span>
              <span className="font-display text-base sm:text-lg font-bold text-[#087EBD] tabular-nums">
                {vehicle.rangeKm} km
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111720] border border-white/5">
              <span className="text-[10px] uppercase text-[#9DA7B3] block">Công suất cực đại</span>
              <span className="font-display text-base sm:text-lg font-bold text-white tabular-nums">
                {vehicle.powerHp} HP
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111720] border border-white/5">
              <span className="text-[10px] uppercase text-[#9DA7B3] block">Tăng tốc 0–100 km/h</span>
              <span className="font-display text-base sm:text-lg font-bold text-white tabular-nums">
                {vehicle.acceleration0to100} s
              </span>
            </div>
          </div>

          {/* Versions Comparison Box */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
              CÁC PHIÊN BẢN CUNG CẤP
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicle.versions.map((ver) => (
                <div key={ver.id} className="p-4 rounded-xl bg-[#111720] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-white text-sm">
                      {ver.name}
                    </span>
                    <span className="text-xs font-bold text-[#087EBD] tabular-nums">
                      {formatVND(ver.priceWithBattery)}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#C7CDD4] mt-3">
                    {ver.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#087EBD] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Full Specifications Table */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
              THÔNG SỐ KỸ THUẬT TIÊU CHUẨN
            </h4>
            <div className="bg-[#111720] border border-white/5 rounded-xl divide-y divide-white/5 text-xs">
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Kích thước tổng thể (D x R x C)</span>
                <span className="font-semibold text-white text-right">{vehicle.dimensions}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Chiều dài cơ sở</span>
                <span className="font-semibold text-white text-right">{vehicle.wheelbase} mm</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Khoảng sáng gầm xe</span>
                <span className="font-semibold text-white text-right">{vehicle.groundClearance} mm</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Hệ dẫn động</span>
                <span className="font-semibold text-white text-right">{vehicle.drivetrain}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Dung lượng Pin</span>
                <span className="font-semibold text-white text-right">{vehicle.batteryCapacity} kWh</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Thời gian sạc nhanh (10-70%)</span>
                <span className="font-semibold text-[#087EBD] text-right">{vehicle.chargingTimeFast}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-[#9DA7B3]">Tiêu chuẩn an toàn & Túi khí</span>
                <span className="font-semibold text-white text-right">{vehicle.safetyRating} ({vehicle.airbags} túi khí)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-4 bg-[#111720] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenLoan(vehicle);
              }}
              className="py-2.5 px-3.5 text-xs font-semibold text-[#C7CDD4] hover:text-white bg-[#07090C] hover:bg-[#171F29] border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#087EBD]" />
              <span>Tính Trả Góp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConfigurator(vehicle);
              }}
              className="py-2.5 px-3.5 text-xs font-semibold text-[#C7CDD4] hover:text-white bg-[#07090C] hover:bg-[#171F29] border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-[#087EBD]" />
              <span>Cấu Hình Xe</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenTestDrive(vehicle);
            }}
            className="py-2.5 px-5 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-xl shadow-lg shadow-[#087EBD]/25 transition-all flex items-center gap-2 uppercase"
          >
            <Calendar className="w-4 h-4" />
            <span>ĐĂNG KÝ LÁI THỬ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
