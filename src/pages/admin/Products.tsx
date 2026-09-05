import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Tabs, StatusBadge, Button } from '../../components/ui';
import TableCard, { type Column } from '@/components/TableCard';
import { getAdminProducts } from '@/api/admin/product.api';
import { Product, productStatusDto } from '@/type/catalog/product';
import { useToast } from '@/contexts/ToastContext';
import { useApp } from '@/contexts/AppContext';
import { getApiErrorMessage } from '@/api/errorMessage';
import { formatPrice } from '@/hook/format';
import { Link } from 'react-router';


export default function AdminProducts() {
  const { t } = useApp();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<productStatusDto | 'all'>('all');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchRequest, setSearchRequest] = useState(0);

  const [counts, setCounts] = useState({
    all: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const handleTabChange = (id: string) => {
    if (id === 'all' || id === 'approved' || id === 'pending' || id === 'rejected') {
      setActiveTab(id);
      setPage(1);
    }
  };

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: t('PRODUCT', 'PRODUIT'),
      render: (p) => (
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 bg-secondary overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-medium text-foreground truncate max-w-[180px]">
            {p.name}
          </span>
        </div>
      ),
    },
    {
      key: 'sellerName',
      header: t('SELLER', 'VENDEUR'),
      render: (p) => (
        <Link
          className="text-muted-foreground hover:underline"
          to={`/admin/seller/${p.sellerId}`}
          onClick={(e) => e.stopPropagation()}
        >
          {p.sellerName || 'Vendeur Inconnu'}
        </Link>
      ),
    },
    {
      key: 'price',
      header: t('PRICE', 'PRIX'),
      render: (p) => (
        <span className="font-medium text-foreground whitespace-nowrap">
          {formatPrice ? formatPrice(p.price) : `${p.price} Ar`}
        </span>
      ),
    },
    {
      key: 'category',
      header: t('CATEGORY', 'CATÉGORIE'),
      render: (p) => (
        <Link
          to={`/admin/categories/${p.categoryId}`}
          className="text-muted-foreground hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {p.categoryName || 'Catégorie'}
        </Link>
      ),
    },
    {
      key: 'status',
      header: t('STATUS', 'STATUT'),
      render: (p) => <StatusBadge status={p.status} />,
    },
    {
      key: 'submittedAt',
      header: t('SUBMITTED', 'SOUMIS'),
      render: (p) => (
        <span className="text-muted-foreground whitespace-nowrap">
          {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}
        </span>
      ),
    },
  ];


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAdminProducts({
          page,
          limit: 20,
          status: activeTab !== 'all' ? activeTab : undefined,
          search: search || undefined,
        });
        setCounts(response.counts);
        setProducts(response.data);
        setTotalPages(response.meta?.totalPages ?? 1);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast(getApiErrorMessage(error, 'Unable to load products.'), 'error');
      }
    };

    fetchProducts();
  }, [page, activeTab, search, searchRequest]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
    setSearchRequest((request) => request + 1);
  };

  return (
    <div>
      <h1 className="text-xl font-bold font-display text-foreground mb-5">
        {t('Product Moderation', 'Modération des produits')}
      </h1>

      <div className="overflow-x-auto mb-4">
        <Tabs tabs = {[
          { id: 'all', label: t('All', 'Tout'), count: counts.all },
          { id: 'approved', label: t('Approved', 'Approuvé'), count: counts.approved },
          { id: 'pending', label: t('Pending', 'En attente'), count: counts.pending },
          { id: 'rejected', label: t('Rejected', 'Rejeté'), count: counts.rejected },
        ]} 
      active={activeTab} 
      onChange={handleTabChange} />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-xs w-[300px]"
          >
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('Search products...', 'Rechercher des produits...')}
              className="w-full pl-3 pr-4 py-2 text-sm bg-secondary border border-border rounded-l-lg text-foreground focus:outline-none focus:border-[#0077B6]"
            />
            <button
              type="submit"
              className="h-9 w-9 flex items-center justify-center bg-foreground rounded-r-lg border border-foreground flex-shrink-0"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t('Previous page', 'Page précédente')}
            >
              −
            </button>
            <span className="text-sm text-muted-foreground">
               {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t('Next page', 'Page suivante')}
            >
              +
            </button>
          </div>
        </div>

        <TableCard
          title=""
          data={products}
          columns={columns}
          rowKey={(product) => product.id}
          rowHref={(product) => `/admin/products/${product.id}`}
          className="border-0 rounded-none"
        />
      </div>
    </div>
  );
}