import { Product, formatPrice } from '@/hooks/useProducts';
import { Sparkles, TrendingUp, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  showSalePrice?: boolean;
}

const ProductCard = ({ product, onClick, showSalePrice }: ProductCardProps) => {
  const displayPrice = showSalePrice && product.salePrice ? product.salePrice : product.price;
  const hasDiscount = showSalePrice && product.salePrice && product.salePrice < product.price;

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="aspect-[3/4] bg-muted overflow-hidden mb-3 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="inline-flex items-center gap-1 bg-foreground text-background text-[10px] tracking-wider uppercase px-2 py-1">
              <Sparkles size={10} />
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-foreground/80 text-background text-[10px] tracking-wider uppercase px-2 py-1">
              <TrendingUp size={10} />
              Best Seller
            </span>
          )}
          {product.isOnSale && (
            <span className="inline-flex items-center gap-1 bg-destructive text-destructive-foreground text-[10px] tracking-wider uppercase px-2 py-1">
              <Tag size={10} />
              Sale
            </span>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs tracking-wider uppercase text-muted-foreground">
          {product.category}
        </p>
        <h3 className="text-sm font-normal tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className={`text-sm font-medium ${hasDiscount ? 'text-destructive' : ''}`}>
            {formatPrice(displayPrice)}
          </p>
          {hasDiscount && (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
