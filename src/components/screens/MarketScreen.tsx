import React, { useState, useEffect, useMemo } from 'react';
import { TabType } from '../../types';
import {
  ProductItem,
  PRODUCT_CATEGORIES,
  INITIAL_PRODUCTS,
  MarketCategoryDef,
  MarketCategoryId,
} from '../../data/marketData';
import heroImg from '../../assets/images/market_escritorio_oficina_1792458073916.jpg';

interface MarketScreenProps {
  onNavigate: (tab: TabType) => void;
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

type SortOrder = 'destacados' | 'precio_asc' | 'precio_desc' | 'nombre_asc';

export const MarketScreen: React.FC<MarketScreenProps> = ({ onNavigate }) => {
  // 1. Products state (persisting customized referential prices)
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

  // 3. Quantities selector state for cards before adding to cart (default 1 per card)
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>({});

  // 4. Filters, Search & Sort
  const [selectedCategory, setSelectedCategory] = useState<MarketCategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('destacados');

  // 5. Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [tempPriceInput, setTempPriceInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // 6. WhatsApp commercial number configuration (user configured, no fake number)
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

  // Toast timer
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Cart calculations
  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Quantities handlers for individual product cards
  const getCardQuantity = (productId: string) => cardQuantities[productId] || 1;

  const handleUpdateCardQuantity = (productId: string, delta: number) => {
    setCardQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(99, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  // Add to cart with specific quantity
  const handleAddToCart = (product: ProductItem) => {
    const qty = getCardQuantity(product.id);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { product, quantity: qty }];
    });
    // Reset card quantity back to 1
    setCardQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    setToastMessage(`Se agregó ${qty} ${qty > 1 ? 'unidades' : 'unidad'} de "${product.name}" al carrito`);
  };

