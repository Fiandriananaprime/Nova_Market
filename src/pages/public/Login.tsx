import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUserRole, t } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async (role: 'buyer' | 'seller' | 'admin') => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUserRole(role);
    setLoading(false);
    if (role === 'buyer') navigate('/shop');
    else if (role === 'seller') navigate('/seller');
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0077B6] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl font-display text-[var(--foreground)]">MasoMarket</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-[var(--foreground)] mb-1">{t('Sign in', 'Connexion')}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{t('Welcome back! Please sign in to continue.', 'Bienvenue ! Veuillez vous connecter pour continuer.')}</p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <div className="space-y-4">
            <Input
              label={t('Email', 'Adresse email')}
              type="email"
              placeholder="andry@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />
            <Input
              label={t('Password', 'Mot de passe')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              iconRight={
                <button onClick={() => setShowPassword(!showPassword)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <div className="flex items-center justify-between mt-3 mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-3.5 h-3.5 rounded border-[var(--border)] text-[#0077B6]" />
              <span className="text-sm text-[var(--muted-foreground)]">{t('Remember me', 'Se souvenir de moi')}</span>
            </label>
            <a href="#" className="text-sm text-[#0077B6] hover:underline">{t('Forgot password?', 'Mot de passe oublié ?')}</a>
          </div>

          <Button className="w-full" size="lg" loading={loading} onClick={() => handleLogin('buyer')}>
            {t('Sign in', 'Se connecter')}
          </Button>

          <div className="mt-4 space-y-2">
            <div className="text-center text-xs text-[var(--muted-foreground)] mb-2">{t('Demo access:', 'Accès démo :')}</div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleLogin('seller')}>Seller Demo</Button>
              <Button variant="outline" size="sm" onClick={() => handleLogin('admin')}>Admin Demo</Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--muted-foreground)] mt-5">
          {t("Don't have an account?", "Pas encore de compte ?")}
          {' '}
          <Link to="/register" className="text-[#0077B6] font-medium hover:underline">{t('Create one', 'Créer un compte')}</Link>
        </p>
      </div>
    </div>
  );
}
