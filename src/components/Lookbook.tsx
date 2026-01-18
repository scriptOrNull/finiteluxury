import lifestyleUrban from '@/assets/lifestyle-urban.jpg';
import lifestyleCafe from '@/assets/lifestyle-cafe.jpg';
import lifestyleArchitecture from '@/assets/lifestyle-architecture.jpg';
import lifestyleNight from '@/assets/lifestyle-night.jpg';
import ScrollReveal from './ScrollReveal';

const lookbookItems = [
  {
    image: lifestyleUrban,
    title: 'Urban Explorer',
    description: 'Elevated essentials for the city',
  },
  {
    image: lifestyleCafe,
    title: 'Refined Comfort',
    description: 'Effortless sophistication',
  },
  {
    image: lifestyleArchitecture,
    title: 'Bold Statement',
    description: 'Stand out with intention',
  },
  {
    image: lifestyleNight,
    title: 'Night Edition',
    description: 'After-dark elegance',
  },
];

const Lookbook = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              The Lookbook
            </p>
            <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.1em] uppercase mb-3">
              Style in Motion
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Discover how our pieces come alive in everyday moments
            </p>
          </div>
        </ScrollReveal>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {lookbookItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="up">
              <div className="group relative overflow-hidden aspect-[3/4] cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-sm md:text-base font-medium tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-10">
            <a
              href="/new-arrivals"
              className="inline-flex items-center text-sm tracking-[0.2em] uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              View Full Collection
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Lookbook;
