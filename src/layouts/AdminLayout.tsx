import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { ShoppingBag, LayoutDashboard, Users, Package, Grid3x3, ShoppingCart, CreditCard, Tag, Star, BarChart3, Settings, Bell, Menu, Sun, Moon, Globe, LogOut, UserCheck, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { logout } from '@/api/auth.api';
import { useToast } from '../contexts/ToastContext';

const navItems = [
  { icon: <LayoutDashboard className="w-4.5 h-4.5" />, label: 'Dashboard', to: '/admin' },
  { icon: <Users className="w-4.5 h-4.5" />, label: 'Users', to: '/admin/users' },
  { icon: <UserCheck className="w-4.5 h-4.5" />, label: 'Seller Applications', to: '/admin/sellers/applications' },
  { icon: <Package className="w-4.5 h-4.5" />, label: 'Products', to: '/admin/products' },
  { icon: <Grid3x3 className="w-4.5 h-4.5" />, label: 'Categories', to: '/admin/categories' },
  { icon: <ShoppingCart className="w-4.5 h-4.5" />, label: 'Orders', to: '/admin/orders' },
  { icon: <CreditCard className="w-4.5 h-4.5" />, label: 'Payments', to: '/admin/payments' },
  { icon: <Tag className="w-4.5 h-4.5" />, label: 'Promotions', to: '/admin/promotions' },
  { icon: <Star className="w-4.5 h-4.5" />, label: 'Reviews', to: '/admin/reviews' },
  { icon: <BarChart3 className="w-4.5 h-4.5" />, label: 'Reports', to: '/admin/reports' },
  { icon: <Settings className="w-4.5 h-4.5" />, label: 'Settings', to: '/admin/settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, setUserRole } = useApp();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setUserRole(null);
    await logout();
    toast('You have been signed out.');
    navigate('/');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full bg-[#16262E] text-[#F5EFFF] ${mobile ? '' : 'w-56'}`}>
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[#5ABCB9] flex items-center justify-center">
          <Shield className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <div className="font-bold text-sm font-display">MasoMarket</div>
          <div className="text-[10px] text-[#8da8b5]">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => mobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#5ABCB9] text-[#16262E]' : 'text-[#8da8b5] hover:bg-white/8 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center text-white text-sm font-bold">A</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Administrator</div>
            <div className="text-xs text-[#8da8b5]">Super Admin</div>
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
    <div className="h-screen flex overflow-hidden bg-background">
      <aside className="hidden md:flex flex-col flex-shrink-0">
        <Sidebar />
      </aside>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-60 flex flex-col">
            <Sidebar mobile />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center gap-3 px-4 sm:px-6 flex-shrink-0">
          <button className="md:hidden p-2 text-muted-foreground hover:bg-secondary rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-sm font-display text-foreground hidden sm:block">
              {navItems.find(i => i.to === location.pathname || (i.to !== '/admin' && location.pathname.startsWith(i.to)))?.label || 'Admin Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
              {resolvedTheme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button className="relative p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
              <div className="w-7 h-7 rounded-full bg-[#0077B6] flex items-center justify-center text-white text-sm font-bold">A</div>
              <span className="hidden sm:block text-sm font-medium text-foreground">Admin</span>
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
