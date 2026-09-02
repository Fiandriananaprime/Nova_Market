import BuyerLayout from '../layouts/BuyerLayout';
import Shop from '../pages/buyer/Shop';
import Products from '../pages/buyer/Products';
import ProductDetail from '../pages/buyer/ProductDetail';
import Cart from '../pages/buyer/Cart';
import Checkout from '../pages/buyer/Checkout';
import { OrdersList, OrderDetail } from '../pages/buyer/Orders';
import Favorites from '../pages/buyer/Favorites';
import Settings from '../pages/buyer/Settings';
import Profile from '../pages/buyer/Profile';
import StoreDetail from '../pages/buyer/StoreDetail';

export const buyerRoutes = {
  path: '/',
  Component: BuyerLayout,
  children: [
    { path: 'shop', Component: Shop },
    { path: 'products', Component: Products },
    { path: 'products/:id', Component: ProductDetail },
    { path: 'stores/:id', Component: StoreDetail },
    { path: 'cart', Component: Cart },
    { path: 'checkout', Component: Checkout },
    { path: 'orders', Component: OrdersList },
    { path: 'orders/:id', Component: OrderDetail },
    { path: 'favorites', Component: Favorites },
    { path: 'profile', Component: Profile },
    { path: 'settings', Component: Settings },
  ],
};