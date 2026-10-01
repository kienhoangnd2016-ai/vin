import React, { useState } from 'react';
import { VINFAST_ARTICLES, Article } from '../data/vinfastData';
import { BookOpen, ArrowUpRight, Clock, Calendar } from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', label: 'TẤT CẢ' },
    { id: 'TIN XE', label: 'TIN XE' },
    { id: 'CÔNG NGHỆ', label: 'CÔNG NGHỆ' },
    { id: 'HƯỚNG DẪN SẠC', label: 'HƯỚNG DẪN SẠC' },
    { id: 'TÀI CHÍNH / MUA XE', label: 'TÀI CHÍNH / MUA XE' },
  ];

  const filteredArticles = activeCategory === 'all'
    ? VINFAST_ARTICLES
    : VINFAST_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <section id="news" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>KIẾN THỨC & CẬP NHẬT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
              TIN TỨC & CẨM NANG XE ĐIỆN
            </h2>
            <p className="text-sm sm:text-base text-[#9DA7B3] mt-2 max-w-xl">
              Cập nhật những đánh giá chuyên sâu, kinh nghiệm sử dụng thực tế và hướng dẫn tận dụng tối đa hệ sinh thái sạc V-Green.
            </p>
          </div>

          {/* Categories Tab */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0D1117] border border-white/10 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#087EBD] text-white'
                    : 'text-[#9DA7B3] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-[#087EBD]/50 hover:bg-[#111720] transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl"
            >
              <div>
                {/* Unboxed Metadata Discipline */}
                <div className="flex items-center gap-2 text-xs text-[#9DA7B3] mb-3">
                  <span className="font-semibold text-[#087EBD]">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime} đọc</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#087EBD] transition-colors leading-snug mb-3">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9DA7B3] leading-relaxed line-clamp-3 mb-6">
                  {art.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#C7CDD4] group-hover:text-white">
                <span>ĐỌC BÀI VIẾT</span>
                <ArrowUpRight className="w-4 h-4 text-[#087EBD] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Article Modal Reader */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="bg-[#0D1117] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto">
              <div className="flex items-center gap-2 text-xs text-[#9DA7B3] mb-2">
                <span className="font-bold text-[#087EBD]">{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime} đọc</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {selectedArticle.title}
              </h3>
              <p className="text-sm text-[#C7CDD4] leading-relaxed mb-4 font-normal">
                {selectedArticle.snippet}
              </p>
              <div className="text-sm text-[#9DA7B3] leading-relaxed whitespace-pre-line border-t border-white/10 pt-4">
                {selectedArticle.content}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#087EBD] rounded-lg"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
