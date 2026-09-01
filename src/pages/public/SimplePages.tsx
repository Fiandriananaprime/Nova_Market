import { useNavigate } from 'react-router';
import { Button } from '../../components/ui';
import { categories, sellers } from '../../data/mock';
import { Rating, VerifiedBadge } from '../../components/ui';
import { useApp } from '../../contexts/AppContext';

export function HowItWorks() {
  const { t } = useApp();
  const steps = [
    { n: '01', title: t('Discover', 'Découvrir'), desc: t('Explore stores, categories and products from verified sellers across Madagascar.', 'Explorez boutiques, catégories et produits de vendeurs vérifiés.') },
    { n: '02', title: t('Search', 'Rechercher'), desc: t('Find exactly what you need using our powerful search with filters and categories.', 'Trouvez exactement ce dont vous avez besoin avec nos filtres.') },
    { n: '03', title: t('Add to cart', 'Ajouter au panier'), desc: t('Add products from one or multiple sellers into a single cart.', 'Ajoutez des produits de plusieurs vendeurs dans un seul panier.') },
    { n: '04', title: t('Order & track', 'Commander et suivre'), desc: t('Complete your purchase and track your order in real time.', 'Finalisez votre achat et suivez votre commande en temps réel.') },
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-display text-[var(--foreground)] mb-3">{t('How it works', 'Comment ça marche')}</h1>
        <p className="text-[var(--muted-foreground)]">{t('Shopping on MasoMarket is easy and fast.', 'Acheter sur MasoMarket est simple et rapide.')}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {steps.map(s => (
          <div key={s.n} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="text-4xl font-bold font-display text-[#0077B6]/20 mb-3">{s.n}</div>
            <h3 className="text-xl font-bold font-display text-[var(--foreground)] mb-2">{s.title}</h3>
            <p className="text-[var(--muted-foreground)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoriesPage() {
  const navigate = useNavigate();
  const { t } = useApp();
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold font-display text-[var(--foreground)] mb-2">{t('All Categories', 'Toutes les catégories')}</h1>
      <p className="text-[var(--muted-foreground)] mb-8">{t('Browse our complete category list', 'Parcourez notre liste complète de catégories')}</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => navigate(`/products?category=${cat.id}`)} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-left hover:border-[#0077B6]/40 hover:shadow-md transition-all group">
            <img src={`https://images.unsplash.com/${cat.image}?w=400&h=200&fit=crop&auto=format`} alt={cat.name} className="w-full h-32 object-cover rounded-lg mb-3 bg-[var(--secondary)]" />
            <h3 className="font-semibold font-display text-[var(--foreground)] group-hover:text-[#0077B6] transition-colors">{cat.name}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">{cat.count.toLocaleString()} {t('products', 'produits')}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SellersPage() {
  const navigate = useNavigate();
  const { t } = useApp();
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold font-display text-[var(--foreground)] mb-2">{t('All Sellers', 'Tous les vendeurs')}</h1>
      <p className="text-[var(--muted-foreground)] mb-8">{t('Discover our verified sellers', 'Découvrez nos vendeurs vérifiés')}</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sellers.map(seller => (
          <div key={seller.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-all">
            <div className="h-24 relative">
              <img src={`https://images.unsplash.com/${seller.cover}?w=600&h=200&fit=crop&auto=format`} alt="" className="w-full h-full object-cover opacity-70 bg-[#16262E]" />
              <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white border-2 border-white overflow-hidden">
                <img src={`https://images.unsplash.com/${seller.logo}?w=80&h=80&fit=crop&auto=format`} alt={seller.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold font-display text-[var(--foreground)]">{seller.name}</h3>
                <Rating value={seller.rating} showCount={false} size="xs" />
              </div>
              {seller.verified && <VerifiedBadge small />}
              <div className="text-xs text-[var(--muted-foreground)] mt-2 mb-3">{seller.products} products · {seller.location}</div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/stores/${seller.id}`)}>
                {t('Visit store', 'Visiter la boutique')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const { t } = useApp();
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold font-display text-[var(--foreground)] mb-4">{t('About MasoMarket', 'À propos de MasoMarket')}</h1>
      <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
        {t('MasoMarket is Madagascar\'s leading multi-vendor marketplace, connecting buyers with trusted companies, official brands, supermarkets, local businesses and independent sellers.', 'MasoMarket est la principale marketplace multi-vendeurs de Madagascar, connectant les acheteurs à des entreprises de confiance, des marques officielles, des supermarchés et des vendeurs indépendants.')}
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[['18,000+', t('Products', 'Produits')], ['340+', t('Sellers', 'Vendeurs')], ['24,000+', t('Customers', 'Clients')]].map(([n, l]) => (
          <div key={n} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold font-display text-[#0077B6]">{n}</div>
            <div className="text-sm text-[var(--muted-foreground)]">{l}</div>
          </div>
        ))}
      </div>
      <p className="text-[var(--muted-foreground)] leading-relaxed">
        {t('Our mission is to make commerce accessible to everyone in Madagascar by providing a reliable, easy-to-use platform for both buyers and sellers.', 'Notre mission est de rendre le commerce accessible à tous à Madagascar en fournissant une plateforme fiable et facile à utiliser pour les acheteurs et les vendeurs.')}
      </p>
    </div>
  );
}

