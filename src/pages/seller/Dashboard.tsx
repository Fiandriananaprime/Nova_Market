import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { StatCard, StatusBadge } from '../../components/ui';
import { sellerMetrics, revenueData, products, orders, formatPrice } from '../../data/mock';
import { useApp } from '../../contexts/AppContext';

const recentOrders = [
  { id: 'ORD-001', customer: 'Rakoto A.', product: 'Samsung Galaxy A56', amount: 1299000, status: 'processing', date: '2026-09-01' },
  { id: 'ORD-002', customer: 'Marie R.', product: 'MacBook Air M3', amount: 5200000, status: 'shipped', date: '2026-08-31' },
  { id: 'ORD-003', customer: 'Jean P.', product: 'AirPods Pro 2nd Gen', amount: 890000, status: 'delivered', date: '2026-08-30' },
  { id: 'ORD-004', customer: 'Alice M.', product: 'Running Shoes Pro', amount: 450000, status: 'pending', date: '2026-08-29' },
  { id: 'ORD-005', customer: 'Paul N.', product: 'Samsung Galaxy A56', amount: 1299000, status: 'confirmed', date: '2026-08-28' },
];

const topProducts = [
  { name: 'Samsung Galaxy A56', sales: 89, revenue: 115611000 },
  { name: 'MacBook Air M3', sales: 12, revenue: 62400000 },
  { name: 'AirPods Pro 2nd Gen', sales: 45, revenue: 40050000 },
  { name: 'Running Shoes Pro', sales: 67, revenue: 30150000 },
];

export default function SellerDashboard() {
  const { t } = useApp();
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('Total Revenue', 'Revenus totaux')} value="12,580,000 Ar" change={12.4} icon={<DollarSign className="w-5 h-5" />} color="#0077B6" />
        <StatCard title={t('Orders', 'Commandes')} value="183" change={8.1} icon={<ShoppingCart className="w-5 h-5" />} color="#5ABCB9" />
        <StatCard title={t('Products', 'Produits')} value="426" change={5.2} icon={<Package className="w-5 h-5" />} color="#0077B6" />
        <StatCard title={t('Low stock items', 'Produits bientôt épuisés')} value="8" change={-2} icon={<AlertTriangle className="w-5 h-5" />} color="#f59e0b" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold font-display text-foreground">{t('Revenue', 'Revenus')}</h2>
            <TrendingUp className="w-4 h-4 text-[#5ABCB9]" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(v: number) => [formatPrice(v), 'Revenue']} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#0077B6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold font-display text-foreground">{t('Orders', 'Commandes')}</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Line dataKey="orders" stroke="#5ABCB9" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold font-display text-foreground">{t('Recent orders', 'Commandes récentes')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  {[t('Order', 'Commande'), t('Customer', 'Client'), t('Product', 'Produit'), t('Amount', 'Montant'), t('Status', 'Statut'), t('Date', 'Date')].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-secondary transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#0077B6] font-bold">{order.id}</td>
                    <td className="px-4 py-3 text-foreground">{order.customer}</td>
                    <td className="px-4 py-3 text-foreground truncate max-w-32">{order.product}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{formatPrice(order.amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold font-display text-foreground">{t('Top products', 'Meilleurs produits')}</h2>
          </div>
          <div className="p-4 space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-xs font-bold text-[#0077B6]">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.sales} {t('sold', 'vendus')}</div>
                </div>
                <div className="text-xs font-bold text-foreground">{(p.revenue / 1000000).toFixed(1)}M Ar</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
