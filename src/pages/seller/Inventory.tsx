import { AlertTriangle, Search } from 'lucide-react';
import { StatusBadge } from '../../components/ui';
import { products } from '../../data/mock';
import { useTranslation } from 'react-i18next';

const inventoryItems = products.map((p, i) => ({
  ...p,
  sku: `SKU-${String(i + 1).padStart(3, '0')}`,
  reserved: Math.floor(Math.random() * 5),
  available: p.stock - Math.floor(Math.random() * 5),
  threshold: 10,
  status: p.stock === 0 ? 'out of stock' : p.stock < 10 ? 'low stock' : 'in stock',
}));

export default function Inventory() {
  const { t } = useTranslation();
  const lowStock = inventoryItems.filter(i => i.status === 'low stock' || i.status === 'out of stock');

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold font-display text-foreground">{t("Inventory")}</h1>

      {lowStock.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-amber-800 dark:text-amber-300 text-sm">{lowStock.length} {t("products need attention")}</div>
            <div className="text-xs text-amber-700 dark:text-amber-400">{lowStock.map(p => p.name).join(', ')}</div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder={t("Search inventory...")} className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]" />
          </div>
          <select className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none hidden sm:block">
            <option>{t("All statuses")}</option>
            <option>{t("In stock")}</option>
            <option>{t("Low stock")}</option>
            <option>{t("Out of stock")}</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {[t("Product"), 'SKU', t("Current stock"), t("Reserved"), t("Available"), t("Threshold"), t("Status")].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryItems.map(item => (
                <tr key={item.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <img src={`https://images.unsplash.com/${item.image}?w=40&h=40&fit=crop`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-foreground truncate max-w-36">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.sku}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${item.stock < item.threshold ? 'text-amber-600' : 'text-foreground'}`}>{item.stock}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.reserved}</td>
                  <td className="px-4 py-3 text-foreground">{item.available}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.threshold}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
