import { Product } from "@/type/catalog/product"
import { Badge, Rating} from "@/components/ui"
import { formatPrice } from "@/hook/format"
import { useNavigate} from "react-router"

const StoreProductCard = ({product}:{product:Product}) =>  {
    const  navigate  = useNavigate()
    return (
            <div key={product.id} className="bg-card w-[22%] min-w-[150px] border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-[#5ABCB9]/30 transition-all group cursor-pointer" onClick={() => navigate(`/admin/products/${product.id}`)}>
                <div className="relative overflow-hidden bg-secondary">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  {(product.discount ?? 0) > 0 && (
                    <Badge
                      variant="danger"
                      className="absolute top-2 left-2"
                    >
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <h3 className="font-medium text-sm text-secondary-foreground truncate mt-0.5">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold text-secondary-foreground text-sm">{formatPrice(product.price)}</div>
                      {product.originalPrice && <div className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</div>}
                    </div>
                    <Rating value={product.rating} showCount={false} size="xs" />
                  </div>
                </div>
            </div>
    )
}
export default StoreProductCard