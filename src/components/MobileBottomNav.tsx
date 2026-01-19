import { Home, Grid3X3, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

interface MobileBottomNavProps {
  onCartClick: () => void;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Grid3X3, label: 'Shop', path: '/collections' },
  { icon: Sparkles, label: 'New', path: '/new-arrivals' },
  { icon: Tag, label: 'Sale', path: '/sale' },
];

const MobileBottomNav = ({ onCartClick }: MobileBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${
              isActive(item.path) 
                ? 'text-foreground' 
                : 'text-muted-foreground'
            }`}
          >
            <item.icon size={20} strokeWidth={isActive(item.path) ? 2 : 1.5} />
            <span className="text-[10px] tracking-wide uppercase">{item.label}</span>
          </button>
        ))}
        
        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-muted-foreground relative"
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wide uppercase">Cart</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
