import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Package, MapPin, Truck, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { Button, Tabs, StatusBadge, EmptyState } from '../../components/ui';
import { orders } from '../../data/mock';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/hook/format';
export function OrdersList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const allOrders = [...orders];

  const tabs = [
    { id: 'all', label: t("All-Tous"), count: allOrders.length },
    { id: 'pending', label: t("Pending") },
    { id: 'processing', label: t("Processing-En-cours") },
    { id: 'shipped', label: t("Shipped-Expédié") },
    { id: 'delivered', label: t("Delivered-Livré") },
    { id: 'cancelled', label: t("Cancelled-Annulé") },
  ];

  const filtered = activeTab === 'all' ? allOrders : allOrders.filter(o => o.status === activeTab);

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-secondary-foreground mb-5">{t("My orders")}</h1>

      <div className="overflow-x-auto mb-5">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Package className="w-8 h-8" />}
          title={t("No orders here")}
          description={t("You have no orders in this category.")}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <div key={order.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-mono text-sm font-bold text-primary">{order.id}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{order.date}</div>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex gap-2 mb-3">
                {order.items.slice(0, 3).map(({ product }, i) => (
                  <div key={i} className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                    <img src={`https://images.unsplash.com/${product.image}?w=60&h=60&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.items.length > 3 && <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">+{order.items.length - 3}</div>}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{order.items.length} {t("items")} · {order.seller}</div>
                  <div className="font-bold text-secondary-foreground mt-0.5">{formatPrice(order.total)}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${order.id}`)}>{t("View")}</Button>
                  {order.tracking && <Button size="sm" onClick={() => navigate(`/orders/${order.id}?tab=tracking`)}>{t("Track")}</Button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isNew = location.search.includes('new=1');
  const order = orders.find(o => o.id === id) || orders[0];
  const [activeTab, setActiveTab] = useState(location.search.includes('tab=tracking') ? 'tracking' : isNew ? 'tracking' : 'details');

  const timeline = [
    { label: t("Order placed"), done: true, time: order.date + ' 09:12' },
    { label: t("Confirmed"), done: true, time: order.date + ' 09:45' },
    { label: t("Preparing"), done: order.status !== 'pending', time: order.status !== 'pending' ? order.date + ' 14:00' : null },
    { label: t("Shipped"), done: ['shipped', 'delivered'].includes(order.status), time: order.status === 'shipped' || order.status === 'delivered' ? '2026-08-31 10:00' : null },
    { label: t("Out for delivery"), done: order.status === 'delivered', time: order.status === 'delivered' ? '2026-09-01 08:30' : null },
    { label: t("Delivered"), done: order.status === 'delivered', time: order.status === 'delivered' ? '2026-09-01 14:22' : null },
  ];

  if (isNew) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold font-display text-secondary-foreground mb-2">{t("Order placed successfully!")}</h1>
        <p className="text-muted-foreground mb-6">{t("Thank you for your order. We\\'ll notify you when it ships.")}</p>
        <div className="bg-card border border-border rounded-xl p-4 mb-6 text-sm text-left space-y-2">
          <div className="flex justify-between"><span className="text-muted-foreground">{t("Order number")}</span><span className="font-mono font-bold text-primary">ORD-2026-004</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold">3,500 Ar</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{t("Estimated delivery")}</span><span>5 Sep 2026</span></div>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => navigate('/orders')}>{t("View orders")}</Button>
          <Button variant="outline" onClick={() => navigate('/shop')}>{t("Continue-shopping-Continuer")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <button onClick={() => navigate('/orders')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-secondary-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t("Back to orders")}
      </button>

      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold font-display text-secondary-foreground">{order.id}</h1>
          <p className="text-sm text-muted-foreground">{order.date}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <Tabs tabs={[{ id: 'details', label: t("Details") }, { id: 'tracking', label: t("Tracking") }]} active={activeTab} onChange={setActiveTab} />

      <div className="mt-5">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm font-display text-secondary-foreground mb-3">{t("Items")}</h3>
              <div className="space-y-3">
                {order.items.map(({ product, qty }, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={`https://images.unsplash.com/${product.image}?w=60&h=60&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-secondary-foreground">{product.name}</div>
                      <div className="text-xs text-muted-foreground">x{qty}</div>
                    </div>
                    <span className="text-sm font-bold text-secondary-foreground">{formatPrice(product.price * qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between">
                <span className="font-semibold text-secondary-foreground">Total</span>
                <span className="font-bold text-lg text-secondary-foreground">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm font-display text-secondary-foreground mb-2">{t("Delivery address")}</h3>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                {order.address}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="bg-card border border-border rounded-xl p-5">
            {order.tracking && (
              <div className="flex items-center gap-2 mb-5 p-3 bg-secondary rounded-lg">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-sm"><span className="text-muted-foreground">{t("Tracking number")}:</span> <span className="font-mono font-bold text-secondary-foreground">{order.tracking}</span></span>
              </div>
            )}
            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    {i < timeline.length - 1 && <div className={`w-0.5 flex-1 my-1 ${step.done ? 'bg-primary' : 'bg-border'}`} style={{ minHeight: '24px' }} />}
                  </div>
                  <div className="pb-5">
                    <div className={`text-sm font-medium ${step.done ? 'text-secondary-foreground' : 'text-muted-foreground'}`}>{step.label}</div>
                    {step.time && <div className="text-xs text-muted-foreground">{step.time}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
