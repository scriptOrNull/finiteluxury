import { useState, useMemo } from 'react';
import { useProducts, Product } from '@/hooks/useProducts';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import CategorySection from '@/components/CategorySection';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BackToTop from '@/components/BackToTop';
import ContactButton from '@/components/ContactButton';


const CollectionsContent = () => {
  const { products, categories, loading } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="relative mb-8">
          <div className="w-12 h-12 border border-foreground/20 animate-pulse" />
          <div className="absolute inset-0 w-12 h-12 border border-foreground animate-ping opacity-20" />
        </div>
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Loading...
        </p>
        <div className="mt-6 w-32 h-[1px] bg-border overflow-hidden">
          <div className="h-full w-1/2 bg-foreground animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 pt-16 md:pt-28">
        {/* Page Header */}
        <div className="bg-secondary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center">
                <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
                  Browse All
                </p>
                <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] uppercase mb-3">
                  All Collections
                </h1>
                <p className="text-sm text-muted-foreground">
                  {totalProducts} products across {selectedCategories.length} categories
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Shop by Category Section */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Category Filter */}
          <ScrollReveal delay={0.1}>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              onSelectAll={selectAllCategories}
              onClearAll={clearAllCategories}
            />
          </ScrollReveal>

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

      <BackToTop />
      <ContactButton />
      
    </div>
  );
};

const CollectionsPage = () => {
  return (
    <CartProvider>
      <CollectionsContent />
    </CartProvider>
  );
};

export default CollectionsPage;
