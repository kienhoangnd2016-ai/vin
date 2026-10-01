import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { formatVNDExact, formatVND } from '../utils/formatters';
import { Calculator, HelpCircle, FileText, ArrowRight } from 'lucide-react';

interface LoanCalculatorProps {
  onRequestFinanceAdvice: (vehicle: Vehicle, summary: string) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onRequestFinanceAdvice }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    VINFAST_VEHICLES.find((v) => v.id === 'vf-6') || VINFAST_VEHICLES[2]
  );
  const [customPrice, setCustomPrice] = useState<number>(selectedVehicle.priceFrom);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5); // 5 years
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5.0); // 5% VinFast promo

  const handleVehicleChange = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCustomPrice(vehicle.priceFrom);
  };

  // Calculations
  const downPaymentAmount = Math.round((customPrice * downPaymentPercent) / 100);
  const loanPrincipal = customPrice - downPaymentAmount;
  const totalMonths = loanTenureYears * 12;
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Monthly payment calculation (Annuity amortization formula)
  let monthlyPayment = 0;
  let totalInterest = 0;

  if (monthlyInterestRate > 0 && totalMonths > 0) {
    monthlyPayment = Math.round(
      (loanPrincipal *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
    );
    totalInterest = Math.round(monthlyPayment * totalMonths - loanPrincipal);
  } else {
    monthlyPayment = Math.round(loanPrincipal / totalMonths);
  }

  const monthlyPrincipalShare = Math.round(loanPrincipal / totalMonths);
  const monthlyFirstMonthInterest = Math.round(loanPrincipal * monthlyInterestRate);

  const financeSummary = `${selectedVehicle.name} - Giá xe: ${formatVNDExact(customPrice)} - Trả trước: ${downPaymentPercent}% (${formatVNDExact(downPaymentAmount)}) - Vay: ${loanTenureYears} năm (${annualInterestRate}%/năm) - Trả hàng tháng: ~${formatVNDExact(monthlyPayment)}`;

  return (
    <section id="loan-calculator" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>KẾ HOẠCH TÀI CHÍNH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            DỰ TÍNH TRẢ GÓP LINH HOẠT
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Chính sách hợp tác cùng các ngân hàng hàng đầu với lãi suất ưu đãi cố định 5% trong 3 năm đầu, thủ tục thẩm định trực tuyến giải ngân nhanh.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Sliders & Presets */}
          <div className="lg:col-span-7 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            
            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
                01. CHỌN DÒNG XE CẦN TÍNH
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {VINFAST_VEHICLES.map((vehicle) => {
                  const isActive = selectedVehicle.id === vehicle.id;
                  return (
                    <button
                      key={vehicle.id}
                      onClick={() => handleVehicleChange(vehicle)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                        isActive
                          ? 'bg-[#087EBD] text-white shadow-md shadow-[#087EBD]/30'
                          : 'bg-[#111720] text-[#9DA7B3] hover:text-white border border-white/5'
                      }`}
                    >
                      {vehicle.name.replace('VinFast ', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Input & Display */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#9DA7B3] uppercase">
                  Giá Xe Niêm Yết
                </span>
                <span className="font-display text-lg font-bold text-white tabular-nums">
                  {formatVNDExact(customPrice)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomPrice(selectedVehicle.priceFrom)}
                  className={`px-3 py-1 text-xs rounded-md border ${
                    customPrice === selectedVehicle.priceFrom
                      ? 'bg-[#171F29] border-[#087EBD] text-white'
                      : 'bg-[#111720] border-white/10 text-[#9DA7B3]'
                  }`}
                >
                  Bản Thuê Pin ({formatVND(selectedVehicle.priceFrom)})
                </button>
                <button
                  onClick={() => setCustomPrice(selectedVehicle.priceTo)}
                  className={`px-3 py-1 text-xs rounded-md border ${
                    customPrice === selectedVehicle.priceTo
                      ? 'bg-[#171F29] border-[#087EBD] text-white'
                      : 'bg-[#111720] border-white/10 text-[#9DA7B3]'
                  }`}
                >
                  Bản Kèm Pin ({formatVND(selectedVehicle.priceTo)})
                </button>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#9DA7B3] uppercase">
                  Số Tiền Trả Trước ({downPaymentPercent}%)
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#087EBD] tabular-nums">
                  {formatVNDExact(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#171F29] rounded-lg appearance-none cursor-pointer accent-[#087EBD]"
              />
              <div className="flex justify-between text-[11px] text-[#9DA7B3] mt-1.5">
                <span>10% (Tối thiểu)</span>
                <span>20%</span>
                <span>50%</span>
                <span>80%</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#9DA7B3] uppercase">
                  Thời Gian Vay ({loanTenureYears} Năm = {loanTenureYears * 12} Tháng)
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-white tabular-nums">
                  {loanTenureYears} Năm
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-[#171F29] rounded-lg appearance-none cursor-pointer accent-[#087EBD]"
              />
              <div className="flex justify-between text-[11px] text-[#9DA7B3] mt-1.5">
                <span>1 Năm</span>
                <span>3 Năm</span>
                <span>5 Năm</span>
                <span>8 Năm (Tối đa)</span>
              </div>
            </div>

            {/* Interest Rate Options */}
            <div>
              <label className="block text-xs font-bold text-[#9DA7B3] uppercase mb-2">
                Lãi Suất Dự Kiến (% / Năm)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { rate: 5.0, label: '5.0% (Ưu Đãi VinFast)' },
                  { rate: 7.0, label: '7.0% (Thương Mại Tốt)' },
                  { rate: 8.5, label: '8.5% (Tiêu Chuẩn)' },
                ].map((item) => (
                  <button
                    key={item.rate}
                    onClick={() => setAnnualInterestRate(item.rate)}
                    className={`py-2 px-2.5 rounded-xl border text-xs transition-all ${
                      annualInterestRate === item.rate
                        ? 'bg-[#087EBD]/20 border-[#087EBD] text-white font-bold'
                        : 'bg-[#111720] border-white/10 text-[#9DA7B3] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Financial Breakdown & Monthly Cost Display */}
          <div className="lg:col-span-5 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold tracking-widest text-[#087EBD] uppercase block mb-1">
                KHOẢN THANH TOÁN ƯỚC TÍNH
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums mt-1">
                {formatVNDExact(monthlyPayment)}
                <span className="text-sm font-normal text-[#9DA7B3]"> / tháng</span>
              </div>
              <span className="text-xs text-[#9DA7B3] block mt-1">
                (Áp dụng theo phương thức dư nợ giảm dần hoặc niên kim)
              </span>
            </div>

            {/* Financial Details Table */}
            <div className="space-y-3 text-xs text-[#C7CDD4] border-b border-white/10 pb-6">
              
              <div className="flex items-center justify-between">
                <span className="text-[#9DA7B3]">Giá xe tham khảo:</span>
                <span className="font-bold text-white tabular-nums">{formatVNDExact(customPrice)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#9DA7B3]">Tiền trả trước ({downPaymentPercent}%):</span>
                <span className="font-bold text-[#087EBD] tabular-nums">{formatVNDExact(downPaymentAmount)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#9DA7B3]">Số tiền vay ngân hàng:</span>
                <span className="font-bold text-white tabular-nums">{formatVNDExact(loanPrincipal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#9DA7B3]">Thời gian vay:</span>
                <span className="font-bold text-white tabular-nums">{loanTenureYears} năm ({totalMonths} tháng)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#9DA7B3]">Lãi suất áp dụng:</span>
                <span className="font-bold text-emerald-400 tabular-nums">{annualInterestRate}% / năm</span>
              </div>

            </div>

            {/* Proportion Bar: Principal vs Interest */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#087EBD]" />
                  Tiền Gốc: {formatVND(loanPrincipal)}
                </span>
                <span className="flex items-center gap-1.5 text-[#9DA7B3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#171F29]" />
                  Tổng Lãi Dự Kiến: {formatVND(totalInterest)}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#171F29] overflow-hidden flex">
                <div
                  className="bg-[#087EBD] h-full"
                  style={{ width: `${(loanPrincipal / (loanPrincipal + totalInterest)) * 100}%` }}
                />
                <div
                  className="bg-white/20 h-full"
                  style={{ width: `${(totalInterest / (loanPrincipal + totalInterest)) * 100}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onRequestFinanceAdvice(selectedVehicle, financeSummary)}
              className="w-full py-3.5 px-4 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-xl transition-all shadow-lg shadow-[#087EBD]/25 flex items-center justify-center gap-2 uppercase"
            >
              <span>NHẬN TƯ VẤN PHƯƠNG ÁN TÀI CHÍNH</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mandatory Disclaimer */}
            <p className="text-[11px] text-[#9DA7B3] leading-relaxed border-t border-white/5 pt-4">
              *Số liệu chỉ mang tính chất ước tính và có thể thay đổi theo chính sách tín dụng thực tế của từng ngân hàng đối tác tại thời điểm giải ngân.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
