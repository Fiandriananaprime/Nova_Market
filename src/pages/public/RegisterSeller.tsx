import { useState } from 'react';
import { useNavigate } from 'react-router';

import { User, Mail, Lock, Building2, Phone, MapPin } from 'lucide-react';
import { Button, Input } from '../../components/ui';

import { RegisterSellerRequest, RegisterSellerResponse } from '../../type/auth';
import { registerSeller } from '@/api/auth.api';
import { useApp } from '@/contexts/AppContext';

interface RegisterSellerProps {
  onBack?: () => void;
}

export default function RegisterSeller({ onBack}: RegisterSellerProps ) {
  const { t } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName: '',
    phone: '',
    location: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const data: RegisterSellerResponse = await registerSeller(form as RegisterSellerRequest);
        if (data.status === 'pending') {
            navigate('/received');
        }
    } catch (error) {
      console.error('Error registering seller:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value,
    });
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-display text-[var(--foreground)] mb-1">
            {t('Seller application', 'Candidature vendeur')}
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {t('Tell us about your business.', 'Parlez-nous de votre entreprise.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="pb-3 mb-1 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              {t('Personal information', 'Informations personnelles')}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.firstName} name="firstName" label={t('First name', 'Prénom')} placeholder="Jean" icon={<User className="w-4 h-4" />} onChange={handleChange} />
            <Input value={form.lastName} name="lastName" label={t('Last name', 'Nom')} placeholder="Rakoto" icon={<User className="w-4 h-4" />} onChange={handleChange} />
          </div>
          <Input value={form.email} name="email" label="Email" type="email" placeholder="jean@business.mg" icon={<Mail className="w-4 h-4" />} onChange={handleChange} />

          <div className="pb-3 mb-1 border-b border-[var(--border)] pt-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              {t('Business information', 'Informations commerciales')}
            </h3>
          </div>
          <Input value={form.businessName} name="businessName" label={t('Business name', 'Nom commercial')} placeholder="My Store MG" icon={<Building2 className="w-4 h-4" />} onChange={handleChange} />
          <Input value={form.phone} name="phone" label={t('Phone', 'Téléphone')} type="tel" placeholder="+261 34 000 0000" icon={<Phone className="w-4 h-4" />} onChange={handleChange} />
          <Input value={form.location} name="location" label={t('Location', 'Localisation')} placeholder="Antananarivo" icon={<MapPin className="w-4 h-4" />} onChange={handleChange} />
          <Input value={form.password} name="password" label={t('Password', 'Mot de passe')} type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} onChange={handleChange} />

          <p className="text-xs text-[var(--muted-foreground)]">
            {t('Your application will be reviewed within 24-48 hours.', 'Votre candidature sera examinée sous 24-48 heures.')}
          </p>

          <Button type="submit" className="w-full" size="lg" variant="accent" loading={loading}>
            {t('Submit application', 'Soumettre la candidature')}
          </Button>
        </form>

        {onBack && (
          <p className="text-center text-sm mt-4">
            <button type="button" onClick={onBack} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              ← {t('Back', 'Retour')}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}