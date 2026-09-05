import { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Smartphone } from 'lucide-react';
import { StatCard, Tabs, Badge, Select } from '../../components/ui';
import { formatPrice } from '../../data/mock';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../contexts/AppContext';

const paymentData = [
  { month: 'Mar', mvola: 18000000, orange: 9000000, card: 7000000, cod: 4000000 },
  { month: 'Apr', mvola: 20000000, orange: 10500000, card: 7500000, cod: 4000000 },
  { month: 'May', mvola: 25000000, orange: 13000000, card: 8500000, cod: 4500000 },
  { month: 'Jun', mvola: 23000000, orange: 12000000, card: 8000000, cod: 4000000 },
  { month: 'Jul', mvola: 31000000, orange: 16000000, card: 10000000, cod: 5000000 },
  { month: 'Aug', mvola: 37000000, orange: 19000000, card: 12000000, cod: 6500000 },
];

const transactions = [
  { id: 'PAY-001', order: 'ORD-2026-001', buyer: 'Rakoto A.', seller: 'TechStore MG', amount: 1388000, method: 'MVola', commission: 138800, status: 'completed', date: '2026-08-28' },
  { id: 'PAY-002', order: 'ORD-2026-002', buyer: 'Marie R.', seller: 'TechStore MG', amount: 890000, method: 'Card', commission: 89000, status: 'completed', date: '2026-08-30' },
  { id: 'PAY-003', order: 'ORD-2026-003', buyer: 'Jean P.', seller: 'MasoMaro Market', amount: 243000, method: 'MVola', commission: 24300, status: 'pending', date: '2026-09-01' },
  { id: 'PAY-004', order: 'ORD-2026-004', buyer: 'Alice M.', seller: 'SportZone', amount: 450000, method: 'COD', commission: 45000, status: 'pending', date: '2026-09-01' },
  { id: 'PAY-005', order: 'ORD-2026-005', buyer: 'Paul N.', seller: 'Lewis Store', amount: 89000, method: 'Orange Money', commission: 8900, status: 'completed', date: '2026-08-27' },
];

const methodColors: Record<string, string> = {
  MVola: '#5ABCB9',
  'Orange Money': '#f97316',
  Card: '#0077B6',
  COD: '#8da8b5',
};

const statusColors: Record<string, string> = {
  completed: 'success',
  pending: 'warning',
  failed: 'danger',
  refunded: 'outline',
};

export default function AdminPayments() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('transactions');
  const [methodFilter, setMethodFilter] = useState('all');

  const filtered = transactions.filter(t => methodFilter === 'all' || t.method === methodFilter);
  const totalCommission = transactions.reduce((s, t) => s + t.commission, 0);
  const totalVolume = transactions.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold font-display text-foreground">{t('Payments', 'Paiements')}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('Total volume', 'Volume total')} value="284.5M Ar" change={14.2} icon={<DollarSign className="w-5 h-5" />} color="#0077B6" />
        <StatCard title={t('Platform commission', 'Commission plateforme')} value="28.4M Ar" change={14.2} icon={<TrendingUp className="w-5 h-5" />} color="#5ABCB9" />
        <StatCard title={t('Transactions', 'Transactions')} value="8,432" change={9.3} icon={<CreditCard className="w-5 h-5" />} color="#0077B6" />
        <StatCard title={t('Mobile money', 'Mobile money')} value="79%" change={2.1} icon={<Smartphone className="w-5 h-5" />} color="#5ABCB9" />
      </div>

      {/* Payment methods breakdown */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-semibold font-display text-foreground mb-4">{t('Revenue by payment method', 'Revenus par moyen de paiement')}</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={paymentData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(v: number) => [formatPrice(v)]} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="mvola" name="MVola" fill="#5ABCB9" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="orange" name="Orange Money" fill="#f97316" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="card" name="Card" fill="#0077B6" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="cod" name="COD" fill="#D0CCD0" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-semibold font-display text-foreground mb-4">{t('Payment method share', 'Répartition des paiements')}</h2>
          <div className="space-y-3">
            {[
              { name: 'MVola', pct: 44, color: '#5ABCB9', amount: 125060000 },
              { name: 'Orange Money', pct: 23, color: '#f97316', amount: 65435000 },
              { name: 'Bank card', pct: 18, color: '#0077B6', amount: 51210000 },
              { name: 'Cash on delivery', pct: 15, color: '#D0CCD0', amount: 42675000 },
            ].map(m => (
              <div key={m.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                    <span className="text-foreground">{m.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground">{m.pct}%</span>
                    <span className="text-xs text-muted-foreground ml-2">{(m.amount / 1000000).toFixed(1)}M Ar</span>
                  </div>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold font-display text-foreground">{t('Transactions', 'Transactions')}</h2>
          <Select
            options={[
              { value: 'all', label: t('All methods', 'Tous les moyens') },
              { value: 'MVola', label: 'MVola' },
              { value: 'Orange Money', label: 'Orange Money' },
              { value: 'Card', label: 'Card' },
              { value: 'COD', label: 'COD' },
            ]}
            value={methodFilter}
            onChange={e => setMethodFilter(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {['Transaction', 'Order', 'Buyer', 'Seller', 'Amount', 'Commission', 'Method', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#5ABCB9] font-bold">{t.id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#0077B6]">{t.order}</td>
                  <td className="px-4 py-3 text-foreground">{t.buyer}</td>
                  <td className="px-4 py-3 text-foreground">{t.seller}</td>
                  <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{formatPrice(t.amount)}</td>
                  <td className="px-4 py-3 text-[#5ABCB9] font-medium whitespace-nowrap">{formatPrice(t.commission)}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${methodColors[t.method] || '#8da8b5'}18`, color: methodColors[t.method] || '#8da8b5' }}>
                      {t.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={(statusColors[t.status] as any) || 'default'}>{t.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-secondary flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Showing {filtered.length} transactions</span>
          <div className="flex gap-6">
            <span className="text-muted-foreground">Volume: <span className="font-bold text-foreground">{formatPrice(totalVolume)}</span></span>
            <span className="text-muted-foreground">Commission: <span className="font-bold text-[#5ABCB9]">{formatPrice(totalCommission)}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
