import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  Package,
  MapPin,
  CreditCard,
  Truck,
  User,
  Store,
  ChevronRight,
  Copy,
  Check,
  Clock,
  FileText,
} from 'lucide-react';

import type {
  OrderDetails,
  OrderItem,
  OrderSellerDetails,
} from '@/type/order/order';
import { formatPrice, formatDate } from '@/hook/format';
import TableCard, { Column } from '@/components/TableCard';
import { useTranslation } from 'react-i18next';
import { getOrderDetailsById } from '@/api/admin/order.api';
import { useToast } from '@/contexts/ToastContext';
import { getApiErrorMessage } from '@/api/errorMessage';
import NotFound from '../NotFound';

type Tab = 'summary' | 'tracking';


export default function OrderReceipt() {
  const [ order,setOrder ]= useState<OrderDetails>();
  const { toast }= useToast()
  const { t } = useTranslation();
  const  { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchOrderDetails = async () => {
        if(!id) {
            setLoading(false)
            return;
        }
        try {
            const response = await getOrderDetailsById(id);
            setOrder(response);
        }
        catch(e) {
            toast(getApiErrorMessage(e,"Unable to fetch order"),"error")
        }
        finally{
            setLoading(false)
        }
    }
    fetchOrderDetails()
  },[])

  const itemsBySeller = useMemo(() => {
    if (!order) return {};
    return order.items.reduce<Record<string, OrderItem[]>>(
      (groups, item) => {
        if (!groups[item.sellerId]) {
          groups[item.sellerId] = [];
        }

        groups[item.sellerId].push(item);

        return groups;
      },
      {},
    );
  }, [order?.items]);

  const getSeller = (
    sellerId: string,
  ): OrderSellerDetails | undefined => {
    return order?.sellers.find((seller) => seller.id === sellerId);
  };

  const handleCopyTracking = async () => {
    if (!order?.tracking) return;

    await navigator.clipboard.writeText(order.tracking);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  if (loading) {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
        </div>
    );
   }

  if(!order){
    return <NotFound prop={t('Order')} />
  }

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50/70 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />

              <h1 className="text-lg font-semibold text-gray-900">
                {t('Order')} #{order.id}
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {t('Ordered on')} {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
              {order.status}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
              {t('Payment')}: {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 px-6">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`relative py-4 text-sm font-medium ${
              activeTab === 'summary'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {t('Order summary')}

            {activeTab === 'summary' && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tracking')}
            className={`relative flex items-center gap-2 py-4 text-sm font-medium ${
              activeTab === 'tracking'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Truck className="h-4 w-4" />

            {t('Delivery tracking')}

            {activeTab === 'tracking' && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900" />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'summary' && (
        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-gray-200 p-5">
              <div className="mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  {t('Buyer')}
                </h2>
              </div>

              <Link
                to={`/admin/users/${order.buyerId}`}
                className="group flex items-center gap-3 rounded-lg p-2 transition hover:bg-gray-50"
              >
                <img
                  src={order.buyerAvatarUrl}
                  alt={order.buyerName}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 group-hover:underline">
                    {order.buyerName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {t('ID')}: {order.buyerId}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {order.buyerEmail}
                  </p>

                  <p className="text-xs text-gray-500">
                    {order.buyerPhone}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </section>

            <section className="rounded-xl border border-gray-200 p-5">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  {t('Delivery')}
                </h2>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>{order.address.id}</p>
                <p>{order.address.phone}</p>
                <p>
                  {order.address.city}, {order.address.city}
                </p>

                {order.address.fullAddress && (
                  <p>{order.address.fullAddress}</p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-500">
                  {t('Delivery method')}
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {order.deliveryMethod}
                </span>
              </div>
            </section>
          </div>

          <section className="mt-6">
            <div className="mb-4 flex items-center gap-2">
              <Store className="h-4 w-4 text-gray-500" />

              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                {t('Ordered items')}
              </h2>
            </div>

            <div className="space-y-5">
              {Object.entries(itemsBySeller).map(([sellerId, items]) => {
                const seller = getSeller(sellerId);

                const columns: Column<(typeof items)[number]>[] = [
                  {
                    key: 'product',
                    header: t('Product'),
                    render: (item) => (
                      <Link
                        to={`/products/${item.productId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="group flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="h-12 w-12 shrink-0 rounded-lg border border-border object-cover"
                        />

                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground group-hover:underline">
                            {item.productName}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {t('Product')} #{item.productId}
                          </p>
                        </div>
                      </Link>
                    ),
                  },
                  {
                    key: 'price',
                    header: t('Unit price'),
                    render: (item) => (
                      <span className="font-medium text-foreground">
                        {formatPrice(item.price)}
                      </span>
                    ),
                  },
                  {
                    key: 'qty',
                    header: t('Quantity'),
                    render: (item) => (
                      <span className="text-muted-foreground">
                        {item.qty}
                      </span>
                    ),
                  },
                  {
                    key: 'total',
                    header: t('Total'),
                    className: 'text-right',
                    render: (item) => (
                      <span className="font-semibold text-foreground">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    ),
                  },
                ];

                return (
                  <TableCard
                    key={sellerId}
                    title={
                      seller?.name ??
                      items[0]?.sellerName ??
                      t('Seller')
                    }
                    data={items}
                    columns={columns}
                    rowKey={(item) => item.productId}
                    className="overflow-hidden"
                    headerAction={
                      <Link
                        to={`/admin/sellers/${sellerId}`}
                        className="group flex items-center gap-2"
                      >
                        {seller?.avatarUrl ? (
                          <img
                            src={seller.avatarUrl}
                            alt={seller.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                            <Store className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}

                        <span className="text-sm font-medium text-foreground group-hover:underline">
                          {seller?.name ?? items[0]?.sellerName}
                        </span>

                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    }
                  />
                );
              })}
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-gray-200 p-5">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-500" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  {t('Payment')}
                </h2>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">
                    {t('Method')}
                  </dt>

                  <dd className="font-medium text-gray-900">
                    {order.paymentMethod}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">
                    {t('Status')}
                  </dt>

                  <dd className="font-medium text-gray-900">
                    {order.paymentStatus}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="rounded-xl border border-gray-200 p-5">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  {t('Note')}
                </h2>
              </div>

              <p className="text-sm leading-6 text-gray-600">
                {order.note || t('No note for this order.')}
              </p>
            </section>
          </div>

          <section className="mt-6 rounded-xl border border-gray-200 p-5">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-900">
              {t('Summary')}
            </h2>

            <div className="ml-auto max-w-md space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  {t('Subtotal')}
                </span>

                <span className="font-medium text-gray-900">
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  {t('Shipping fee')}
                </span>

                <span className="font-medium text-gray-900">
                  {formatPrice(order.shippingFee)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between gap-4">
                  <span className="text-base font-semibold text-gray-900">
                    {t('Total')}
                  </span>

                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {order.estimatedDelivery && (
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <Clock className="h-5 w-5 text-gray-500" />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t('Estimated delivery')}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatDate(order.estimatedDelivery)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                <Truck className="h-5 w-5 text-gray-600" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {t('Delivery tracking')}
                </h2>

                <p className="text-sm text-gray-500">
                  {t('Order')} #{order.id}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {t('Tracking number')}
              </p>

              {order.tracking ? (
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1 rounded-lg bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900">
                    {order.tracking}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyTracking}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t('Copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t('Copy')}
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  {t('No tracking number has been assigned yet.')}
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t('Delivery method')}
                </p>

                <p className="mt-2 font-medium text-gray-900">
                  {order.deliveryMethod}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t('Status')}
                </p>

                <p className="mt-2 font-medium text-gray-900">
                  {order.status}
                </p>
              </div>
            </div>

            {order.estimatedDelivery && (
              <div className="mt-5 rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      {t('Estimated delivery')}
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 rounded-xl border border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {t('Delivery address')}
                  </p>

                  <div className="mt-2 text-sm leading-6 text-gray-700">
                    <p>{order.address.id}</p>
                    <p>{order.address.city}</p>
                    <p>
                      {order.address.city}, {order.address.fullAddress}
                    </p>

                    {order.address.phone && (
                      <p>{order.address.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-900">
                {t('History')}
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-gray-900" />
                    <div className="mt-2 h-10 w-px bg-gray-200" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {t('Order created')}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div>
                    <div className="h-3 w-3 rounded-full bg-gray-900" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {t('Current status')}: {order.status}
                    </p>

                    {order.estimatedDelivery && (
                      <p className="mt-1 text-sm text-gray-500">
                        {t('Estimated delivery on')}{' '}
                        {formatDate(order.estimatedDelivery)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}