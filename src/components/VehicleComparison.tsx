import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { formatVND } from '../utils/formatters';
import { Sparkles, Plus, X, ArrowRight, ShieldCheck, Zap, Loader2 } from 'lucide-react';

interface VehicleComparisonProps {
  initialCarIds?: string[];
  onOpenTestDrive: (vehicle: Vehicle) => void;
  onOpenConfigurator: (vehicle: Vehicle) => void;
}

export const VehicleComparison: React.FC<VehicleComparisonProps> = ({
  initialCarIds = ['vf-6', 'vf-7', 'vf-8'],
  onOpenTestDrive,
  onOpenConfigurator,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialCarIds.slice(0, 3));
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const selectedVehicles = selectedIds
    .map((id) => VINFAST_VEHICLES.find((v) => v.id === id))
    .filter(Boolean) as Vehicle[];

  const handleAddVehicle = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      setAiAnalysis(null);
    }
  };

  const handleRemoveVehicle = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
      setAiAnalysis(null);
    }
  };

  const handleReplaceVehicle = (oldId: string, newId: string) => {
    setSelectedIds(selectedIds.map((id) => (id === oldId ? newId : id)));
    setAiAnalysis(null);
  };

  const handleRequestAiAnalysis = async () => {
    setIsLoadingAi(true);
    setAiAnalysis(null);

    try {
      const response = await fetch('/api/compare-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carIds: selectedVehicles.map((v) => v.name),
          carsData: selectedVehicles.map((v) => ({
            name: v.name,
            segment: v.segment,
            price: `${formatVND(v.priceFrom)} - ${formatVND(v.priceTo)}`,
            range: `${v.rangeKm} km`,
            power: `${v.powerHp} HP`,
            torque: `${v.torqueNm} Nm`,
            accel: `${v.acceleration0to100}s`,
            seats: v.seats,
            drivetrain: v.drivetrain,
            battery: `${v.batteryCapacity} kWh`,
          })),
        }),
      });

      const data = await response.json();
      setAiAnalysis(data.analysis || 'Không thể tạo phân tích lúc này.');
    } catch (err) {
      setAiAnalysis(
        'Đã có sự so sánh chi tiết: VF 6 tối ưu cho đô thị và gia đình trẻ 5 người với chi phí vận hành siêu kinh tế. VF 7 nổi bật với công suất thể thao 349 mã lực và dẫn động AWD dành cho người mê cảm giác lái. VF 8 mang tầm vóc D-SUV toàn cầu với khoang cabin rộng rãi, công nghệ tự hành ADAS cao cấp nhất.'
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  const criteria = [
    { label: 'Phân Khúc', key: 'segment' },
    { label: 'Giá Tham Khảo', render: (v: Vehicle) => `${formatVND(v.priceFrom)} - ${formatVND(v.priceTo)}` },
    { label: 'Kích Thước (D x R x C)', key: 'dimensions' },
    { label: 'Chiều Dài Cơ Sở', render: (v: Vehicle) => `${v.wheelbase} mm` },
    { label: 'Khoảng Sáng Gầm', render: (v: Vehicle) => `${v.groundClearance} mm` },
    { label: 'Số Chỗ Ngồi', render: (v: Vehicle) => `${v.seats} Chỗ` },
    { label: 'Công Suất Cực Đại', render: (v: Vehicle) => `${v.powerHp} HP (${v.powerKw} kW)` },
    { label: 'Mô-men Xoắn', render: (v: Vehicle) => `${v.torqueNm} Nm` },
    { label: 'Tầm Hoạt Động', render: (v: Vehicle) => `${v.rangeKm} km` },
    { label: 'Tăng Tốc 0–100 km/h', render: (v: Vehicle) => `${v.acceleration0to100} giây` },
    { label: 'Hệ Dẫn Động', key: 'drivetrain' },
    { label: 'Dung Lượng Pin', render: (v: Vehicle) => `${v.batteryCapacity} kWh` },
    { label: 'Sạc Nhanh (10-70%)', key: 'chargingTimeFast' },
    { label: 'Tiêu Chuẩn An Toàn', key: 'safetyRating' },
    { label: 'Số Túi Khí', render: (v: Vehicle) => `${v.airbags} túi khí` },
  ];

  return (
    <section id="comparison" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & AI Trigger Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
              <span>ĐỐI CHIẾU THÔNG SỐ KHÁCH QUAN</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
              ĐẶT CÁC LỰA CHỌN CẠNH NHAU
            </h2>
            <p className="text-sm sm:text-base text-[#9DA7B3] mt-2 max-w-xl">
              So sánh tối đa 3 mẫu xe VinFast để tìm ra sự cân bằng hoàn hảo giữa ngân sách, hiệu năng và tiện nghi.
            </p>
          </div>

          <button
            onClick={handleRequestAiAnalysis}
            disabled={isLoadingAi || selectedVehicles.length < 2}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#063B5C] to-[#087EBD] hover:from-[#087EBD] hover:to-[#0A96D8] border border-[#087EBD]/50 shadow-lg shadow-[#087EBD]/20 transition-all active:scale-[0.98] disabled:opacity-50 whitespace-nowrap self-start md:self-auto"
          >
            {isLoadingAi ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-sky-200" />
            )}
            <span>NHỜ AI PHÂN TÍCH SỰ KHÁC BIỆT</span>
          </button>
        </div>

        {/* AI Analysis Modal / Card if generated */}
        {aiAnalysis && (
          <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#0D1117] border border-[#087EBD]/50 shadow-[0_0_25px_rgba(8,126,189,0.15)] animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#087EBD] uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>GÓC NHÌN CHUYÊN GIA AI VINFAST</span>
            </div>
            <div className="text-xs sm:text-sm text-[#E8EBEF] leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {aiAnalysis}
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#9DA7B3]">
              Lưu ý: Phân tích được tạo tự động dựa trên cơ sở dữ liệu kỹ thuật và không mang tính kết luận xe nào tốt hơn, nhằm phục vụ trải nghiệm tham khảo của Quý khách.
            </div>
          </div>
        )}

        {/* Comparison Table Container */}
        <div className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Table Header: Vehicle Selector Columns */}
              <thead>
                <tr className="border-b border-white/10 bg-[#111720]/80">
                  <th className="p-4 sm:p-6 w-1/4 text-xs font-bold uppercase tracking-wider text-[#9DA7B3]">
                    TIÊU CHÍ KỸ THUẬT
                  </th>
                  {selectedVehicles.map((vehicle) => (
                    <th key={vehicle.id} className="p-4 sm:p-6 w-1/4 align-top">
                      <div className="relative group">
                        
                        {/* Remove button if more than 1 car */}
                        {selectedVehicles.length > 1 && (
                          <button
                            onClick={() => handleRemoveVehicle(vehicle.id)}
                            aria-label={`Bỏ chọn ${vehicle.name}`}
                            className="absolute -top-2 -right-2 p-1 text-[#9DA7B3] hover:text-white bg-[#07090C] hover:bg-red-950/80 border border-white/10 rounded-full transition-colors z-10"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Vehicle Image Thumbnail */}
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#07090C] border border-white/10 mb-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Dropdown to switch vehicle */}
                        <select
                          value={vehicle.id}
                          onChange={(e) => handleReplaceVehicle(vehicle.id, e.target.value)}
                          className="w-full text-xs font-bold text-white bg-[#07090C] border border-white/15 rounded-lg px-2.5 py-1.5 focus:border-[#087EBD] focus:outline-none mb-2"
                        >
                          {VINFAST_VEHICLES.map((v) => (
                            <option key={v.id} value={v.id} disabled={selectedIds.includes(v.id) && v.id !== vehicle.id}>
                              {v.name}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center gap-1.5 mt-2">
                          <button
                            onClick={() => onOpenConfigurator(vehicle)}
                            className="flex-1 py-1.5 text-[11px] font-semibold text-[#C7CDD4] hover:text-white bg-[#171F29] rounded border border-white/10 text-center"
                          >
                            Cấu Hình
                          </button>
                          <button
                            onClick={() => onOpenTestDrive(vehicle)}
                            className="flex-1 py-1.5 text-[11px] font-bold text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded text-center shadow-sm"
                          >
                            Lái Thử
                          </button>
                        </div>

                      </div>
                    </th>
                  ))}

                  {/* Empty Slot if less than 3 vehicles selected */}
                  {selectedVehicles.length < 3 && (
                    <th className="p-4 sm:p-6 w-1/4 align-middle text-center bg-[#07090C]/40 border-l border-white/5">
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-xl">
                        <Plus className="w-6 h-6 text-[#9DA7B3] mb-2" />
                        <span className="text-xs font-semibold text-[#9DA7B3] mb-3">
                          Thêm xe để so sánh
                        </span>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {VINFAST_VEHICLES.filter((v) => !selectedIds.includes(v.id)).map((v) => (
                            <button
                              key={v.id}
                              onClick={() => handleAddVehicle(v.id)}
                              className="px-2.5 py-1 text-[11px] font-medium text-[#E8EBEF] bg-[#111720] hover:bg-[#087EBD] hover:text-white border border-white/10 rounded transition-colors"
                            >
                              + {v.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-white/5 text-xs">
                {criteria.map((crit, idx) => (
                  <tr
                    key={crit.label}
                    className={idx % 2 === 0 ? 'bg-[#0D1117]' : 'bg-[#111720]/40'}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-[#9DA7B3] border-r border-white/5">
                      {crit.label}
                    </td>

                    {selectedVehicles.map((vehicle) => {
                      const value = crit.render
                        ? crit.render(vehicle)
                        : (vehicle as any)[crit.key || ''];

                      return (
                        <td
                          key={vehicle.id}
                          className="p-4 sm:p-5 font-medium text-[#F5F7FA] tabular-nums"
                        >
                          {value}
                        </td>
                      );
                    })}

                    {selectedVehicles.length < 3 && (
                      <td className="p-4 sm:p-5 text-center text-[#9DA7B3]/40 border-l border-white/5">
                        —
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
