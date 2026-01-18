const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                  <span className="text-6xl font-extralight text-foreground/20">01</span>
                </div>
              </div>
              <div className="aspect-square bg-muted overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center">
                  <span className="text-4xl font-extralight text-foreground/20">02</span>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <div className="aspect-[3/5] bg-muted overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/15 flex items-center justify-center">
                  <span className="text-6xl font-extralight text-foreground/20">03</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
              Our Philosophy
            </p>
            <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.1em] uppercase mb-6 leading-tight">
              Quality Over
              <br />
              Quantity
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Finite Luxury, we believe in the power of a carefully curated wardrobe. 
                Each piece in our collection is selected for its exceptional craftsmanship, 
                timeless design, and versatility.
              </p>
              <p>
                We partner with artisans who share our commitment to quality, using only 
                the finest materials to create pieces that stand the test of time. From 
                precision tailoring to thoughtful details, every garment tells a story of 
                dedication and expertise.
              </p>
              <p>
                Our mission is simple: to help the modern gentleman build a wardrobe of 
                investment pieces that elevate every occasion.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              <div>
                <p className="text-3xl font-extralight">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Premium Quality</p>
              </div>
              <div>
                <p className="text-3xl font-extralight">30</p>
                <p className="text-xs text-muted-foreground mt-1">Day Returns</p>
              </div>
              <div>
                <p className="text-3xl font-extralight">24/7</p>
                <p className="text-xs text-muted-foreground mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;