import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
}

const navLinks = [
  { id: 'new-arrivals', name: 'New Arrivals', path: '/new-arrivals' },
  { id: 'best-sellers', name: 'Best Sellers', path: '/best-sellers' },
  { id: 'sale', name: 'Sale', path: '/sale' },
];

const Header = ({ onCartClick }: HeaderProps) => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
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
            onClick={() => navigate('/')}
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
            onClick={() => navigate('/')}
            className={`text-sm tracking-wide uppercase transition-all hover:opacity-100 ${
              location.pathname === '/' ? 'opacity-100 border-b border-foreground' : 'opacity-60'
            }`}
          >
            Shop All
          </button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.path)}
              className={`text-sm tracking-wide uppercase transition-all hover:opacity-100 ${
                isActivePath(link.path) ? 'opacity-100 border-b border-foreground' : 'opacity-60'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('/')}
              className={`text-left text-sm tracking-wide uppercase py-2 transition-all ${
                location.pathname === '/' ? 'opacity-100' : 'opacity-60'
              }`}
            >
              Shop All
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.path)}
                className={`text-left text-sm tracking-wide uppercase py-2 transition-all ${
                  isActivePath(link.path) ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
