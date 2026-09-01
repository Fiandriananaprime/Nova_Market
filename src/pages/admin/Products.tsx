import { useState } from 'react';
import { Search, CheckCircle2, XCircle, EyeOff } from 'lucide-react';
import { Tabs, StatusBadge, Button, Badge } from '../../components/ui';
import { products, formatPrice } from '../../data/mock';

const adminProducts = [
  ...products.map(p => ({ ...p, status: 'approved', submittedAt: '2026-08-20' })),
  { ...products[0], id: 'new-1', name: 'iPhone 15 Pro', status: 'pending', submittedAt: '2026-08-31' },
  { ...products[1], id: 'new-2', name: 'Sony WH-1000XM5', status: 'pending', submittedAt: '2026-09-01' },
];

export default function AdminProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');

  const tabs = [
    { id: 'all', label: 'All', count: adminProducts.length },
    { id: 'approved', label: 'Approved', count: adminProducts.filter(p => p.status === 'approved').length },
    { id: 'pending', label: 'Pending', count: adminProducts.filter(p => p.status === 'pending').length },
    { id: 'rejected', label: 'Rejected', count: 0 },
  ];

  const getStatus = (p: typeof adminProducts[0]) => statuses[p.id] || p.status;

  const filtered = adminProducts.filter(p => {
    if (activeTab !== 'all' && getStatus(p) !== activeTab) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-xl font-bold font-display text-[var(--foreground)] mb-5">Product Moderation</h1>

      <div className="overflow-x-auto mb-4">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[#0077B6]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                {['Product', 'Seller', 'Price', 'Category', 'Status', 'Submitted', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-[var(--secondary)] flex-shrink-0">
                        <img src={`https://images.unsplash.com/${product.image}?w=40&h=40&fit=crop`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-[var(--foreground)] truncate max-w-36">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{product.sellerName}</td>
                  <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">Electronics</td>
                  <td className="px-4 py-3"><StatusBadge status={getStatus(product)} /></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{product.submittedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {getStatus(product) === 'pending' && (
                        <>
                          <Button size="xs" variant="accent" onClick={() => setStatuses(s => ({ ...s, [product.id]: 'approved' }))}>
                            <CheckCircle2 className="w-3 h-3" />
                            Approve
                          </Button>
                          <Button size="xs" variant="danger" onClick={() => setStatuses(s => ({ ...s, [product.id]: 'rejected' }))}>
                            <XCircle className="w-3 h-3" />
                            Reject
                          </Button>
                        </>
                      )}
                      {getStatus(product) === 'approved' && (
                        <Button size="xs" variant="outline" onClick={() => setStatuses(s => ({ ...s, [product.id]: 'inactive' }))}>
                          <EyeOff className="w-3 h-3" />
                          Disable
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
