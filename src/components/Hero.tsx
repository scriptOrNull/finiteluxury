import heroImage from '@/assets/hero-image.jpg';

interface HeroProps {
  onExplore: () => void;
}

const Hero = ({ onExplore }: HeroProps) => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Finite Luxury Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative text-center px-4 z-10">
        <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-foreground/80 mb-4">
          New Collection
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-[0.15em] uppercase mb-6">
          Refined Essentials
        </h2>
        <p className="text-sm md:text-base text-foreground/70 max-w-md mx-auto mb-8">
          Curated pieces for the modern wardrobe. Quality over quantity.
        </p>
        <button
          onClick={onExplore}
          className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;
