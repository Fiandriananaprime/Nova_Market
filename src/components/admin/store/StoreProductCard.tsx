import { Product, productStatus } from "@/type/catalog/product";
import { Badge, Rating } from "@/components/ui";
import { formatPrice } from "@/hook/format";
import { useNavigate } from "react-router";
  
const statusConfig: Record<
  productStatus,
  { label: string; variant: "success" | "warning" | "danger" | "info" }
> = {
  draft: {
    label: "Draft",
    variant: "info",
  },
  active: {
    label: "Active",
    variant: "success",
  },
  inactive: {
    label: "Inactive",
    variant: "info",
  },
  pending: {
    label: "Pending",
    variant: "warning",
  },
  approved: {
    label: "Approved",
    variant: "success",
  },
  rejected: {
    label: "Rejected",
    variant: "danger",
  },
};
const StoreProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-card
        w-[22%]
        min-w-[220px]
        border border-border
        overflow-hidden
        hover:shadow-md
        hover:border-[#5ABCB9]/40
        transition-all
        group
        cursor-pointer
      "
      onClick={() => navigate(`/admin/products/${product.id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full h-40
            object-cover
            group-hover:scale-105
            transition-transform
            duration-300
          "
        />

        {/* Discount */}
        {(product.discount ?? 0) > 0 && (
          <Badge
            variant="danger"
            className="absolute top-2 left-2"
          >
            -{product.discount}%
          </Badge>
        )}

        {/* Status */}
        <div className="absolute top-2 right-2">
          <Badge variant={statusConfig[product.status].variant}>
            {statusConfig[product.status].label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Brand + name */}
        <div>
          <p className="text-xs text-muted-foreground">
            {product.brand || "No brand"}
          </p>

          <h3 className="font-semibold text-sm text-secondary-foreground truncate mt-1">
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-secondary-foreground">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <Rating
            value={product.rating}
            showCount={false}
            size="xs"
          />

          <span className="text-xs text-muted-foreground">
            {product.rating?.toFixed(1) ?? "0.0"} / 5
          </span>
        </div>

        {/* Admin information */}

          <div className="pt-2 border-t border-border text-xs">
            <p className="text-muted-foreground">
              Product ID
            </p>
            <p className="font-medium text-secondary-foreground">
              {product.id}
            </p>
          </div>
      </div>
    </div>
  );
};

export default StoreProductCard;