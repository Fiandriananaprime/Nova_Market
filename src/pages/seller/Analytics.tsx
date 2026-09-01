import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Eye } from 'lucide-react';
import { StatCard } from '../../components/ui';
import { revenueData, formatPrice } from '../../data/mock';

const topProducts = [
  { name: 'Samsung Galaxy A56', value: 89 },
  { name: 'AirPods Pro', value: 45 },
  { name: 'MacBook Air M3', value: 12 },
  { name: 'Running Shoes', value: 67 },
  { name: 'Linen Shirt', value: 134 },
];

const categoryData = [
  { name: 'Electronics', value: 68, color: '#0077B6' },
  { name: 'Fashion', value: 15, color: '#5ABCB9' },
  { name: 'Beauty', value: 10, color: '#8da8b5' },
  { name: 'Sports', value: 7, color: '#D0CCD0' },
];

const dateFilters = ['Today', '7 days', '30 days', '3 months', 'Custom'];

export default function SellerAnalytics() {
  const [dateFilter, setDateFilter] = useState('30 days');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold font-display text-[var(--foreground)]">Analytics</h1>
        <div className="flex gap-1 bg-[var(--secondary)] p-1 rounded-xl">
          {dateFilters.map(f => (
            <button
              key={f}
              onClick={() => setDateFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${dateFilter === f ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Revenue" value="12,580,000 Ar" change={12.4} icon={<DollarSign className="w-5 h-5" />} color="#0077B6" />
        <StatCard title="Orders" value="183" change={8.1} icon={<ShoppingCart className="w-5 h-5" />} color="#5ABCB9" />
        <StatCard title="Avg. order value" value="68,800 Ar" change={3.2} icon={<TrendingUp className="w-5 h-5" />} color="#0077B6" />
        <StatCard title="Product views" value="12,450" change={18.5} icon={<Eye className="w-5 h-5" />} color="#5ABCB9" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">Revenue over time</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(v: number) => [formatPrice(v), 'Revenue']} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#0077B6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">Orders over time</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Line dataKey="orders" stroke="#5ABCB9" strokeWidth={2.5} dot={{ fill: '#5ABCB9', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">Top products by sales</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topProducts} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="value" fill="#5ABCB9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">Sales by category</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map(c => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-[var(--muted-foreground)]">{c.name}</span>
                  <span className="font-bold text-[var(--foreground)] ml-auto">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
