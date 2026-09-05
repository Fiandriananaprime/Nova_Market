import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { products as allProducts } from "../data/mock";

export type UserRole = "buyer" | "seller" | "admin" | null;

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
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  cartTotal: number;

  favorites: string[];
  toggleFavorite: (productId: string) => void;
}

const AppContext = createContext<AppContextType>(
  {} as AppContextType
);

const getStoredUserRole = (): UserRole => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    return parsedUser?.role ?? null;
  } catch {
    return null;
  }
};

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRoleState] = useState<UserRole>(
    () => getStoredUserRole()
  );

  const [cart, setCart] = useState<CartItem[]>([]);

  const [favorites, setFavorites] = useState<string[]>([
    "1",
    "3",
  ]);

  /**
   * Update user role.
   */
  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  /**
   * Listen to authentication events.
   */
  useEffect(() => {
    const handleAuthLogout = () => {
      setUserRoleState(null);
    };

    const handleStoredSessionRestore = () => {
      setUserRoleState(getStoredUserRole());
    };

    window.addEventListener(
      "auth:logout",
      handleAuthLogout
    );

    window.addEventListener(
      "auth:session-restored",
      handleStoredSessionRestore
    );

    return () => {
      window.removeEventListener(
        "auth:logout",
        handleAuthLogout
      );

      window.removeEventListener(
        "auth:session-restored",
        handleStoredSessionRestore
      );
    };
  }, []);

  /**
   * Add a product to the cart.
   */
  const addToCart = (
    productId: string,
    qty = 1
  ) => {
    const product = allProducts.find(
      (product) => product.id === productId
    );

    if (!product) {
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                qty: item.qty + qty,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          productId,
          qty,
          name: product.name,
          price: product.price,
          image: product.image,
          sellerId: product.sellerId,
          sellerName: product.sellerName,
        },
      ];
    });
  };

  /**
   * Remove a product from the cart.
   */
  const removeFromCart = (productId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.productId !== productId
      )
    );
  };

  /**
   * Update product quantity.
   */
  const updateQty = (
    productId: string,
    qty: number
  ) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              qty,
            }
          : item
      )
    );
  };

  /**
   * Calculate cart total.
   */
  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  /**
   * Add/remove a product from favorites.
   */
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter(
            (id) => id !== productId
          )
        : [...prev, productId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,

        cart,
        addToCart,
        removeFromCart,
        updateQty,
        cartTotal,

        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () =>  useContext(AppContext);

