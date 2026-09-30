import React, { useState } from 'react';
import { AdminContentArticle } from '../../types';

interface AdminContentTabProps {
  articles: AdminContentArticle[];
  onAddArticle: (article: Omit<AdminContentArticle, 'id' | 'views' | 'lastUpdated'>) => void;
  onUpdateArticle: (article: AdminContentArticle) => void;
  onDeleteArticle: (articleId: string) => void;
}

export const AdminContentTab: React.FC<AdminContentTabProps> = ({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AdminContentArticle | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AdminContentArticle['category']>('Educación SBS');
  const [summary, setSummary] = useState('');
  const [readTime, setReadTime] = useState('4 min');
  const [author, setAuthor] = useState('Equipo AlDía');
  const [isPublished, setIsPublished] = useState(true);

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    if (editingArticle) {
      onUpdateArticle({
        ...editingArticle,
        title: title.trim(),
        category,
        summary: summary.trim(),
        readTime,
        author,
        isPublished,
        lastUpdated: new Date().toISOString().split('T')[0],
      });
      setEditingArticle(null);
    } else {
      onAddArticle({
        title: title.trim(),
        category,
        summary: summary.trim(),
        readTime,
        author,
        isPublished,
      });
    }

    // Reset
    setTitle('');
    setSummary('');
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (article: AdminContentArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setSummary(article.summary);
    setReadTime(article.readTime);
    setAuthor(article.author);
    setIsPublished(article.isPublished);
    setIsAddModalOpen(true);
  };

  const handleTogglePublish = (article: AdminContentArticle) => {
    onUpdateArticle({
      ...article,
      isPublished: !article.isPublished,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar en guías SBS, artículos o contenidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder-slate-400 focus:border-[#0037b0] outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 bg-white focus:border-[#0037b0] outline-none cursor-pointer"
          >
            <option value="Todos">Todas las categorías</option>
            <option value="Educación SBS">Educación SBS</option>
            <option value="Negociación">Negociación</option>
            <option value="Presupuesto">Presupuesto</option>
            <option value="Tasas y TEA">Tasas y TEA</option>
            <option value="Derechos Financieros">Derechos Financieros</option>
          </select>
        </div>

        <button
          onClick={() => {
            setEditingArticle(null);
            setTitle('');
            setSummary('');
            setCategory('Educación SBS');
            setIsPublished(true);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#0037b0] hover:bg-[#002f99] active:scale-95 text-white font-label-md text-[13px] font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">post_add</span>
          <span>Nuevo Contenido</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.length === 0 ? (
          <div className="col-span-2 bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400">
            No se encontraron contenidos educativos para mostrar.
          </div>
        ) : (
          filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0037b0] font-bold text-[11px]">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        art.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          art.isPublished ? 'bg-emerald-600' : 'bg-slate-400'
                        }`}
                      ></span>
                      {art.isPublished ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-[15px] leading-snug mb-1.5">
                  {art.title}
                </h4>

                <p className="text-[13px] text-slate-600 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    {art.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">visibility</span>
                    {art.views.toLocaleString()} lecturas
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(art)}
                    title={art.isPublished ? 'Despublicar' : 'Publicar'}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {art.isPublished ? 'visibility_off' : 'check_circle'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(art)}
                    title="Editar contenido"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0037b0] hover:bg-blue-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>

                  <button
                    onClick={() => onDeleteArticle(art.id)}
                    title="Eliminar contenido"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">
                {editingArticle ? 'Editar Contenido' : 'Nuevo Contenido Educativo'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3.5 pt-4">
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Título del Artículo *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Cómo calcular el Costo Efectivo Anual (TCEA)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="Educación SBS">Educación SBS</option>
                    <option value="Negociación">Negociación</option>
                    <option value="Presupuesto">Presupuesto</option>
                    <option value="Tasas y TEA">Tasas y TEA</option>
                    <option value="Derechos Financieros">Derechos Financieros</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Tiempo de Lectura</label>
                  <input
                    type="text"
                    placeholder="ej. 4 min"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Resumen / Contenido *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe un resumen o las instrucciones clave para los usuarios..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Autor</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="publishCheck"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0037b0]"
                  />
                  <label htmlFor="publishCheck" className="text-[13px] font-bold text-slate-800 cursor-pointer">
                    Publicar de inmediato
                  </label>
                </div>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0037b0] text-white font-bold text-[13px] hover:bg-[#002f99] shadow-xs cursor-pointer"
                >
                  {editingArticle ? 'Actualizar' : 'Publicar Contenido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
