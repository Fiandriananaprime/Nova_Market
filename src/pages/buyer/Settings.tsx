import { useState } from 'react';
import { Sun, Moon, Monitor, Bell, Shield, Eye } from 'lucide-react';
import { Toggle, Button, Input } from '../../components/ui';
import { useTheme } from '../../contexts/ThemeContext';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState({ orders: true, promotions: true, sellers: false, recommendations: true, email: false });

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-xl p-5 mb-4">
      <h2 className="font-semibold font-display text-foreground mb-4 text-base">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">{t("Settings")}</h1>

      <Section title={t("Appearance")}>
        <p className="text-sm text-muted-foreground mb-3">{t("Theme")}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'light', icon: <Sun className="w-4.5 h-4.5" />, label: t("Light") },
            { id: 'dark', icon: <Moon className="w-4.5 h-4.5" />, label: t("Dark") },
            { id: 'system', icon: <Monitor className="w-4.5 h-4.5" />, label: t("System") },
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

      <Section title={t("Language")}>
        <div className="grid grid-cols-2 gap-2">
          {[{ id: 'en', label: 'English', flag: '🇬🇧' }, { id: 'fr', label: 'Français', flag: '🇫🇷' }].map(l => (
            <button
              key={l.id}
              onClick={() => i18n.changeLanguage(l.id)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-colors ${i18n.language === l.id ? 'border-[#0077B6] bg-[#0077B6]/5' : 'border-border hover:border-[#0077B6]/30'}`}
            >
              <span className="text-xl">{l.flag}</span>
              <span className={`text-sm font-medium ${i18n.language === l.id ? 'text-[#0077B6]' : 'text-foreground'}`}>{l.label}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title={t("Notifications")}>
        <div className="space-y-3">
          {[
            { id: 'orders', label: t("Order updates"), desc: t("Shipping, delivery and status changes") },
            { id: 'promotions', label: t("Promotions"), desc: t("Special offers and discounts") },
            { id: 'sellers', label: t("Seller updates"), desc: t("New products from followed stores") },
            { id: 'recommendations', label: t("Recommendations"), desc: t("Personalized product suggestions") },
            { id: 'email', label: t("Email notifications"), desc: t("Receive updates by email") },
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

      <Section title={t("Privacy")}>
        <div className="space-y-3">
          {[
            { icon: <Eye className="w-4 h-4" />, label: t("Profile visibility"), desc: t("Control who can see your profile") },
            { icon: <Bell className="w-4 h-4" />, label: t("Marketing preferences"), desc: t("Manage how we use your data for marketing") },
            { icon: <Shield className="w-4 h-4" />, label: t("Data settings"), desc: t("Manage your personal data") },
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

      <Section title={t("Security")}>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">{t("Change password")}</h3>
            <div className="space-y-2 mb-3">
              <Input type="password" placeholder={t("Current password")} />
              <Input type="password" placeholder={t("New password")} />
              <Input type="password" placeholder={t("Confirm new password")} />
            </div>
            <Button size="sm">{t("Update password")}</Button>
          </div>
          <div className="border-t border-border pt-3 flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">{t("Two-factor authentication")}</div>
              <div className="text-xs text-muted-foreground">{t("Add an extra layer of security")}</div>
            </div>
            <Button size="sm" variant="outline">{t("Enable")}</Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
