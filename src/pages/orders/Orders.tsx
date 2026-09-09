import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Search, ShoppingBag, Clock, CheckCircle2, DollarSign, ArrowDown, RefreshCw } from 'lucide-react';
import { StatusBadge, Pagination, Button } from '@/components/ui';
import { StatCard } from '@/components/ui';
import TableCard, { Column } from '@/components/Stats/TableCard';
import { formatMillionAr, formatPrice } from '@/hook/format';
import { useTranslation } from 'react-i18next';
import { Order, OrderQueryParam, OrderStatus } from '@/type/order/order';
import { getOrder } from '@/api/admin/order.api';
import { useToast } from '@/contexts/ToastContext';

interface ExtendedOrder extends Order {
  buyer?: string;
  seller?: string;
  amount?: number;
  payment?: string;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};

const AdminOrdersList = () => {
  const { toast } = useToast()
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [amountSort, setAmountSort] = useState<OrderQueryParam['sortAmount']>();
  const [dateSort, setDateSort] = useState<OrderQueryParam['sortDate']>('desc');
  const [counts, setCounts] = useState({ all: 0, pending: 0, delivered: 0, totalPrice: 0 });
  const [activeFilter, setActiveFilter] = useState<'status' | 'payment' | 'amount' | 'date' | null>(null);
  const [reloadKey, setReloadKey] = useState(0);


  useEffect(() => {
    const fetchOrders= async () => {
      try {
        const ordersData = await getOrder({
          search:search || undefined,
          page:page,
          limit:30,
          status:statusFilter!=='all' ? (statusFilter as OrderStatus) : undefined,
          paymentMethod: paymentFilter !== 'all' ? paymentFilter as OrderQueryParam['paymentMethod'] : undefined,
          sortAmount: amountSort,
          sortDate: dateSort,
        });
        setOrders(ordersData.data);
        setCounts(ordersData.counts);
        setTotalPages(ordersData.meta.totalPages || 1);
      }
      catch {
        toast("Failed to fetch orders Data", "error")
      }
    }
    fetchOrders()
  }, [amountSort, dateSort, page, paymentFilter, reloadKey, search, statusFilter, toast]);

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setAmountSort(undefined);
    setDateSort('desc');
    setPage(1);
    setReloadKey((value) => value + 1);
  };

  const chooseFilter = (value: string) => {
    if (activeFilter === 'status') setStatusFilter(value);
    if (activeFilter === 'payment') setPaymentFilter(value);
    if (activeFilter === 'amount') {
      setAmountSort(value === 'none' ? undefined : value as OrderQueryParam['sortAmount']);
      if (value !== 'none') setDateSort(undefined);
    }
    if (activeFilter === 'date') setDateSort(value as OrderQueryParam['sortDate']);
    setPage(1);
    setActiveFilter(null);
  };

  const filterOptionsFor = (filter: NonNullable<typeof activeFilter>) => filter === 'status'
    ? [['all', t('All statuses')], ['pending', t('Pending')], ['confirmed', t('Confirmed')], ['processing', t('Processing')], ['preparing', t('Preparing')], ['shipped', t('Shipped')], ['delivered', t('Delivered')], ['cancelled', t('Cancelled')]]
    : filter === 'payment'
      ? [['all', t('All payments')], ['mvola', 'MVola'], ['orange_money', 'Orange Money'], ['card', t('Card')], ['cod', 'COD']]
      : filter === 'amount'
        ? [['none', t('Default amount')], ['desc', t('Highest amount')], ['asc', t('Lowest amount')]]
        : [['desc', t('Newest first')], ['asc', t('Oldest first')]];

  const filterPreview = (filter: NonNullable<typeof activeFilter>) => {
    if (filter === 'status' && statusFilter !== 'all') return statusFilter;
    if (filter === 'payment' && paymentFilter !== 'all') return paymentFilter;
    if (filter === 'amount' && amountSort) return amountSort === 'asc' ? 'by asc' : 'by desc';
    if (filter === 'date' && dateSort === 'asc') return 'oldest';
    if (filter === 'date' && dateSort === 'desc') return 'newest';
    return null;
  };

  const filterHeader = (label: string, filter: NonNullable<typeof activeFilter>) => {
    const preview = filterPreview(filter);
    return (
      <div className="relative inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
          className="inline-flex items-center gap-1 hover:text-primary"
          title={t(`Filter ${label}`)}
        >
          {label}
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
        {preview && <span className="max-w-16 truncate rounded bg-primary/10 px-1 text-[9px] normal-case text-primary">{preview}</span>}
        {activeFilter === filter && (
          <div className="absolute left-0 top-full z-30 mt-1 min-w-36 rounded-md border border-border bg-card p-1 normal-case shadow-lg">
            {filterOptionsFor(filter).map(([value, optionLabel]) => (
              <button
                key={value}
                type="button"
                onClick={() => chooseFilter(value)}
                className="block w-full rounded px-2 py-1.5 text-left text-xs font-normal text-secondary-foreground hover:bg-secondary"
              >
                {optionLabel}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const columns: Column<ExtendedOrder>[] = [
    {
      key: 'id',
      header: t("Order ID"),
      render: (order) => (
        <span className="font-mono text-xs text-primary font-bold">
          {order.id}
        </span>
      ),
    },
    {
      key: 'buyer',
      header: t("Buyer"),
      render: (order) => (
        <Link
          to={`/admin/users/${order.buyerId || '1'}`}
          onClick={(e) => e.stopPropagation()}
          className="text-secondary-foreground hover:text-primary hover:underline"
        >
          {order.buyerName}
        </Link>
      ),
    },
    {
      key: 'seller',
      header: t('Seller'),
      render: (order) => (
        <div className="relative inline-flex items-start pr-5">
          <span className='text-secondary-foreground'>{order.sellers[0]?.name}</span>

          {order.sellers.length > 1 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-white">
              +{order.sellers.length - 1}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'amount',
      header: filterHeader(t("Amount"), 'amount'),
      className: 'whitespace-nowrap font-medium text-secondary-foreground',
      render: (order) => formatPrice(order.total ?? 0),
    },
    {
      key: 'payment',
      header: filterHeader(t("Payment"), 'payment'),
      className: 'text-muted-foreground',
          render: (order) => order.paymentMethod,
    },
    {
      key: 'status',
      header: filterHeader(t("Status"), 'status'),
      render: (order) => <StatusBadge status={order.status} />,
    },
    {
      key: 'date',
      header: filterHeader(t("Date"), 'date'),
      className: 'text-muted-foreground',
      render: (order) => formatDate(order.createdAt),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cards de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t("Total Orders")} value={counts.all} change={12.5} icon={<ShoppingBag className="w-5 h-5" />} color="#0077B6" />
        <StatCard title={t("Pending")} value={counts.pending} change={-2.4} icon={<Clock className="w-5 h-5" />} color="#F59E0B" />
        <StatCard title={t("Delivered")} value={counts.delivered} change={8.1} icon={<CheckCircle2 className="w-5 h-5" />} color="#10B981" />
        <StatCard title={t("Total Volume")} value={formatMillionAr(counts.totalPrice)} change={15.3} icon={<DollarSign className="w-5 h-5" />} color="#8B5CF6" />
      </div>

      {/* Control bar + TableCard */}
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("Search orders, buyers, sellers...")}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-secondary-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <TableCard
          title={t("Orders List")}
          headerAction={
            <Button type="button" variant="ghost" size="sm" onClick={resetFilters} title={t('Refresh orders')}>
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">{t('Refresh orders')}</span>
            </Button>
          }
          data={orders}
          columns={columns}
          rowKey={(item) => item.id}
          rowHref={(item) => `/admin/orders/${item.id}`}
        />

        <div className="flex justify-center pt-2">
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersList;