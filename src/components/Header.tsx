import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '@/data/products';

interface HeaderProps {
  onCartClick: () => void;
  onCategoryClick?: (category: string | null) => void;
  activeCategory?: string | null;
}

const Header = ({ onCartClick, onCategoryClick, activeCategory }: HeaderProps) => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (category: string | null) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      // Navigate to category page
      if (category === null) {
        navigate('/');
      } else {
        navigate(`/category/${category}`);
      }
    }
    setMobileMenuOpen(false);
  };

  const isActiveCategory = (catId: string | null) => {
    if (activeCategory !== undefined) {
      return activeCategory === catId;
    }
    // Derive from URL
    if (catId === null) {
      return location.pathname === '/';
    }
    return location.pathname === `/category/${catId}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            onClick={() => handleCategoryClick(null)}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <h1 className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase">
              Finite Luxury
            </h1>
          </button>

          <button
            onClick={onCartClick}
            className="relative p-2 -mr-2 group"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} className="transition-transform group-hover:scale-105" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 pb-4">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`text-sm tracking-wide uppercase transition-all hover:opacity-100 ${
              isActiveCategory(null) ? 'opacity-100 border-b border-foreground' : 'opacity-60'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`text-sm tracking-wide uppercase transition-all hover:opacity-100 ${
                isActiveCategory(cat.id) ? 'opacity-100 border-b border-foreground' : 'opacity-60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-left text-sm tracking-wide uppercase py-2 transition-all ${
                isActiveCategory(null) ? 'opacity-100' : 'opacity-60'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`text-left text-sm tracking-wide uppercase py-2 transition-all ${
                  isActiveCategory(cat.id) ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
