import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search, Edit, Copy, EyeOff, Trash2, MoreHorizontal } from 'lucide-react';
import { Button, Badge, StatusBadge, Modal } from '../../components/ui';
import { products, formatPrice } from '../../data/mock';

export default function SellerProducts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-display text-[var(--foreground)]">Products</h1>
        <Button onClick={() => navigate('/seller/products/new')}>
          <Plus className="w-4 h-4" />
          Add product
        </Button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#0077B6]"
            />
          </div>
          <select className="text-sm bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--foreground)] focus:outline-none hidden sm:block">
            <option>All categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                {['Product', 'Category', 'Price', 'Stock', 'Status', 'Sales', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-[var(--secondary)] flex-shrink-0">
                        <img src={`https://images.unsplash.com/${product.image}?w=60&h=60&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-[var(--foreground)] truncate max-w-40">{product.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">Electronics</td>
                  <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${product.stock < 10 ? 'text-amber-600' : 'text-[var(--foreground)]'}`}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={product.stock > 0 ? 'active' : 'out of stock'} /></td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{product.reviews}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === product.id ? null : product.id)}
                        className="p-1.5 rounded-lg hover:bg-[var(--secondary)] text-[var(--muted-foreground)] transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openMenu === product.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg z-10">
                          <div className="p-1">
                            {[
                              { icon: <Edit className="w-3.5 h-3.5" />, label: 'Edit', action: () => navigate(`/seller/products/${product.id}/edit`) },
                              { icon: <Copy className="w-3.5 h-3.5" />, label: 'Duplicate', action: () => {} },
                              { icon: <EyeOff className="w-3.5 h-3.5" />, label: 'Disable', action: () => {} },
                              { icon: <Trash2 className="w-3.5 h-3.5" />, label: 'Delete', action: () => { setDeleteModal(product.id); setOpenMenu(null); }, danger: true },
                            ].map((item, i) => (
                              <button key={i} onClick={() => { item.action(); setOpenMenu(null); }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors ${(item as any).danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-[var(--foreground)] hover:bg-[var(--secondary)]'}`}>
                                {item.icon}
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete product?"
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => setDeleteModal(null)}>Cancel</Button>
            <Button variant="danger" className="flex-1" onClick={() => setDeleteModal(null)}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-[var(--muted-foreground)]">This action cannot be undone. The product will be permanently removed from your store.</p>
      </Modal>
    </div>
  );
}
