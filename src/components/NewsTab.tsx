import React from 'react';
import { useApp } from '../context/AppContext';
import { NewsItem } from '../types';
import { Newspaper, Calendar, User, Plus, Edit3, Trash2, ArrowRight, Mail } from 'lucide-react';

export const NewsTab: React.FC = () => {
  const { news, isAdmin, t, theme, searchQuery, deleteNews, openAdminModal, selectedNewsItem, setSelectedNewsItem, language } = useApp();

  const filteredNews = news.filter(item => {
    const titleText = item.title[language] || item.title['en'] || '';
    const summaryText = item.summary[language] || item.summary['en'] || '';
    const q = searchQuery.toLowerCase();
    return titleText.toLowerCase().includes(q) || summaryText.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('news')}
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Latest breaking stories, match reports, and transfer updates
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => openAdminModal('news', null)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNew')}</span>
          </button>
        )}
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-base font-semibold">No news articles found</p>
          <p className="text-xs text-slate-400 mt-1">Try searching for something else</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item: NewsItem) => {
            const title = item.title[language] || item.title['en'];
            const summary = item.summary[language] || item.summary['en'];

            return (
              <div
                key={item.id}
                className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
                }`}
              >
                {/* Image & Category */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-extrabold shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openAdminModal('news', item);
                        }}
                        className="p-1 text-slate-300 hover:text-white transition-colors"
                        title={t('edit')}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('دڵنیای لە سڕینەوەی ئەم هەواڵە؟')) {
                            deleteNews(item.id);
                          }
                        }}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title={t('delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`flex items-center gap-4 text-xs mb-2.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item.date} {item.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item.author}</span>
                      </div>
                    </div>

                    <h2 className="font-bold text-base sm:text-lg leading-snug mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {title}
                    </h2>

                    <p className={`text-xs sm:text-sm line-clamp-3 mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      {summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedNewsItem(item)}
                    className="flex items-center gap-2 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors self-start mt-auto"
                  >
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* News Detail Modal with Gmail Share */}
      {selectedNewsItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                {selectedNewsItem.category}
              </span>
              <button
                onClick={() => setSelectedNewsItem(null)}
                className={`p-2 rounded-full border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold mb-4 leading-tight">
              {selectedNewsItem.title[language] || selectedNewsItem.title['en']}
            </h2>

            <div className={`flex items-center gap-4 text-xs mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>{selectedNewsItem.date} {selectedNewsItem.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                <span>{selectedNewsItem.author}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 max-h-80 bg-slate-800">
              <img 
                src={selectedNewsItem.imageUrl} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`text-sm sm:text-base leading-relaxed space-y-4 mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>{selectedNewsItem.content[language] || selectedNewsItem.content['en']}</p>
            </div>

            {/* Gmail Share & Close Actions */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(selectedNewsItem.title[language] || selectedNewsItem.title['en'])}&body=${encodeURIComponent(selectedNewsItem.content[language] || selectedNewsItem.content['en'])}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Share via Gmail</span>
              </a>

              <button
                onClick={() => setSelectedNewsItem(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
