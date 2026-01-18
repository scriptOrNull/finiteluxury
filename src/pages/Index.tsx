import { useState, useMemo, useRef } from 'react';
import { useProducts, Product, formatPrice } from '@/hooks/useProducts';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import CategorySection from '@/components/CategorySection';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const CatalogueContent = () => {
  const navigate = useNavigate();
  const { products, categories, loading } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Initialize selected categories when data loads
  useMemo(() => {
    if (categories.length > 0 && selectedCategories.length === 0) {
      setSelectedCategories(categories.map((c) => c.id));
    }
  }, [categories]);

  const productsByCategory = useMemo(() => {
    return categories
      .filter((cat) => selectedCategories.includes(cat.id))
      .map((cat) => ({
        ...cat,
        products: products.filter((p) => p.category === cat.id),
      }));
  }, [selectedCategories, categories, products]);

  const totalProducts = useMemo(() => {
    return productsByCategory.reduce((sum, cat) => sum + cat.products.length, 0);
  }, [productsByCategory]);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string | null) => {
    if (category === null) {
      scrollToProducts();
    } else {
      navigate(`/category/${category}`);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories.map((c) => c.id));
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 pt-16 md:pt-28">
        <Hero onExplore={scrollToProducts} />

        <div ref={productsRef} className="container mx-auto px-4 py-12 md:py-16">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.15em] uppercase mb-3">
              Shop by Category
            </h2>
            <p className="text-sm text-muted-foreground">
              {totalProducts} products across {selectedCategories.length} categories
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onSelectAll={selectAllCategories}
            onClearAll={clearAllCategories}
          />

          {/* Category Sections */}
          <div className="mt-12">
            {productsByCategory.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  No categories selected
                </p>
                <button
                  onClick={selectAllCategories}
                  className="text-sm tracking-wide uppercase border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
                >
                  Show all categories
                </button>
              </div>
            ) : (
              productsByCategory.map((category) => (
                <CategorySection
                  key={category.id}
                  categoryId={category.id}
                  categoryName={category.name}
                  products={category.products}
                  onProductClick={setSelectedProduct}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
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

const Index = () => {
  return (
    <CartProvider>
      <CatalogueContent />
    </CartProvider>
  );
};

export default Index;
