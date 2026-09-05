import { useState } from 'react';
import { Search, TrendingUp, ShoppingBag, Calendar } from 'lucide-react';
import { Badge, Pagination } from '../../components/ui';
import { formatPrice } from '../../data/mock';
import { useApp } from '../../contexts/AppContext';

const customers = [
  { id: '1', name: 'Rakoto Andry', email: 'andry@email.com', orders: 7, totalSpent: 9100000, lastOrder: '2026-09-01', status: 'active', avatar: 'R' },
  { id: '2', name: 'Marie Ravelo', email: 'marie@email.com', orders: 4, totalSpent: 3560000, lastOrder: '2026-08-28', status: 'active', avatar: 'M' },
  { id: '3', name: 'Jean Paul Rabe', email: 'jean@email.com', orders: 12, totalSpent: 21400000, lastOrder: '2026-08-25', status: 'active', avatar: 'J' },
  { id: '4', name: 'Alice Manitra', email: 'alice@email.com', orders: 2, totalSpent: 900000, lastOrder: '2026-07-15', status: 'inactive', avatar: 'A' },
  { id: '5', name: 'Paul Noël', email: 'paul@email.com', orders: 5, totalSpent: 6490000, lastOrder: '2026-08-30', status: 'active', avatar: 'P' },
  { id: '6', name: 'Eva Rasoa', email: 'eva@email.com', orders: 3, totalSpent: 1950000, lastOrder: '2026-08-20', status: 'active', avatar: 'E' },
];

const topMetrics = [
  { label: 'Total customers', value: '1,248', change: +14, icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Repeat buyers', value: '68%', change: +5, icon: <ShoppingBag className="w-5 h-5" /> },
  { label: 'Avg. order value', value: '68,800 Ar', change: +3.2, icon: <Calendar className="w-5 h-5" /> },
];

export default function SellerCustomers() {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('totalSpent');

  const filtered = customers
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b as any)[sort] - (a as any)[sort]);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold font-display text-foreground">{t('Customers', 'Clients')}</h1>

      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-4">
        {topMetrics.map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] flex-shrink-0">
              {m.icon}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="font-bold font-display text-foreground">{m.value}</div>
            </div>
            <div className={`ml-auto text-xs font-medium ${m.change > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {m.change > 0 ? '+' : ''}{m.change}%
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('Search customers...', 'Rechercher des clients...')}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0077B6]"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none hidden sm:block"
          >
            <option value="totalSpent">{t('Sort: Top spenders', 'Trier : plus gros dépensiers')}</option>
            <option value="orders">{t('Sort: Most orders', 'Trier : plus de commandes')}</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {[t('Customer', 'Client'), t('Email', 'Email'), t('Orders', 'Commandes'), t('Total spent', 'Total dépensé'), t('Last order', 'Dernière commande'), t('Status', 'Statut')].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(customer => (
                <tr key={customer.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {customer.avatar}
                      </div>
                      <span className="font-medium text-foreground">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{customer.email}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{customer.orders}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{formatPrice(customer.totalSpent)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{customer.lastOrder}</td>
                  <td className="px-4 py-3">
                    <Badge variant={customer.status === 'active' ? 'success' : 'outline'}>{customer.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center p-4 border-t border-border">
          <Pagination current={page} total={4} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
