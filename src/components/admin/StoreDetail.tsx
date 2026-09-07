import { StoreAdmin } from "@/type/admin/seller";
import { MapPin, Package, Star, Store, Users } from "lucide-react";
import {  VerifiedBadge } from "@/components/ui";
import { useState } from "react";
import SellerReviews from "../../pages/seller/Reviews";
import Overview from "@/components/admin/StoreOverView";
import Products from "@/components/admin/StoreProduct";
import Orders from "@/components/admin/StoreOrders";
import { useTranslation } from "react-i18next";

const mockStore: StoreAdmin = {
    id: 'store-001',
    userId: '550e8400-e29b-41d4-a716-446655440000',
    name: 'TechStore MG',

    logo: 'https://plus.unsplash.com/premium_photo-1788632973789-a9658ffa5851?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cover: 'https://images.unsplash.com/photo-1788716265925-60aa477f5f84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',

    verified: true,
    rating: 4.9,

    productsCount: 1240,
    productIds: [
        '550e8400-e29b-41d4-a716-446655440001',
        '550e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440003',
        '550e8400-e29b-41d4-a716-446655440004',
        '550e8400-e29b-41d4-a716-446655440005',
    ],

    location: 'Antananarivo',
    joinedYear: 2023,
    followersCount: 8420,

    description:
        'Electronics, smartphones, computers and accessories. Quality products with reliable service across Madagascar.',

    annualRevenue: 125400000,

    orders: [
        {
            id: 'ORD-100452',
            buyerId: '660e8400-e29b-41d4-a716-446655440001',
            buyerName: 'Rakoto A.',
            total: 480000,
            storeTotal: 450000,
            itemsCount: 3,
            status: 'delivered',
            createdAt: '2026-09-05T14:30:00Z',
        },
        {
            id: 'ORD-100451',
            buyerId: '660e8400-e29b-41d4-a716-446655440002',
            buyerName: 'Rabe M.',
            total: 310000,
            storeTotal: 280000,
            itemsCount: 2,
            status: 'shipped',
            createdAt: '2026-09-04T10:15:00Z',
        },
        {
            id: 'ORD-100448',
            buyerId: '660e8400-e29b-41d4-a716-446655440003',
            buyerName: 'Niry R.',
            total: 195000,
            storeTotal: 195000,
            itemsCount: 4,
            status: 'preparing',
            createdAt: '2026-09-03T16:45:00Z',
        },
        {
            id: 'ORD-100445',
            buyerId: '660e8400-e29b-41d4-a716-446655440004',
            buyerName: 'Andry T.',
            total: 1250000,
            storeTotal: 1180000,
            itemsCount: 1,
            status: 'processing',
            createdAt: '2026-09-02T09:20:00Z',
        },
        {
            id: 'ORD-100439',
            buyerId: '660e8400-e29b-41d4-a716-446655440005',
            buyerName: 'Hery R.',
            total: 890000,
            storeTotal: 850000,
            itemsCount: 5,
            status: 'confirmed',
            createdAt: '2026-08-31T13:10:00Z',
        },
        {
            id: 'ORD-100431',
            buyerId: '660e8400-e29b-41d4-a716-446655440006',
            buyerName: 'Mamy L.',
            total: 175000,
            storeTotal: 175000,
            itemsCount: 2,
            status: 'cancelled',
            createdAt: '2026-08-29T11:40:00Z',
        },
        {
            id: 'ORD-100425',
            buyerId: '660e8400-e29b-41d4-a716-446655440007',
            buyerName: 'Fara N.',
            total: 620000,
            storeTotal: 590000,
            itemsCount: 3,
            status: 'delivered',
            createdAt: '2026-08-27T15:25:00Z',
        },
    ],
};


type Tab = "OVERVIEW" | "PRODUCTS" | "ORDERS" | "REVIEWS";

const StoreAdminDetail = ({ store }: { store: StoreAdmin }) => {
  store = mockStore;
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<Tab>("OVERVIEW");

  const tabs: Record<Tab, React.ReactNode> = {
    OVERVIEW: <Overview />,
    PRODUCTS: <Products />,
    ORDERS: <Orders />,
    REVIEWS: <SellerReviews />,
  };

  const tabLabels: Record<Tab, string> = {
    OVERVIEW: t("OVERVIEW"),
    PRODUCTS: t("PRODUCTS"),
    ORDERS: t("ORDERS"),
    REVIEWS: t("REVIEWS"),
  };

  const sellerAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";

  return (
    <div>
      <div className="bg-[#16262E] rounded-2xl overflow-hidden mb-6 relative">
        <div className="relative h-48">
          <img
            src={store.cover}
            alt={store.name}
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#16262E] via-[#16262E]/30 to-transparent" />

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
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#16262E] bg-white flex-shrink-0 shadow-lg">
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

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-[#8da8b5]">
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

