import { useNavigate } from 'react-router';
import { ArrowRight, CheckCircle2, Search, ShoppingCart, Package, Shield, TrendingUp, ChevronRight, Building2, Store, Truck } from 'lucide-react';
import { DynamicIcon } from "lucide-react/dynamic";
import { Button, Rating, VerifiedBadge, Badge } from '../../components/ui';
import { formatPrice } from '../../data/mock';
import { useApp } from '../../contexts/AppContext';
import { getCategories, getFeaturedSellers } from '../../api/catalog/catalog.api';
import { Category } from '@/type/category';
import { Seller } from '@/type/user';
import { useEffect, useState } from 'react';
import { Product } from '@/type/product';
import { getFeaturedProducts } from '@/api/catalog/product.api';

type HomeData = {
  categories: Category[];
  featuredProducts: Product[];
  featuredSellers: Seller[];
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useApp();
  const [homeData, setHomeData] = useState<HomeData | null>({
    categories: [],
    featuredProducts: [],
    featuredSellers: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categories, featuredProducts, featuredSellers] = await Promise.all([
          getCategories().catch(() => ( [] )),
          getFeaturedProducts().catch(() => ({ data: [] })),
          getFeaturedSellers().catch(() => ({ data: [] })),
        ]);

        setHomeData({
          categories: categories ?? [],
          featuredProducts: featuredProducts.data ?? [],
          featuredSellers: featuredSellers.data ?? [],
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="bg-[var(--background)]">
      {/* Hero */}
      <section id="Home" className="relative overflow-hidden bg-[#16262E]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0077B620,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="info" className="mb-5 !text-[#5ABCB9] !bg-[#5ABCB9]/15">
                <TrendingUp className="w-3 h-3" />
                {t('Multi-vendor marketplace', 'Marketplace multi-vendeurs')}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-5">
                {t('Everything you need,', 'Tout ce dont vous avez besoin,')}
                <span className="text-[#5ABCB9]"> {t('in one marketplace.', 'en un seul endroit.')}</span>
              </h1>
              <p className="text-lg text-[#8da8b5] mb-8 leading-relaxed max-w-lg">
                {t('Discover products from trusted companies, official brands and local sellers, all in one place. Search, compare and shop easily from a single platform.', 'Découvrez des produits de sociétés de confiance, de marques officielles et de vendeurs locaux, le tout en un seul endroit.')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate('/shop')}>
                  {t('Explore products', 'Explorer les produits')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="!text-white !border-white/20 hover:!bg-white/10" onClick={() => navigate('/register')}>
                  {t('Become a seller', 'Devenir vendeur')}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                {[['18,000+', t('Products', 'Produits')], ['340+', t('Sellers', 'Vendeurs')], ['24,000+', t('Customers', 'Clients')]].map(([n, l]) => (
                  <div key={n}>
                    <div className="text-2xl font-bold text-white font-display">{n}</div>
                    <div className="text-sm text-[#8da8b5]">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:flex flex-col gap-3">
              <div className="flex flex-col items-center py-6">
                {/* Ligne 1 : 2 */}
                <div className="flex gap-12">
                  {homeData?.featuredProducts.slice(0, 2).map((p) => (
                    <div
                      key={p.id}
                      className="w-32 h-32 rotate-45 overflow-hidden rounded-xl
                                border border-white/10 bg-secondary
                                hover:scale-105 transition-transform"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-full h-full object-cover -rotate-45 scale-[1.42]"
                      />
                    </div>
                  ))}
                </div>

                {/* Ligne 2 : 3 */}
                <div className="flex gap-12 -my-1">
                  {homeData?.featuredProducts.slice(2, 5).map((p) => (
                    <div
                      key={p.id}
                      className="w-32 h-32 rotate-45 overflow-hidden rounded-xl
                                border border-white/10 bg-[#1e3540]
                                hover:scale-105 transition-transform"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-full h-full object-cover -rotate-45 scale-[1.42]"
                      />
                    </div>
                  ))}
                </div>

                {/* Ligne 3 : 2 */}
                <div className="flex gap-12">
                  {homeData?.featuredProducts.slice(5, 7).map((p) => (
                    <div
                      key={p.id}
                      className="w-32 h-32 rotate-45 overflow-hidden rounded-xl
                                border border-white/10 bg-[#1e3540]
                                hover:scale-105 transition-transform"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-full h-full object-cover -rotate-45 scale-[1.42]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#0077B6]/20 border border-[#0077B6]/30 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5ABCB9] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#16262E]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t('Fast delivery', 'Livraison rapide')}</div>
                  <div className="text-xs text-[#8da8b5]">{t('From multiple sellers in one order', 'De plusieurs vendeurs en une commande')}</div>
                </div>
                <div className="ml-auto">
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is this platform */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--foreground)] mb-3">
              {t('One marketplace. Many sellers.', 'Une marketplace. De nombreux vendeurs.')}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {t('We connect customers with companies, official distributors, supermarkets, local businesses and independent sellers.', 'Nous connectons les clients aux entreprises, distributeurs officiels, supermarchés et vendeurs indépendants.')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: <Building2 className="w-5 h-5" />, title: t('Multiple sellers', 'Plusieurs vendeurs'), desc: t('Discover products from many stores on one platform.', 'Découvrez des produits de nombreuses boutiques.'), color: '#0077B6' },
              { icon: <Search className="w-5 h-5" />, title: t('Easy discovery', 'Découverte facile'), desc: t('Search using categories, filters and tags.', 'Recherchez par catégories, filtres et tags.'), color: '#5ABCB9' },
              { icon: <ShoppingCart className="w-5 h-5" />, title: t('Simple shopping', 'Shopping simple'), desc: t('Add products to your cart and place orders easily.', 'Ajoutez au panier et commandez facilement.'), color: '#0077B6' },
              { icon: <Shield className="w-5 h-5" />, title: t('Trusted sellers', 'Vendeurs de confiance'), desc: t('Identify verified sellers and view ratings.', 'Identifiez les vendeurs vérifiés et leurs avis.'), color: '#5ABCB9' },
            ].map((f, i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:shadow-md hover:border-[#5ABCB9]/30 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${f.color}15`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="font-semibold font-display text-[var(--foreground)] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Seller types */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
            <h3 className="font-semibold font-display text-[var(--foreground)] mb-5 text-center">{t('Who sells on MasoMarket?', 'Qui vend sur MasoMarket ?')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: '🏢', label: t('Companies', 'Entreprises') },
                { icon: '🏷️', label: t('Official brands', 'Marques officielles') },
                { icon: '🛒', label: t('Supermarkets', 'Supermarchés') },
                { icon: '🏪', label: t('Local businesses', 'Commerces locaux') },
                { icon: '👤', label: t('Independent sellers', 'Vendeurs indépendants') },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 bg-[var(--secondary)] rounded-full">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm font-medium text-[var(--foreground)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="HowItWorks" className="py-16 bg-[#16262E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-3">{t('How it works', 'Comment ça marche')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: <Store className="w-5 h-5" />, title: t('Discover', 'Découvrir'), desc: t('Explore stores, categories and products.', 'Explorez boutiques, catégories et produits.') },
              { step: '02', icon: <Search className="w-5 h-5" />, title: t('Search', 'Rechercher'), desc: t('Find exactly what you need using search and filters.', 'Trouvez ce qu\'il vous faut grâce aux filtres.') },
              { step: '03', icon: <ShoppingCart className="w-5 h-5" />, title: t('Add to cart', 'Ajouter au panier'), desc: t('Add products from one or multiple sellers.', 'Ajoutez des produits de un ou plusieurs vendeurs.') },
              { step: '04', icon: <Package className="w-5 h-5" />, title: t('Order', 'Commander'), desc: t('Complete your purchase and track your order.', 'Finalisez votre achat et suivez votre commande.') },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors">
                  <div className="text-3xl font-bold font-display text-white/10 mb-3">{s.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-[#0077B6]/20 flex items-center justify-center text-[#5ABCB9] mb-3">
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-1.5 font-display">{s.title}</h3>
                  <p className="text-sm text-[#8da8b5]">{s.desc}</p>
                </div>
                {i < 3 && <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-[#8da8b5]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="Categories" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--foreground)]">{t('Popular categories', 'Catégories populaires')}</h2>
              <p className="text-[var(--muted-foreground)] mt-1">{t('Browse by category', 'Parcourir par catégorie')}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/categories')}>
              {t('View all', 'Voir tout')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {homeData?.categories
            .sort((a, b) => b.count - a.count)
            .slice(0, 9)
            .filter(cat => !cat.parentId)
            .map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.id}`)}
                className="flex flex-col items-center gap-2 p-3 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[#0077B6]/40 hover:shadow-md transition-all group text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] group-hover:bg-[#0077B6] group-hover:text-white transition-colors">
                  <DynamicIcon
                    name={cat.icon as any}
                    className="w-6 h-6"
                  />
                </div>

                <div>
                  <div className="text-xs font-medium text-[var(--foreground)] leading-tight">
                    {cat.name}
                  </div>

                  <div className="text-[10px] text-[var(--muted-foreground)]">
                    {cat.count.toLocaleString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section id="FeaturedSellers" className="py-16 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--foreground)]">{t('Featured Sellers', 'Vendeurs en vedette')}</h2>
              <p className="text-[var(--muted-foreground)] mt-1">{t('Top verified stores', 'Boutiques vérifiées top')}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/sellers')}>
              {t('View all', 'Voir tout')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeData?.featuredSellers.map(seller => (
              <div key={seller.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-all">
                <div className="h-24 bg-[#16262E] relative">
                  <img src={seller.cover} alt="" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-[var(--border)] overflow-hidden">
                      <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold font-display text-[var(--foreground)]">{seller.name}</h3>
                      {seller.verified && <VerifiedBadge small />}
                    </div>
                    <Rating value={seller.rating} showCount={false} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
                    <span>{seller.productsCount.toLocaleString()} products</span>
                    <span>·</span>
                    <span>{seller.location}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/stores/${seller.id}`)}>
                    {t('Visit store', 'Visiter la boutique')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="FeaturedProducts" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--foreground)]">{t('Featured Products', 'Produits en vedette')}</h2>
              <p className="text-[var(--muted-foreground)] mt-1">{t('Handpicked for you', 'Sélectionnés pour vous')}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/products')}>
              {t('View all', 'Voir tout')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {homeData?.featuredProducts.slice(0, 8).map(product => (
              <div key={product.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md hover:border-[#5ABCB9]/30 transition-all group cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                <div className="relative overflow-hidden bg-[var(--secondary)]">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  {product.discount && product.discount > 0 && <Badge variant="danger" className="absolute top-2 left-2">-{product.discount}%</Badge>}
                </div>
                <div className="p-3">
                  <p className="text-xs text-[var(--muted-foreground)]">{product.brand}</p>
                  <h3 className="font-medium text-sm text-[var(--foreground)] truncate mt-0.5">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold text-[var(--foreground)] text-sm">{formatPrice(product.price)}</div>
                      {product.originalPrice && <div className="text-xs text-[var(--muted-foreground)] line-through">{formatPrice(product.originalPrice)}</div>}
                    </div>
                    <Rating value={product.rating} showCount={false} size="xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="py-16 bg-[#0077B6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-3">
                {t('Grow your business with our marketplace.', 'Développez votre activité avec notre marketplace.')}
              </h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t('Create your online store, showcase your products, manage your inventory and reach new customers.', 'Créez votre boutique, gérez vos produits et atteignez de nouveaux clients.')}
              </p>
              <Button size="lg" variant="accent" onClick={() => navigate('/register')}>
                {t('Become a seller', 'Devenir vendeur')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                t('Create your store', 'Créer votre boutique'),
                t('Manage products', 'Gérer vos produits'),
                t('Manage inventory', 'Gérer votre stock'),
                t('Receive orders', 'Recevoir des commandes'),
                t('Track sales', 'Suivre les ventes'),
                t('View analytics', 'Voir les analyses'),
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5ABCB9] flex-shrink-0" />
                  <span className="text-sm text-white font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--foreground)] mb-3">
            {t('Ready to start shopping?', 'Prêt à commencer vos achats ?')}
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            {t('Create an account and discover products from trusted sellers.', 'Créez un compte et découvrez des produits de vendeurs de confiance.')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => navigate('/register')}>
              {t('Create account', 'Créer un compte')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/products')}>
              {t('Explore marketplace', 'Explorer la marketplace')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
