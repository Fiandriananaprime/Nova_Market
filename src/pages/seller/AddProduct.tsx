import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, Plus, X } from 'lucide-react';
import { Button, Input, Select } from '../../components/ui';
import { useToast } from '../../contexts/ToastContext';

export default function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>(['smartphone', '5G']);
  const [tagInput, setTagInput] = useState('');
  const [variants, setVariants] = useState([{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }, { name: 'Color', values: ['Black', 'White'] }]);
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast('Product saved successfully');
    navigate('/seller/products');
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-xl p-5 mb-4">
      <h2 className="font-semibold font-display text-foreground mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-display text-foreground">Add product</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-4">
          <Section title="Basic information">
            <div className="space-y-3">
              <Input label="Product name" placeholder="Samsung Galaxy A56" />
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                <textarea rows={4} placeholder="Describe your product..." className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] resize-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Brand" placeholder="Samsung" />
                <Select label="Category" options={[{ value: '', label: 'Select category' }, { value: '1', label: 'Electronics' }, { value: '2', label: 'Fashion' }]} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs bg-[#0077B6]/10 text-[#0077B6] px-2 py-1 rounded-full">
                      {tag}
                      <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} placeholder="Add a tag..." className="flex-1 px-3 py-1.5 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]" />
                  <Button size="xs" onClick={addTag}>Add</Button>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Images">
            <div className="grid grid-cols-4 gap-2">
              <label className="col-span-4 sm:col-span-2 h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#0077B6] transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload images</span>
                <input type="file" multiple accept="image/*" className="sr-only" />
              </label>
              {[0, 1, 2].map(i => (
                <div key={i} className="h-28 bg-secondary border border-border rounded-xl overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Pricing">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Price (Ar)" type="number" placeholder="1299000" />
              <Input label="Promotional price (Ar)" type="number" placeholder="Optional" />
            </div>
          </Section>

          <Section title="Inventory">
            <div className="grid grid-cols-3 gap-3">
              <Input label="SKU" placeholder="SKU-001" />
              <Input label="Stock" type="number" placeholder="100" />
              <Input label="Low stock threshold" type="number" placeholder="10" />
            </div>
          </Section>

          <Section title="Variants">
            {variants.map((v, i) => (
              <div key={i} className="flex items-center gap-3 mb-3 p-3 bg-secondary rounded-xl">
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground mb-1">{v.name}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {v.values.map(val => (
                      <span key={val} className="text-xs px-2 py-0.5 bg-card border border-border rounded-full text-foreground">{val}</span>
                    ))}
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5" />
              Add variant
            </Button>
          </Section>

          <Section title="Shipping">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Weight (g)" type="number" placeholder="200" />
              <Input label="Dimensions (cm)" placeholder="15x10x5" />
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-card border border-border rounded-xl p-4 sticky top-6 space-y-3">
            <h3 className="font-semibold text-sm font-display text-foreground">Publish</h3>
            <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }, { value: 'inactive', label: 'Inactive' }]} />
            <Button className="w-full" loading={loading} onClick={handleSave}>Save product</Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/seller/products')}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
