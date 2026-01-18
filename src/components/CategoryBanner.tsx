import { useMemo } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryBannerProps {
  category: Category;
  productCount: number;
}

const categoryPromos: Record<string, { tagline: string; cta: string }> = {
  shirts: {
    tagline: 'Tailored for the modern gentleman. Premium fabrics, impeccable fits.',
    cta: 'DISCOVER THE COLLECTION',
  },
  tops: {
    tagline: 'Everyday essentials elevated. Comfort meets refined style.',
    cta: 'SHOP ESSENTIALS',
  },
  slides: {
    tagline: 'Effortless luxury for your downtime. Step into comfort.',
    cta: 'EXPLORE SLIDES',
  },
  shoes: {
    tagline: 'Crafted footwear for distinguished taste. Every step refined.',
    cta: 'DISCOVER FOOTWEAR',
  },
  caps: {
    tagline: 'The finishing touch. Understated accessories for the discerning man.',
    cta: 'VIEW COLLECTION',
  },
  perfume: {
    tagline: 'Signature scents that leave an impression. Bold. Refined. Unforgettable.',
    cta: 'EXPLORE FRAGRANCES',
  },
};

const CategoryBanner = ({ category, productCount }: CategoryBannerProps) => {
  const promo = useMemo(() => {
    return categoryPromos[category.id] || {
      tagline: category.description,
      cta: 'SHOP NOW',
    };
  }, [category]);

  return (
    <section className="relative bg-muted">
      {/* Gradient Overlay for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background/50 opacity-60" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          {/* Category Tag */}
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Men's {category.name}
          </span>
          
          {/* Category Title */}
          <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] uppercase mb-4">
            {category.name}
          </h1>
          
          {/* Tagline */}
          <p className="text-base md:text-lg text-foreground/80 font-light mb-6 max-w-lg">
            {promo.tagline}
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light">{productCount}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wide">
                Products
              </span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Premium Quality
            </div>
          </div>
          
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-xs tracking-[0.15em] uppercase">
              {promo.cta}
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default CategoryBanner;
