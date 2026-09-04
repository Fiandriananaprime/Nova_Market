import { useState } from 'react';
import { Sun, Moon, Monitor, Globe, Bell, Shield, Lock, Eye } from 'lucide-react';
import { Toggle, Button, Input } from '../../components/ui';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useApp();
  const [notifications, setNotifications] = useState({ orders: true, promotions: true, sellers: false, recommendations: true, email: false });

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-xl p-5 mb-4">
      <h2 className="font-semibold font-display text-foreground mb-4 text-base">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">{t('Settings', 'Paramètres')}</h1>

      <Section title={t('Appearance', 'Apparence')}>
        <p className="text-sm text-muted-foreground mb-3">{t('Theme', 'Thème')}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'light', icon: <Sun className="w-4.5 h-4.5" />, label: t('Light', 'Clair') },
            { id: 'dark', icon: <Moon className="w-4.5 h-4.5" />, label: t('Dark', 'Sombre') },
            { id: 'system', icon: <Monitor className="w-4.5 h-4.5" />, label: t('System', 'Système') },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id as any)}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border-2 transition-colors ${theme === opt.id ? 'border-[#0077B6] bg-[#0077B6]/5 text-[#0077B6]' : 'border-border text-muted-foreground hover:border-[#0077B6]/30'}`}
            >
              {opt.icon}
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('Language', 'Langue')}>
        <div className="grid grid-cols-2 gap-2">
          {[{ id: 'en', label: 'English', flag: '🇬🇧' }, { id: 'fr', label: 'Français', flag: '🇫🇷' }].map(l => (
            <button
              key={l.id}
              onClick={() => setLang(l.id as 'en' | 'fr')}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-colors ${lang === l.id ? 'border-[#0077B6] bg-[#0077B6]/5' : 'border-border hover:border-[#0077B6]/30'}`}
            >
              <span className="text-xl">{l.flag}</span>
              <span className={`text-sm font-medium ${lang === l.id ? 'text-[#0077B6]' : 'text-foreground'}`}>{l.label}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('Notifications', 'Notifications')}>
        <div className="space-y-3">
          {[
            { id: 'orders', label: t('Order updates', 'Mises à jour commandes'), desc: t('Shipping, delivery and status changes', 'Expédition, livraison et changements de statut') },
            { id: 'promotions', label: t('Promotions', 'Promotions'), desc: t('Special offers and discounts', 'Offres spéciales et réductions') },
            { id: 'sellers', label: t('Seller updates', 'Mises à jour vendeurs'), desc: t('New products from followed stores', 'Nouveaux produits des boutiques suivies') },
            { id: 'recommendations', label: t('Recommendations', 'Recommandations'), desc: t('Personalized product suggestions', 'Suggestions de produits personnalisées') },
            { id: 'email', label: t('Email notifications', 'Notifications email'), desc: t('Receive updates by email', 'Recevoir les mises à jour par email') },
          ].map(item => (
            <div key={item.id} className="flex items-start justify-between gap-4 py-1">
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
              <Toggle
                checked={notifications[item.id as keyof typeof notifications]}
                onChange={v => setNotifications(n => ({ ...n, [item.id]: v }))}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title={t('Privacy', 'Confidentialité')}>
        <div className="space-y-3">
          {[
            { icon: <Eye className="w-4 h-4" />, label: t('Profile visibility', 'Visibilité du profil'), desc: t('Control who can see your profile', 'Contrôlez qui peut voir votre profil') },
            { icon: <Bell className="w-4 h-4" />, label: t('Marketing preferences', 'Préférences marketing'), desc: t('Manage how we use your data for marketing', 'Gérez comment nous utilisons vos données') },
            { icon: <Shield className="w-4 h-4" />, label: t('Data settings', 'Paramètres de données'), desc: t('Manage your personal data', 'Gérez vos données personnelles') },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left">
              <span className="text-muted-foreground">{item.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
              <span className="text-muted-foreground">›</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('Security', 'Sécurité')}>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">{t('Change password', 'Changer le mot de passe')}</h3>
            <div className="space-y-2 mb-3">
              <Input type="password" placeholder={t('Current password', 'Mot de passe actuel')} />
              <Input type="password" placeholder={t('New password', 'Nouveau mot de passe')} />
              <Input type="password" placeholder={t('Confirm new password', 'Confirmer le nouveau mot de passe')} />
            </div>
            <Button size="sm">{t('Update password', 'Mettre à jour')}</Button>
          </div>
          <div className="border-t border-border pt-3 flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">{t('Two-factor authentication', 'Authentification à deux facteurs')}</div>
              <div className="text-xs text-muted-foreground">{t('Add an extra layer of security', 'Ajoutez une couche de sécurité supplémentaire')}</div>
            </div>
            <Button size="sm" variant="outline">{t('Enable', 'Activer')}</Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
