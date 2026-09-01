import { useNavigate } from 'react-router';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Store, AlertTriangle } from 'lucide-react';
import { Button, EmptyState } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../../contexts/ToastContext';
import { formatPrice } from '../../data/mock';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, cartTotal, t } = useApp();
  const { toast } = useToast();

  if (cart.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="w-8 h-8" />}
        title={t('Your cart is empty', 'Votre panier est vide')}
        description={t('Browse our marketplace and add products to your cart.', 'Parcourez notre marketplace et ajoutez des produits.')}
        action={<Button onClick={() => navigate('/products')}>{t('Browse products', 'Parcourir les produits')}</Button>}
      />
    );
  }

  // Group by seller
  const bySeller = cart.reduce<Record<string, typeof cart>>((acc, item) => {
    if (!acc[item.sellerId]) acc[item.sellerId] = [];
    acc[item.sellerId].push(item);
    return acc;
  }, {});

  const shipping = 3500;
  const total = cartTotal + shipping;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold font-display text-[var(--foreground)] mb-6">
        {t('Shopping cart', 'Panier d\'achat')}
        <span className="ml-2 text-base font-normal text-[var(--muted-foreground)]">({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(bySeller).map(([sellerId, items]) => (
            <div key={sellerId} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--secondary)]">
                <Store className="w-4 h-4 text-[#0077B6]" />
                <span className="font-medium text-sm text-[var(--foreground)]">{items[0].sellerName}</span>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-3 p-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--secondary)] flex-shrink-0">
                      <img src={`https://images.unsplash.com/${item.image}?w=80&h=80&fit=crop&auto=format`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-[var(--foreground)] mb-1 truncate">{item.name}</h3>
                      <div className="text-sm font-bold text-[var(--foreground)]">{formatPrice(item.price)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.productId, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.productId, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-bold text-[#0077B6]">{formatPrice(item.price * item.qty)}</div>
                      <button onClick={() => { removeFromCart(item.productId); toast(t('Item removed from cart', 'Article retiré du panier'), 'info'); }} className="text-[var(--muted-foreground)] hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--secondary)] text-sm flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">{items[0].sellerName} subtotal</span>
                <span className="font-semibold text-[var(--foreground)]">{formatPrice(items.reduce((s, i) => s + i.price * i.qty, 0))}</span>
              </div>
            </div>
          ))}

          {cartTotal < 50000 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl text-amber-700 dark:text-amber-400 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {t('Add 50,000 Ar more for free shipping.', 'Ajoutez 50 000 Ar de plus pour la livraison gratuite.')}
            </div>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 sticky top-24">
            <h2 className="font-bold font-display text-[var(--foreground)] mb-4">{t('Order summary', 'Récapitulatif')}</h2>
            <div className="space-y-2.5 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">{t('Subtotal', 'Sous-total')}</span>
                <span className="text-[var(--foreground)]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">{t('Shipping', 'Livraison')}</span>
                <span className="text-[var(--foreground)]">{formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-[var(--border)] pt-2.5 flex justify-between">
                <span className="font-semibold text-[var(--foreground)]">Total</span>
                <span className="font-bold text-lg text-[var(--foreground)]">{formatPrice(total)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
              {t('Proceed to checkout', 'Passer à la caisse')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-full mt-2" onClick={() => navigate('/products')}>
              {t('Continue shopping', 'Continuer les achats')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
