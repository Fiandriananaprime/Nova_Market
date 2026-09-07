import StoreCard from '@/components/admin/StoreCard';
import { getAdminStores, AdminStoreFilters } from '@/api/admin/store.api';
import { StoreAdmin } from '@/type/admin/seller';
import { useEffect, useRef, useState } from 'react';
import { Search, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type SelectFilter = 'all' | string;

export default function SellerManagement() {
  const { t } = useTranslation();
  const [stores, setStores] = useState<StoreAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState<AdminStoreFilters['rating']>('all');
  const [products, setProducts] = useState<AdminStoreFilters['products']>('all');
  const [followers, setFollowers] = useState<AdminStoreFilters['followers']>('all');
  const [revenue, setRevenue] = useState<AdminStoreFilters['revenue']>('all');
  const [location, setLocation] = useState<SelectFilter>('all');
  const [verified, setVerified] = useState<AdminStoreFilters['verified']>('all');
  const [year, setYear] = useState<SelectFilter>('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filters: AdminStoreFilters = { page, limit: 6, search: search || undefined, rating, products, followers, revenue,
    location: location === 'all' ? undefined : location, verified, year: year === 'all' ? undefined : year };

  const loadStores = async () => {
    setLoading(true);
    try {
      const response = await getAdminStores(filters);
      setStores((current) => page === 1 ? response.data : [...current, ...response.data]);
      setHasMore(response.meta.page < response.meta.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);
    loadStores().catch(() => { if (page === 1) setStores([]); }).finally(() => {
      setLoading(false);
      setLoadingMore(false);
    });
  }, [page, search, rating, products, followers, revenue, location, verified, year]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [search, rating, products, followers, revenue, location, verified, year]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loading && !loadingMore) setPage((current) => current + 1);
    }, { rootMargin: '300px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore]);

  const resetFilters = () => {
    setSearch(''); setRating('all'); setProducts('all'); setFollowers('all');
    setRevenue('all'); setLocation('all'); setVerified('all'); setYear('all');
    setPage(1); setHasMore(true);
  };

  const locations = [...new Set(stores.map((store) => store.location).filter(Boolean))];
  const years = [...new Set(stores.map((store) => String(store.joinedYear)).filter(Boolean))].sort().reverse();
  const selectClass = 'h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">{t('Stores')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('Manage and monitor marketplace stores.')}</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('Search by store ID or name...')} className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <button type="button" onClick={resetFilters} className="h-11 rounded-xl border border-border px-4 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">{t('Reset filters')}</button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <select value={rating} onChange={(event) => setRating(event.target.value as AdminStoreFilters['rating'])} className={selectClass}><option value="all">{t('All ratings')}</option><option value="5">{t('5 stars')}</option><option value="4">{t('4 - 5 stars')}</option><option value="3">{t('3 - 4 stars')}</option></select>
            <select value={products} onChange={(event) => setProducts(event.target.value as AdminStoreFilters['products'])} className={selectClass}><option value="all">{t('All products')}</option><option value="small">{t('< 100 products')}</option><option value="medium">{t('100 - 999')}</option><option value="large">{t('1,000+ products')}</option></select>
            <select value={followers} onChange={(event) => setFollowers(event.target.value as AdminStoreFilters['followers'])} className={selectClass}><option value="all">{t('All followers')}</option><option value="small">{t('< 1K followers')}</option><option value="medium">{t('1K - 10K')}</option><option value="large">{t('10K+ followers')}</option></select>
            <select value={revenue} onChange={(event) => setRevenue(event.target.value as AdminStoreFilters['revenue'])} className={selectClass}><option value="all">{t('All revenue')}</option><option value="low">{t('< 50M Ar')}</option><option value="medium">{t('50M - 100M Ar')}</option><option value="high">{t('100M+ Ar')}</option></select>
            <select value={location} onChange={(event) => setLocation(event.target.value)} className={selectClass}><option value="all">{t('All locations')}</option>{locations.map((value) => <option key={value} value={value}>{value}</option>)}</select>
            <select value={verified} onChange={(event) => setVerified(event.target.value as AdminStoreFilters['verified'])} className={selectClass}><option value="all">{t('All stores')}</option><option value="verified">{t('Verified')}</option><option value="unverified">{t('Unverified')}</option></select>
            <select value={year} onChange={(event) => setYear(event.target.value)} className={selectClass}><option value="all">{t('All years')}</option>{years.map((value) => <option key={value} value={value}>{t('Joined')} {value}</option>)}</select>
          </div>
          <p className="border-t border-border pt-3 text-sm text-muted-foreground">{t('Showing')} <span className="font-semibold text-foreground">{stores.length}</span> {t('stores')}</p>
        </div>
      </div>
      {loading && page === 1 ? <div className="p-10 text-center text-muted-foreground">{t('Loading stores...')}</div> : stores.length ? <>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{stores.map((store) => <StoreCard key={store.id} store={store} />)}</div>
        <div ref={loadMoreRef} className="min-h-10 py-4 text-center text-sm text-muted-foreground">{loadingMore ? t('Loading stores...') : hasMore ? '' : t('All stores loaded')}</div>
      </> : <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card"><Store className="h-10 w-10 text-muted-foreground/50" /><h3 className="mt-4 font-semibold text-foreground">{t('No stores found')}</h3><p className="mt-1 text-sm text-muted-foreground">{t('Try adjusting your search or filters.')}</p></div>}
    </div>
  );
}
