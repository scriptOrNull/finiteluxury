import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';

interface CartProps {
  onClose: () => void;
}

const generateOrderRef = (): string => {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `FL-${num}`;
};

const Cart = ({ onClose }: CartProps) => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const orderRef = generateOrderRef();
    
    let message = `Hello 👋\nI'd like to place an order from Finite Luxury.\n\n`;
    message += `*Order Ref: ${orderRef}*\n\n`;
    message += `*Items:*\n`;
    
    items.forEach((item) => {
      const itemTotal = formatPrice(item.product.price * item.quantity);
      message += `• ${item.product.name} (Size ${item.size}) × ${item.quantity} – ${itemTotal}\n`;
    });
    
    message += `\n*Total: ${formatPrice(totalPrice)}*`;
    
    // WhatsApp API URL
    const whatsappNumber = '2349033120032';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-background h-full border-l border-border animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-light tracking-wider uppercase">
            Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 pb-4 border-b border-border"
                >
                  {/* Image */}
                  <div className="w-20 h-24 bg-muted flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-normal truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Size: {item.size}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="p-1 hover:opacity-70"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="p-1 hover:opacity-70"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-1 ml-auto hover:opacity-70 text-muted-foreground"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-wider uppercase">Total</span>
              <span className="text-lg font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <Button
              onClick={handleWhatsAppCheckout}
              className="w-full h-12 bg-[#25D366] hover:bg-[#22c55e] text-white"
            >
              <MessageCircle size={18} className="mr-2" />
              <span className="tracking-wider uppercase text-sm">Order via WhatsApp</span>
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
