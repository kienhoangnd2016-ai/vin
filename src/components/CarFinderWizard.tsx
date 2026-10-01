import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { formatVND } from '../utils/formatters';
import { CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, ArrowRight, Zap, Shield, Users } from 'lucide-react';

interface CarFinderWizardProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
  onCompareVehicles: (carIds: string[]) => void;
  onOpenTestDrive: (vehicle: Vehicle) => void;
}

export const CarFinderWizard: React.FC<CarFinderWizardProps> = ({
  onSelectVehicle,
  onCompareVehicles,
  onOpenTestDrive,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    budget: '',
    dailyKm: '',
    purpose: '',
    seats: '',
    priority: '',
    payment: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      step: 1,
      question: 'Ngân sách dự kiến của bạn?',
      options: [
        { label: 'Dưới 500 triệu', value: 'under-500', desc: 'Dễ dàng tiếp cận, chi phí lăn bánh tối ưu' },
        { label: '500 – 700 triệu', value: '500-700', desc: 'SUV đô thị năng động, trang bị thông minh' },
        { label: '700 triệu – 1 tỷ', value: '700-1000', desc: 'Crossover phong cách, hiệu năng mạnh mẽ' },
        { label: '1 – 1.5 tỷ', value: '1000-1500', desc: 'SUV thông minh toàn cầu, dẫn động 4 bánh AWD' },
        { label: 'Trên 1.5 tỷ', value: 'over-1500', desc: 'Full-size Flagship E-SUV thương gia tối thượng' },
      ],
      field: 'budget',
    },
    {
      step: 2,
      question: 'Bạn thường di chuyển bao nhiêu km mỗi ngày?',
      options: [
        { label: 'Dưới 30 km / ngày', value: 'under-30', desc: 'Đi làm công sở, đưa đón con nhỏ trong phố' },
        { label: '30 – 60 km / ngày', value: '30-60', desc: 'Di chuyển ngoại thành hoặc cung đường kết hợp' },
        { label: '60 – 100 km / ngày', value: '60-100', desc: 'Gặp gỡ đối tác liên tục, công tác vệ tinh' },
        { label: 'Trên 100 km / ngày', value: 'over-100', desc: 'Chạy đường dài, liên tỉnh thường xuyên' },
      ],
      field: 'dailyKm',
    },
    {
      step: 3,
      question: 'Mục đích sử dụng chính của bạn?',
      options: [
        { label: 'Trong thành phố', value: 'city', desc: 'Linh hoạt phố nhỏ, dễ đậu xe' },
        { label: 'Gia đình & Cuối tuần', value: 'family', desc: 'Êm ái, an toàn cho trẻ em và người lớn tuổi' },
        { label: 'Đường dài & Cao tốc', value: 'highway', desc: 'Ổn định tốc độ cao, đầm chắc, pin dung lượng lớn' },
        { label: 'Công việc & Gặp khách', value: 'business', desc: 'Lịch lãm, khẳng định vị thế và hình ảnh' },
        { label: 'Kết hợp đa dụng', value: 'all', desc: 'Đáp ứng toàn diện mọi nhu cầu cuộc sống' },
      ],
      field: 'purpose',
    },
    {
      step: 4,
      question: 'Bạn cần bao nhiêu chỗ ngồi?',
      options: [
        { label: '2 – 4 Chỗ', value: '4', desc: 'Gọn gàng, cá tính cho cá nhân hoặc gia đình nhỏ' },
        { label: '5 Chỗ Tiêu Chuẩn', value: '5', desc: 'Không gian phổ biến và cân đối nhất' },
        { label: '6 – 7 Chỗ Rộng Rãi', value: '7', desc: 'Ghế cơ trưởng VIP hoặc 3 hàng ghế thoải mái' },
      ],
      field: 'seats',
    },
    {
      step: 5,
      question: 'Điều bạn quan tâm nhất khi chọn xe?',
      options: [
        { label: 'Giá & Chi phí sở hữu', value: 'cost', desc: 'Tiết kiệm tiền mua ban đầu và tiền sạc hàng tháng' },
        { label: 'Tiết kiệm nhiên liệu & Pin', value: 'range', desc: 'Quãng đường đi xa nhất sau một lần sạc' },
        { label: 'Hiệu năng & Tốc độ', value: 'performance', desc: 'Mã lực lớn, tăng tốc dính lưng, dẫn động AWD' },
        { label: 'Công nghệ & Hỗ trợ lái ADAS', value: 'tech', desc: 'Tự giữ làn, camera 360, trợ lý giọng nói ViVi' },
        { label: 'Không gian & Tiện nghi sang trọng', value: 'luxury', desc: 'Ghế da thật, massage, trần kính toàn cảnh' },
        { label: 'An toàn tối thượng 5 Sao', value: 'safety', desc: 'Nhiều túi khí, thép cường độ cao, khung gầm vững chắc' },
      ],
      field: 'priority',
    },
    {
      step: 6,
      question: 'Hình thức thanh toán dự kiến của bạn?',
      options: [
        { label: 'Trả thẳng một lần', value: 'cash', desc: 'Hưởng chiết khấu thanh toán sớm tốt nhất' },
        { label: 'Trả góp linh hoạt qua ngân hàng', value: 'loan', desc: 'Chỉ cần trả trước 20-30%, hỗ trợ lãi suất cố định' },
      ],
      field: 'payment',
    },
  ];

  const handleSelectOption = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({
      budget: '',
      dailyKm: '',
      purpose: '',
      seats: '',
      priority: '',
      payment: '',
    });
    setCurrentStep(1);
    setIsCompleted(false);
  };

  // Matching algorithm based on user questionnaire
  const getRecommendedVehicles = () => {
    return VINFAST_VEHICLES.map((vehicle) => {
      let score = 50;
      let reasons: string[] = [];

      // Budget fit
      if (answers.budget === 'under-500') {
        if (vehicle.id === 'vf-3') { score += 40; reasons.push('Mức giá dưới 330 triệu, vừa vặn ngân sách'); }
        if (vehicle.id === 'vf-5-plus') { score += 30; reasons.push('Phiên bản thuê pin chỉ từ 468 triệu'); }
      } else if (answers.budget === '500-700') {
        if (vehicle.id === 'vf-5-plus') { score += 40; reasons.push('Ngân sách lý tưởng để sở hữu bản kèm pin'); }
        if (vehicle.id === 'vf-6') { score += 35; reasons.push('Phiên bản Base chạm ngưỡng ngân sách của bạn'); }
      } else if (answers.budget === '700-1000') {
        if (vehicle.id === 'vf-6') { score += 40; reasons.push('Bản Plus đầy đủ ADAS Level 2 chỉ 765 triệu'); }
        if (vehicle.id === 'vf-7') { score += 38; reasons.push('VF 7 Base từ 850 triệu mang phong cách phi thuyền'); }
      } else if (answers.budget === '1000-1500') {
        if (vehicle.id === 'vf-7') { score += 40; reasons.push('VF 7 Plus AWD 349 mã lực trần kính toàn cảnh'); }
        if (vehicle.id === 'vf-8') { score += 40; reasons.push('D-SUV chuẩn toàn cầu dẫn động AWD 402 mã lực'); }
      } else if (answers.budget === 'over-1500') {
        if (vehicle.id === 'vf-9') { score += 45; reasons.push('E-SUV Full-size đầu bảng, không gian ghế cơ trưởng VIP'); }
        if (vehicle.id === 'vf-8') { score += 35; reasons.push('VF 8 Plus bản cao cấp nhất'); }
      }

      // Seating fit
      if (answers.seats === '4' && vehicle.seats === 4) {
        score += 25;
        reasons.push('Thiết kế 4 chỗ tối ưu cho nhu cầu của bạn');
      } else if (answers.seats === '5' && vehicle.seats === 5) {
        score += 20;
        reasons.push('5 chỗ tiêu chuẩn rộng rãi, thoải mái');
      } else if (answers.seats === '7') {
        if (vehicle.seats >= 6) {
          score += 40;
          reasons.push('Cấu hình 6 hoặc 7 chỗ hoàn hảo cho đại gia đình');
        } else {
          score -= 30;
        }
      }

      // Priority fit
      if (answers.priority === 'performance' && (vehicle.id === 'vf-7' || vehicle.id === 'vf-8')) {
        score += 30;
        reasons.push('Công suất lên tới 349 - 402 mã lực, tăng tốc tức thì');
      }
      if (answers.priority === 'cost' && (vehicle.id === 'vf-3' || vehicle.id === 'vf-5-plus')) {
        score += 30;
        reasons.push('Chi phí đầu tư và chi phí sạc tiết kiệm hàng đầu');
      }
      if (answers.priority === 'range' && (vehicle.rangeKm >= 450)) {
        score += 25;
        reasons.push(`Tầm hoạt động lớn ${vehicle.rangeKm} km, an tâm đường dài`);
      }
      if (answers.priority === 'luxury' && vehicle.id === 'vf-9') {
        score += 35;
        reasons.push('Đẳng cấp thương gia với ghế massage và điều hòa 3 vùng');
      }

      return {
        vehicle,
        score,
        reason: reasons[0] || vehicle.whyBuyReasons[0],
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  };

  const recommended = isCompleted ? getRecommendedVehicles() : [];
  const currentStepData = steps[currentStep - 1];

  return (
    <section id="car-finder" className="py-20 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <span>CÔNG CỤ THÔNG MINH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FA]">
            TÌM CHIẾC XE DÀNH CHO BẠN
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Trả lời vài câu hỏi ngắn. Chúng tôi sẽ giúp bạn thu hẹp lựa chọn chính xác theo nhu cầu thực tế.
          </p>
        </div>

        {/* Wizard Container */}
        {!isCompleted ? (
          <div className="max-w-3xl mx-auto bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            
            {/* Step Progress Counter */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-[#087EBD] uppercase">
                  BƯỚC 0{currentStep}
                </span>
                <span className="text-xs text-[#9DA7B3]">/ 06</span>
              </div>
              <div className="w-36 sm:w-48 h-1.5 bg-[#171F29] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#087EBD] to-[#0A96D8] transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] mb-6">
              {currentStepData.question}
            </h3>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {currentStepData.options.map((opt) => {
                const isSelected = (answers as any)[currentStepData.field] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(currentStepData.field, opt.value)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 group ${
                      isSelected
                        ? 'bg-[#087EBD]/15 border-[#087EBD] shadow-[0_0_15px_rgba(8,126,189,0.2)]'
                        : 'bg-[#111720] border-white/10 hover:border-white/25 hover:bg-[#171F29]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-bold text-white group-hover:text-[#087EBD] transition-colors">
                        {opt.label}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-[#087EBD]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/50" />
                      )}
                    </div>
                    <span className="text-xs text-[#9DA7B3] mt-1.5 line-clamp-2">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Back Navigation Button */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9DA7B3] hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại câu trước</span>
                </button>
              ) : (
                <div />
              )}
              <span className="text-[11px] text-[#9DA7B3]">
                Nhấp vào câu trả lời để tự động chuyển tiếp
              </span>
            </div>

          </div>
        ) : (
          /* Results View */
          <div className="max-w-6xl mx-auto animate-in fade-in duration-400">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
              <div>
                <span className="text-xs font-bold text-[#087EBD] uppercase tracking-wider block">
                  KẾT QUẢ TƯ VẤN THÔNG MINH
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  3 MẪU XE PHÙ HỢP NHẤT VỚI BẠN
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#9DA7B3] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại trắc nghiệm</span>
              </button>
            </div>

            {/* 3 Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map(({ vehicle, reason }, idx) => (
                <div
                  key={vehicle.id}
                  className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden hover:border-[#087EBD]/60 transition-all duration-300 flex flex-col group shadow-xl"
                >
                  {/* Vehicle Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111720]">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-[#07090C]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-[#087EBD] tracking-wider uppercase border border-white/10">
                      GỢI Ý #{idx + 1}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs font-medium text-[#9DA7B3]">{vehicle.segment}</span>
                        <span className="text-xs font-semibold text-[#C7CDD4]">{vehicle.seats} Chỗ</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#087EBD] transition-colors">
                        {vehicle.name}
                      </h4>
                      <p className="text-sm font-semibold text-[#E8EBEF] mb-3">
                        Từ {formatVND(vehicle.priceFrom)}
                      </p>

                      {/* Matching rationale box */}
                      <div className="bg-[#111720] border border-white/5 rounded-lg p-3 mb-4">
                        <span className="text-[11px] font-semibold text-[#087EBD] uppercase tracking-wider block mb-1">
                          Lý do phù hợp:
                        </span>
                        <p className="text-xs text-[#C7CDD4] leading-relaxed">
                          {reason}
                        </p>
                      </div>

                      {/* Key Quick Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#9DA7B3] mb-4">
                        <div>
                          <span className="block text-[10px] uppercase text-[#9DA7B3]/70">Tầm hoạt động</span>
                          <span className="font-semibold text-white tabular-nums">{vehicle.rangeKm} km</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase text-[#9DA7B3]/70">Công suất</span>
                          <span className="font-semibold text-white tabular-nums">{vehicle.powerHp} HP</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        className="w-full py-2 text-xs font-semibold text-[#F5F7FA] bg-[#111720] hover:bg-[#171F29] border border-white/10 rounded-lg transition-colors text-center"
                      >
                        Chi Tiết
                      </button>
                      <button
                        onClick={() => onOpenTestDrive(vehicle)}
                        className="w-full py-2 text-xs font-bold text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-lg transition-colors text-center shadow-md shadow-[#087EBD]/20"
                      >
                        Lái Thử
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Jump CTA */}
            <div className="mt-8 text-center bg-[#111720]/60 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-[#C7CDD4]">
                Bạn muốn đối chiếu chi tiết 3 mẫu xe này trên cùng một bảng thông số?
              </span>
              <button
                onClick={() => onCompareVehicles(recommended.map((r) => r.vehicle.id))}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-lg transition-colors whitespace-nowrap shadow-md"
              >
                <span>SO SÁNH 3 MẪU XE NÀY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
