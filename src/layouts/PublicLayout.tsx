import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { Globe, Menu, X, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui';
import Logo from '../assets/NovaLogo.png';
function PublicNavbar() {
  const { lang, setLang, t, userRole } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#Home');
  const navigate = useNavigate();
  const accountPath = userRole === 'admin' ? '/admin' : userRole === 'seller' ? '/seller' : '/shop';

  useEffect(() => {
    const sectionIds = ['#Home', '#HowItWorks', '#Categories', '#FeaturedSellers', '#FeaturedProducts'];
    const updateActiveHash = () => {
      const scrollPosition = window.scrollY + 120;
      let currentHash = '#Home';

      for (const hash of sectionIds) {
        const section = document.querySelector(hash);
        if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
          currentHash = hash;
        }
      }

      setActiveHash(currentHash);
    };

    updateActiveHash();
    window.addEventListener('hashchange', updateActiveHash);
    window.addEventListener('scroll', updateActiveHash, { passive: true });
    return () => {
      window.removeEventListener('hashchange', updateActiveHash);
      window.removeEventListener('scroll', updateActiveHash);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
              <img src={Logo} alt="NovaMarket Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg font-display text-foreground">NovaMarket</span>
          </Link>

         <div className="hidden md:flex items-center gap-1">
            {[
              ['#Home', t('Home', 'Accueil')],
              ['#HowItWorks', t('How it works', 'Comment ça marche')],
              ['#Categories', t('Categories', 'Catégories')],
              ['#FeaturedSellers', t('Sellers', 'Vendeurs')],
              ['#FeaturedProducts', t('Products', 'Produits')],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setActiveHash(href)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors ${activeHash === href ? "text-primary after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-foreground after:content-['']" : 'text-muted-foreground hover:text-foreground'}`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            {userRole ? (
              <Button variant="primary" size="sm" onClick={() => navigate(accountPath)}>
                {t('My account', 'Mon espace')}
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>{t('Sign in', 'Connexion')}</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>{t('Create account', 'Créer un compte')}</Button>
              </>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
          {[['/', t('Home', 'Accueil')], ['/how-it-works', t('How it works', 'Comment ça marche')], ['/categories', t('Categories', 'Catégories')], ['/sellers', t('Sellers', 'Vendeurs')]].map(([href, label]) => (
            <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors">{label}</Link>
          ))}
          <div className="flex gap-2 pt-2">
            {userRole ? (
              <Button variant="primary" size="sm" className="flex-1" onClick={() => { navigate(accountPath); setMobileOpen(false); }}>
                {t('My account', 'Mon espace')}
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate('/login'); setMobileOpen(false); }}>{t('Sign in', 'Connexion')}</Button>
                <Button variant="primary" size="sm" className="flex-1" onClick={() => { navigate('/register'); setMobileOpen(false); }}>{t('Create account', 'Créer')}</Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function PublicFooter() {
  const { t, lang, setLang } = useApp();
  return (
    <footer className="bg-[#16262E] text-[#F5EFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0077B6] flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg font-display">NovaMarket</span>
            </div>
            <p className="text-sm text-[#8da8b5] leading-relaxed">{t('Your trusted multi-vendor marketplace.', 'Votre marketplace multi-vendeurs de confiance.')}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 font-display">Marketplace</h4>
            <ul className="space-y-2 text-sm text-[#8da8b5]">
              {['Products', 'Categories', 'Sellers'].map(l => <li key={l}><Link to={`/${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 font-display">{t('Company', 'Entreprise')}</h4>
            <ul className="space-y-2 text-sm text-[#8da8b5]">
              {[t('About', 'À propos'), t('Become a seller', 'Devenir vendeur'), t('Contact', 'Contact')].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 font-display">{t('Help', 'Aide')}</h4>
            <ul className="space-y-2 text-sm text-[#8da8b5]">
              {['FAQ', t('Shipping', 'Livraison'), t('Returns', 'Retours'), t('Terms', 'CGU'), t('Privacy', 'Confidentialité')].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[#8da8b5]">© 2026 NovaMarket. {t('All rights reserved.', 'Tous droits réservés.')}</p>
          <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="flex items-center gap-1.5 text-sm text-[#8da8b5] hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'English' : 'Français'}
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
