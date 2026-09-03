
import { DollarSign, ShoppingCart, Users, Store, Package, AlertCircle } from 'lucide-react';
import { StatCard, StatusBadge, Badge } from '../../components/ui';
import {  sellerApplications, formatPrice } from '../../data/mock';
import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/api/admin/dashboard.api';
import { AdminMetrics, AdminRevenue } from '@/type/admin/dashboard';
import { BarStat, LineStat } from '@/components/ui/StatCard';
const recentOrders = [
  { id: 'ORD-2026-001', buyer: 'Rakoto A.', seller: 'TechStore MG', amount: 1388000, status: 'delivered', date: '2026-08-28' },
  { id: 'ORD-2026-002', buyer: 'Marie R.', seller: 'TechStore MG', amount: 890000, status: 'shipped', date: '2026-08-30' },
  { id: 'ORD-2026-003', buyer: 'Jean P.', seller: 'MasoMaro Market', amount: 243000, status: 'processing', date: '2026-09-01' },
  { id: 'ORD-2026-004', buyer: 'Alice M.', seller: 'SportZone', amount: 450000, status: 'pending', date: '2026-09-01' },
];

const topSellers = [
  { name: 'TechStore MG', revenue: 84200000, orders: 1240, status: 'active' },
  { name: 'Lewis Store', revenue: 42100000, orders: 860, status: 'active' },
  { name: 'MasoMaro Market', revenue: 38900000, orders: 2100, status: 'active' },
  { name: 'SportZone', revenue: 21800000, orders: 620, status: 'active' },
];

export default function AdminDashboard() {
const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
const [revenueSeries, setRevenueSeries] = useState<AdminRevenue[]>([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const {
          metrics,
          revenue,
        } = await getDashboardStats();

        setMetrics(metrics);
        setRevenueSeries(revenue);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Alert */}
      {(metrics?.pendingApplications ?? 0) > 0 && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />

          <div className="flex-1 text-sm">
            <span className="font-medium text-amber-800 dark:text-amber-300">
              {metrics?.pendingApplications ?? 0} seller applications
            </span>

            <span className="text-amber-700 dark:text-amber-400">
              {' '}and {metrics?.pendingProducts ?? 0} products are awaiting review.
            </span>
          </div>

          <a
            href="/admin/sellers/applications"
            className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline"
          >
            Review now →
          </a>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Revenue" value={metrics?.totalRevenue ?? 0} change={14.2} icon={<DollarSign className="w-5 h-5" />} color="#0077B6" />
        <StatCard title="Total Orders" value={metrics?.totalOrders ?? 0} change={9.3} icon={<ShoppingCart className="w-5 h-5" />} color="#5ABCB9" />
        <StatCard title="Buyers" value={metrics?.totalBuyers ?? 0} change={11.8} icon={<Users className="w-5 h-5" />} color="#0077B6" />
        <StatCard title="Sellers" value={metrics?.totalSellers ?? 0} change={6.4} icon={<Store className="w-5 h-5" />} color="#5ABCB9" />
        <StatCard title="Products" value={metrics?.totalProducts ?? 0} change={7.1} icon={<Package className="w-5 h-5" />} color="#0077B6" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <BarStat title="MarketPlace Revenue" data={revenueSeries} />
        <LineStat title="User Growth" data={revenueSeries} />
      </div>

      {/* Tables grid */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent orders */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold font-display text-[var(--foreground)]">Recent orders</h2>
            <a href="/admin/orders" className="text-xs text-[#0077B6] hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  {['Order', 'Buyer', 'Amount', 'Status'].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentOrders.map(o => (
                  <tr key={o.id} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#0077B6] font-bold">{o.id}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{o.buyer}</td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{formatPrice(o.amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending applications */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold font-display text-[var(--foreground)]">Pending seller applications</h2>
            <Badge variant="warning">{sellerApplications.length} pending</Badge>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {sellerApplications.map(app => (
              <div key={app.id} className="px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] font-bold text-sm flex-shrink-0">
                  {app.businessName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-[var(--foreground)] truncate">{app.businessName}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">{app.owner} · {app.category} · {app.date}</div>
                </div>
                <a href="/admin/sellers/applications" className="text-xs text-[#0077B6] hover:underline flex-shrink-0">Review</a>
              </div>
            ))}
          </div>
        </div>

        {/* Top sellers */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden lg:col-span-2">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <h2 className="font-semibold font-display text-[var(--foreground)]">Top sellers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  {['Seller', 'Revenue', 'Orders', 'Status', 'Commission'].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {topSellers.map((s, i) => (
                  <tr key={s.name} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-xs font-bold text-[#0077B6]">{i + 1}</span>
                        <span className="font-medium text-[var(--foreground)]">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{(s.revenue / 1000000).toFixed(1)}M Ar</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.orders.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3 text-[#5ABCB9] font-medium">{((s.revenue * 0.10) / 1000000).toFixed(1)}M Ar</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
