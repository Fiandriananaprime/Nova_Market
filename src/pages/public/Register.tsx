import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ShoppingBag, User, Mail, Lock, Building2, ChevronRight } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import RegisterSeller from './RegisterSeller';
import { RegisterRequest, AuthResponse } from '../../type/auth';
import { register } from '../../api/auth.api';
import { getApiErrorMessage } from '../../api/errorMessage';
import { useToast } from '../../contexts/ToastContext';

export default function Register() {
  const navigate = useNavigate();
  const { setUserRole } = useApp();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [step, setStep] = useState<'choose' | 'buyer' | 'seller'>('choose');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    setLoading(true);

    try {
      const data: AuthResponse = await register(form);
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUserRole(data.user.role);
      toast('Compte créé avec succès.');
      navigate('/shop');
    } catch (error) {
      console.error('Error registering user:', error);
      const message = getApiErrorMessage(error, 'Impossible de créer le compte. Vérifiez vos informations.');
      setError(message);
      toast(message, 'error');
    }
    finally {
      setLoading(false);
    }
  };

  if (step === 'seller') {
    return <RegisterSeller onBack={() => setStep('choose')} />;
  }

  if (step === 'buyer') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-display text-foreground mb-1">
              {t("Create buyer account")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("Start shopping in minutes.")}
            </p>
          </div>

          <form onSubmit={handleBuyerSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input value={form.firstName} name="firstName" label={t("First name")} placeholder="Andry" icon={<User className="w-4 h-4" />} onChange={handleChange} />
              <Input value={form.lastName} name="lastName" label={t("Last-name-Nom")} placeholder="Rakoto" icon={<User className="w-4 h-4" />} onChange={handleChange} />
            </div>
            <Input value={form.email} name="email" label="Email" type="email" placeholder="andry@email.com" icon={<Mail className="w-4 h-4" />} onChange={handleChange} />
            <Input value={form.password} name="password" label={t("Password")} type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} onChange={handleChange} />

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              {t("Create-account-Créer-le-compte")}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            <button type="button" onClick={() => setStep('choose')} className="text-muted-foreground hover:text-foreground">
              ← {t("Back")}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0077B6] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl font-display text-foreground">MasoMarket</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground mb-1">
            {t("Create an account")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("Choose how you want to join MasoMarket.")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setStep('buyer')}
            className="bg-card border-2 border-border hover:border-[#0077B6] rounded-2xl p-6 text-left transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] mb-4 group-hover:bg-[#0077B6] group-hover:text-white transition-colors">
              <User className="w-6 h-6" />
            </div>
            <h2 className="font-bold font-display text-foreground text-lg mb-1">{t("Buyer")}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("Browse products, add to cart and place orders from multiple sellers.")}
            </p>
            <div className="flex items-center gap-1 text-[#0077B6] text-sm font-medium mt-4">
              {t("Create buyer account")}
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          <button
            onClick={() => setStep('seller')}
            className="bg-card border-2 border-border hover:border-[#5ABCB9] rounded-2xl p-6 text-left transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#5ABCB9]/10 flex items-center justify-center text-[#5ABCB9] mb-4 group-hover:bg-[#5ABCB9] group-hover:text-white transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="font-bold font-display text-foreground text-lg mb-1">{t("Seller")}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("Create a store, list products and sell to thousands of customers.")}
            </p>
            <div className="flex items-center gap-1 text-[#5ABCB9] text-sm font-medium mt-4">
              {t("Apply as seller")}
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {t("Already have an account?")}{' '}
          <Link to="/login" className="text-[#0077B6] font-medium hover:underline">
            {t("Sign-in-Se-connecter")}
          </Link>
        </p>
      </div>
    </div>
  );
}