import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { ShoppingBag, LayoutDashboard, Package, Warehouse, ShoppingCart, Users, Tag, Star, BarChart3, Store, Settings, Bell, Menu, X, Sun, Moon, Globe, LogOut, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { logout } from '@/api/auth.api';

const navItems = [
  { icon: <LayoutDashboard className="w-4.5 h-4.5" />, label: 'Dashboard', to: '/seller' },
  { icon: <Package className="w-4.5 h-4.5" />, label: 'Products', to: '/seller/products' },
  { icon: <Warehouse className="w-4.5 h-4.5" />, label: 'Inventory', to: '/seller/inventory' },
  { icon: <ShoppingCart className="w-4.5 h-4.5" />, label: 'Orders', to: '/seller/orders' },
  { icon: <Users className="w-4.5 h-4.5" />, label: 'Customers', to: '/seller/customers' },
  { icon: <Tag className="w-4.5 h-4.5" />, label: 'Promotions', to: '/seller/promotions' },
  { icon: <Star className="w-4.5 h-4.5" />, label: 'Reviews', to: '/seller/reviews' },
  { icon: <BarChart3 className="w-4.5 h-4.5" />, label: 'Analytics', to: '/seller/analytics' },
  { icon: <Store className="w-4.5 h-4.5" />, label: 'Store settings', to: '/seller/store' },
  { icon: <Settings className="w-4.5 h-4.5" />, label: 'Settings', to: '/seller/settings' },
];

export default function SellerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full bg-[#16262E] text-[#F5EFFF] ${mobile ? '' : 'w-56'}`}>
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[#0077B6] flex items-center justify-center">
          <ShoppingBag className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <div className="font-bold text-sm font-display">MasoMarket</div>
          <div className="text-[10px] text-[#8da8b5]">Seller Panel</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = location.pathname === item.to || (item.to !== '/seller' && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => mobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#0077B6] text-white' : 'text-[#8da8b5] hover:bg-white/8 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#5ABCB9] flex items-center justify-center text-white text-sm font-bold">T</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">TechStore MG</div>
            <div className="text-xs text-[#8da8b5]">Seller</div>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#8da8b5] hover:bg-white/8 hover:text-red-400 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--background)]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-60 flex flex-col">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-[var(--card)] border-b border-[var(--border)] flex items-center gap-3 px-4 sm:px-6 flex-shrink-0">
          <button className="md:hidden p-2 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <h1 className="font-semibold text-sm font-display text-[var(--foreground)] hidden sm:block">
              {navItems.find(i => i.to === location.pathname || (i.to !== '/seller' && location.pathname.startsWith(i.to)))?.label || 'Seller Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded-lg transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="p-2 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded-lg transition-colors">
              {resolvedTheme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button className="relative p-2 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded-lg transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5ABCB9] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 ml-1 border-l border-[var(--border)]">
              <div className="w-7 h-7 rounded-full bg-[#5ABCB9] flex items-center justify-center text-white text-sm font-bold">T</div>
              <span className="hidden sm:block text-sm font-medium text-[var(--foreground)]">TechStore</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
