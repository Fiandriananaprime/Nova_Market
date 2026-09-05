import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Truck, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';
import { formatPrice } from '@/hook/format';
import { useTranslation } from 'react-i18next';

type Step = 'delivery' | 'method' | 'payment' | 'review';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useApp();
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('delivery');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('mvola');
  const [loading, setLoading] = useState(false);

  const steps: { id: Step; label: string }[] = [
    { id: 'delivery', label: t("Delivery") },
    { id: 'method', label: t("Method") },
    { id: 'payment', label: t("Payment") },
    { id: 'review', label: t("Review") },
  ];

  const currentIdx = steps.findIndex(s => s.id === step);
  const shipping = deliveryMethod === 'express' ? 12000 : deliveryMethod === 'pickup' ? 0 : 3500;
  const total = cartTotal + shipping;

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    navigate('/orders/ORD-2026-004?new=1');
  };

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">{t("Checkout-Commande")}</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className={`flex flex-col items-center ${i > 0 ? 'flex-1' : ''}`}>
              {i > 0 && <div className={`h-0.5 w-full ${i <= currentIdx ? 'bg-[#0077B6]' : 'bg-border'} mb-2`} />}
              <div className={`flex items-center gap-2 ${i === 0 ? '' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < currentIdx ? 'bg-[#0077B6] text-white' : i === currentIdx ? 'bg-[#0077B6] text-white ring-4 ring-[#0077B6]/20' : 'bg-secondary text-muted-foreground'}`}>
                  {i < currentIdx ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === currentIdx ? 'text-[#0077B6]' : i < currentIdx ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
              </div>
            </div>
            {i < steps.length - 1 && i > 0 && <div className="hidden" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          {step === 'delivery' && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[#0077B6]" />
                <h2 className="font-semibold font-display text-foreground">{t("Delivery address")}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label={t("First name")} placeholder="Andry" />
                <Input label={t("Last-name-Nom")} placeholder="Rakoto" />
              </div>
              <Input label={t("Address")} placeholder="12 Rue Rainitovo" />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t("City")} placeholder="Antananarivo" />
                <Input label={t("Postal code")} placeholder="101" />
              </div>
              <Input label={t("Phone")} type="tel" placeholder="+261 34 000 0000" />
              <Input label={t("Delivery instructions")} placeholder={t("Optional-Optionnel")} />
              <Button className="w-full" onClick={() => setStep('method')}>
                {t("Continue")} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 'method' && (
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-[#0077B6]" />
                <h2 className="font-semibold font-display text-foreground">{t("Delivery method")}</h2>
              </div>
              <div className="space-y-2 mb-5">
                {[
                  { id: 'standard', label: t("Standard delivery"), desc: '3-5 days', price: 3500 },
                  { id: 'express', label: t("Express delivery"), desc: '1-2 days', price: 12000 },
                  { id: 'pickup', label: t("Store pickup"), desc: t("Ready in 2h"), price: 0 },
                ].map(m => (
                  <label key={m.id} className={`flex items-center gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-colors ${deliveryMethod === m.id ? 'border-[#0077B6] bg-[#0077B6]/5' : 'border-border hover:border-[#0077B6]/30'}`}>
                    <input type="radio" name="delivery" value={m.id} checked={deliveryMethod === m.id} onChange={e => setDeliveryMethod(e.target.value)} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${deliveryMethod === m.id ? 'border-[#0077B6] bg-[#0077B6]' : 'border-border'}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                    <span className="font-semibold text-sm text-foreground">{m.price === 0 ? t("Free") : formatPrice(m.price)}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('delivery')}>{t("Back")}</Button>
                <Button className="flex-1" onClick={() => setStep('payment')}>{t("Continue")} <ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#0077B6]" />
                <h2 className="font-semibold font-display text-foreground">{t("Payment")}</h2>
              </div>
              <div className="space-y-2 mb-5">
                {[
                  { id: 'mvola', label: 'MVola', desc: 'Mobile money', icon: '📱' },
                  { id: 'orangemoney', label: 'Orange Money', desc: 'Mobile money', icon: '🟠' },
                  { id: 'airtel', label: 'Airtel Money', desc: 'Mobile money', icon: '🔴' },
                  { id: 'card', label: t("Bank card"), desc: 'Visa / Mastercard', icon: '💳' },
                  { id: 'cod', label: t("Cash on delivery"), desc: t("Pay when you receive"), icon: '💵' },
                ].map(m => (
                  <label key={m.id} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === m.id ? 'border-[#0077B6] bg-[#0077B6]/5' : 'border-border hover:border-[#0077B6]/30'}`}>
                    <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={e => setPaymentMethod(e.target.value)} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${paymentMethod === m.id ? 'border-[#0077B6] bg-[#0077B6]' : 'border-border'}`} />
                    <span className="text-lg">{m.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('method')}>{t("Back")}</Button>
                <Button className="flex-1" onClick={() => setStep('review')}>{t("Continue")} <ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold font-display text-foreground mb-4">{t("Review your order")}</h2>
              <div className="space-y-2 mb-5">
                {cart.map(item => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={`https://images.unsplash.com/${item.image}?w=60&h=60&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">x{item.qty}</div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('payment')}>{t("Back")}</Button>
                <Button className="flex-1" loading={loading} onClick={handlePlaceOrder}>
                  {t("Place order")}
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
            <h3 className="font-semibold font-display text-foreground mb-3 text-sm">{t("Summary")}</h3>
            <div className="space-y-1.5 text-sm mb-3">
              <div className="flex justify-between"><span className="text-muted-foreground">{t("Items")}</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t("Shipping")}</span><span>{shipping === 0 ? t("Free") : formatPrice(shipping)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between"><span className="font-semibold text-foreground">Total</span><span className="font-bold text-foreground">{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
