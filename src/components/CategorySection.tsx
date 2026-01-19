import { Product, formatPrice } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  isPreview?: boolean;
}

const CategorySection = ({
  categoryId,
  categoryName,
  products,
  onProductClick,
  isPreview = false,
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
        <div className="text-right flex items-center gap-3 md:gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground mb-1">
              {isPreview ? 'Preview' : `${products.length} ${products.length === 1 ? 'item' : 'items'}`}
            </p>
            <p className="text-sm">From {formatPrice(minPrice)}</p>
          </div>
          <button
            onClick={() => navigate(`/category/${categoryId}`)}
            className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 border border-foreground/20 text-xs md:text-sm tracking-[0.1em] uppercase hover:bg-foreground hover:text-background transition-all duration-300 group"
          >
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
