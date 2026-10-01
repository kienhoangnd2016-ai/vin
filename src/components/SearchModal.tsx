import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { Search, X, ArrowRight, Zap } from 'lucide-react';
import { formatVND } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectVehicle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = searchTerm.trim()
    ? VINFAST_VEHICLES.filter(
        (v) =>
          v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : VINFAST_VEHICLES;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0D1117] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#111720] border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#087EBD] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên xe (VF 3, VF 7, VF 9), số chỗ, tính năng ADAS..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-[#9DA7B3] focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
            className="p-1.5 text-[#9DA7B3] hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          <span className="text-[11px] font-bold text-[#9DA7B3] uppercase px-2 mb-2 block tracking-wider">
            {searchTerm ? `KẾT QUẢ (${results.length})` : 'DÒNG XE ĐỀ XUẤT'}
          </span>

          {results.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => {
                onClose();
                onSelectVehicle(vehicle);
              }}
              className="p-3 rounded-xl bg-[#111720]/60 hover:bg-[#171F29] border border-white/5 hover:border-[#087EBD]/50 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-14 h-10 object-cover rounded-lg bg-[#07090C]"
                />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#087EBD] transition-colors">
                    {vehicle.name}
                  </h4>
                  <span className="text-[11px] text-[#9DA7B3]">
                    {vehicle.segment} · {vehicle.seats} Chỗ · {vehicle.rangeKm} km
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-white block tabular-nums">
                  Từ {formatVND(vehicle.priceFrom)}
                </span>
                <span className="text-[10px] text-[#087EBD] font-semibold group-hover:underline">
                  Xem Chi Tiết →
                </span>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div className="p-8 text-center text-xs text-[#9DA7B3]">
              Không tìm thấy dòng xe phù hợp với từ khóa "{searchTerm}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
