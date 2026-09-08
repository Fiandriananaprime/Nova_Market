import { getSellerProducts } from "@/api/public/store.api";
import { Product } from "@/type/catalog/product";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { getApiErrorMessage } from "@/api/errorMessage";
import StoreProductCard from "./StoreProductCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Loader2 } from "lucide-react";

const StoreProducts = () => {
  const { id } = useParams()
  const [page,setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products,setProducts] = useState<Product[]>([]);
  const [ total, setTotal] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  const { t } = useTranslation()
  const { toast } = useToast()
  
  const hasMore =  page < totalPages;

  const fetchProduct = useCallback(
      async (page:number) => {
            if(!id) return;
            setLoading(true);
            try {
                setLoading(true)
                const result = await getSellerProducts(id,page,10);
                setProducts((prev) =>
                page === 1
                    ? result.data
                    : [...prev, ...result.data]
                );
                console.log(result)
            }
            catch (error) {
                toast(getApiErrorMessage(error,"Unable to fetch Store Products"),"error");
            }
            finally{
                setLoading(false);
            }
        },
        [id,loading]
    );
    
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setTotal(0);
    setTotalPages(0);
    fetchProduct(1);
  },[id]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if(!element) return ; 
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          !loading &&
          hasMore
        ) {
          fetchProduct(page + 1);
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
  },[page,hasMore,loading,fetchProduct])

    return (
        <>
            <div className="flex items-center justify-center flex-wrap gap-5 py-5">
                {(
                    products.map((p) =>{
                        return (
                            <StoreProductCard product={p} />
                        )
                    }))
                }
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
    )
    ;
}
export default StoreProducts;