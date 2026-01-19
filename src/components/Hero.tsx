import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  onExplore: () => void;
}

const Hero = ({ onExplore }: HeroProps) => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-ken-burns">
            <img
              src={heroImage}
              alt="Finite Luxury Collection"
              className="w-full h-full object-cover scale-110"
              fetchPriority="high"
            />
          </div>
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.4)_100%)]" />
        </div>
        
        {/* Content */}
        <div className="relative text-center px-4 z-10 max-w-4xl mx-auto">
          <ScrollReveal delay={0.1} direction="none">
            <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-foreground/80 mb-6">
              Premium Men's Fashion
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.1em] uppercase mb-6 leading-tight">
              Elevate Your
              <br />
              <span className="font-light">Wardrobe</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="up">
            <p className="text-base md:text-lg text-foreground/70 max-w-lg mx-auto mb-10 leading-relaxed">
              Discover curated pieces that define modern elegance. 
              Quality craftsmanship meets timeless design.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300"
              >
                Shop Collection
                <ArrowRight size={18} />
              </button>
              <a
                href="/new-arrivals"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground text-sm tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
              >
                New Arrivals
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-foreground/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-secondary py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ScrollReveal delay={0} direction="up">
              <div className="flex items-center justify-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Truck size={20} className="text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium tracking-wide">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over ₦50,000</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction="up">
              <div className="flex items-center justify-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium tracking-wide">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% protected checkout</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="up">
              <div className="flex items-center justify-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={20} className="text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium tracking-wide">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;