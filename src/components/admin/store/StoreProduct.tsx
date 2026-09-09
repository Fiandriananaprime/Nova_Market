import { getSellerProducts } from "@/api/public/store.api";
import { Product } from "@/type/catalog/product";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { getApiErrorMessage } from "@/api/errorMessage";
import StoreProductCard from "./StoreProductCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui";
const StoreProducts = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();
  const { toast } = useToast();

  const hasMore = page < totalPages;

  const fetchProducts = useCallback(
    async (pageToFetch: number) => {
      if (!id) return;

      setLoading(true);

      try {
        const result = await getSellerProducts(id, pageToFetch, 12);

        setProducts((prev) =>
          pageToFetch === 1
            ? result.data
            : [...prev, ...result.data]
        );
        setTotal(result.meta.total || 0);
        setTotalPages(result.meta.totalPages || 0);
        setPage(pageToFetch);
      } catch (error) {
        toast(
          getApiErrorMessage(error, "Unable to fetch Store Products"),
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [id, toast]
  );

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setTotal(0);
    setTotalPages(0);

    fetchProducts(1);
  }, [id, fetchProducts]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          hasMore
        ) {
          fetchProducts(page + 1);
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
  }, [page, hasMore, loading, fetchProducts]);

  if (loading) {
      return (
        <div className="flex items-center justify-center  flex-wrap gap-5 py-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="
              bg-card
              w-[22%]
              aspect-[2/3]
              min-w-[220px]
              border border-border
              overflow-hidden
              hover:shadow-md
              hover:border-[#5ABCB9]/40
              transition-all
              group
              cursor-pointer"
            />
          ))}
        </div>
      );
    }
  if(products.length===0){
    return (
        <div className="flex items-center justify-center text-secondary-foreground">
            {t("This store doesnt have any product yet")}
        </div>
    )
  }
  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-5 py-5">
        {products.map((p) => (
          <StoreProductCard
            key={p.id}
            product={p}
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

        {!loading && !hasMore && products.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {t("All products loaded")}
          </span>
        )}
      </div>
    </>
  );
};

export default StoreProducts;