import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, MapPin, Plus, Edit, Trash2, CheckCircle2, Package, Heart, Settings } from 'lucide-react';
import { Button, Input, Tabs } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../../contexts/ToastContext';
import { orders } from '../../data/mock';
import { formatPrice } from '@/hook/format';

const addresses = [
  { id: '1', label: 'Home', address: '12 Rue Rainitovo, Antananarivo 101', phone: '+261 34 123 4567', default: true },
  { id: '2', label: 'Office', address: 'Immeuble Galaxy, Avenue de l\'Indépendance', phone: '+261 34 123 4567', default: false },
];

export default function Profile() {
  const { t } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setEditing(false);
    toast(t('Profile updated successfully', 'Profil mis à jour avec succès'));
  };

  const tabs = [
    { id: 'info', label: t('Personal info', 'Informations') },
    { id: 'addresses', label: t('Addresses', 'Adresses') },
    { id: 'orders', label: t('Recent orders', 'Commandes'), count: orders.length },
  ];

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0077B6] to-[#5ABCB9] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            A
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border-2 border-background flex items-center justify-center text-muted-foreground hover:text-[#0077B6] transition-colors shadow-sm">
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Andry Rakoto</h1>
          <p className="text-sm text-muted-foreground">andry@email.com</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Package className="w-3.5 h-3.5" /> {orders.length} orders</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Heart className="w-3.5 h-3.5" /> 2 favorites</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
            <Settings className="w-3.5 h-3.5" />
            {t('Settings', 'Paramètres')}
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div className="mt-5">
        {activeTab === 'info' && (
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold font-display text-foreground">{t('Personal information', 'Informations personnelles')}</h2>
              <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                <Edit className="w-3.5 h-3.5" />
                {editing ? t('Cancel', 'Annuler') : t('Edit', 'Modifier')}
              </Button>
            </div>

            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('First name', 'Prénom')} defaultValue="Andry" />
                  <Input label={t('Last name', 'Nom')} defaultValue="Rakoto" />
                </div>
                <Input label="Email" type="email" defaultValue="andry@email.com" />
                <Input label={t('Phone', 'Téléphone')} defaultValue="+261 34 123 4567" />
                <Input label={t('Date of birth', 'Date de naissance')} type="date" defaultValue="1995-06-15" />
                <div className="flex gap-2 pt-1">
                  <Button loading={loading} onClick={handleSave}>{t('Save changes', 'Enregistrer')}</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>{t('Cancel', 'Annuler')}</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t('First name', 'Prénom'), value: 'Andry' },
                  { label: t('Last name', 'Nom'), value: 'Rakoto' },
                  { label: 'Email', value: 'andry@email.com' },
                  { label: t('Phone', 'Téléphone'), value: '+261 34 123 4567' },
                  { label: t('Date of birth', 'Date de naissance'), value: '15 June 1995' },
                  { label: t('Member since', 'Membre depuis'), value: 'March 2025' },
                ].map(f => (
                  <div key={f.label}>
                    <div className="text-xs font-medium text-muted-foreground mb-0.5">{f.label}</div>
                    <div className="font-medium text-foreground">{f.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-3">
            {addresses.map(addr => (
              <div key={addr.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-foreground">{addr.label}</span>
                    {addr.default && (
                      <span className="text-xs bg-[#0077B6]/10 text-[#0077B6] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {t('Default', 'Par défaut')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{addr.address}</p>
                  <p className="text-sm text-muted-foreground">{addr.phone}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                  {!addr.default && <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5" />
              {t('Add address', 'Ajouter une adresse')}
            </Button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-3">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-[#0077B6]">{order.id}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : order.status === 'shipped' ? 'bg-blue-50 text-[#0077B6] dark:bg-blue-900/30' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  {order.items.slice(0, 4).map(({ product }, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg overflow-hidden bg-secondary">
                      <img src={`https://images.unsplash.com/${product.image}?w=50&h=50&fit=crop`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{order.date}</span>
                  <span className="font-bold text-foreground">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
