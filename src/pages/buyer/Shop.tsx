import { useNavigate } from 'react-router';
import { ArrowRight, Cpu, Shirt, ShoppingBasket, Home, Sparkles, Dumbbell, Smartphone, Watch, MapPin, TrendingUp, Clock, Tag } from 'lucide-react';
import { Button, Badge } from '../../components/ui';
import { categories, sellers, products } from '../../data/mock';
import { formatPrice } from '../../hook/format';
import ProductCard from '../../components/ProductCard';
import { useApp } from '../../contexts/AppContext';
import { Rating } from '../../components/ui';

const categoryIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  Shirt: <Shirt className="w-5 h-5" />,
  ShoppingBasket: <ShoppingBasket className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Watch: <Watch className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
};

export default function Shop() {
  const navigate = useNavigate();
  const { t } = useApp();
  const recommended = products.slice(0, 4);
  const bestSellers = products.slice(2, 6);
  const promotions = products.filter(p => p.discount > 0);
  const recent = products.slice(4, 8);

  return (
    <div className="space-y-10 pb-20 sm:pb-6">
      {/* Banner */}
      <div className="bg-[#16262E] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_#0077B620,_transparent)]" />
        <div className="flex-1 relative z-10">
          <Badge variant="info" className="mb-3 !text-[#5ABCB9] !bg-[#5ABCB9]/20">
            <TrendingUp className="w-3 h-3" />
            {t('Top deals today', 'Meilleures offres du jour')}
          </Badge>
          <h2 className="text-2xl font-bold font-display text-white mb-2">{t('Shop from 340+ stores', 'Achetez dans 340+ boutiques')}</h2>
          <p className="text-[#8da8b5] text-sm mb-4">{t('Products from verified sellers across Madagascar', 'Produits de vendeurs vérifiés à travers Madagascar')}</p>
          <Button onClick={() => navigate('/products')}>
            {t('Browse products', 'Parcourir les produits')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="hidden sm:flex gap-3">
          {products.slice(0, 2).map(p => (
            <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-2 w-32">
              <img src={`https://images.unsplash.com/${p.image}?w=128&h=100&fit=crop&auto=format`} alt="" className="w-full h-20 object-cover rounded-lg mb-1.5 bg-[#1e3540]" />
              <div className="text-[10px] text-white font-medium truncate">{p.name}</div>
              <div className="text-[10px] text-[#5ABCB9] font-bold">{formatPrice(p.price)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-foreground">{t('Popular categories', 'Catégories populaires')}</h2>
          <button onClick={() => navigate('/products')} className="text-sm text-[#0077B6] font-medium hover:underline flex items-center gap-1">
            {t('View all', 'Voir tout')} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => navigate(`/products?category=${cat.id}`)} className="flex flex-col items-center gap-1.5 p-2.5 bg-card border border-border rounded-xl hover:border-[#0077B6]/40 hover:shadow-sm transition-all group">
              <div className="w-9 h-9 rounded-lg bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] group-hover:bg-[#0077B6] group-hover:text-white transition-colors">
                {categoryIcons[cat.icon]}
              </div>
              <span className="text-[10px] font-medium text-foreground text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-foreground">{t('Recommended for you', 'Recommandés pour vous')}</h2>
          <button onClick={() => navigate('/products')} className="text-sm text-[#0077B6] font-medium hover:underline flex items-center gap-1">
            {t('See all', 'Voir tout')} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommended.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promotions */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-bold font-display text-foreground">{t('Promotions', 'Promotions')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promotions.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Best sellers + Stores you may like side by side */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#0077B6]" />
            <h2 className="text-lg font-bold font-display text-foreground">{t('Best sellers', 'Meilleures ventes')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold font-display text-foreground mb-4">{t('Stores you may like', 'Boutiques à découvrir')}</h2>
          <div className="space-y-3">
            {sellers.slice(0, 4).map(seller => (
              <div key={seller.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 hover:shadow-sm hover:border-[#5ABCB9]/30 transition-all cursor-pointer" onClick={() => navigate(`/stores/${seller.id}`)}>
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img src={`https://images.unsplash.com/${seller.logo}?w=80&h=80&fit=crop&auto=format`} alt={seller.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm text-foreground truncate">{seller.name}</span>
                    {seller.verified && <span className="text-[#0077B6] flex-shrink-0">✓</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Rating value={seller.rating} showCount={false} size="xs" />
                    <span>·</span>
                    <span>{seller.products} items</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently added */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#5ABCB9]" />
          <h2 className="text-lg font-bold font-display text-foreground">{t('Recently added', 'Récemment ajoutés')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recent.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
