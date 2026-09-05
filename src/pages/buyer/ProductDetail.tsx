import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Heart, ShoppingCart, Zap, Star, ChevronRight, Truck, RotateCcw, Shield, Minus, Plus, Store, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Rating, VerifiedBadge, Breadcrumb, Tabs } from '../../components/ui';
import { products, sellers } from '../../data/mock';
import { formatPrice } from '../../hook/format';
import ProductCard from '../../components/ProductCard';
import { useApp } from '../../contexts/AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite, t } = useApp();
  const product = products.find(p => p.id === id) || products[0];
  const seller = sellers.find(s => s.id === product.sellerId) || sellers[0];
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const isFav = favorites.includes(product.id);

  const images = [product.image, products[1]?.image || product.image, products[2]?.image || product.image];
  const related = products.filter(p => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 4);
  const sellerMore = products.filter(p => p.id !== product.id && p.sellerId === product.sellerId).slice(0, 4);

  return (
    <div className="pb-20 sm:pb-6">
      <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: 'Products', href: '/products' }, { label: product.name }]} />

      <div className="mt-4 grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="bg-secondary rounded-2xl overflow-hidden mb-3">
            <img src={`https://images.unsplash.com/${images[activeImg]}?w=600&h=500&fit=crop&auto=format`} alt={product.name} className="w-full h-80 sm:h-96 object-cover" />
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-[#0077B6]' : 'border-border'}`}>
                <img src={`https://images.unsplash.com/${img}?w=80&h=80&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">{product.brand}</Badge>
              {product.discount > 0 && <Badge variant="danger">-{product.discount}%</Badge>}
              {product.stock > 10 ? <Badge variant="success">In stock</Badge> : product.stock > 0 ? <Badge variant="warning">Only {product.stock} left</Badge> : <Badge variant="danger">Out of stock</Badge>}
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground mb-2">{product.name}</h1>
            <Rating value={product.rating} count={product.reviews} />
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground font-display">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-green-600 text-sm font-medium">Save {formatPrice(product.originalPrice - product.price)}</span>
              </>
            )}
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl cursor-pointer hover:bg-border/50 transition-colors" onClick={() => navigate(`/stores/${seller.id}`)}>
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-border">
              <img src={`https://images.unsplash.com/${seller.logo}?w=80&h=80&fit=crop&auto=format`} alt={seller.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-sm text-foreground">{seller.name}</span>
                {seller.verified && <VerifiedBadge small />}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {seller.rating} · {seller.products} products
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Qty */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('Quantity', 'Quantité')}</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <span className="text-sm text-muted-foreground">{product.stock} available</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" size="lg" onClick={() => addToCart(product.id, qty)}>
              <ShoppingCart className="w-4 h-4" />
              {t('Add to cart', 'Ajouter au panier')}
            </Button>
            <Button variant="accent" size="lg" className="flex-1" onClick={() => { addToCart(product.id, qty); navigate('/cart'); }}>
              <Zap className="w-4 h-4" />
              {t('Buy now', 'Acheter')}
            </Button>
            <button onClick={() => toggleFavorite(product.id)} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors ${isFav ? 'border-red-200 bg-red-50 text-red-500 dark:bg-red-900/20' : 'border-border text-muted-foreground hover:border-red-200 hover:text-red-500'}`}>
              <Heart className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <Truck className="w-4 h-4" />, text: t('Fast delivery', 'Livraison rapide') },
              { icon: <RotateCcw className="w-4 h-4" />, text: t('30-day returns', 'Retours 30j') },
              { icon: <Shield className="w-4 h-4" />, text: t('Secure payment', 'Paiement sécurisé') },
            ].map((i, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 p-2.5 bg-secondary rounded-xl text-center">
                <span className="text-[#0077B6]">{i.icon}</span>
                <span className="text-xs text-muted-foreground font-medium">{i.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <Tabs
          tabs={[
            { id: 'description', label: t('Description', 'Description') },
            { id: 'specs', label: t('Specifications', 'Spécifications') },
            { id: 'reviews', label: t('Reviews', 'Avis'), count: product.reviews },
            { id: 'shipping', label: t('Shipping', 'Livraison') },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
        <div className="mt-5 bg-card border border-border rounded-xl p-5">
          {activeTab === 'description' && <p className="text-foreground leading-relaxed">{product.description}</p>}
          {activeTab === 'specs' && (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-muted-foreground w-1/3">{k}</td>
                    <td className="py-2.5 text-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="text-5xl font-bold font-display text-foreground">{product.rating}</div>
                <div>
                  <Rating value={product.rating} count={product.reviews} size="md" />
                  <p className="text-sm text-muted-foreground mt-1">{product.reviews} reviews</p>
                </div>
              </div>
              {[5, 4, 3].map(r => (
                <div key={r} className="flex items-center gap-3">
                  <span className="text-sm w-6">{r}★</span>
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r === 5 ? 72 : r === 4 ? 18 : 7}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{r === 5 ? 72 : r === 4 ? 18 : 7}%</span>
                </div>
              ))}
              <div className="space-y-3 pt-2">
                {[{ name: 'Rakoto A.', rating: 5, comment: 'Excellent product, exactly as described. Very fast shipping!', date: '2026-08-28' }, { name: 'Marie R.', rating: 4, comment: 'Good quality for the price. Would recommend.', date: '2026-08-20' }].map((review, i) => (
                  <div key={i} className="p-3 bg-secondary rounded-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-sm text-foreground">{review.name}</span>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <Rating value={review.rating} showCount={false} size="xs" />
                    <p className="text-sm text-foreground mt-1.5">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-3 text-sm text-foreground">
              <div className="flex gap-3 p-3 bg-secondary rounded-lg"><Truck className="w-5 h-5 text-[#0077B6] flex-shrink-0" /><div><div className="font-medium">Standard delivery — 3-5 business days</div><div className="text-muted-foreground">2,000 - 5,000 Ar</div></div></div>
              <div className="flex gap-3 p-3 bg-secondary rounded-lg"><Zap className="w-5 h-5 text-[#5ABCB9] flex-shrink-0" /><div><div className="font-medium">Express delivery — 1-2 business days</div><div className="text-muted-foreground">8,000 - 12,000 Ar</div></div></div>
              <div className="flex gap-3 p-3 bg-secondary rounded-lg"><Store className="w-5 h-5 text-muted-foreground flex-shrink-0" /><div><div className="font-medium">Store pickup — Free</div><div className="text-muted-foreground">Ready in 2 hours</div></div></div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4">{t('Related products', 'Produits similaires')}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {sellerMore.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4">{t('More from', 'Plus de')} {seller.name}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sellerMore.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
