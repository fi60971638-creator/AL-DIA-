import React, { useState, useEffect, useMemo } from 'react';
import { TabType } from '../../types';
import {
  ProductItem,
  PRODUCT_CATEGORIES,
  INITIAL_PRODUCTS,
  MarketCategoryDef,
} from '../../data/marketData';

interface MarketScreenProps {
  onNavigate: (tab: TabType) => void;
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

export const MarketScreen: React.FC<MarketScreenProps> = ({ onNavigate }) => {
  // 1. Products state (allows demo price editing with localStorage persistence)
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const savedPrices = localStorage.getItem('aldia_market_custom_prices');
      if (savedPrices) {
        const priceMap: Record<string, number> = JSON.parse(savedPrices);
        return INITIAL_PRODUCTS.map((p) => ({
          ...p,
          price: typeof priceMap[p.id] === 'number' ? priceMap[p.id] : p.price,
        }));
      }
    } catch (e) {
      console.warn('Error reading stored custom prices', e);
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Shopping Cart state (persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('aldia_market_cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (e) {
      console.warn('Error reading cart from localStorage', e);
    }
    return [];
  });

  // 3. Filters & Search state
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'utiles' | 'oficina' | 'diario'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // 4. Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [tempPriceInput, setTempPriceInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // 5. WhatsApp commercial number configuration (no invented fake number)
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    try {
      return localStorage.getItem('aldia_market_whatsapp_number') || '';
    } catch {
      return '';
    }
  });
  const [tempWhatsappInput, setTempWhatsappInput] = useState(whatsappNumber);
  const [isEditingWhatsapp, setIsEditingWhatsapp] = useState(false);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aldia_market_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Toast auto-hide
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Cart helper calculations
  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todos: products.length,
      utiles: 0,
      oficina: 0,
      diario: 0,
    };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setToastMessage(`«${product.name}» agregado al carrito`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    if (window.confirm('¿Deseas vaciar todos los productos del carrito?')) {
      setCart([]);
    }
  };

  // Demo price editing functions
  const handleOpenEditPrice = (product: ProductItem) => {
    setEditingProduct(product);
    setTempPriceInput(product.price.toFixed(2));
  };

  const handleSavePrice = () => {
    if (!editingProduct) return;
    const num = parseFloat(tempPriceInput.replace(',', '.'));
    if (isNaN(num) || num < 0) {
      alert('Por favor ingresa un precio válido en soles.');
      return;
    }

    const updated = products.map((p) =>
      p.id === editingProduct.id ? { ...p, price: num } : p
    );
    setProducts(updated);

    // Save to localStorage map
    try {
      const savedPrices = localStorage.getItem('aldia_market_custom_prices');
      const priceMap: Record<string, number> = savedPrices ? JSON.parse(savedPrices) : {};
      priceMap[editingProduct.id] = num;
      localStorage.setItem('aldia_market_custom_prices', JSON.stringify(priceMap));
    } catch (e) {
      console.warn('Error saving price', e);
    }

    // Also update in cart if present
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === editingProduct.id
          ? { ...item, product: { ...item.product, price: num } }
          : item
      )
    );

    setToastMessage(`Precio de «${editingProduct.name}» actualizado a S/ ${num.toFixed(2)}`);
    setEditingProduct(null);
  };

  const handleResetPrices = () => {
    if (window.confirm('¿Restablecer los precios de todos los productos a sus valores iniciales de demostración?')) {
      localStorage.removeItem('aldia_market_custom_prices');
      setProducts(INITIAL_PRODUCTS);
      setCart((prev) =>
        prev.map((item) => {
          const orig = INITIAL_PRODUCTS.find((p) => p.id === item.product.id);
          return orig ? { ...item, product: orig } : item;
        })
      );
      setToastMessage('Precios de demostración restablecidos');
    }
  };

  // WhatsApp configuration
  const handleSaveWhatsappNumber = () => {
    const clean = tempWhatsappInput.replace(/[^0-9]/g, '').trim();
    setWhatsappNumber(clean);
    localStorage.setItem('aldia_market_whatsapp_number', clean);
    setIsEditingWhatsapp(false);
    setToastMessage(clean ? 'Número comercial de WhatsApp guardado' : 'Número eliminado');
  };

  // Generate order summary text
  const generateOrderSummary = () => {
    let text = `*PEDIDO AL DÍA MARKET*\n`;
    text += `Fecha: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `------------------------------------\n`;
    cart.forEach((item, index) => {
      const sub = item.product.price * item.quantity;
      text += `${index + 1}. ${item.product.name}\n`;
      text += `   Cantidad: ${item.quantity} ${item.product.unit} x S/ ${item.product.price.toFixed(2)} = S/ ${sub.toFixed(2)}\n`;
    });
    text += `------------------------------------\n`;
    text += `*TOTAL DEL PEDIDO: S/ ${totalAmount.toFixed(2)}*\n\n`;
    text += `_Nota: Pedido generado desde el catálogo AL DÍA Market. Por favor confirmar disponibilidad y método de entrega._`;
    return text;
  };

  const handleSendWhatsapp = () => {
    if (!whatsappNumber) {
      setIsEditingWhatsapp(true);
      return;
    }
    const message = encodeURIComponent(generateOrderSummary());
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateOrderSummary());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="flex flex-col gap-7 max-w-6xl mx-auto pb-16 fade-in text-slate-800">
      {/* ============================================================== */}
      {/* 1. ENCABEZADO DE AL DÍA MARKET - TIENDA VIRTUAL COTIDIANA      */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2.5 max-w-2xl text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[11.5px] font-bold border border-sky-200">
              <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">storefront</span>
              <span>Tienda Virtual de Productos Cotidianos</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Precios en Soles (S/)
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-heading font-extrabold text-[#0B3B60] tracking-tight leading-tight">
            AL DÍA Market
          </h1>

          <p className="text-[14px] sm:text-[15px] text-slate-600 font-sans leading-relaxed">
            Encuentra todo lo necesario para tus actividades diarias: útiles escolares completos, insumos de oficina y artículos prácticos de uso cotidiano con precios claros y pedido organizado.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11.5px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="material-symbols-outlined text-[15px] text-[#007EAF]">price_check</span>
              Precios de demostración editables
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="material-symbols-outlined text-[15px] text-[#007EAF]">shopping_bag</span>
              Carrito interactivo con revisión de pedido
            </span>
            <span>·</span>
            <button
              onClick={handleResetPrices}
              className="text-[#007EAF] hover:text-[#0B3B60] hover:underline cursor-pointer"
              title="Restablecer precios iniciales de muestra"
            >
              Restablecer precios de demo
            </button>
          </div>
        </div>

        {/* Botón Flotante / Acceso rápido al carrito */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#0B3B60] hover:bg-[#082E4D] active:scale-95 text-white font-heading font-bold text-[14px] transition-all flex items-center justify-between sm:justify-center gap-3 shadow-md cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#00A3E0] group-hover:scale-110 transition-transform">
                shopping_cart
              </span>
              <span>Ver mi Carrito</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#00A3E0] text-white text-[12px] font-black">
                {totalItemsCount}
              </span>
              <span className="text-[13px] text-sky-200 font-semibold border-l border-white/20 pl-2">
                S/ {totalAmount.toFixed(2)}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. BUSCADOR Y ACCESOS VISUALES A LAS CATEGORÍAS                 */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-4">
        {/* Barra de búsqueda interactiva */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-[22px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por producto (cuaderno, lapicero, engrapador, tomatodo, tijeras, notas...)"
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 shadow-2xs font-sans transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              title="Borrar búsqueda"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Accesos visuales a las categorías en tarjetas / chips enriquecidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group ${
                  isActive
                    ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-md -translate-y-0.5'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-white/20 text-[#00A3E0]'
                        : 'bg-sky-50 text-[#007EAF] border border-sky-100'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {cat.icon}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count} {count === 1 ? 'ítem' : 'ítems'}
                  </span>
                </div>

                <div>
                  <h3 className="text-[14px] sm:text-[15px] font-heading font-bold block leading-snug">
                    {cat.label}
                  </h3>
                  <p
                    className={`text-[11px] font-sans line-clamp-1 mt-0.5 ${
                      isActive ? 'text-sky-200' : 'text-slate-500'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. GRILLA DE PRODUCTOS EN TARJETAS                              */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-4">
        {/* Cabecera de resultados */}
        <div className="flex items-center justify-between text-left px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] sm:text-[20px] font-heading font-extrabold text-[#0B3B60]">
              {selectedCategory === 'todos'
                ? 'Todos los productos disponibles'
                : PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <span className="text-[12px] text-slate-500 font-medium">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'})
            </span>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[12px] text-[#007EAF] hover:underline cursor-pointer"
            >
              Limpiar filtro de búsqueda
            </button>
          )}
        </div>

        {/* Si no hay productos que coincidan */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-slate-300">
              inventory_2
            </span>
            <h3 className="text-[17px] font-heading font-bold text-[#0B3B60]">
              No encontramos productos para "{searchQuery}"
            </h3>
            <p className="text-[13px] text-slate-500 max-w-md">
              Prueba con términos como "cuaderno", "lapicero", "archivador", "clips", "tomatodo" o cambia de categoría.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B3B60] text-[13px] font-semibold cursor-pointer"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          /* Grid de tarjetas de producto */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const inCartItem = cart.find((c) => c.product.id === product.id);
              const inCartQty = inCartItem?.quantity || 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#00A3E0] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Fotografía del producto */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Tag distintivo */}
                      {product.tag && (
                        <span
                          className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border backdrop-blur-md shadow-2xs ${
                            product.tagColor || 'bg-white/90 text-slate-700 border-slate-200'
                          }`}
                        >
                          {product.tag}
                        </span>
                      )}

                      {/* Botón para editar precio de demostración */}
                      <button
                        onClick={() => handleOpenEditPrice(product)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-[#0B3B60] flex items-center justify-center shadow-xs cursor-pointer transition-transform active:scale-95"
                        title="Modificar precio de demostración"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>

                      {/* Unidad */}
                      <span className="absolute bottom-2.5 right-3 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        {product.unit}
                      </span>
                    </div>

                    {/* Contenido descriptivo */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2 text-left">
                      <span className="text-[11px] font-bold text-[#007EAF] uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>

                      <h3 className="text-[15px] sm:text-[15.5px] font-heading font-bold text-[#0B3B60] leading-snug line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-[12px] text-slate-500 font-sans leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Pie de tarjeta: Precio y botón Agregar al Carrito */}
                  <div className="p-4 sm:p-5 pt-0 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium leading-none">
                          Precio referencial:
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-[14px] font-bold text-[#0B3B60]">S/</span>
                          <span className="text-[20px] font-heading font-extrabold text-[#0B3B60]">
                            {product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {inCartQty > 0 && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {inCartQty} en carrito
                        </span>
                      )}
                    </div>

                    {/* Botón Agregar al carrito */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] active:scale-[0.98] text-white font-heading font-semibold text-[13px] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group-hover:shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">
                        add_shopping_cart
                      </span>
                      <span>Agregar al carrito</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. MODAL / DRAWER LATERAL: MI CARRITO DE COMPRAS               */}
      {/* ============================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs fade-in">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0"
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden text-left">
            {/* Cabecera del Carrito */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#007EAF] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-heading font-bold text-[#0B3B60]">
                    Carrito de Compras
                  </h3>
                  <span className="text-[11.5px] text-slate-500 font-sans">
                    {totalItemsCount} {totalItemsCount === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                title="Cerrar carrito"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Lista de productos en el carrito */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16 text-slate-400">
                  <span className="material-symbols-outlined text-[54px] text-slate-300">
                    remove_shopping_cart
                  </span>
                  <h4 className="text-[16px] font-heading font-bold text-slate-600">
                    Tu carrito está vacío
                  </h4>
                  <p className="text-[12.5px] text-slate-500 max-w-xs leading-relaxed">
                    Explora los útiles escolares, insumos de oficina o productos de uso diario y agrégalos con un clic.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#0B3B60] text-white text-[12.5px] font-semibold cursor-pointer shadow-xs"
                  >
                    Ver catálogo de productos
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const sub = item.product.price * item.quantity;
                  return (
                    <div key={item.product.id} className="py-3.5 flex items-center gap-3.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13.5px] font-heading font-bold text-[#0B3B60] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 block">
                          S/ {item.product.price.toFixed(2)} c/u ({item.product.unit})
                        </span>

                        {/* Controles de Cantidad */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-200 rounded-l-lg cursor-pointer"
                              title="Disminuir"
                            >
                              <span className="material-symbols-outlined text-[15px]">remove</span>
                            </button>
                            <span className="w-8 text-center text-[12.5px] font-bold text-[#0B3B60]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-200 rounded-r-lg cursor-pointer"
                              title="Aumentar"
                            >
                              <span className="material-symbols-outlined text-[15px]">add</span>
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Eliminar artículo"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Subtotal del item */}
                      <div className="text-right shrink-0">
                        <span className="text-[13.5px] font-heading font-extrabold text-[#0B3B60] block">
                          S/ {sub.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pie del Carrito: Totales y Botones de Acción */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50/80 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[13px] text-slate-600">
                  <span>Subtotal:</span>
                  <span>S/ {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[16px] font-heading font-extrabold text-[#0B3B60] pb-2 border-b border-slate-200">
                  <span>Total a pagar:</span>
                  <span className="text-[20px] text-[#007EAF]">S/ {totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsReviewModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] active:scale-95 text-white font-heading font-bold text-[14px] flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px] text-[#00A3E0]">
                      assignment
                    </span>
                    <span>Revisar pedido</span>
                  </button>

                  <div className="flex items-center justify-between text-[11.5px] pt-1">
                    <button
                      onClick={handleClearCart}
                      className="text-rose-600 hover:underline cursor-pointer"
                    >
                      Vaciar carrito
                    </button>
                    <span className="text-slate-400">Precios editables en Soles</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. MODAL: REVISIÓN DEL PEDIDO ANTES DE COMPRAR                  */}
      {/* ============================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in">
          <div
            onClick={() => setIsReviewModalOpen(false)}
            className="fixed inset-0"
          />

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 max-h-[92vh] flex flex-col overflow-hidden text-left">
            {/* Cabecera del modal */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">checklist</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-heading font-bold text-[#0B3B60]">
                    Revisión de tu Pedido
                  </h3>
                  <span className="text-[11.5px] text-slate-500 font-sans">
                    Verifica el detalle antes de coordinar o enviar tu solicitud
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-5">
              {/* Desglose de ítems */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                <div className="p-3 bg-slate-50 text-[11.5px] font-bold text-slate-500 grid grid-cols-12">
                  <span className="col-span-6">Producto</span>
                  <span className="col-span-3 text-center">Cant. / Unit.</span>
                  <span className="col-span-3 text-right">Subtotal</span>
                </div>
                {cart.map((item) => (
                  <div key={item.product.id} className="p-3 text-[12.5px] grid grid-cols-12 items-center">
                    <div className="col-span-6">
                      <strong className="text-[#0B3B60] block leading-tight font-heading">
                        {item.product.name}
                      </strong>
                      <span className="text-[11px] text-slate-400">
                        {item.product.categoryLabel}
                      </span>
                    </div>
                    <div className="col-span-3 text-center text-slate-600">
                      <span>{item.quantity} x S/ {item.product.price.toFixed(2)}</span>
                    </div>
                    <div className="col-span-3 text-right font-bold text-[#0B3B60]">
                      S/ {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="p-3.5 bg-sky-50/70 flex items-center justify-between text-[#0B3B60]">
                  <span className="text-[13px] font-bold">Total del Pedido:</span>
                  <span className="text-[18px] font-heading font-extrabold text-[#007EAF]">
                    S/ {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Aviso pedagógico y de transparencia */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-[12px] text-amber-900 leading-relaxed flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">
                  shield
                </span>
                <div>
                  <strong className="block mb-0.5 text-amber-950 font-bold">
                    Aviso de plataforma demostrativa:
                  </strong>
                  AL DÍA Market no solicita números de tarjetas, cuentas bancarias ni procesa cobros monetarios reales. Todos los pedidos se coordinan de forma externa o personalizada.
                </div>
              </div>

              {/* Configuración de WhatsApp comercial para pedidos */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-emerald-600">
                      chat
                    </span>
                    <span className="text-[13px] font-heading font-bold text-[#0B3B60]">
                      Recepción por WhatsApp Comercial
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingWhatsapp(!isEditingWhatsapp);
                      setTempWhatsappInput(whatsappNumber);
                    }}
                    className="text-[11.5px] font-semibold text-[#007EAF] hover:underline cursor-pointer"
                  >
                    {isEditingWhatsapp ? 'Cancelar' : whatsappNumber ? 'Cambiar número' : 'Configurar número'}
                  </button>
                </div>

                {isEditingWhatsapp ? (
                  <div className="flex flex-col gap-2 pt-1">
                    <label className="text-[11.5px] text-slate-500 font-sans">
                      Ingresa tu número comercial (incluye el código de país, ej. 51987654321):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={tempWhatsappInput}
                        onChange={(e) => setTempWhatsappInput(e.target.value)}
                        placeholder="Ejemplo: 51987654321"
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-[13px] text-slate-800 focus:outline-none focus:border-[#00A3E0]"
                      />
                      <button
                        onClick={handleSaveWhatsappNumber}
                        className="px-4 py-2 rounded-xl bg-[#0B3B60] text-white text-[12.5px] font-semibold cursor-pointer shadow-xs"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[12px] text-slate-600 leading-normal">
                    {whatsappNumber ? (
                      <>
                        Número comercial asignado: <strong className="text-emerald-700">+{whatsappNumber}</strong>. El pedido se enviará formateado automáticamente a ese chat.
                      </>
                    ) : (
                      <>
                        <span className="text-slate-500 italic">Aún no has configurado tu número comercial.</span> Puedes configurarlo para enviar el resumen del pedido directamente a tu chat de ventas o copiar el texto.
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Acciones finales del modal */}
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCopySummary}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-heading font-semibold text-[13px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedSummary ? 'done' : 'content_copy'}
                </span>
                <span>{copiedSummary ? '¡Copiado!' : 'Copiar resumen'}</span>
              </button>

              <button
                onClick={handleSendWhatsapp}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>{whatsappNumber ? 'Enviar a WhatsApp' : 'Configurar WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. MODAL: EDITAR PRECIO DE DEMOSTRACIÓN                        */}
      {/* ============================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in">
          <div
            onClick={() => setEditingProduct(null)}
            className="fixed inset-0"
          />

          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00A3E0] text-[20px]">
                  edit_note
                </span>
                <h4 className="text-[15px] font-heading font-bold text-[#0B3B60]">
                  Editar Precio de Demo
                </h4>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-500 font-medium block">
                Producto seleccionado:
              </span>
              <strong className="text-[13.5px] text-[#0B3B60] block font-heading leading-tight mt-0.5">
                {editingProduct.name}
              </strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Unidad: {editingProduct.unit}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">
                Nuevo precio en Soles (S/):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-[#0B3B60] text-[15px]">
                  S/
                </span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={tempPriceInput}
                  onChange={(e) => setTempPriceInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-[16px] font-heading font-bold focus:outline-none focus:border-[#00A3E0] focus:bg-white"
                  autoFocus
                />
              </div>
              <span className="text-[11px] text-slate-400">
                El precio se guardará en tu navegador para pruebas de demostración.
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[13px] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePrice}
                className="flex-1 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-semibold text-[13px] cursor-pointer shadow-xs"
              >
                Guardar precio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. TOAST NOTIFICATION FLOTANTE                                  */}
      {/* ============================================================== */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-[#0B3B60] text-white px-4 py-3 rounded-2xl shadow-xl border border-sky-400/30 flex items-center gap-3 fade-in">
          <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-ping" />
          <span className="text-[13px] font-sans font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-sky-200 hover:text-white cursor-pointer ml-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
