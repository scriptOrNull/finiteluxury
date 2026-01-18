import { Product, formatPrice } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="aspect-[3/4] bg-muted overflow-hidden mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs tracking-wider uppercase text-muted-foreground">
          {product.category}
        </p>
        <h3 className="text-sm font-normal tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm font-medium">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
