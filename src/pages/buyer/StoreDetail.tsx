import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { MapPin, Package, Heart, Star, ChevronLeft } from 'lucide-react';
import { Button, Rating, VerifiedBadge, Tabs } from '../../components/ui';
import { sellers, products, formatPrice } from '../../data/mock';
import ProductCard from '../../components/ProductCard';
import { useApp } from '../../contexts/AppContext';

export default function StoreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useApp();
  const seller = sellers.find(s => s.id === id) || sellers[0];
  const sellerProducts = products.filter(p => p.sellerId === seller.id);
  const [activeTab, setActiveTab] = useState('products');
  const [following, setFollowing] = useState(false);

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="bg-[#16262E] rounded-2xl overflow-hidden mb-6 relative">
        <img src={`https://images.unsplash.com/${seller.cover}?w=1400&h=300&fit=crop&auto=format`} alt="" className="w-full h-40 object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16262E]/80 to-transparent" />
        <div className="relative px-5 pb-5 flex flex-col sm:flex-row sm:items-end gap-4 -mt-6">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-3 border-white bg-white flex-shrink-0">
            <img src={`https://images.unsplash.com/${seller.logo}?w=80&h=80&fit=crop&auto=format`} alt={seller.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold font-display text-white">{seller.name}</h1>
              {seller.verified && <VerifiedBadge />}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#8da8b5] mt-1">
              <Rating value={seller.rating} showCount={false} />
              <span>·</span>
              <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {seller.products} {t('products', 'produits')}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {seller.location}</span>
            </div>
          </div>
          <Button
            variant={following ? 'secondary' : 'accent'}
            size="sm"
            onClick={() => setFollowing(!following)}
          >
            <Heart className="w-3.5 h-3.5" fill={following ? 'currentColor' : 'none'} />
            {following ? t('Following', 'Abonné') : t('Follow store', 'Suivre')}
          </Button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="mb-5">
        <Tabs
          tabs={[
            { id: 'products', label: t('Products', 'Produits'), count: sellerProducts.length || products.length },
            { id: 'about', label: t('About', 'À propos') },
            { id: 'reviews', label: t('Reviews', 'Avis'), count: 89 },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(sellerProducts.length > 0 ? sellerProducts : products.slice(0, 8)).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-card border border-border rounded-xl p-5 max-w-2xl">
          <p className="text-foreground leading-relaxed mb-4">{seller.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-secondary rounded-lg"><span className="text-muted-foreground">{t('Location', 'Localisation')}</span><div className="font-medium text-foreground">{seller.location}</div></div>
            <div className="p-3 bg-secondary rounded-lg"><span className="text-muted-foreground">{t('Member since', 'Membre depuis')}</span><div className="font-medium text-foreground">{seller.joined}</div></div>
            <div className="p-3 bg-secondary rounded-lg"><span className="text-muted-foreground">{t('Followers', 'Abonnés')}</span><div className="font-medium text-foreground">{seller.followers.toLocaleString()}</div></div>
            <div className="p-3 bg-secondary rounded-lg"><span className="text-muted-foreground">Rating</span><div className="font-medium text-foreground">⭐ {seller.rating}/5</div></div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-3 max-w-2xl">
          {[
            { name: 'Rakoto A.', rating: 5, comment: 'Excellent seller, products arrived on time and exactly as described.', date: '2026-08-28' },
            { name: 'Rabe M.', rating: 4, comment: 'Good communication, fast shipping. Will buy again!', date: '2026-08-15' },
            { name: 'Ravelo F.', rating: 5, comment: 'Top seller! Quality products and very responsive.', date: '2026-07-30' },
          ].map((review, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{review.name}</span>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <Rating value={review.rating} showCount={false} size="xs" />
              <p className="text-sm text-foreground mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
