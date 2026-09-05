import { useState } from 'react';
import { useNavigate } from 'react-router';

import { User, Mail, Lock, Building2, Phone, MapPin } from 'lucide-react';
import { Button, Input } from '../../components/ui';

import { RegisterSellerRequest, RegisterSellerResponse } from '../../type/auth';
import { registerSeller } from '@/api/auth.api';
import { useTranslation } from 'react-i18next';
import { getApiErrorMessage } from '@/api/errorMessage';
import { useToast } from '@/contexts/ToastContext';

interface RegisterSellerProps {
  onBack?: () => void;
}

export default function RegisterSeller({ onBack}: RegisterSellerProps ) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);

    const payload: RegisterSellerRequest = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      businessName: form.businessName.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.password || !payload.businessName || !payload.phone || !payload.location) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);
    try {
      const data: RegisterSellerResponse = await registerSeller(payload);
      if (data.status === 'pending') {
        toast('Votre candidature a été envoyée.');
        navigate('/received');
      }
    } catch (error) {
      console.error('Error registering seller:', error);
      const message = getApiErrorMessage(error, 'Impossible de soumettre la candidature. Vérifiez vos informations et réessayez.');
      setError(message);
      toast(message, 'error');
    } finally {
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-display text-foreground mb-1">
            {t("Seller application")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("Tell us about your business.")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="pb-3 mb-1 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">
              {t("Personal information")}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.firstName} name="firstName" label={t("First name")} placeholder="Jean" icon={<User className="w-4 h-4" />} onChange={handleChange} />
            <Input value={form.lastName} name="lastName" label={t("Last-name-Nom")} placeholder="Rakoto" icon={<User className="w-4 h-4" />} onChange={handleChange} />
          </div>
          <Input value={form.email} name="email" label="Email" type="email" placeholder="jean@business.mg" icon={<Mail className="w-4 h-4" />} onChange={handleChange} />

          <div className="pb-3 mb-1 border-b border-border pt-2">
            <h3 className="text-sm font-semibold text-foreground">
              {t("Business information")}
            </h3>
          </div>
          <Input value={form.businessName} name="businessName" label={t("Business-name-Nom-commercial")} placeholder="My Store MG" icon={<Building2 className="w-4 h-4" />} onChange={handleChange} />
          <Input value={form.phone} name="phone" label={t("Phone")} type="tel" placeholder="+261 34 000 0000" icon={<Phone className="w-4 h-4" />} onChange={handleChange} />
          <Input value={form.location} name="location" label={t("Location-Localisation")} placeholder="Antananarivo" icon={<MapPin className="w-4 h-4" />} onChange={handleChange} />
          <Input value={form.password} name="password" label={t("Password")} type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} onChange={handleChange} />

          <p className="text-xs text-muted-foreground">
            {t("Your application will be reviewed within 24-48 hours.")}
          </p>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg" variant="accent" loading={loading}>
            {t("Submit application")}
          </Button>
        </form>

        {onBack && (
          <p className="text-center text-sm mt-4">
            <button type="button" onClick={onBack} className="text-muted-foreground hover:text-foreground">
              ← {t("Back")}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}