  // Modify cart item quantity
  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(99, newQty) } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    setToastMessage('Producto eliminado del carrito');
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    setToastMessage('Se vació el carrito');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered & sorted products list
  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    switch (sortOrder) {
      case 'precio_asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'precio_desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'nombre_asc':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [products, selectedCategory, searchQuery, sortOrder]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSearchQuery('');
    setSortOrder('destacados');
  };

  // Save custom demo price
  const handleSavePrice = () => {
    if (!editingProduct) return;
    const num = parseFloat(tempPriceInput.replace(',', '.'));
    if (isNaN(num) || num < 0) {
      alert('Por favor ingresa un precio válido en soles.');
      return;
    }
    const updated = products.map((p) => (p.id === editingProduct.id ? { ...p, price: num } : p));
    setProducts(updated);

    // Update in cart as well if present
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === editingProduct.id
          ? { ...item, product: { ...item.product, price: num } }
          : item
      )
    );

    // Save map in localStorage
    try {
      const priceMap: Record<string, number> = {};
      updated.forEach((p) => {
        priceMap[p.id] = p.price;
      });
      localStorage.setItem('aldia_market_custom_prices', JSON.stringify(priceMap));
    } catch (e) {
      console.warn('Error saving custom prices', e);
    }

    setEditingProduct(null);
    setToastMessage(`Precio actualizado para "${editingProduct.name}"`);
  };

  // Save commercial WhatsApp number
  const handleSaveWhatsappNumber = () => {
    const cleanNumber = tempWhatsappInput.replace(/[^0-9+]/g, '');
    setWhatsappNumber(cleanNumber);
    try {
      localStorage.setItem('aldia_market_whatsapp_number', cleanNumber);
    } catch (e) {
      console.warn('Error saving whatsapp number', e);
    }
    setIsEditingWhatsapp(false);
    setToastMessage('Número de WhatsApp comercial guardado');
  };

  // Generate order summary text
  const generateOrderSummary = () => {
    const lines = [
      '📋 *CONSULTA DE ÚTILES DE ESCRITORIO - AL DÍA MARKET*',
      '----------------------------------------',
      ...cart.map(
        (item, index) =>
          `${index + 1}. ${item.product.name}\n   Cant: ${item.quantity} ${item.product.unit} | Subtotal: S/ ${(item.product.price * item.quantity).toFixed(2)}`
      ),
      '----------------------------------------',
      `*Total estimado referencial:* S/ ${totalAmount.toFixed(2)}`,
      '',
      '_Nota: Consulta generada desde la tienda virtual de demostración AL DÍA Market._',
    ];
    return lines.join('\n');
  };

  // Copy order summary to clipboard
  const handleCopySummary = () => {
    const text = generateOrderSummary();
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setToastMessage('¡Resumen del pedido copiado al portapapeles!');
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Open WhatsApp with order summary
  const handleSendWhatsapp = () => {
    if (!whatsappNumber) {
      setIsEditingWhatsapp(true);
      return;
    }
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(generateOrderSummary());
    const url = `https://wa.me/${cleanNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-14 fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#0B3B60] text-white px-5 py-3 rounded-2xl shadow-xl border border-sky-400/30 text-[13px] font-heading font-semibold flex items-center gap-2 fade-in">
          <span className="material-symbols-outlined text-[18px] text-[#00A3E0]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. ENCABEZADO DE LA TIENDA                                      */}
      {/* ============================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row text-left">
        {/* Imagen realista de escritorio con útiles */}
        <div className="w-full md:w-1/2 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 min-h-[240px] md:min-h-[320px]">
          <img
            src={heroImg}
            alt="Escritorio organizado con cuadernos, lapiceros, folders y accesorios de oficina"
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0B3B60]/90 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#00A3E0]">desk</span>
              <span>Útiles de Oficina y Escritorio</span>
            </span>
          </div>
        </div>

        {/* Textos y Acceso al Carrito */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0B3B60] text-[12px] font-bold border border-sky-200 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#00A3E0]">storefront</span>
              <span>Tienda Virtual AL DÍA</span>
            </div>

            <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#0B3B60] tracking-tight leading-snug font-heading">
              Market | Todo para tu escritorio
            </h1>

            <p className="text-[14px] sm:text-[15.5px] text-slate-600 leading-relaxed font-sans">
              Encuentra tus útiles de oficina en un solo lugar. Cuadernos, lapiceros, archivadores, accesorios y papelería para tu trabajo y estudio.
            </p>
          </div>

          {/* Botón flotante del carrito en el encabezado */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                Tu Carrito Actual
              </span>
              <span className="text-[13.5px] font-bold text-[#0B3B60]">
                {totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'} · S/{' '}
                {totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 shrink-0"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[19px]">shopping_cart</span>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#00A3E0] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span>Ver mi carrito</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CATEGORÍAS DE PRODUCTOS (6 CATEGORÍAS EXACTAS)             */}
      {/* ============================================================== */}
      <section className="flex flex-col gap-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">category</span>
            <span>Categorías de Escritorio</span>
          </span>
          <span className="text-[11.5px] text-slate-400 font-medium">
            {products.length} productos disponibles en demostración
          </span>
        </div>

        {/* Chips de categorías interactivos con scroll horizontal */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-[12.5px] font-heading font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: isSelected ? '#00A3E0' : '#64748B' }}
                >
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. BÚSQUEDA Y FILTROS INTERACTIVOS                             */}
      {/* ============================================================== */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-left">
        {/* Input de Búsqueda */}
        <div className="relative flex-1 max-w-lg">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[19px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por útil (cuaderno, lapicero, folder, engrapador, papel...)"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-[13.5px] focus:outline-none focus:border-[#00A3E0] transition-colors shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filtro Ordenar por precio y Botón Ver todos */}
        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12.5px] text-slate-700 font-medium">
            <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">sort</span>
            <label htmlFor="sort-select" className="hidden sm:inline text-slate-500">
              Ordenar:
            </label>
            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="bg-transparent font-bold text-[#0B3B60] focus:outline-none cursor-pointer pr-1"
            >
              <option value="destacados">Destacados</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
              <option value="nombre_asc">Nombre: A - Z</option>
            </select>
          </div>

          {(selectedCategory !== 'todos' || searchQuery || sortOrder !== 'destacados') && (
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#007EAF] border border-sky-200 font-heading font-semibold text-[12.5px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Ver todos</span>
            </button>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. CUADRÍCULA DE PRODUCTOS (2 POR FILA EN CELULARES)           */}
      {/* ============================================================== */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-[36px]">search_off</span>
          </div>
          <h3 className="text-[17px] font-bold text-[#0B3B60] font-heading">
            No encontramos útiles para "{searchQuery}"
          </h3>
          <p className="text-[13px] text-slate-500 max-w-md">
            Prueba buscando con palabras como cuaderno, lapicero, folder, grapas o cartulina.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-5 py-2.5 rounded-xl bg-[#0B3B60] text-white font-heading font-bold text-[13px] hover:bg-[#082E4D] cursor-pointer"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 text-left">
          {filteredProducts.map((product) => {
            const cardQty = getCardQuantity(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#00A3E0] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Fotografía del producto */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Tag badge si existe */}
                    {product.tag && (
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold border shadow-2xs backdrop-blur-xs ${
                          product.tagColor || 'bg-white text-slate-800 border-slate-200'
                        }`}
                      >
                        {product.tag}
                      </span>
                    )}

                    {/* Botón rápido para editar precio de demo */}
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setTempPriceInput(product.price.toString());
                      }}
                      title="Editar precio referencial de demostración"
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-[#0B3B60] shadow-xs flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                    </button>

                    {/* Disponibilidad: Indicador de demo / stock */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>
                          {typeof product.stock === 'number'
                            ? `Stock: ${product.stock}`
                            : 'Consultar disponibilidad'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Datos del producto */}
                  <div className="p-3 sm:p-4 flex flex-col gap-1.5">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#007EAF] block">
                      {product.categoryLabel}
                    </span>

                    <h3 className="text-[13px] sm:text-[14.5px] font-bold text-[#0B3B60] font-heading leading-snug line-clamp-2 group-hover:text-[#007EAF] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] sm:text-[12px] text-slate-500 font-sans line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Precio en Soles (S/) */}
                    <div className="mt-1 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                          Precio referencial
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[16px] sm:text-[19px] font-black text-[#0B3B60] font-heading">
                            S/ {product.price.toFixed(2)}
                          </span>
                          <span className="text-[10.5px] text-slate-400 font-sans">
                            / {product.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selector de cantidad y Botón Agregar al carrito */}
                <div className="p-3 sm:p-4 pt-0 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Selector de cantidad */}
                    <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5 shrink-0">
                      <button
                        onClick={() => handleUpdateCardQuantity(product.id, -1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-[#0B3B60] cursor-pointer"
                        title="Disminuir cantidad"
                      >
                        <span className="material-symbols-outlined text-[15px]">remove</span>
                      </button>
                      <span className="w-7 text-center font-bold text-[12px] text-[#0B3B60]">
                        {cardQty}
                      </span>
                      <button
                        onClick={() => handleUpdateCardQuantity(product.id, 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-[#0B3B60] cursor-pointer"
                        title="Aumentar cantidad"
                      >
                        <span className="material-symbols-outlined text-[15px]">add</span>
                      </button>
                    </div>

                    {/* Botón Agregar al carrito */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 px-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-bold text-[12px] sm:text-[12.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span className="truncate">Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. DRAWER / MODAL DEL CARRITO DE COMPRAS                       */}
      {/* ============================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs fade-in">
          {/* Backdrop click to close */}
          <div onClick={() => setIsCartOpen(false)} className="fixed inset-0" />

          {/* Cart Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 text-left">
            {/* Cart Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">
                    shopping_cart
                  </span>
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#0B3B60] font-heading">
                    Tu Carrito de Útiles
                  </h3>
                  <span className="text-[11.5px] text-slate-500 font-sans">
                    {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'} en lista
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-14 text-slate-400">
                  <span className="material-symbols-outlined text-[54px] text-slate-300">
                    remove_shopping_cart
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[16px] font-bold text-[#0B3B60] font-heading">
                      Tu carrito está vacío
                    </h4>
                    <p className="text-[12.5px] text-slate-500 max-w-xs leading-relaxed">
                      Explora nuestras categorías de cuadernos, lapiceros y folders para añadir tus artículos de escritorio.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-sky-50 text-[#007EAF] hover:bg-sky-100 font-heading font-semibold text-[13px] cursor-pointer"
                  >
                    Explorar útiles
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-2xl border border-slate-200/90 bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    {/* Imagen miniatura */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                    />

                    {/* Información y Precio */}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <h4 className="text-[12.5px] font-bold text-[#0B3B60] truncate font-heading">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {item.product.categoryLabel}
                      </span>
                      <div className="text-[12px] font-bold text-[#0B3B60]">
                        S/ {item.product.price.toFixed(2)}{' '}
                        <span className="text-[10px] font-normal text-slate-500">
                          x {item.quantity} = S/ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Control de Cantidad y Eliminar */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                      </button>

                      <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() =>
                            handleUpdateCartQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded-l-lg cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">remove</span>
                        </button>
                        <span className="w-6 text-center text-[11.5px] font-bold text-[#0B3B60]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateCartQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded-r-lg cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col gap-3">
                <div className="flex flex-col gap-1 text-[13px]">
                  <div className="flex items-center justify-between text-slate-500 text-[12px]">
                    <span>Subtotal de productos:</span>
                    <span>S/ {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[16px] font-extrabold text-[#0B3B60] font-heading pt-1 border-t border-slate-200/80">
                    <span>Total referencial:</span>
                    <span>S/ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleClearCart}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-[12px] font-bold transition-colors cursor-pointer"
                  >
                    Vaciar
                  </button>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsReviewModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Revisar y consultar pedido</span>
                    <span className="material-symbols-outlined text-[17px] text-[#00A3E0]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. MODAL DE REVISIÓN Y CONSULTA DEL PEDIDO                     */}
      {/* ============================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in">
          <div onClick={() => setIsReviewModalOpen(false)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10 text-left">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B3B60] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">
                    receipt_long
                  </span>
                </div>
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#0B3B60] font-heading">
                    Resumen de Consulta del Pedido
                  </h3>
                  <span className="text-[11.5px] text-slate-500 font-sans">
                    Demostración de catálogo interactivo sin pasarela de pagos
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex flex-col gap-5">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-[12.5px] text-[#0B3B60] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-[#007EAF] shrink-0 mt-0.5">
                  info
                </span>
                <p className="leading-relaxed">
                  <strong>Aviso de demostración:</strong> Este catálogo funciona con fines demostrativos y organizativos. No simula cobros reales ni requiere tarjetas bancarias. Puedes copiar la lista de útiles seleccionados para tus cotizaciones o consultas comerciales.
                </p>
              </div>

              {/* Lista resumida */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-[13px]">
                <div className="bg-slate-50 px-4 py-2.5 font-bold text-slate-600 text-[11.5px] uppercase tracking-wider flex items-center justify-between">
                  <span>Artículo</span>
                  <span>Subtotal</span>
                </div>
                {cart.map((item) => (
                  <div key={item.product.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0B3B60]">{item.product.name}</span>
                      <span className="text-[11.5px] text-slate-500">
                        {item.quantity} {item.product.unit} a S/ {item.product.price.toFixed(2)} c/u
                      </span>
                    </div>
                    <span className="font-extrabold text-[#0B3B60] shrink-0">
                      S/ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total final */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[16px] font-extrabold text-[#0B3B60]">
                <span>Total Estimado (Referencial):</span>
                <span>S/ {totalAmount.toFixed(2)}</span>
              </div>

              {/* Configuración opcional de WhatsApp comercial */}
              <div className="p-4 rounded-2xl border border-slate-200 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px] text-emerald-600">chat</span>
                    <span>Número comercial para WhatsApp (Opcional):</span>
                  </span>
                  <button
                    onClick={() => setIsEditingWhatsapp(!isEditingWhatsapp)}
                    className="text-[11.5px] font-semibold text-[#007EAF] hover:underline"
                  >
                    {isEditingWhatsapp ? 'Cancelar' : whatsappNumber ? 'Cambiar número' : 'Configurar'}
                  </button>
                </div>

                {isEditingWhatsapp ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={tempWhatsappInput}
                      onChange={(e) => setTempWhatsappInput(e.target.value)}
                      placeholder="Ej. +51987654321"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-[#00A3E0]"
                    />
                    <button
                      onClick={handleSaveWhatsappNumber}
                      className="px-4 py-2 rounded-xl bg-[#0B3B60] text-white text-[12.5px] font-bold cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <span className="text-[12px] text-slate-500">
                    {whatsappNumber
                      ? `Número configurado: ${whatsappNumber}`
                      : 'No configurado aún. Puedes copiar el resumen directamente al portapapeles.'}
                  </span>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleCopySummary}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#0B3B60] font-heading font-semibold text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[17px]">
                  {copiedSummary ? 'check' : 'content_copy'}
                </span>
                <span>{copiedSummary ? '¡Copiado!' : 'Copiar lista de útiles'}</span>
              </button>

              <div className="flex gap-2 w-full sm:w-auto">
                {whatsappNumber && (
                  <button
                    onClick={handleSendWhatsapp}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[17px]">chat</span>
                    <span>Enviar a WhatsApp</span>
                  </button>
                )}

                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white font-heading font-bold text-[13px] cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. MODAL DE EDICIÓN DE PRECIO REFERENCIAL (FÁCIL DE EDITAR)   */}
      {/* ============================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in">
          <div onClick={() => setEditingProduct(null)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 p-6 z-10 text-left flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00A3E0]">edit</span>
                <h3 className="text-[16px] font-bold text-[#0B3B60] font-heading">
                  Editar Precio Referencial
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] text-slate-500">Producto:</span>
              <strong className="text-[14px] text-[#0B3B60]">{editingProduct.name}</strong>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="price-edit-input" className="text-[12px] font-bold text-slate-700">
                Nuevo precio en soles (S/):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 text-[14px]">
                  S/
                </span>
                <input
                  id="price-edit-input"
                  type="number"
                  step="0.10"
                  min="0"
                  value={tempPriceInput}
                  onChange={(e) => setTempPriceInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-[15px] font-bold text-[#0B3B60] focus:outline-none focus:border-[#00A3E0]"
                />
              </div>
              <span className="text-[11px] text-slate-400">
                El precio se guardará en tu navegador para que puedas editarlo cuando quieras.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-[13px] font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePrice}
                className="px-5 py-2 rounded-xl bg-[#0B3B60] hover:bg-[#082E4D] text-white text-[13px] font-bold cursor-pointer"
              >
                Guardar precio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
