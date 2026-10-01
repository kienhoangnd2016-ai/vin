import React, { useState, useEffect } from 'react';
import { X, Users, Calendar, FileText, Calculator, TrendingUp, Download, RefreshCw, Search } from 'lucide-react';
import { formatVND } from '../utils/formatters';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchLeadsAndStats = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/stats'),
      ]);
      const leadsData = await leadsRes.json();
      const statsData = await statsRes.json();
      setLeads(leadsData.leads || []);
      setStats(statsData || null);
    } catch (err) {
      console.error('Failed to load admin leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeadsAndStats();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLeads = leads.filter((l) => {
    const matchesType = filterType === 'all' || l.leadType === filterType;
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.carModel && l.carModel.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['Mã Lead', 'Họ Tên', 'Số ĐT', 'Mẫu Xe', 'Loại Yêu Cầu', 'Khu Vực', 'Thời Gian'];
    const rows = leads.map((l) => [
      l.id,
      l.fullName,
      l.phone,
      l.carModel,
      l.leadType,
      l.city || '',
      new Date(l.createdAt).toLocaleString('vi-VN'),
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vinfast_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#0D1117] border border-white/15 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#111720] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#087EBD]/20 border border-[#087EBD]/50 flex items-center justify-center text-[#087EBD]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                HỆ THỐNG QUẢN TRỊ LEADS & CHUYỂN ĐỔI SHOWROOM
              </h3>
              <span className="text-[11px] text-[#9DA7B3]">
                Dữ liệu trực tiếp theo thời gian thực (Real-time CRM)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeadsAndStats}
              disabled={isLoading}
              title="Làm mới dữ liệu"
              className="p-2 text-[#9DA7B3] hover:text-white bg-[#07090C] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportCSV}
              title="Xuất file CSV"
              className="p-2 text-[#9DA7B3] hover:text-white bg-[#07090C] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="p-2 text-[#9DA7B3] hover:text-white bg-[#07090C] rounded-lg border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-[#111720] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[#9DA7B3] text-xs font-semibold uppercase mb-2">
                <span>TỔNG SỐ LEADS</span>
                <Users className="w-4 h-4 text-[#087EBD]" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {stats?.totalLeads ?? leads.length}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                +14% so với tuần trước
              </span>
            </div>

            <div className="bg-[#111720] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[#9DA7B3] text-xs font-semibold uppercase mb-2">
                <span>ĐẶT LÁI THỬ</span>
                <Calendar className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {stats?.testDrives ?? leads.filter((l) => l.leadType === 'test_drive').length}
              </div>
              <span className="text-[10px] text-[#9DA7B3] mt-1 block">
                Tỷ lệ chuyển đổi: 42%
              </span>
            </div>

            <div className="bg-[#111720] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[#9DA7B3] text-xs font-semibold uppercase mb-2">
                <span>YÊU CẦU BÁO GIÁ</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {stats?.quoteRequests ?? leads.filter((l) => l.leadType === 'quote').length}
              </div>
              <span className="text-[10px] text-[#9DA7B3] mt-1 block">
                Chăm sóc trong 15 phút
              </span>
            </div>

            <div className="bg-[#111720] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[#9DA7B3] text-xs font-semibold uppercase mb-2">
                <span>TƯ VẤN TRẢ GÓP</span>
                <Calculator className="w-4 h-4 text-purple-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {stats?.financeRequests ?? leads.filter((l) => l.leadType === 'finance').length}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Gói lãi suất 5.0%
              </span>
            </div>

          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#111720] p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'all', label: 'Tất Cả' },
                { id: 'test_drive', label: 'Lái Thử' },
                { id: 'quote', label: 'Báo Giá' },
                { id: 'finance', label: 'Tài Chính' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    filterType === tab.id
                      ? 'bg-[#087EBD] text-white'
                      : 'text-[#9DA7B3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#9DA7B3] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên, SĐT, xe..."
                className="w-full bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-[#111720] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#07090C]/60 text-[#9DA7B3] uppercase text-[11px]">
                    <th className="p-3.5">Khách Hàng</th>
                    <th className="p-3.5">Số Điện Thoại</th>
                    <th className="p-3.5">Dòng Xe Quan Tâm</th>
                    <th className="p-3.5">Loại Yêu Cầu</th>
                    <th className="p-3.5">Showroom / Lịch Hẹn</th>
                    <th className="p-3.5">Thời Gian Gửi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {lead.fullName}
                      </td>
                      <td className="p-3.5 text-[#E8EBEF] font-mono">
                        {lead.phone}
                      </td>
                      <td className="p-3.5 text-[#087EBD] font-semibold">
                        {lead.carModel}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#087EBD]/15 text-[#087EBD] border border-[#087EBD]/30">
                          {lead.leadType === 'test_drive'
                            ? 'Lái Thử'
                            : lead.leadType === 'quote'
                            ? 'Báo Giá'
                            : lead.leadType === 'finance'
                            ? 'Trả Góp'
                            : 'Tư Vấn'}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#9DA7B3]">
                        {lead.city || 'Chưa chọn'}
                        {lead.preferredDate ? ` (${lead.preferredDate})` : ''}
                      </td>
                      <td className="p-3.5 text-[#9DA7B3] tabular-nums">
                        {new Date(lead.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#9DA7B3]">
                        Không có dữ liệu phù hợp với bộ lọc hiện tại.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
