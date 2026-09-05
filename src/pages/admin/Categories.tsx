import { useState } from 'react';
import { Plus, Edit, Trash2, ChevronRight, GripVertical } from 'lucide-react';
import { Button, Modal, Input, Badge } from '../../components/ui';
import { categories } from '../../data/mock';

const categoryTree = [
  { id: '1', name: 'Electronics', count: 2450, children: [
    { id: '1-1', name: 'Phones', count: 760, children: [] },
    { id: '1-2', name: 'Laptops', count: 320, children: [] },
    { id: '1-3', name: 'Accessories', count: 1370, children: [] },
  ]},
  { id: '2', name: 'Fashion', count: 3820, children: [
    { id: '2-1', name: 'Men', count: 1240, children: [] },
    { id: '2-2', name: 'Women', count: 1980, children: [] },
    { id: '2-3', name: 'Kids', count: 600, children: [] },
  ]},
  { id: '3', name: 'Food & Grocery', count: 1890, children: [] },
  { id: '4', name: 'Home & Living', count: 2100, children: [] },
];

export default function AdminCategories() {
  const [modal, setModal] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(['1', '2']);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-display text-foreground">Category Management</h1>
        <Button onClick={() => setModal(true)}>
          <Plus className="w-4 h-4" />
          Add category
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {categoryTree.map((cat, i) => (
          <div key={cat.id}>
            {i > 0 && <div className="border-t border-border" />}
            <div className="flex items-center gap-2 px-4 py-3 hover:bg-secondary transition-colors group">
              <GripVertical className="w-4 h-4 text-border cursor-grab" />
              <button
                onClick={() => setExpanded(e => e.includes(cat.id) ? e.filter(id => id !== cat.id) : [...e, cat.id])}
                className="flex items-center gap-2 flex-1 text-left"
              >
                {cat.children.length > 0 && (
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expanded.includes(cat.id) ? 'rotate-90' : ''}`} />
                )}
                {cat.children.length === 0 && <span className="w-4" />}
                <span className="font-medium text-foreground">{cat.name}</span>
                <Badge variant="outline">{cat.count.toLocaleString()}</Badge>
              </button>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded hover:bg-border text-muted-foreground hover:text-foreground"><Edit className="w-3.5 h-3.5" /></button>
                <button className="p-1 rounded hover:bg-red-100 text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                <Button size="xs" variant="ghost" onClick={() => setModal(true)}>
                  <Plus className="w-3 h-3" />
                  Sub
                </Button>
              </div>
            </div>

            {expanded.includes(cat.id) && cat.children.map(sub => (
              <div key={sub.id} className="flex items-center gap-2 pl-12 pr-4 py-2.5 border-t border-border hover:bg-secondary transition-colors group">
                <GripVertical className="w-4 h-4 text-border cursor-grab" />
                <span className="flex-1 text-sm text-foreground">{sub.name}</span>
                <Badge variant="outline">{sub.count.toLocaleString()}</Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded hover:bg-border text-muted-foreground hover:text-foreground"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1 rounded hover:bg-red-100 text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Add category"
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => setModal(false)}>Create</Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input label="Category name" placeholder="Electronics" />
          <Input label="Category name (French)" placeholder="Électronique" />
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Parent category (optional)</label>
            <select className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-[#0077B6]">
              <option value="">No parent (top-level)</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Icon</label>
            <select className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-[#0077B6]">
              <option>Cpu</option>
              <option>Shirt</option>
              <option>ShoppingBasket</option>
              <option>Home</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
