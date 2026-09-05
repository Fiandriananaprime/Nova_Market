import { useState } from 'react';
import { Search } from 'lucide-react';
import { StatusBadge, Select, Pagination } from '../../components/ui';
import { formatPrice } from '../../data/mock';
import { useTranslation } from 'react-i18next';

const allOrders = [
  { id: 'ORD-2026-001', buyer: 'Rakoto A.', seller: 'TechStore MG', amount: 1388000, payment: 'MVola', status: 'delivered', date: '2026-08-28' },
  { id: 'ORD-2026-002', buyer: 'Marie R.', seller: 'TechStore MG', amount: 890000, payment: 'Card', status: 'shipped', date: '2026-08-30' },
  { id: 'ORD-2026-003', buyer: 'Jean P.', seller: 'MasoMaro Market', amount: 243000, payment: 'MVola', status: 'processing', date: '2026-09-01' },
  { id: 'ORD-2026-004', buyer: 'Alice M.', seller: 'SportZone', amount: 450000, payment: 'COD', status: 'pending', date: '2026-09-01' },
  { id: 'ORD-2026-005', buyer: 'Paul N.', seller: 'Lewis Store', amount: 89000, payment: 'MVola', status: 'delivered', date: '2026-08-27' },
  { id: 'ORD-2026-006', buyer: 'Eva R.', seller: 'BeautyHub', amount: 65000, payment: 'Orange Money', status: 'confirmed', date: '2026-08-29' },
];

export default function AdminOrders() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = allOrders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search && !o.id.includes(search) && !o.buyer.toLowerCase().includes(search.toLowerCase()) && !o.seller.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-xl font-bold font-display text-foreground mb-5">{t("Orders")}</h1>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("Search orders, buyers, sellers...")}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]"
            />
          </div>
          <Select
            options={[
              { value: 'all', label: t("All statuses") },
              { value: 'pending', label: t("Pending") },
              { value: 'processing', label: t("Processing") },
              { value: 'shipped', label: t("Shipped") },
              { value: 'delivered', label: t("Delivered") },
              { value: 'cancelled', label: t("Cancelled") },
            ]}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {[t("Order ID"), t("Buyer"), t("Seller"), t("Amount"), t("Payment"), t("Status"), t("Date")].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#0077B6] font-bold">{order.id}</td>
                  <td className="px-4 py-3 text-foreground">{order.buyer}</td>
                  <td className="px-4 py-3 text-foreground">{order.seller}</td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{formatPrice(order.amount)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.payment}</td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center p-4 border-t border-border">
          <Pagination current={page} total={5} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
