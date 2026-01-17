import { useState, useMemo, useRef } from 'react';
import { products, Product, categories } from '@/data/products';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';

const CatalogueContent = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const categoryTitle = useMemo(() => {
    if (!activeCategory) return 'All Products';
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.name || 'Products';
  }, [activeCategory]);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    if (category !== null) {
      setTimeout(() => {
        scrollToProducts();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onCartClick={() => setCartOpen(true)}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />

      <main className="flex-1 pt-16 md:pt-28">
        {!activeCategory && <Hero onExplore={scrollToProducts} />}

        <div ref={productsRef} className="container mx-auto px-4">
          <ProductGrid
            products={filteredProducts}
            onProductClick={setSelectedProduct}
            title={categoryTitle}
          />
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
