import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts, Product, formatPrice } from '@/hooks/useProducts';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { Sparkles, TrendingUp, Tag } from 'lucide-react';

const collectionConfig = {
  'new-arrivals': {
    title: 'New Arrivals',
    subtitle: 'Fresh additions to our collection',
    description: 'Discover the latest pieces, carefully selected for the modern gentleman.',
    icon: Sparkles,
    filter: (products: Product[]) => products.filter(p => p.isNewArrival),
  },
  'best-sellers': {
    title: 'Best Sellers',
    subtitle: 'Customer favorites',
    description: 'Our most loved pieces that define timeless elegance.',
    icon: TrendingUp,
    filter: (products: Product[]) => products.filter(p => p.isBestSeller),
  },
  'sale': {
    title: 'Sale',
    subtitle: 'Limited time offers',
    description: 'Premium pieces at exceptional prices. While stocks last.',
    icon: Tag,
    filter: (products: Product[]) => products.filter(p => p.isOnSale),
  },
};

const CollectionContent = () => {
  const location = useLocation();
  const collectionId = location.pathname.replace('/', ''); // Get 'new-arrivals', 'best-sellers', or 'sale'
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const collection = collectionConfig[collectionId as keyof typeof collectionConfig] || null;

  const collectionProducts = useMemo(() => {
    if (!collection) return [];
    return collection.filter(products);
  }, [collection, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Collection not found</p>
      </div>
    );
  }

  const Icon = collection.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 pt-16 md:pt-28">
        {/* Collection Banner */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-6">
              <Icon size={28} className="text-foreground" />
            </div>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground mb-3">
              {collection.subtitle}
            </p>
            <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.15em] uppercase mb-4">
              {collection.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
              {collection.description}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              {collectionProducts.length} {collectionProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </section>

        {/* Products */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          {collectionProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-2">No products in this collection yet.</p>
              <p className="text-sm text-muted-foreground">Check back soon for updates!</p>
            </div>
          ) : (
            <ProductGrid
              products={collectionProducts}
              onProductClick={setSelectedProduct}
              showSalePrice={collectionId === 'sale'}
            />
          )}
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

const CollectionPage = () => {
  return (
    <CartProvider>
      <CollectionContent />
    </CartProvider>
  );
};

export default CollectionPage;