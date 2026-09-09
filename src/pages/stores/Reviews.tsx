import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Loader2, RotateCcw } from "lucide-react";
import { Rating, ReviewCard } from "../../components/ui";
import { useTranslation } from "react-i18next";
import { Review } from "@/type/catalog/store";
import { useToast } from "@/contexts/ToastContext";
import { getSellerReviews, StarFilter } from "@/api/admin/store..public.api";
import { RatingCount } from "@/type/catalog/product";

interface SellerReviewsProps {
  id: string;
}

export default function SellerReviews({ id }: SellerReviewsProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterRating, setRatingFilter] = useState<StarFilter>("all");

  const [rating, setRating] = useState<RatingCount>({
    all: 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
  });

  const [loading, setLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const avg = rating.all
    ? (rating["1"] +
        2 * rating["2"] +
        3 * rating["3"] +
        4 * rating["4"] +
        5 * rating["5"]) /
      rating.all
    : 0;

  const hasMore = page < totalPages;

  const fetchReviews = useCallback(
    async (pageNumber: number, ratingFilter: StarFilter = filterRating) => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await getSellerReviews(
          id,
          pageNumber,
          10,
          ratingFilter
        );

        setReviews((prev) =>
          pageNumber === 1
            ? response.data
            : [...prev, ...response.data]
        );

        setRating(response.counts);
        setTotal(response.meta.total || 0);
        setTotalPages(response.meta.totalPages || 0);
        setPage(response.meta.page || 1);
      } catch {
        toast(t("Failed to fetch store reviews"), "error");
      } finally {
        setLoading(false);
      }
    },
    [id, filterRating, loading, t, toast]
  );

  useEffect(() => {
    setReviews([]);
    setPage(1);
    setTotal(0);
    setTotalPages(0);

    fetchReviews(1, filterRating);
  }, [id, filterRating]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading && hasMore) {
          fetchReviews(page + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [page, hasMore, loading, fetchReviews]);

  const handleRatingFilter = (ratingValue: number) => {
    const newFilter = String(ratingValue) as StarFilter;

    if (filterRating === newFilter) {
      return;
    }

    setRatingFilter(newFilter);
  };

  const handleResetFilter = () => {
    if (filterRating === "all") return;

    setRatingFilter("all");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold font-display text-secondary-foreground mb-5">
        {t("Reviews")}
      </h1>

      <div className="bg-card border border-border rounded-xl p-5 mb-5 flex items-center gap-8">
        <div className="text-center">
          <div className="text-5xl font-bold font-display text-secondary-foreground">
            {avg.toFixed(1)}
          </div>

          <Rating
            value={avg}
            showCount={false}
            size="md"
          />

          <div className="text-sm text-muted-foreground mt-1">
            {total} {t("reviews")}
          </div>
        </div>

        <div className="flex-1 space-y-1.5 relative">
          {filterRating !== "all" && (
            <button
              type="button"
              onClick={handleResetFilter}
              className="absolute -right-50 top-[50%] flex items-center gap-1.5 text-xs text-muted-foreground hover:text-secondary-foreground transition-colors"
            >
              <RotateCcw className="w-10 h-10" />
              {t("Reset")}
            </button>
          )}

          {[5, 4, 3, 2, 1].map((r) => {
            const count = rating[String(r) as keyof typeof rating];
            const percentage = rating.all
              ? (count / rating.all) * 100
              : 0;

            const isActive = filterRating === String(r);

            return (
              <button
                key={r}
                type="button"
                onClick={() => handleRatingFilter(r)}
                className={`w-full flex items-center gap-2 text-sm rounded-md px-1 py-0.5 transition-colors cursor-pointer ${
                  isActive
                    ? "bg-secondary"
                    : "hover:bg-secondary/60"
                }`}
              >
                <span className="w-4 text-muted-foreground text-left">
                  {r}
                </span>

                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />

                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-4 text-muted-foreground text-right">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            role="admin"
          />
        ))}
      </div>

      <div
        ref={loadMoreRef}
        className="h-12 flex items-center justify-center"
      >
        {loading && (
          <Loader2 className="w-5 h-5 animate-spin text-[#0077B6]" />
        )}

        {!loading && !hasMore && reviews.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {t("All reviews loaded")}
          </span>
        )}
      </div>
    </div>
  );
}