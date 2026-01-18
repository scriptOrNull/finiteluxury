import { Product } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  title?: string;
}

const ProductGrid = ({ products, onProductClick, title }: ProductGridProps) => {
  return (
    <section className="py-12 md:py-16">
      {title && (
        <h2 className="text-center text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-10 md:mb-12">
          {title}
        </h2>
      )}
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

export default ProductGrid;
