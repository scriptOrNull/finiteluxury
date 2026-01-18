import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { useProducts, formatPrice } from '@/hooks/useProducts';

const FeaturedCollections = () => {
  const navigate = useNavigate();
  const { newArrivals, bestSellers, saleProducts } = useProducts();

  const collections = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      description: 'Fresh styles just dropped',
      icon: Sparkles,
      products: newArrivals.slice(0, 2),
      bgClass: 'bg-secondary',
    },
    {
      id: 'best-sellers',
      title: 'Best Sellers',
      description: 'Customer favorites',
      icon: TrendingUp,
      products: bestSellers.slice(0, 2),
      bgClass: 'bg-muted',
    },
    {
      id: 'sale',
      title: 'Sale',
      description: 'Limited time offers',
      icon: Tag,
      products: saleProducts.slice(0, 2),
      bgClass: 'bg-secondary',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Curated For You
          </p>
          <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.1em] uppercase">
            Shop by Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <div
                key={collection.id}
                className={`${collection.bgClass} p-6 md:p-8 group cursor-pointer transition-all hover:shadow-lg`}
                onClick={() => navigate(`/${collection.id}`)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={20} className="text-foreground" />
                  <h3 className="text-lg font-light tracking-wide uppercase">
                    {collection.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {collection.description}
                </p>

                {/* Preview Products */}
                {collection.products.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {collection.products.map((product) => (
                      <div key={product.id} className="aspect-[3/4] bg-background overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="aspect-[3/4] bg-background/50 flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                    <div className="aspect-[3/4] bg-background/50 flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                )}

                <button className="inline-flex items-center gap-2 text-sm tracking-wide uppercase group-hover:gap-3 transition-all">
                  View Collection
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;