import { useCallback, useEffect, useState } from 'react';
import {
  Tag,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Package,
  Trash2,
} from 'lucide-react';
import { Button, StatusBadge, Select, Modal } from '../../components/ui';
import { formatPrice } from '@/hook/format';
import { useTranslation } from 'react-i18next';
import {
  getAdminPromotions,
  deleteAdminPromotion,
} from '@/api/admin/payment.api';
import type { Promotion } from '@/type/admin/payment';
import type { Product } from '@/type/catalog/product';
import { getProductById } from '@/api/admin/product.public.api';
import type { PaginationMeta } from '@/type/catalog/product';

type PromotionStatus = 'active' | 'scheduled' | 'inactive' | 'expired';

export default function SellerPromotions() {
  const { t } = useTranslation();

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [status, setStatus] = useState<PromotionStatus | undefined>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPromotions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAdminPromotions({
        page,
        limit,
        status,
      });

      setPromotions(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error('Failed to load promotions:', err);
      setError(t('Failed to load promotions'));
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, t]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleStatusChange = (value: string) => {
    setStatus(
      value === 'all'
        ? undefined
        : (value as PromotionStatus)
    );

    setPage(1);
  };

  const formatDiscount = (promo: Promotion) => {
    if (promo.type === 'percentage') {
      return `${promo.discount}%`;
    }

    return formatPrice(promo.discount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const showProducts = async (productIds: string[]) => {
    if (!productIds.length) {
      setSelectedProducts([]);
      setShowProductsModal(true);
      return;
    }

    try {
      setProductsLoading(true);
      setShowProductsModal(true);

      const products = await Promise.all(
        productIds.map((id) => getProductById(id))
      );

      setSelectedProducts(
        products
          .map((response) => response)
          .filter(Boolean)
      );
    } catch (err) {
      console.error('Failed to load promotion products:', err);
      setSelectedProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleDeletePromotion = async (promotionId: string) => {
    if (!window.confirm(t('Are you sure you want to delete this promotion?'))) {
      return;
    }

    try {
      setDeletingId(promotionId);

      await deleteAdminPromotion(promotionId);

      await fetchPromotions();
    } catch (err) {
      console.error('Failed to delete promotion:', err);
      setError(t('Failed to delete promotion'));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header / filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            {t('Promotions')}
          </h1>

          <p className="text-sm text-muted-foreground">
            {meta.total}{' '}
            {t(meta.total > 1 ? 'promotions' : 'promotion')}
          </p>
        </div>

        <Select
          value={status ?? 'all'}
          onChange={(e) => handleStatusChange(e.target.value)}
          options={[
            { value: 'all', label: t('All') },
            { value: 'active', label: t('Active') },
            { value: 'scheduled', label: t('Scheduled') },
            { value: 'inactive', label: t('Inactive') },
            { value: 'expired', label: t('Expired') },
          ]}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-6 text-center">
          <p className="text-sm text-destructive mb-3">
            {error}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchPromotions}
          >
            {t('Retry')}
          </Button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && promotions.length === 0 && (
        <div className="border border-border rounded-xl p-10 text-center">
          <Tag className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />

          <h3 className="font-semibold">
            {t('No promotions found')}
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            {t('There are no promotions matching the selected filter.')}
          </p>
        </div>
      )}

      {/* Promotions */}
      {!loading && !error && promotions.length > 0 && (
        <div className="grid gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Tag className="w-5 h-5" />
                </div>

                {/* Main information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold font-display text-secondary-foreground">
                      {promo.name}
                    </h3>

                    <StatusBadge status={promo.status} />
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {t('Seller')}:{' '}
                    <span className="font-medium text-foreground">
                      {promo.sellerName}
                    </span>
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {formatDiscount(promo)}{' '}
                      {promo.type === 'percentage'
                        ? t('off')
                        : t('discount')}
                    </span>

                    <span className="hidden sm:inline">·</span>

                    <span>
                      {promo.productsCount}{' '}
                      {t(
                        promo.productsCount > 1
                          ? 'products'
                          : 'product'
                      )}
                    </span>

                    <span className="hidden sm:inline">·</span>

                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(promo.startDate)}
                      {' — '}
                      {formatDate(promo.endDate)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 lg:flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showProducts(promo.productIds)}
                  >
                    <Package className="w-4 h-4" />
                    {t('View products')}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deletingId === promo.id}
                    onClick={() => handleDeletePromotion(promo.id)}
                  >
                    {deletingId === promo.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}

                    {t('Delete')}
                  </Button>
                </div>
              </div>

              {/* Product summary */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />

                  <span>
                    {promo.productsCount}{' '}
                    {t(
                      promo.productsCount > 1
                        ? 'products included'
                        : 'product included'
                    )}
                  </span>
                </div>

                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {promo.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && promotions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-sm text-muted-foreground">
            {t('Page')} {meta.page ?? page} {t('of')}{' '}
            {meta.totalPages ?? 1}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || loading}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('Previous')}
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={
                page >= (meta.totalPages ?? 1) || loading
              }
              onClick={() => setPage((prev) => prev + 1)}
            >
              {t('Next')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Products modal */}
      <Modal
        open={showProductsModal}
        onClose={() => setShowProductsModal(false)}
        title={t('Promotion products')}
      >
        {productsLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : selectedProducts.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <Package className="w-10 h-10 mx-auto mb-3" />
            <p>{t('No products found')}</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 border border-border rounded-lg p-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-muted"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">
                    {product.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {product.brand}
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <StatusBadge status={product.status} />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}