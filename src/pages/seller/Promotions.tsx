import { useState } from 'react';
import { Plus, Tag, Calendar } from 'lucide-react';
import { Button, StatusBadge, Modal, Input, Select } from '../../components/ui';
import { formatPrice } from '../../data/mock';
import { useTranslation } from 'react-i18next';

const promotions = [
  { id: '1', name: 'Back to School Sale', type: 'percentage', discount: 15, products: 12, start: '2026-08-25', end: '2026-09-10', status: 'active' },
  { id: '2', name: 'Flash Sale — Galaxy A56', type: 'fixed', discount: 50000, products: 1, start: '2026-09-01', end: '2026-09-03', status: 'active' },
  { id: '3', name: 'Summer Clearance', type: 'percentage', discount: 25, products: 8, start: '2026-07-01', end: '2026-07-31', status: 'inactive' },
];

export default function SellerPromotions() {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setModal(false);
  };

  return (
    <div>


      <div className="grid gap-4">
        {promotions.map(promo => (
          <div key={promo.id} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold font-display text-secondary-foreground">{promo.name}</span>
                <StatusBadge status={promo.status} />
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>{promo.type === 'percentage' ? `${promo.discount}% off` : `${formatPrice(promo.discount)} off`}</span>
                <span>·</span>
                <span>{promo.products} {t(promo.products > 1 ? 'products' : 'product', promo.products > 1 ? 'produits' : 'produit')}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{promo.start} — {promo.end}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">{t("Edit")}</Button>
              <Button variant="ghost" size="sm">{t("Disable")}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
