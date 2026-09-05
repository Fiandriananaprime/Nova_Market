import { useState } from 'react';
import { Plus, Tag, Calendar } from 'lucide-react';
import { Button, StatusBadge, Modal, Input, Select } from '../../components/ui';
import { formatPrice } from '../../data/mock';

const promotions = [
  { id: '1', name: 'Back to School Sale', type: 'percentage', discount: 15, products: 12, start: '2026-08-25', end: '2026-09-10', status: 'active' },
  { id: '2', name: 'Flash Sale — Galaxy A56', type: 'fixed', discount: 50000, products: 1, start: '2026-09-01', end: '2026-09-03', status: 'active' },
  { id: '3', name: 'Summer Clearance', type: 'percentage', discount: 25, products: 8, start: '2026-07-01', end: '2026-07-31', status: 'inactive' },
];

export default function SellerPromotions() {
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
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-display text-foreground">Promotions</h1>
        <Button onClick={() => setModal(true)}>
          <Plus className="w-4 h-4" />
          Create promotion
        </Button>
      </div>

      <div className="grid gap-4">
        {promotions.map(promo => (
          <div key={promo.id} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#5ABCB9]/10 flex items-center justify-center text-[#5ABCB9] flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold font-display text-foreground">{promo.name}</span>
                <StatusBadge status={promo.status} />
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>{promo.type === 'percentage' ? `${promo.discount}% off` : `${formatPrice(promo.discount)} off`}</span>
                <span>·</span>
                <span>{promo.products} product{promo.products > 1 ? 's' : ''}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{promo.start} — {promo.end}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Disable</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Create promotion"
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button className="flex-1" loading={loading} onClick={handleCreate}>Create</Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input label="Promotion name" placeholder="Summer Sale" />
          <Select label="Discount type" options={[{ value: 'percentage', label: 'Percentage (%)' }, { value: 'fixed', label: 'Fixed amount (Ar)' }]} />
          <Input label="Discount value" type="number" placeholder="15" />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Start date" type="date" />
            <Input label="End date" type="date" />
          </div>
          <p className="text-xs text-muted-foreground">You can select specific products after creating the promotion.</p>
        </div>
      </Modal>
    </div>
  );
}
