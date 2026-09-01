import { useState } from 'react';
import { Button, Input, Toggle } from '../../components/ui';

export default function AdminSettings() {
  const [commissionRate, setCommissionRate] = useState(10);
  const [loading, setLoading] = useState(false);

  const exampleSale = 100000;
  const commission = exampleSale * (commissionRate / 100);
  const sellerReceives = exampleSale - commission;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-4">
      <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">{title}</h2>
      {children}
    </div>
  );

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0">
      <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
      <span className="font-medium text-[var(--foreground)]">{value}</span>
    </div>
  );

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold font-display text-[var(--foreground)] mb-6">Platform Settings</h1>

      <Section title="General">
        <div className="space-y-3">
          <Input label="Platform name" defaultValue="MasoMarket" />
          <Input label="Contact email" type="email" defaultValue="admin@masomarket.mg" />
          <Input label="Support phone" defaultValue="+261 20 222 0000" />
        </div>
      </Section>

      <Section title="Commission settings">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-[var(--foreground)] mb-1 block">Default commission rate (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={30}
                value={commissionRate}
                onChange={e => setCommissionRate(Number(e.target.value))}
                className="flex-1 accent-[#0077B6]"
              />
              <span className="w-12 text-center font-bold text-[#0077B6] text-lg font-display">{commissionRate}%</span>
            </div>
          </div>
          <div className="bg-[var(--secondary)] rounded-xl p-4">
            <div className="text-xs text-[var(--muted-foreground)] font-medium mb-2 uppercase tracking-wide">Example calculation</div>
            <Row label="Seller sale" value="100,000 Ar" />
            <Row label={`Platform commission (${commissionRate}%)`} value={`${commission.toLocaleString('fr-MG')} Ar`} />
            <Row label="Seller receives" value={`${sellerReceives.toLocaleString('fr-MG')} Ar`} />
          </div>
        </div>
      </Section>

      <Section title="Payment methods">
        <div className="space-y-2.5">
          {[
            { name: 'MVola', desc: 'Mobile money Madagascar', enabled: true },
            { name: 'Orange Money', desc: 'Mobile money Orange', enabled: true },
            { name: 'Airtel Money', desc: 'Mobile money Airtel', enabled: false },
            { name: 'Bank card', desc: 'Visa / Mastercard', enabled: false },
            { name: 'Cash on delivery', desc: 'Pay on receipt', enabled: true },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-[var(--foreground)]">{m.name}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{m.desc}</div>
              </div>
              <Toggle checked={m.enabled} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Languages">
        <div className="space-y-2">
          {[{ lang: 'English', code: 'en', flag: '🇬🇧', default: true }, { lang: 'Français', code: 'fr', flag: '🇫🇷', default: false }].map(l => (
            <div key={l.code} className="flex items-center justify-between p-3 bg-[var(--secondary)] rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{l.flag}</span>
                <div>
                  <div className="font-medium text-sm text-[var(--foreground)]">{l.lang}</div>
                  {l.default && <div className="text-xs text-[#5ABCB9]">Default language</div>}
                </div>
              </div>
              <Toggle checked onChange={() => {}} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Security">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--foreground)]">Require email verification</div>
              <div className="text-xs text-[var(--muted-foreground)]">New accounts must verify their email</div>
            </div>
            <Toggle checked onChange={() => {}} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--foreground)]">Manual seller approval</div>
              <div className="text-xs text-[var(--muted-foreground)]">New sellers must be approved by admins</div>
            </div>
            <Toggle checked onChange={() => {}} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[var(--foreground)]">Product moderation</div>
              <div className="text-xs text-[var(--muted-foreground)]">New products must be approved before going live</div>
            </div>
            <Toggle checked onChange={() => {}} />
          </div>
        </div>
      </Section>

      <Button size="lg" loading={loading} onClick={handleSave}>Save settings</Button>
    </div>
  );
}
