const Footer = () => {
  return (
    <footer className="border-t border-border py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-light tracking-[0.3em] uppercase">
            Finite Luxury
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Curated fashion essentials. Quality craftsmanship. Timeless style.
          </p>
          <div className="pt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Finite Luxury. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
