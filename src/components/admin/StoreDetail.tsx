import { StoreAdmin } from "@/type/admin/seller";
import { MapPin, Package, Star, Store, Users } from "lucide-react";
import {  VerifiedBadge } from "@/components/ui";
import { useState } from "react";
import SellerReviews from "../../pages/seller/Reviews";
import Overview from "@/components/admin/StoreOverView";
import Products from "@/components/admin/StoreProduct";
import Orders from "@/components/admin/StoreOrders";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getAdminStoreById } from "@/api/admin/store.api";
import NotFound from "@/pages/NotFound";
import { useParams } from "react-router";

type Tab = "OVERVIEW" | "PRODUCTS" | "ORDERS" | "REVIEWS";

const StoreAdminDetail = () => {
  const { id: storeId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [ store, setStore] = useState<StoreAdmin>();
  const [activeTab, setActiveTab] = useState<Tab>("OVERVIEW");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      if(!storeId) return;
      try {
        setLoading(true);
        const response = await getAdminStoreById(storeId);
        setStore(response);
      } catch (error) {
        console.error("Failed to fetch store information", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [storeId]);

  const tabLabels: Record<Tab, string> = {
    OVERVIEW: t("OVERVIEW"),
    PRODUCTS: t("PRODUCTS"),
    ORDERS: t("ORDERS"),
    REVIEWS: t("REVIEWS"),
  };

  const sellerAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";
  if(loading) {
    return <div>Loading...</div>;
  }
  if (!store ) {
    return <NotFound prop={"store"} />;
  }
   const tabs: Record<Tab, React.ReactNode> = {
    OVERVIEW: <Overview store={store} />,
    PRODUCTS: <Products />,
    ORDERS: <Orders />,
    REVIEWS: <SellerReviews />,
  };
  return (
    <div>
      <div className="bg-foreground rounded-2xl overflow-hidden mb-6 relative">
        <div className="relative h-48">
          <img
            src={store.cover}
            alt={store.name}
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />

          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-xs text-white/80 font-mono">
            ID: {store.id}
          </span>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-white/70 bg-white">
              <img
                src={sellerAvatar}
                alt="Seller"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 -mt-12">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-foreground bg-white flex-shrink-0 shadow-lg">
              {store.logo ? (
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Store className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold font-display text-white">
                  {store.name}
                </h1>

                {store.verified && <VerifiedBadge />}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-white">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-white font-medium">
                    {store.rating.toFixed(1)}
                  </span>
                </div>

                <span>·</span>

                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {store.followersCount.toLocaleString()}
                  <span>followers</span>
                </span>

                <span>·</span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {store.location || "No location"}
                </span>

                <span>·</span>

                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  {store.productsCount.toLocaleString()}
                  <span>products</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        {Object.keys(tabs).map((tab) => {
          const tabKey = tab as Tab;

          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tabKey
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabLabels[tabKey]}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tabs[activeTab]}
      </div>
    </div>
  );
};

export default StoreAdminDetail;

