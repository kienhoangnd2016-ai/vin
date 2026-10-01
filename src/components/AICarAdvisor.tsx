import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/vinfastData';

interface AICarAdvisorProps {
  onOpenTestDrive: (vehicle?: Vehicle) => void;
  onSelectVehicleById?: (id: string) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AICarAdvisor: React.FC<AICarAdvisorProps> = ({ onOpenTestDrive }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Xin chào Quý khách! Tôi là Trợ Lý Xe Thông Minh của Showroom VinFast. Quý khách đang tìm kiếm một mẫu xe phù hợp với ngân sách, cự ly di chuyển hàng ngày hay công năng sử dụng cho gia đình? Hãy chia sẻ mong muốn của Quý khách.',
      timestamp: 'Vừa xong',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Tôi có ngân sách 700 triệu, nên chọn xe nào?',
    'Tôi đi 50 km/ngày trong phố, xe nào tối ưu?',
    'VF 6 và VF 7 khác nhau thế nào?',
    'Gia đình tôi 5 người cần xe đi lại cuối tuần.',
    'Chính sách bảo hành và trạm sạc VinFast ra sao?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Xin lỗi, tôi chưa thể trả lời câu hỏi này.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      const fallbackReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Hiện tại hệ thống đang đồng bộ dữ liệu. Quý khách có thể xem nhanh các dòng xe tại mục Dòng Xe hoặc đăng ký tư vấn trực tiếp cùng chuyên viên.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TƯ VẤN CÔNG NGHỆ THÔNG MINH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            TRỢ LÝ XE THÔNG MINH
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Giải đáp mọi băn khoăn về thông số kỹ thuật, so sánh các phiên bản và ước tính tài chính dựa trên dữ liệu xe điện VinFast chính thống.
          </p>
        </div>

        {/* Chat Console Frame */}
        <div className="max-w-4xl mx-auto bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[620px]">
          
          {/* Chat Header Bar */}
          <div className="px-6 py-4 bg-[#111720] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Minimalist V-Avatar */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#171F29] to-[#07090C] border border-[#087EBD]/50 flex items-center justify-center shadow-lg shadow-[#087EBD]/20">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                  <path d="M12 21L3 6h4l5 9 5-9h4L12 21z" fill="#087EBD" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wider uppercase">
                  TRỢ LÝ VINFAST AI
                </h3>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sẵn sàng tư vấn trực tuyến
                </span>
              </div>
            </div>

            <button
              onClick={() => onOpenTestDrive()}
              className="text-xs font-semibold text-[#087EBD] hover:text-white px-3 py-1.5 rounded-lg border border-[#087EBD]/40 hover:bg-[#087EBD] transition-colors"
            >
              Đăng Ký Lái Thử
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs sm:text-sm ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-[#111720] border border-[#087EBD]/40 flex items-center justify-center text-[#087EBD] shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 leading-relaxed whitespace-pre-line shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-[#087EBD] text-white rounded-tr-none'
                      : 'bg-[#111720] text-[#E8EBEF] border border-white/10 rounded-tl-none font-normal'
                  }`}
                >
                  {msg.text}
                  <span
                    className={`block text-[10px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#9DA7B3]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#171F29] border border-white/10 flex items-center justify-center text-[#9DA7B3] shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 text-xs justify-start">
                <div className="w-7 h-7 rounded-lg bg-[#111720] border border-[#087EBD]/40 flex items-center justify-center text-[#087EBD] shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#111720] text-[#9DA7B3] border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#087EBD]" />
                  <span>Trợ lý đang phân tích dữ liệu xe...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-6 py-2 bg-[#07090C]/60 border-t border-white/5 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-[11px] text-[#9DA7B3] shrink-0">Gợi ý:</span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs text-[#C7CDD4] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 hover:border-[#087EBD]/50 rounded-lg whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#111720] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn (Ví dụ: Tư vấn xe 5 chỗ đi hàng ngày tiết kiệm)..."
                disabled={isLoading}
                className="flex-1 bg-[#07090C] border border-white/15 focus:border-[#087EBD] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#9DA7B3] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-[#087EBD] hover:bg-[#0A96D8] disabled:opacity-40 text-white rounded-xl transition-all shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <span className="block text-[10px] text-[#9DA7B3]/80 mt-2 text-center">
              *Thông tin tư vấn mang tính tham khảo. Quý khách vui lòng xác nhận thông số, giá bán và chính sách hiện hành với tư vấn viên trước khi giao dịch.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
