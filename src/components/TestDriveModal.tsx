import React, { useState, useEffect } from 'react';
import { VINFAST_VEHICLES, Vehicle } from '../data/vinfastData';
import { X, Calendar, Phone, CheckCircle2, User, Mail, MapPin, ArrowRight, Loader2 } from 'lucide-react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicle?: Vehicle | null;
  configNote?: string;
  onSuccessLead?: (lead: any) => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  preselectedVehicle,
  configNote,
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
    note: configNote || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  useEffect(() => {
    if (preselectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        carModel: preselectedVehicle.name,
        note: configNote || prev.note,
      }));
    }
  }, [preselectedVehicle, configNote]);

  if (!isOpen) return null;

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

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0D1117] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-5 right-5 p-2 text-[#9DA7B3] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 rounded-full transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-white/10 pb-4 pr-8">
              <span className="text-[10px] font-bold text-[#087EBD] uppercase tracking-widest block mb-1">
                TRẢI NGHIỆM THỰC TẾ
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                ĐĂNG KÝ LÁI THỬ VINFAST
              </h3>
              <p className="text-xs text-[#9DA7B3] mt-1">
                Cảm nhận trực tiếp công nghệ và hiệu năng đỉnh cao tại showroom hoặc tại nhà.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                  Họ và tên *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9DA7B3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#9DA7B3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                  Mẫu xe quan tâm *
                </label>
                <select
                  value={formData.carModel}
                  onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                  className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                >
                  {VINFAST_VEHICLES.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                  Showroom thuận tiện *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#9DA7B3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  >
                    {showrooms.map((sr) => (
                      <option key={sr} value={sr}>
                        {sr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                  Ngày lái thử dự kiến
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#9DA7B3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                  Email (Không bắt buộc)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9DA7B3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Note / Config */}
            <div>
              <label className="block text-[11px] font-semibold text-[#9DA7B3] uppercase mb-1">
                Yêu cầu riêng / Cấu hình
              </label>
              <textarea
                rows={2}
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Yêu cầu riêng về màu xe, phiên bản hoặc thời gian..."
                className="w-full bg-[#111720] border border-white/15 focus:border-[#087EBD] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
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
          </form>
        ) : (
          /* Success Card */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-display text-xl font-bold text-white">
              ĐÃ GHI NHẬN LỊCH HẸN
            </h3>

            <p className="text-xs text-[#9DA7B3] leading-relaxed max-w-sm mx-auto">
              Chuyên viên tư vấn VinFast sẽ liên hệ lại với Quý khách <span className="font-bold text-white">{formData.fullName}</span> qua số điện thoại <span className="font-bold text-white">{formData.phone}</span> để xác nhận lịch trải nghiệm mẫu xe {formData.carModel}.
            </p>

            <div className="bg-[#111720] border border-white/10 rounded-xl p-3 max-w-xs mx-auto text-xs text-left">
              <div className="flex justify-between">
                <span className="text-[#9DA7B3]">Mã lịch hẹn:</span>
                <span className="font-bold text-white">{submittedLeadId}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-xl transition-colors"
            >
              HOÀN TẤT
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
