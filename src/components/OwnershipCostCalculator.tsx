import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { formatVNDExact, formatVND } from '../utils/formatters';
import { Zap, Fuel, TrendingDown, Info, Check } from 'lucide-react';

export const OwnershipCostCalculator: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    VINFAST_VEHICLES.find((v) => v.id === 'vf-7') || VINFAST_VEHICLES[3]
  );
  const [monthlyKm, setMonthlyKm] = useState<number>(1500); // 1,500 km/month
  const [electricTariff, setElectricTariff] = useState<number>(3858); // 3,858 VND/kWh V-Green
  const [gasolinePrice, setGasolinePrice] = useState<number>(23500); // 23,500 VND/L
  const [gasConsumptionPer100Km, setGasConsumptionPer100Km] = useState<number>(8.5); // 8.5L / 100km ICE equivalent
  const [timeframeYears, setTimeframeYears] = useState<number>(5); // 5 years

  // VinFast EV Cost Calculation
  // Electric energy cost = (monthlyKm / 100) * efficiencyKwhPer100Km * electricTariff
  const evMonthlyFuelCost = Math.round(
    (monthlyKm / 100) * selectedVehicle.efficiencyKwhPer100Km * electricTariff
  );
  // EV maintenance is ~35% of ICE car (~350,000 VND/month avg)
  const evMonthlyMaintenance = 350000;
  const evTotalMonthly = evMonthlyFuelCost + evMonthlyMaintenance;

  // Gas (ICE) Car Cost Calculation
  const gasMonthlyFuelCost = Math.round(
    (monthlyKm / 100) * gasConsumptionPer100Km * gasolinePrice
  );
  // ICE maintenance ~1,000,000 VND/month avg (oil, filters, spark plugs, fluids)
  const gasMonthlyMaintenance = 1000000;
  const gasTotalMonthly = gasMonthlyFuelCost + gasMonthlyMaintenance;

  // Yearly & Period calculations
  const evPeriodCost = evTotalMonthly * 12 * timeframeYears;
  const gasPeriodCost = gasTotalMonthly * 12 * timeframeYears;
  const estimatedSavings = Math.max(0, gasPeriodCost - evPeriodCost);

  return (
    <section id="cost-calculator" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>TÍNH TOÁN HIỆU QUẢ KINH TẾ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            CHI PHÍ SỞ HỮU THỰC TẾ CỦA BẠN
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            So sánh chi phí năng lượng sạc điện và chi phí bảo dưỡng định kỳ giữa ô tô điện VinFast với xe xăng cùng phân khúc qua các chu kỳ thời gian.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: User Input Variables */}
          <div className="lg:col-span-6 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            
            {/* Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
                01. MẪU XE VINFAST CẦN SO SÁNH
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {VINFAST_VEHICLES.map((vehicle) => {
                  const isActive = selectedVehicle.id === vehicle.id;
                  return (
                    <button
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                        isActive
                          ? 'bg-[#087EBD] text-white shadow-md'
                          : 'bg-[#111720] text-[#9DA7B3] hover:text-white border border-white/5'
                      }`}
                    >
                      {vehicle.name.replace('VinFast ', '')}
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] text-[#9DA7B3] mt-2 block">
                Mức tiêu thụ tiêu chuẩn: {selectedVehicle.efficiencyKwhPer100Km} kWh / 100 km
              </span>
            </div>

            {/* Monthly Kilometers Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#9DA7B3] uppercase">
                  Quãng Đường Đi Hàng Tháng
                </span>
                <span className="font-display text-base font-bold text-white tabular-nums">
                  {monthlyKm.toLocaleString('vi-VN')} km / tháng
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(Number(e.target.value))}
                className="w-full h-2 bg-[#171F29] rounded-lg appearance-none cursor-pointer accent-[#087EBD]"
              />
              <div className="flex justify-between text-[11px] text-[#9DA7B3] mt-1.5">
                <span>500 km (Ít đi)</span>
                <span>1.500 km (Trung bình)</span>
                <span>3.000 km</span>
                <span>5.000 km (Kinh doanh)</span>
              </div>
            </div>

            {/* Electricity Tariff Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#9DA7B3] uppercase">
                  Đơn Giá Điện Sạc
                </span>
                <span className="font-display text-sm font-bold text-white tabular-nums">
                  {electricTariff.toLocaleString('vi-VN')} đ/kWh
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setElectricTariff(3858)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                    electricTariff === 3858
                      ? 'bg-[#087EBD]/20 border-[#087EBD] text-white font-bold'
                      : 'bg-[#111720] border-white/10 text-[#9DA7B3]'
                  }`}
                >
                  <span className="block font-semibold">Trạm Sạc V-Green</span>
                  <span className="text-[11px] text-[#9DA7B3]">3.858 VNĐ/kWh (Công cộng)</span>
                </button>
                <button
                  onClick={() => setElectricTariff(2500)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                    electricTariff === 2500
                      ? 'bg-[#087EBD]/20 border-[#087EBD] text-white font-bold'
                      : 'bg-[#111720] border-white/10 text-[#9DA7B3]'
                  }`}
                >
                  <span className="block font-semibold">Sạc Tại Nhà Riêng</span>
                  <span className="text-[11px] text-[#9DA7B3]">~2.500 VNĐ/kWh (Điện sinh hoạt)</span>
                </button>
              </div>
            </div>

            {/* Gasoline Comparison References */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
              <div>
                <span className="text-[11px] text-[#9DA7B3] block mb-1">
                  Giá Xăng RON 95
                </span>
                <div className="flex items-center bg-[#111720] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white">
                  <span>{gasolinePrice.toLocaleString('vi-VN')}</span>
                  <span className="text-[#9DA7B3] ml-1">đ/L</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#9DA7B3] block mb-1">
                  Mức Tiêu Hao Xe Xăng
                </span>
                <div className="flex items-center bg-[#111720] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white">
                  <span>{gasConsumptionPer100Km}</span>
                  <span className="text-[#9DA7B3] ml-1">Lít / 100km</span>
                </div>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div>
              <span className="text-xs font-bold text-[#9DA7B3] uppercase block mb-2">
                Chu Kỳ Thời Gian Đánh Giá
              </span>
              <div className="flex items-center gap-2">
                {[1, 3, 5].map((years) => (
                  <button
                    key={years}
                    onClick={() => setTimeframeYears(years)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      timeframeYears === years
                        ? 'bg-[#087EBD] text-white border-[#087EBD]'
                        : 'bg-[#111720] text-[#9DA7B3] border-white/10 hover:text-white'
                    }`}
                  >
                    {years} Năm
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Comparative Results & Savings Bar */}
          <div className="lg:col-span-6 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Highlight Total Savings */}
            <div className="bg-[#111720] border border-[#087EBD]/40 rounded-xl p-5 shadow-lg">
              <span className="text-xs font-bold tracking-widest text-[#087EBD] uppercase block mb-1">
                TIẾT KIỆM DỰ KIẾN TRONG {timeframeYears} NĂM
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums">
                {formatVNDExact(estimatedSavings)}
              </div>
              <p className="text-xs text-[#9DA7B3] mt-2">
                Bao gồm chênh lệch tiền nhiên liệu sạc điện và chi phí bảo dưỡng định kỳ không thay dầu động cơ.
              </p>
            </div>

            {/* Monthly Comparison Row */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* VinFast EV Box */}
              <div className="bg-[#111720] border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#087EBD] uppercase mb-2">
                  <Zap className="w-4 h-4" />
                  <span>{selectedVehicle.name}</span>
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {formatVNDExact(evTotalMonthly)}
                </div>
                <span className="text-[11px] text-[#9DA7B3] block mt-0.5">/ tháng</span>
                
                <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] text-[#9DA7B3] space-y-1">
                  <div className="flex justify-between">
                    <span>Sạc điện:</span>
                    <span className="text-white font-medium">{formatVNDExact(evMonthlyFuelCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bảo dưỡng:</span>
                    <span className="text-white font-medium">{formatVNDExact(evMonthlyMaintenance)}</span>
                  </div>
                </div>
              </div>

              {/* Gasoline Car Box */}
              <div className="bg-[#111720] border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#9DA7B3] uppercase mb-2">
                  <Fuel className="w-4 h-4" />
                  <span>Xe Xăng Cùng Cỡ</span>
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {formatVNDExact(gasTotalMonthly)}
                </div>
                <span className="text-[11px] text-[#9DA7B3] block mt-0.5">/ tháng</span>

                <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] text-[#9DA7B3] space-y-1">
                  <div className="flex justify-between">
                    <span>Tiền xăng:</span>
                    <span className="text-white font-medium">{formatVNDExact(gasMonthlyFuelCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bảo dưỡng:</span>
                    <span className="text-white font-medium">{formatVNDExact(gasMonthlyMaintenance)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Comparative Breakdown Visual Bars */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-white uppercase block">
                Tổng Chi Phí Sử Dụng Sau {timeframeYears} Năm ({timeframeYears * 12 * monthlyKm} km)
              </span>

              {/* EV Bar */}
              <div>
                <div className="flex justify-between text-xs text-[#C7CDD4] mb-1">
                  <span>VinFast {selectedVehicle.name}</span>
                  <span className="font-bold text-emerald-400 tabular-nums">{formatVNDExact(evPeriodCost)}</span>
                </div>
                <div className="w-full h-3 bg-[#171F29] rounded-full overflow-hidden">
                  <div
                    className="bg-[#087EBD] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(evPeriodCost / gasPeriodCost) * 100}%` }}
                  />
                </div>
              </div>

              {/* Gas Bar */}
              <div>
                <div className="flex justify-between text-xs text-[#C7CDD4] mb-1">
                  <span>Xe Xăng Truyền Thống</span>
                  <span className="font-bold text-[#9DA7B3] tabular-nums">{formatVNDExact(gasPeriodCost)}</span>
                </div>
                <div className="w-full h-3 bg-[#171F29] rounded-full overflow-hidden">
                  <div
                    className="bg-neutral-600 h-full rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Neutral Disclaimer */}
            <div className="pt-4 border-t border-white/5 flex items-start gap-2 text-[11px] text-[#9DA7B3] leading-relaxed">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#087EBD] mt-0.5" />
              <span>
                *Ước tính dựa trên dữ liệu người dùng nhập và thông số tiêu thụ tiêu chuẩn của nhà sản xuất. Chi phí thực tế có thể dao động tùy thuộc thói quen lái xe, tải trọng và biến động giá điện/xăng tại từng thời điểm.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
