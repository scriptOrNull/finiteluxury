import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts, Product, formatPrice } from '@/hooks/useProducts';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import CategoryBanner from '@/components/CategoryBanner';

const CategoryContent = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { products, categories, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const category = useMemo(() => {
    return categories.find((c) => c.id === categoryId);
  }, [categoryId, categories]);

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === categoryId);
  }, [categoryId, products]);

  const featuredProducts = useMemo(() => {
    return categoryProducts.slice(0, 3);
  }, [categoryProducts]);

  const handleCategoryClick = (cat: string | null) => {
    if (cat === null) {
      navigate('/');
    } else {
      navigate(`/category/${cat}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 pt-16 md:pt-28">
        <CategoryBanner category={category} productCount={categoryProducts.length} />

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg md:text-xl font-light tracking-[0.15em] uppercase">
                Featured {category.name}
              </h2>
              <span className="text-sm text-muted-foreground">
                Starting from {formatPrice(Math.min(...categoryProducts.map(p => p.price)))}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group text-left"
                >
                  <div className="aspect-[3/4] bg-muted overflow-hidden mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-normal tracking-wide">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{formatPrice(product.price)}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <div className="container mx-auto px-4 pb-16">
          <ProductGrid
            products={categoryProducts}
            onProductClick={setSelectedProduct}
            title={`All ${category.name}`}
          />
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </div>
  );
};

const CategoryPage = () => {
  return (
    <CartProvider>
      <CategoryContent />
    </CartProvider>
  );
};

export default CategoryPage;
