import { useState } from 'react';
import { Upload, ExternalLink } from 'lucide-react';
import { Button, Input, Toggle } from '../../components/ui';
import { useNavigate } from 'react-router';

export default function SellerStoreSettings() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-xl p-5 mb-4">
      <h2 className="font-semibold font-display text-foreground mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-display text-foreground">Store settings</h1>
        <Button variant="outline" size="sm" onClick={() => navigate('/stores/1')}>
          <ExternalLink className="w-3.5 h-3.5" />
          View my store
        </Button>
      </div>

      <Section title="Store identity">
        {/* Cover */}
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">Cover image</label>
          <div className="h-32 bg-[#16262E] rounded-xl overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=200&fit=crop" alt="" className="w-full h-full object-cover opacity-60" />
            <label className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors">
              <div className="flex items-center gap-2 bg-white/90 text-[#16262E] px-3 py-1.5 rounded-lg text-sm font-medium">
                <Upload className="w-3.5 h-3.5" />
                Change cover
              </div>
              <input type="file" className="sr-only" />
            </label>
          </div>
        </div>
        {/* Logo */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary relative flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
            <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 cursor-pointer transition-opacity rounded-xl">
              <Upload className="w-4 h-4 text-white" />
              <input type="file" className="sr-only" />
            </label>
          </div>
          <div className="flex-1 space-y-2">
            <Input label="Store name" defaultValue="TechStore MG" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
          <textarea rows={3} defaultValue="Official distributor of electronics and technology products in Madagascar." className="w-full px-3 py-2 text-sm bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] resize-none" />
        </div>
      </Section>

      <Section title="Contact information">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Email" type="email" defaultValue="contact@techstore.mg" />
          <Input label="Phone" defaultValue="+261 20 222 1234" />
          <Input label="Location" defaultValue="Antananarivo" />
          <Input label="Address" defaultValue="Immeuble Andraharo, Antananarivo" />
        </div>
      </Section>

      <Section title="Opening hours">
        <div className="space-y-2">
          {['Monday - Friday', 'Saturday', 'Sunday'].map((day, i) => (
            <div key={day} className="flex items-center gap-3">
              <span className="text-sm text-foreground w-36 flex-shrink-0">{day}</span>
              <input defaultValue={i === 2 ? 'Closed' : '08:00'} className="flex-1 px-3 py-1.5 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]" />
              {i < 2 && <span className="text-muted-foreground">—</span>}
              {i < 2 && <input defaultValue="18:00" className="flex-1 px-3 py-1.5 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]" />}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Store status">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">Store is open</div>
            <div className="text-xs text-muted-foreground">Customers can browse and purchase products</div>
          </div>
          <Toggle checked={open} onChange={setOpen} />
        </div>
      </Section>

      <Section title="Return policy">
        <textarea rows={3} defaultValue="We accept returns within 30 days of purchase. Products must be in original condition." className="w-full px-3 py-2 text-sm bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] resize-none" />
      </Section>

      <Button size="lg" loading={loading} onClick={handleSave}>Save changes</Button>
    </div>
  );
}
