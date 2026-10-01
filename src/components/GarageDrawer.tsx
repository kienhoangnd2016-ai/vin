import React from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { formatVND } from '../utils/formatters';
import { X, Trash2, Sliders, Calendar, Scale, ArrowRight, Heart } from 'lucide-react';

interface GarageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  savedConfigs: any[];
  onRemoveFavorite: (vehicleId: string) => void;
  onRemoveConfig: (index: number) => void;
  onOpenTestDrive: (vehicle: Vehicle) => void;
  onOpenConfigurator: (vehicle: Vehicle) => void;
  onCompareVehicles: (carIds: string[]) => void;
}

export const GarageDrawer: React.FC<GarageDrawerProps> = ({
  isOpen,
  onClose,
  favoriteIds,
  savedConfigs,
  onRemoveFavorite,
  onRemoveConfig,
  onOpenTestDrive,
  onOpenConfigurator,
  onCompareVehicles,
}) => {
  if (!isOpen) return null;

  const favoriteVehicles = favoriteIds
    .map((id) => VINFAST_VEHICLES.find((v) => v.id === id))
    .filter(Boolean) as Vehicle[];

  const hasItems = favoriteVehicles.length > 0 || savedConfigs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0D1117] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-[#111720] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#087EBD] fill-[#087EBD]" />
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              GARAGE CỦA TÔI
            </h3>
            <span className="text-xs text-[#9DA7B3]">
              ({favoriteVehicles.length + savedConfigs.length})
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng Garage"
            className="p-1.5 text-[#9DA7B3] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {!hasItems ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#111720] border border-white/10 flex items-center justify-center text-[#9DA7B3] mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">Garage của bạn đang trống</h4>
              <p className="text-xs text-[#9DA7B3] max-w-xs mx-auto leading-relaxed">
                Nhấp vào biểu tượng trái tim trên các dòng xe hoặc tùy biến cấu hình xe để lưu giữ những mẫu xe bạn ưng ý nhất.
              </p>
            </div>
          ) : (
            <>
              {/* Favorited Models */}
              {favoriteVehicles.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold tracking-wider text-[#087EBD] uppercase">
                      XE YÊU THÍCH ({favoriteVehicles.length})
                    </span>
                    {favoriteVehicles.length >= 2 && (
                      <button
                        onClick={() => {
                          onClose();
                          onCompareVehicles(favoriteVehicles.map((v) => v.id));
                        }}
                        className="text-[11px] font-semibold text-[#087EBD] hover:underline flex items-center gap-1"
                      >
                        <Scale className="w-3 h-3" />
                        <span>So sánh tất cả</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {favoriteVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="p-3.5 rounded-xl bg-[#111720] border border-white/10 flex gap-3.5 items-center justify-between"
                      >
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-20 h-14 object-cover rounded-lg bg-[#07090C] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-xs truncate">
                            {vehicle.name}
                          </h4>
                          <span className="text-[11px] text-[#087EBD] font-semibold block">
                            Từ {formatVND(vehicle.priceFrom)}
                          </span>
                          <span className="text-[10px] text-[#9DA7B3]">
                            {vehicle.rangeKm} km · {vehicle.powerHp} HP
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenTestDrive(vehicle);
                            }}
                            title="Lái thử"
                            className="p-1.5 text-xs text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveFavorite(vehicle.id)}
                            title="Xóa khỏi garage"
                            className="p-1.5 text-[#9DA7B3] hover:text-red-400 bg-[#07090C] rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Custom Configurations */}
              {savedConfigs.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-xs font-bold tracking-wider text-[#087EBD] uppercase block mb-3">
                    CẤU HÌNH ĐÃ LƯU ({savedConfigs.length})
                  </span>

                  <div className="space-y-3">
                    {savedConfigs.map((cfg, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#111720] border border-white/10 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">
                            {cfg.vehicleName} ({cfg.versionName})
                          </span>
                          <button
                            onClick={() => onRemoveConfig(idx)}
                            className="text-[#9DA7B3] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#9DA7B3] space-y-0.5">
                          <div>Màu: <span className="text-white">{cfg.color}</span></div>
                          <div>Nội thất: <span className="text-white">{cfg.interior}</span></div>
                          <div>Mâm xe: <span className="text-white">{cfg.wheel}</span></div>
                          <div>Giá ước tính: <span className="text-[#087EBD] font-bold">{formatVND(cfg.totalPrice)}</span></div>
                        </div>

                        <button
                          onClick={() => {
                            const vehicle = VINFAST_VEHICLES.find((v) => v.id === cfg.vehicleId);
                            if (vehicle) {
                              onClose();
                              onOpenTestDrive(vehicle);
                            }
                          }}
                          className="w-full mt-2 py-1.5 text-[11px] font-bold text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded transition-colors text-center"
                        >
                          Lái Thử Cấu Hình Này
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {hasItems && (
          <div className="p-4 bg-[#111720] border-t border-white/10 shrink-0">
            <button
              onClick={() => {
                onClose();
                const firstVehicle = favoriteVehicles[0] || VINFAST_VEHICLES[0];
                onOpenTestDrive(firstVehicle);
              }}
              className="w-full py-3 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-xl transition-all shadow-md uppercase"
            >
              ĐĂNG KÝ TƯ VẤN CÁC MẪU XE ĐÃ CHỌN
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
