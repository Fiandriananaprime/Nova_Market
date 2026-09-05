import { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router';
import { ShoppingBag, Search, Heart, Bell, ShoppingCart, Globe, Sun, Moon, LogOut, Package, ChevronDown, Home, Grid3x3, X, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatPrice } from '@/hook/format';
import { logout } from '@/api/auth.api';
import { useToast } from '../contexts/ToastContext';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

export default function BuyerLayout() {
  const { cart, cartTotal, favorites, removeFromCart, setUserRole } = useApp();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { resolvedTheme, setTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setUserRole(null);
    await logout();
    toast('You have been signed out.');
    navigate('/');
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-16">
            <Link to="/shop" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#0077B6] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg font-display text-foreground hidden sm:block">MasoMarket</span>
            </Link>

            <form className="flex-1 max-w-2xl" onSubmit={(e) => { e.preventDefault(); navigate(`/products?q=${search}`); }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t("Search products, brands or stores...")}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0077B6]/25 focus:border-[#0077B6] transition-all"
                />
              </div>
            </form>

            <div className="flex items-center gap-0.5 ml-auto">
              {/* Language */}
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
                className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                title="Switch language"
              >
                <Globe className="w-4 h-4" />
                {i18n.language.toUpperCase()}
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                title={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                title={t("Favorites")}
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] bg-[#5ABCB9] text-white rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <Link to="/orders" className="hidden sm:block relative p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors" title="Notifications">
                <Bell className="w-4 h-4" />
              </Link>

              {/* Cart dropdown */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                  title={t("Cart")}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] bg-[#0077B6] text-white rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>

                {cartOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <span className="font-semibold text-sm font-display text-foreground">{t("Cart")} ({cartCount})</span>
                      <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                    </div>
                    {cart.length === 0 ? (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        {t("Your cart is empty")}
                      </div>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto divide-y divide-border">
                          {cart.map(item => (
                            <div key={item.productId} className="flex items-center gap-3 px-4 py-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                <img src={`https://images.unsplash.com/${item.image}?w=60&h=60&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-foreground truncate">{item.name}</div>
                                <div className="text-xs text-muted-foreground">x{item.qty} · {formatPrice(item.price)}</div>
                              </div>
                              <button onClick={() => removeFromCart(item.productId)} className="text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-border bg-secondary">
                          <div className="flex items-center justify-between text-sm mb-3">
                            <span className="font-medium text-foreground">Total</span>
                            <span className="font-bold text-foreground">{formatPrice(cartTotal)}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { navigate('/cart'); setCartOpen(false); }}
                              className="flex-1 py-2 text-sm font-medium border border-border rounded-xl text-foreground hover:bg-border transition-colors"
                            >
                              {t("View cart")}
                            </button>
                            <button
                              onClick={() => { navigate('/checkout'); setCartOpen(false); }}
                              className="flex-1 py-2 text-sm font-medium bg-[#0077B6] text-white rounded-xl hover:bg-[#005f92] transition-colors flex items-center justify-center gap-1"
                            >
                              {t("Checkout")} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0077B6] to-[#5ABCB9] flex items-center justify-center text-white text-xs font-bold">A</div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border rounded-2xl shadow-2xl z-50">
                    <div className="p-2">
                      <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0077B6] to-[#5ABCB9] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">A</div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground truncate">Andry Rakoto</div>
                          <div className="text-xs text-muted-foreground truncate">andry@email.com</div>
                        </div>
                      </div>
                      <div className="border-t border-border my-1" />
                      {[
                        { icon: '👤', label: t("My profile"), to: '/profile' },
                        { icon: '📦', label: t("My orders"), to: '/orders' },
                        { icon: '❤️', label: t("Favorites"), to: '/favorites' },
                        { icon: '⚙️', label: t("Settings"), to: '/settings' },
                      ].map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-xl transition-colors"
                        >
                          <span className="text-base">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border my-1" />
                      <button
                        onClick={() => {handleLogout(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t("Logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-6">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-pb">
        <div className="grid grid-cols-5 h-16">
          {[
            { icon: <Home className="w-5 h-5" />, label: t("Home"), to: '/shop' },
            { icon: <Grid3x3 className="w-5 h-5" />, label: t("Browse"), to: '/products' },
            { icon: (
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-[9px] bg-[#0077B6] text-white rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
              </div>
            ), label: t("Cart"), to: '/cart' },
            { icon: <Heart className="w-5 h-5" />, label: t("Saved"), to: '/favorites' },
            { icon: <Package className="w-5 h-5" />, label: t("Orders"), to: '/orders' },
          ].map(item => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${active ? 'text-[#0077B6]' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
