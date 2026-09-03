import { Star, CheckCircle2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';
  const variants = {
    primary: 'bg-[#0077B6] text-white hover:bg-[#005f92] active:bg-[#004d77]',
    secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--border)]',
    outline: 'border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]',
    ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    accent: 'bg-[#5ABCB9] text-white hover:bg-[#4aa8a5]',
  };
  const sizes = {
    xs: 'text-xs px-2.5 py-1 rounded-md',
    sm: 'text-sm px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-[var(--radius)]',
    lg: 'text-base px-6 py-3 rounded-[var(--radius)]',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

// Badge
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-50 text-[#0077B6] dark:bg-blue-900/30 dark:text-blue-400',
    outline: 'border border-[var(--border)] text-[var(--muted-foreground)]',
  };
  return <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${variants[variant]} ${className}`}>{children}</span>;
}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Input({ label, error, icon, iconRight, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{icon}</span>}
        <input
          className={`w-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] rounded-[var(--radius)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition-all ${icon ? 'pl-9' : ''} ${iconRight ? 'pr-9' : ''} ${error ? 'border-red-400 focus:border-red-400' : ''} ${className}`}
          {...props}
        />
        {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{iconRight}</span>}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Card
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm ${hover ? 'hover:shadow-md hover:border-[#5ABCB9]/40 transition-all duration-200 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// Rating
export function Rating({ value, count, showCount = true, size = 'sm' }: { value: number; count?: number; showCount?: boolean; size?: 'xs' | 'sm' | 'md' }) {
  const sizes = { xs: 'w-3 h-3', sm: 'w-3.5 h-3.5', md: 'w-4 h-4' };
  return (
    <div className="flex items-center gap-1">
      <Star className={`${sizes[size]} fill-amber-400 text-amber-400`} />
      <span className={`font-medium ${size === 'xs' ? 'text-xs' : 'text-sm'} text-[var(--foreground)]`}>{value.toFixed(1)}</span>
      {showCount && count !== undefined && <span className={`text-[var(--muted-foreground)] ${size === 'xs' ? 'text-xs' : 'text-sm'}`}>({count.toLocaleString()})</span>}
    </div>
  );
}

// VerifiedBadge
export function VerifiedBadge({ small }: { small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[#0077B6] font-medium ${small ? 'text-xs' : 'text-sm'}`}>
      <CheckCircle2 className={small ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      Verified
    </span>
  );
}

// Stat card
interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}

export function StatCard({ title, value, change, icon, color = '#0077B6' }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18`, color }}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {change > 0 ? <TrendingUp className="w-3 h-3" /> : change < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold font-display text-[var(--foreground)] mb-0.5">{value}</div>
      <div className="text-sm text-[var(--muted-foreground)]">{title}</div>
    </Card>
  );
}

// Toggle (for theme/notifications)
export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/40 ${checked ? 'bg-[#0077B6]' : 'bg-[var(--border)]'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );
}

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <select
        className={`w-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-[var(--radius)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition-all ${className}`}
        {...props}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// Status badge
const statusConfig: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
  pending: { label: 'Pending', variant: 'warning' },
  processing: { label: 'Processing', variant: 'info' },
  confirmed: { label: 'Confirmed', variant: 'info' },
  preparing: { label: 'Preparing', variant: 'info' },
  shipped: { label: 'Shipped', variant: 'default' },
  delivered: { label: 'Delivered', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
  refunded: { label: 'Refunded', variant: 'outline' },
  'in stock': { label: 'In Stock', variant: 'success' },
  'low stock': { label: 'Low Stock', variant: 'warning' },
  'out of stock': { label: 'Out of Stock', variant: 'danger' },
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'outline' },
  approved: { label: 'Approved', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'danger' },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status.toLowerCase()] || { label: status, variant: 'default' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

// Modal
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl w-full max-w-md z-10">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <h3 className="font-semibold font-display text-[var(--foreground)]">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors">✕</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex gap-2 p-5 pt-0">{footer}</div>}
      </div>
    </div>
  );
}

// Toast
export function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) {
  const colors = { success: 'bg-emerald-600', error: 'bg-red-600', info: 'bg-[#0077B6]' };
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-lg ${colors[type]} animate-in slide-in-from-bottom-2`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white text-xs">✕</button>
    </div>
  );
}

// Empty state
export function EmptyState({ icon, title, description, action }: { icon: React.ReactNode; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] mb-4">
        {icon}
      </div>
      <h3 className="font-semibold font-display text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] max-w-sm mb-5">{description}</p>
      {action}
    </div>
  );
}

// Tabs
interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-[var(--border)]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${active === tab.id ? 'border-[#0077B6] text-[#0077B6]' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${active === tab.id ? 'bg-[#0077B6]/10 text-[#0077B6]' : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// Breadcrumb
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {item.href ? <a href={item.href} className="hover:text-[var(--foreground)] transition-colors">{item.label}</a> : <span className="text-[var(--foreground)] font-medium">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

// Skeleton loader
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-[var(--border)] rounded animate-pulse ${className}`} />;
}

// Pagination
interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(current - 1)} disabled={current <= 1} className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] disabled:opacity-40 hover:bg-[var(--secondary)] transition-colors">Prev</button>
      {pages.map(p => (
        <button key={p} onClick={() => onChange(p)} className={`w-8 h-8 text-sm rounded-lg border transition-colors ${p === current ? 'bg-[#0077B6] text-white border-[#0077B6]' : 'border-[var(--border)] hover:bg-[var(--secondary)]'}`}>{p}</button>
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current >= total} className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] disabled:opacity-40 hover:bg-[var(--secondary)] transition-colors">Next</button>
    </div>
  );
}
