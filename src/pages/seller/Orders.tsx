import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Tabs, StatusBadge, Button, Modal, Select } from '../../components/ui';
import { orders, formatPrice } from '../../data/mock';

const sellerOrders = [
  { id: 'ORD-001', customer: 'Rakoto A.', product: 'Samsung Galaxy A56', qty: 1, amount: 1299000, status: 'processing', date: '2026-09-01', address: '12 Rue Rainitovo, Antananarivo', phone: '+261 34 123 4567', payment: 'MVola - Paid' },
  { id: 'ORD-002', customer: 'Marie R.', product: 'MacBook Air M3', qty: 1, amount: 5200000, status: 'shipped', date: '2026-08-31', address: '45 Avenue de l\'Indépendance', phone: '+261 32 987 6543', payment: 'Card - Paid' },
  { id: 'ORD-003', customer: 'Jean P.', product: 'AirPods Pro 2nd Gen', qty: 2, amount: 1780000, status: 'delivered', date: '2026-08-30', address: '8 Rue de la Paix, Toamasina', phone: '+261 33 456 7890', payment: 'MVola - Paid' },
  { id: 'ORD-004', customer: 'Alice M.', product: 'Running Shoes Pro', qty: 1, amount: 450000, status: 'pending', date: '2026-08-29', address: '23 Cité des Fleurs, Mahajanga', phone: '+261 34 789 0123', payment: 'COD - Pending' },
];

export default function SellerOrders() {
  const [activeTab, setActiveTab] = useState('all');
  const [detailOrder, setDetailOrder] = useState<typeof sellerOrders[0] | null>(null);
  const [newStatus, setNewStatus] = useState('');

  const tabs = [
    { id: 'all', label: 'All', count: sellerOrders.length },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = activeTab === 'all' ? sellerOrders : sellerOrders.filter(o => o.status === activeTab);

  return (
    <div>
      <h1 className="text-xl font-bold font-display text-foreground mb-5">Orders</h1>

      <div className="overflow-x-auto mb-5">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {['Order', 'Customer', 'Product', 'Qty', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#0077B6] font-bold">{order.id}</td>
                  <td className="px-4 py-3 text-foreground">{order.customer}</td>
                  <td className="px-4 py-3 text-foreground truncate max-w-36">{order.product}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.qty}</td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{formatPrice(order.amount)}</td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                  <td className="px-4 py-3">
                    <Button size="xs" variant="outline" onClick={() => { setDetailOrder(order); setNewStatus(order.status); }}>
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!detailOrder}
        onClose={() => setDetailOrder(null)}
        title={`Order ${detailOrder?.id}`}
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => setDetailOrder(null)}>Close</Button>
            <Button className="flex-1" onClick={() => setDetailOrder(null)}>Update status</Button>
          </>
        }
      >
        {detailOrder && (
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-secondary rounded-lg">
              <div className="font-medium mb-1">{detailOrder.customer}</div>
              <div className="flex items-start gap-1 text-muted-foreground"><MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />{detailOrder.address}</div>
              <div className="text-muted-foreground mt-0.5">{detailOrder.phone}</div>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium text-foreground">{detailOrder.product}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium text-foreground">{detailOrder.qty}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-foreground">{formatPrice(detailOrder.amount)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Payment</span>
              <span className="text-foreground">{detailOrder.payment}</span>
            </div>
            <Select
              label="Update status"
              value={newStatus}
              onChange={e => setNewStatus(e.target.value)}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'preparing', label: 'Preparing' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
