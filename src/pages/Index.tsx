import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product } from '@/hooks/useProducts';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BackToTop from '@/components/BackToTop';
import ContactButton from '@/components/ContactButton';
import { ArrowRight } from 'lucide-react';

const CatalogueContent = () => {
  const { products, categories, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Show only first 3 categories with max 4 products each for landing page
  const previewCategories = useMemo(() => {
    return categories
      .slice(0, 3)
      .map((cat) => ({
        ...cat,
        products: products.filter((p) => p.category === cat.id).slice(0, 4),
      }));
  }, [categories, products]);

  const totalCategories = categories.length;

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        {/* Animated logo/brand mark */}
        <div className="relative mb-8">
          <div className="w-12 h-12 border border-foreground/20 animate-pulse" />
          <div className="absolute inset-0 w-12 h-12 border border-foreground animate-ping opacity-20" />
        </div>
        
        {/* Loading text with letter spacing */}
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Loading...
        </p>
        
        {/* Minimal progress bar */}
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
        <Hero onExplore={scrollToProducts} />

        {/* Featured Categories Section */}
        <div ref={productsRef} className="container mx-auto px-4 py-16 md:py-24">
          {/* Section Title */}
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
                Explore Our Collection
              </p>
              <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.1em] uppercase mb-3">
                Featured Categories
              </h2>
              <p className="text-sm text-muted-foreground">
                Curated selections from {totalCategories} categories
              </p>
            </div>
          </ScrollReveal>

          {/* Category Sections - Preview Mode */}
          <div className="mt-8">
            {previewCategories.map((category) => (
              <CategorySection
                key={category.id}
                categoryId={category.id}
                categoryName={category.name}
                products={category.products}
                onProductClick={setSelectedProduct}
                isPreview
              />
            ))}
          </div>

          {/* View All Categories Button */}
          {totalCategories > 3 && (
            <ScrollReveal delay={0.2}>
              <div className="text-center mt-12 pt-8 border-t border-border">
                <button
                  onClick={() => navigate('/collections')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 group"
                >
                  View All Categories
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  Browse all {totalCategories} categories
                </p>
              </div>
            </ScrollReveal>
          )}
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

const Index = () => {
  return (
    <CartProvider>
      <CatalogueContent />
    </CartProvider>
  );
};

export default Index;
