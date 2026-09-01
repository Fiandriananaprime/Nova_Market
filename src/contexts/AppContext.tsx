import { createContext, useContext, useState } from 'react';
import { products as allProducts } from '../data/mock';

export type Lang = 'en' | 'fr';
export type UserRole = 'buyer' | 'seller' | 'admin' | null;

interface CartItem {
  productId: string;
  qty: number;
  name: string;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
}

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  userRole: UserRole;
  setUserRole: (r: UserRole) => void;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  cartTotal: number;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  t: (en: string, fr: string) => string;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['1', '3']);

  const t = (en: string, fr: string) => lang === 'fr' ? fr : en;

  const addToCart = (productId: string, qty = 1) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) {
        return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { productId, qty, name: product.name, price: product.price, image: product.image, sellerId: product.sellerId, sellerName: product.sellerName }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  return (
    <AppContext.Provider value={{ lang, setLang, userRole, setUserRole, cart, addToCart, removeFromCart, updateQty, cartTotal, favorites, toggleFavorite, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
