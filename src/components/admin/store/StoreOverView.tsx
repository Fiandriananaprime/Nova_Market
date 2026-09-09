import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  DollarSign,
  ExternalLink,
  MapPin,
  Package,
  ShoppingCart,
  Star,
  Store,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Rating,VerifiedBadge,CopyableText } from "../../ui";
import { StoreAdmin } from "@/type/admin/seller";
import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { StatusBadge } from "@/components/ui";
import { Review } from "@/type/catalog/store";
import { getSellerReviews } from "@/api/public/store.api";
import { formatDateDigit, formatMillionAr as formatCurrency } from "@/hook/format";

type OverviewProps = {
  store: StoreAdmin;
};

type StatCardProps = {
  icon: React.ElementType;
  label: string;
  value: string | number;
  description?: string;
};

type InfoRowProps = {
  icon: React.ElementType;
  label: string;
  value: any;
};


const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
}: StatCardProps) => (
  <div className="bg-card border border-border rounded-xl p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-secondary-foreground">
          {value}
        </p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="w-10 h-10 rounded-lg bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />

    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm text-secondary-foreground mt-0.5 break-words">
        <CopyableText text={value} />
      </div>
    </div>
  </div>
);

const Overview = ({ store }: OverviewProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [recentReview, setRecentReview] = useState<Review[]>([]);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const review = await getSellerReviews(store.id,1,2,'all');
        setRecentReview(review.data);
      } catch (error) {
        toast("Failed to fetch seller information", "error");
      }
    };
        fetchOverviewData();
      }, [store.id]);

  const totalProducts = store.productsCount ?? 0;
  const totalFollowers = store.followersCount ?? 0;
  const rating = store.rating ?? 0;
  const seller = store.owner;

  const totalOrders = store.orders.length;
  const totalRevenue = store.annualRevenue;
  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-6">
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={Package}
            label={t("Total Products")}
            value={totalProducts}
            description={t("Products in this store")}
          />

          <StatCard
            icon={ShoppingCart}
            label={t("Total Orders")}
            value={totalOrders.toLocaleString()}
            description={t("All-time orders")}
          />

          <StatCard
            icon={Users}
            label={t("Followers")}
            value={totalFollowers.toLocaleString()}
            description={t("Store followers")}
          />

          <StatCard
            icon={Star}
            label={t("Average Rating")}
            value={rating.toFixed(1)}
            description={t("Based on customer reviews")}
          />
        </div>
      </section>
      <section>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-[#0077B6]" />
            <h2 className="font-semibold text-secondary-foreground">
              {t("Performance")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                {t("Total Sales")}
              </p>
              <p className="mt-1 font-semibold text-secondary-foreground">
                {formatCurrency(totalRevenue)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {t("Orders")}
              </p>
              <p className="mt-1 font-semibold text-secondary-foreground">
                {totalOrders.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {t("Average Order Value")}
              </p>
              <p className="mt-1 font-semibold text-secondary-foreground">
                {formatCurrency(averageOrderValue)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {t("Products")}
              </p>
              <p className="mt-1 font-semibold text-secondary-foreground">
                {totalProducts.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {t("Followers")}
              </p>
              <p className="mt-1 font-semibold text-secondary-foreground">
                {totalFollowers.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {t("Reviews")}
              </p>
              <p className="mt-1 font-semibold text-secondary-foreground">{ store.reviewsCount}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Store className="w-5 h-5 text-[#0077B6]" />
            <h2 className="font-semibold text-secondary-foreground">
              {t("Store Information")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow
              icon={Store}
              label={t("Store name")}
              value={store.name}
            />

            <InfoRow
              icon={CircleUserRound}
              label={t("Store ID")}
              value={store.id}
            />

            <InfoRow
              icon={MapPin}
              label={t("Location")}
              value={store.location ?? t("Not available")}
            />

            <InfoRow
              icon={CheckCircle2}
              label={t("Verification")}
              value={
                store.verified ? (
                  <VerifiedBadge />
                ) : (
                  <span className="text-muted-foreground">
                    {t("Not verified")}
                  </span>
                )
              }
            />

            <InfoRow
              icon={CalendarDays}
              label={t("Created")}
              value={store.joinedYear}
            />
          </div>

          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">
              {t("Description")}
            </p>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              {store.description || t("No description available")}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <CircleUserRound className="w-5 h-5 text-[#0077B6]" />
            <h2 className="font-semibold text-secondary-foreground">
              {t("Seller Information")}
            </h2>
          </div>

        {seller ? (
            <>
                <div className="flex items-start gap-4 mb-5">
                {seller.avatarUrl ? (
                    <img
                    src={seller.avatarUrl}
                    alt={seller.name}
                    className="w-14 h-14 rounded-full object-cover shrink-0"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center shrink-0">
                    <CircleUserRound className="w-7 h-7" />
                    </div>
                )}

                <div className="min-w-0">
                    <h3 className="font-medium text-secondary-foreground truncate">
                    {seller.name}
                    </h3>

                    <p className="text-sm text-muted-foreground truncate">
                    {seller.email}
                    </p>

                    <div className="mt-2">
                    <StatusBadge status={seller.status} />
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InfoRow
                    icon={CircleUserRound}
                    label={t("Seller ID")}
                    value={seller.id}
                />

                <InfoRow
                    icon={Store}
                    label={t("Stores owned")}
                  value={seller.storesCount ?? 1}
                />
                </div>
            </>
            ) : (
            <div className="py-8 text-center text-muted-foreground">
                Seller information unavailable
            </div>
            )}
        </div>
      </section>

      

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#0077B6]" />
              <h2 className="font-semibold text-secondary-foreground">
                {t("Recent Orders")}
              </h2>
            </div>

            <button
              type="button"
              className="text-sm text-[#0077B6] hover:underline flex items-center gap-1"
            >
              {t("View all")}
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[300px]">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
                    {t("Customer")}
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
                    {t("Date")}
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
                    {t("Amount")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {store.orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-3 text-sm text-secondary-foreground">
                      {order.buyerName}
                    </td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">
                      {formatDateDigit(order.createdAt)}
                    </td>
                    <td className="px-5 py-3 text-sm text-secondary-foreground">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#0077B6]" />
              <h2 className="font-semibold text-secondary-foreground">
                {t("Recent Reviews")}
              </h2>
            </div>

            <button
              type="button"
              className="text-sm text-[#0077B6] hover:underline flex items-center gap-1"
            >
              {t("View all")}
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-border">
            {recentReview.map((review) => (
              <div key={review.id} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0077B6]/10 text-[#0077B6] flex items-center justify-center text-sm font-medium shrink-0">
                    {review.customerId.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className= "flex gap-1">
                        <p className="text-sm font-medium text-secondary-foreground">
                          {review.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {review.productName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Rating
                          value={review.rating}
                          showCount={false}
                          size="xs"
                        />
                        <span className="text-xs text-muted-foreground">
                          {formatDateDigit(review.date)}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-secondary-foreground line-clamp-2">
                      {review.comment}
                    </p>

                    <div className="mt-2">
                      {review.replied ? (
                        <span className="text-xs text-[#0077B6]">
                          {t("Replied")}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {t("Awaiting reply")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;