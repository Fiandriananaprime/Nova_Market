import { Heart, ShoppingCart, Store } from 'lucide-react';
import { Button, Badge, Rating } from './ui';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../contexts/ToastContext';
import { formatPrice } from '../data/mock';
import { useNavigate } from 'react-router';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  discount: number;
  rating: number;
  reviews: number;
  sellerId: string;
  sellerName: string;
  image: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isFav = favorites.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
    toast(`"${product.name}" added to cart`);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    toast(isFav ? 'Removed from favorites' : 'Added to favorites', isFav ? 'info' : 'success');
  };

  return (
    <div
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md hover:border-[#5ABCB9]/40 transition-all duration-200 group flex flex-col cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative overflow-hidden bg-[var(--secondary)]">
        <img
          src={`https://images.unsplash.com/${product.image}?w=400&h=300&fit=crop&auto=format`}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <Badge variant="danger" className="absolute top-2 left-2">-{product.discount}%</Badge>
        )}
        <button
          onClick={handleToggleFav}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-red-500 text-white shadow-md' : 'bg-white/80 text-[var(--muted-foreground)] hover:bg-white hover:text-red-500'}`}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
        </button>
        {product.stock > 0 && product.stock < 5 && (
          <Badge variant="warning" className="absolute bottom-2 left-2">Only {product.stock} left</Badge>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">Out of stock</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-0.5">{product.brand}</p>
          <h3 className="font-medium text-sm text-[var(--foreground)] leading-snug line-clamp-2 hover:text-[#0077B6] transition-colors">{product.name}</h3>
        </div>
        <Rating value={product.rating} count={product.reviews} size="xs" />
        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--foreground)]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-[var(--muted-foreground)] line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
          <Store className="w-3 h-3" />
          <span className="truncate">{product.sellerName}</span>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="mt-auto w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}
