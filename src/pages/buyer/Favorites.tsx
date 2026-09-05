import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Store, Trash2, ShoppingCart } from 'lucide-react';
import { Button, Tabs, EmptyState } from '../../components/ui';
import { products, sellers } from '../../data/mock';
import { useApp } from '../../contexts/AppContext';
import { Rating, VerifiedBadge } from '../../components/ui';
import { formatPrice } from '../../hook/format';

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart, t } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  const favProducts = products.filter(p => favorites.includes(p.id));
  const favStores = sellers.slice(0, 2);

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground mb-5">{t('My Favorites', 'Mes Favoris')}</h1>

      <Tabs
        tabs={[
          { id: 'products', label: t('Products', 'Produits'), count: favProducts.length },
          { id: 'stores', label: t('Stores', 'Boutiques'), count: favStores.length },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-5">
        {activeTab === 'products' && (
          favProducts.length === 0 ? (
            <EmptyState
              icon={<Heart className="w-8 h-8" />}
              title={t("You haven't added any favorites yet.", "Vous n'avez pas encore de favoris.")}
              description={t('Browse products and tap the heart icon to save them.', 'Parcourez les produits et cliquez sur le cœur pour les sauvegarder.')}
              action={<Button onClick={() => navigate('/products')}>{t('Browse products', 'Parcourir les produits')}</Button>}
            />
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favProducts.map(product => (
                <div key={product.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                  <div className="relative overflow-hidden bg-secondary cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                    <img src={`https://images.unsplash.com/${product.image}?w=300&h=220&fit=crop&auto=format`} alt={product.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <h3 className="font-medium text-sm text-foreground truncate">{product.name}</h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
                      <Rating value={product.rating} showCount={false} size="xs" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {t('Add to cart', 'Ajouter')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'stores' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favStores.map(seller => (
              <div key={seller.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all">
                <div className="h-24 bg-[#16262E] relative">
                  <img src={`https://images.unsplash.com/${seller.cover}?w=600&h=200&fit=crop&auto=format`} alt="" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white border-2 border-white overflow-hidden">
                    <img src={`https://images.unsplash.com/${seller.logo}?w=80&h=80&fit=crop&auto=format`} alt={seller.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold font-display text-foreground">{seller.name}</h3>
                  {seller.verified && <VerifiedBadge small />}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/stores/${seller.id}`)}>
                      <Store className="w-3.5 h-3.5" />
                      {t('Visit', 'Visiter')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {}}>
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
