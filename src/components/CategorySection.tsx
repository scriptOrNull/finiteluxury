import { Product, formatPrice } from '@/data/products';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const CategorySection = ({
  categoryId,
  categoryName,
  products,
  onProductClick,
}: CategorySectionProps) => {
  const navigate = useNavigate();

  if (products.length === 0) return null;

  const minPrice = Math.min(...products.map((p) => p.price));

  return (
    <section className="py-8 md:py-12 border-b border-border last:border-b-0">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-1">
            Men's
          </span>
          <h2 className="text-xl md:text-2xl font-light tracking-[0.1em] uppercase">
            {categoryName}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </p>
          <p className="text-sm">From {formatPrice(minPrice)}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center">
        <button
          onClick={() => navigate(`/category/${categoryId}`)}
          className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase opacity-70 hover:opacity-100 transition-opacity border-b border-transparent hover:border-foreground pb-0.5"
        >
          View All {categoryName}
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
