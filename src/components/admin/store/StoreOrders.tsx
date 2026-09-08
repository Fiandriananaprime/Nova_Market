import {useState, useEffect, useCallback,useRef} from 'react';
import {useParams, useNavigate} from 'react-router';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/contexts/ToastContext';
import { getAdminStoreOrder } from '@/api/admin/store.api';
import { Order } from '@/type/order/order';
import { getApiErrorMessage } from '@/api/errorMessage';
import { Loader2 } from 'lucide-react';

const StoreOrders = () => {
    const { id } = useParams()
      const [page,setPage] = useState(1);
      const [loading, setLoading] = useState(true);
      const [Orders,setOrders] = useState<Order[]>([]);
      const [ total, setTotal] = useState(0);
      const [totalPages,setTotalPages] = useState(0);
      const loadMoreRef = useRef<HTMLDivElement | null>(null);
      
      const { t } = useTranslation()
      const { toast } = useToast()
      
      const hasMore =  page < totalPages;
    
      const fetchOrder = useCallback(
          async (page:number) => {
                if(!id) return;
                setLoading(true);
                try {
                    setLoading(true)
                    const result = await getAdminStoreOrder(id,page,10);
                    setOrders((prev) =>
                    page === 1
                        ? result.data
                        : [...prev, ...result.data]
                    );
                }
                catch (error) {
                    console.error(error);
                    toast(getApiErrorMessage(error,"Unable to fetch Store Orders"),"error");
                }
                finally{
                    setLoading(false);
                }
            },
            [id,loading]
        );
        
      useEffect(() => {
        setOrders([]);
        setPage(1);
        setTotal(0);
        setTotalPages(0);
        fetchOrder(1);
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
              fetchOrder(page + 1);
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
      },[page,hasMore,loading,fetchOrder])
      
    return (
        <div className='flex items-center justify-center flex-wrap gap-5 p-5'>
            {
                Orders.map((o) => (
                    <p>{o.id}</p>
                ))
            }
            <div
                ref={loadMoreRef}
                className="h-12 flex items-center justify-center"
            >
                {loading && (
                    <Loader2 className="w-5 h-5 animate-spin text-[#0077B6]" />
                    )}

                    {!loading && !hasMore && Orders.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                        {t("No more Order")}
                    </span>
                    )}
            </div>
        </div>
    );
}
export default StoreOrders;