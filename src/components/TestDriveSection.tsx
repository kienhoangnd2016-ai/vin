import React, { useState } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { Calendar, Phone, CheckCircle2, User, Mail, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';

interface TestDriveSectionProps {
  preselectedVehicle?: Vehicle | null;
  onSuccessLead?: (lead: any) => void;
}

export const TestDriveSection: React.FC<TestDriveSectionProps> = ({
  preselectedVehicle,
  onSuccessLead,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    carModel: preselectedVehicle ? preselectedVehicle.name : 'VinFast VF 7 Plus AWD',
    city: 'Hà Nội (Vincom Mega Mall Ocean Park)',
    preferredDate: '',
    preferredTime: '09:00 - 11:30 (Sáng)',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  const showrooms = [
    'Hà Nội (Vincom Mega Mall Ocean Park)',
    'Hà Nội (Vincom Center Metropolis Liễu Giai)',
    'Hà Nội (Vincom Mega Mall Smart City)',
    'TP. Hồ Chí Minh (Vincom Landmark 81)',
    'TP. Hồ Chí Minh (Vincom Mega Mall Thảo Điền)',
    'TP. Hồ Chí Minh (Vincom Plaza Cộng Hòa)',
    'Đà Nẵng (Vincom Plaza Ngô Quyền)',
    'Hải Phòng (Vincom Plaza Imperia)',
    'Cần Thơ (Vincom Plaza Hùng Vương)',
    'Quảng Ninh (Vincom Plaza Hạ Long)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          leadType: 'test_drive',
        }),
      });

      const data = await response.json();
      setSubmittedLeadId(data.lead?.id || `VF-${Date.now().toString().slice(-6)}`);
      setIsSubmitted(true);
      if (onSuccessLead) onSuccessLead(data.lead);
    } catch (err) {
      setSubmittedLeadId(`VF-${Date.now().toString().slice(-6)}`);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="test-drive" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0D1117] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#087EBD]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-4">
                <span>TRẢI NGHIỆM THỰC TẾ</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] leading-[1.1] mb-5">
                ĐỪNG CHỈ XEM. <br />
                <span className="text-[#087EBD]">HÃY TRẢI NGHIỆM.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#9DA7B3] leading-relaxed mb-8">
                Cầm lái và cảm nhận trực tiếp khả năng tăng tốc không độ trễ, sự tĩnh lặng của khoang cabin và hệ thống trợ lái ADAS thông minh tại showroom hoặc tận nhà.
              </p>

              <div className="space-y-4 text-xs text-[#C7CDD4] border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111720] border border-white/10 flex items-center justify-center text-[#087EBD] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Miễn phí 100% dịch vụ lái thử chuyên sâu</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111720] border border-white/10 flex items-center justify-center text-[#087EBD] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Chuyên viên kỹ thuật đồng hành hướng dẫn tính năng</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111720] border border-white/10 flex items-center justify-center text-[#087EBD] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Tùy chọn lái thử tại showroom hoặc giao xe tận nhà</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Form or Confirmation View */}
            <div className="lg:col-span-7 bg-[#111720] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">
                    ĐĂNG KÝ THÔNG TIN LÁI THỬ
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#9DA7B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#9DA7B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0912 345 678"
                          className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                        Email (Nhận xác nhận)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#9DA7B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Car Model */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                        Mẫu xe lái thử *
                      </label>
                      <select
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {VINFAST_VEHICLES.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name} ({v.segment})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Showroom */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                        Showroom / Khu vực thuận tiện *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#9DA7B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                        >
                          {showrooms.map((sr) => (
                            <option key={sr} value={sr}>
                              {sr}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                        Ngày dự kiến lái thử
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#9DA7B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1.5">
                      Ghi chú thêm (Tùy chọn)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Ví dụ: Cần thử tính năng tự lùi đỗ xe hoặc trần kính toàn cảnh..."
                      className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-xl transition-all shadow-lg shadow-[#087EBD]/25 flex items-center justify-center gap-2 uppercase active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>XÁC NHẬN ĐĂNG KÝ LÁI THỬ</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <span className="block text-[10px] text-[#9DA7B3] text-center pt-2">
                    Bằng việc đăng ký, Quý khách đồng ý để chuyên viên tư vấn VinFast liên hệ hỗ trợ sắp xếp lịch lái thử thuận tiện nhất.
                  </span>
                </form>
              ) : (
                /* Confirmation Screen */
                <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    ĐĂNG KÝ THÀNH CÔNG!
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9DA7B3] max-w-md mx-auto leading-relaxed">
                    Cảm ơn Quý khách <span className="font-bold text-white">{formData.fullName}</span> đã đặt lịch trải nghiệm mẫu xe <span className="font-bold text-[#087EBD]">{formData.carModel}</span>.
                  </p>

                  <div className="bg-[#07090C] border border-white/10 rounded-xl p-4 max-w-sm mx-auto text-xs text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#9DA7B3]">Mã lịch hẹn:</span>
                      <span className="font-bold text-white">{submittedLeadId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9DA7B3]">Showroom:</span>
                      <span className="font-medium text-white truncate max-w-[200px]">{formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9DA7B3]">Hotline hỗ trợ:</span>
                      <span className="font-bold text-[#087EBD]">1900 23 23 89</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#9DA7B3]">
                    Chuyên viên VinFast sẽ gọi điện thoại xác nhận trong vòng 15 phút.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-block mt-4 px-5 py-2 text-xs font-semibold text-[#9DA7B3] hover:text-white bg-[#171F29] rounded-lg transition-colors"
                  >
                    Đăng ký cho mẫu xe khác
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
