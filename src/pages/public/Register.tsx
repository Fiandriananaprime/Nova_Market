import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ShoppingBag, User, Mail, Lock, Building2, Phone, MapPin, ChevronRight } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { setUserRole, t } = useApp();
  const [step, setStep] = useState<'choose' | 'buyer' | 'seller'>('choose');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setUserRole(step === 'seller' ? 'seller' : 'buyer');
    setLoading(false);
    navigate(step === 'seller' ? '/seller' : '/shop');
  };

  if (step === 'choose') {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0077B6] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl font-display text-[var(--foreground)]">MasoMarket</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-[var(--foreground)] mb-1">{t('Create an account', 'Créer un compte')}</h1>
            <p className="text-sm text-[var(--muted-foreground)]">{t('Choose how you want to join MasoMarket.', 'Choisissez comment rejoindre MasoMarket.')}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button onClick={() => setStep('buyer')} className="bg-[var(--card)] border-2 border-[var(--border)] hover:border-[#0077B6] rounded-2xl p-6 text-left transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] mb-4 group-hover:bg-[#0077B6] group-hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </div>
              <h2 className="font-bold font-display text-[var(--foreground)] text-lg mb-1">{t('Buyer', 'Acheteur')}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{t('Browse products, add to cart and place orders from multiple sellers.', 'Parcourez les produits et commandez auprès de plusieurs vendeurs.')}</p>
              <div className="flex items-center gap-1 text-[#0077B6] text-sm font-medium mt-4">
                {t('Create buyer account', 'Créer un compte acheteur')}
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            <button onClick={() => setStep('seller')} className="bg-[var(--card)] border-2 border-[var(--border)] hover:border-[#5ABCB9] rounded-2xl p-6 text-left transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#5ABCB9]/10 flex items-center justify-center text-[#5ABCB9] mb-4 group-hover:bg-[#5ABCB9] group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="font-bold font-display text-[var(--foreground)] text-lg mb-1">{t('Seller', 'Vendeur')}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{t('Create a store, list products and sell to thousands of customers.', 'Créez une boutique, listez des produits et vendez.')}</p>
              <div className="flex items-center gap-1 text-[#5ABCB9] text-sm font-medium mt-4">
                {t('Apply as seller', 'S\'inscrire comme vendeur')}
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
            {t('Already have an account?', 'Déjà un compte ?')}
            {' '}
            <Link to="/login" className="text-[#0077B6] font-medium hover:underline">{t('Sign in', 'Se connecter')}</Link>
          </p>
        </div>
      </div>
    );
  }

  if (step === 'buyer') {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-display text-[var(--foreground)] mb-1">{t('Create buyer account', 'Créer un compte acheteur')}</h1>
            <p className="text-sm text-[var(--muted-foreground)]">{t('Start shopping in minutes.', 'Commencez à magasiner en quelques minutes.')}</p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label={t('First name', 'Prénom')} placeholder="Andry" icon={<User className="w-4 h-4" />} />
              <Input label={t('Last name', 'Nom')} placeholder="Rakoto" />
            </div>
            <Input label="Email" type="email" placeholder="andry@email.com" icon={<Mail className="w-4 h-4" />} />
            <Input label={t('Password', 'Mot de passe')} type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
            <Button className="w-full" size="lg" loading={loading} onClick={handleSubmit}>
              {t('Create account', 'Créer le compte')}
            </Button>
          </div>
          <p className="text-center text-sm mt-4">
            <button onClick={() => setStep('choose')} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">← {t('Back', 'Retour')}</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-display text-[var(--foreground)] mb-1">{t('Seller application', 'Candidature vendeur')}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{t('Tell us about your business.', 'Parlez-nous de votre entreprise.')}</p>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="pb-3 mb-1 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{t('Personal information', 'Informations personnelles')}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label={t('First name', 'Prénom')} placeholder="Jean" icon={<User className="w-4 h-4" />} />
            <Input label={t('Last name', 'Nom')} placeholder="Rakoto" />
          </div>
          <Input label="Email" type="email" placeholder="jean@business.mg" icon={<Mail className="w-4 h-4" />} />
          <div className="pb-3 mb-1 border-b border-[var(--border)] pt-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{t('Business information', 'Informations commerciales')}</h3>
          </div>
          <Input label={t('Business name', 'Nom commercial')} placeholder="My Store MG" icon={<Building2 className="w-4 h-4" />} />
          <Input label={t('Phone', 'Téléphone')} type="tel" placeholder="+261 34 000 0000" icon={<Phone className="w-4 h-4" />} />
          <Input label={t('Location', 'Localisation')} placeholder="Antananarivo" icon={<MapPin className="w-4 h-4" />} />
          <Input label={t('Password', 'Mot de passe')} type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
          <p className="text-xs text-[var(--muted-foreground)]">{t('Your application will be reviewed within 24-48 hours.', 'Votre candidature sera examinée sous 24-48 heures.')}</p>
          <Button className="w-full" size="lg" variant="accent" loading={loading} onClick={handleSubmit}>
            {t('Submit application', 'Soumettre la candidature')}
          </Button>
        </div>
        <p className="text-center text-sm mt-4">
          <button onClick={() => setStep('choose')} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">← {t('Back', 'Retour')}</button>
        </p>
      </div>
    </div>
  );
}
