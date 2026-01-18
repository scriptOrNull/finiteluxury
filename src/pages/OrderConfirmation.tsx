import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Check, X } from 'lucide-react';
import { CartProvider, useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DISCOUNT_CODE = 'FINITE2025';
const DISCOUNT_AMOUNT = 2000;
const AUTO_DISCOUNT_THRESHOLD = 50000;
const WHATSAPP_NUMBER = '2349033120032';

const generateOrderRef = () => {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `FL-${num}`;
};

const OrderConfirmationContent = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState('');

  const autoDiscountApplied = totalPrice >= AUTO_DISCOUNT_THRESHOLD;
  const codeDiscountApplied = appliedCode === DISCOUNT_CODE;
  
  const discountAmount = useMemo(() => {
    if (autoDiscountApplied || codeDiscountApplied) {
      return DISCOUNT_AMOUNT;
    }
    return 0;
  }, [autoDiscountApplied, codeDiscountApplied]);

  const finalTotal = totalPrice - discountAmount;

  const handleApplyCode = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === DISCOUNT_CODE) {
      setAppliedCode(code);
      setCodeError('');
    } else {
      setCodeError('Invalid discount code');
      setAppliedCode(null);
    }
  };

  const handleRemoveCode = () => {
    setAppliedCode(null);
    setDiscountCode('');
    setCodeError('');
  };

  const handleWhatsAppCheckout = () => {
    const orderRef = generateOrderRef();
    
    const itemsList = items
      .map(
        (item) =>
          `• ${item.product.name} (Size ${item.size}) x${item.quantity} – ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n');

    let message = `Hello 👋\nI'd like to place an order from Finite Luxury.\n\nOrder Ref: ${orderRef}\n\nItems:\n${itemsList}\n\nSubtotal: ${formatPrice(totalPrice)}`;
    
    if (discountAmount > 0) {
      message += `\nDiscount: -${formatPrice(discountAmount)}`;
      if (autoDiscountApplied && !codeDiscountApplied) {
        message += ` (Order above ${formatPrice(AUTO_DISCOUNT_THRESHOLD)})`;
      } else if (codeDiscountApplied) {
        message += ` (Code: ${DISCOUNT_CODE})`;
      }
    }
    
    message += `\n\nTotal: ${formatPrice(finalTotal)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button onClick={() => navigate('/')} variant="outline">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-light tracking-[0.1em] uppercase">
            Order Confirmation
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Order Items */}
        <section className="mb-8">
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 pb-4 border-b border-border"
              >
                <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discount Code */}
        <section className="mb-8">
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            Discount Code
          </h2>
          
          {autoDiscountApplied && !codeDiscountApplied && (
            <div className="flex items-center gap-2 p-3 bg-accent/50 border border-accent mb-4">
              <Check size={16} className="text-foreground" />
              <span className="text-sm">
                Automatic discount applied for orders above {formatPrice(AUTO_DISCOUNT_THRESHOLD)}
              </span>
            </div>
          )}

          {appliedCode ? (
            <div className="flex items-center justify-between p-3 border border-foreground">
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span className="text-sm font-medium">{appliedCode}</span>
                <span className="text-sm text-muted-foreground">
                  (-{formatPrice(DISCOUNT_AMOUNT)})
                </span>
              </div>
              <button
                onClick={handleRemoveCode}
                className="p-1 hover:opacity-70 transition-opacity"
                aria-label="Remove code"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                  setCodeError('');
                }}
                className="flex-1 h-12 border-border"
              />
              <Button
                onClick={handleApplyCode}
                variant="outline"
                className="h-12 px-6 tracking-wider uppercase text-xs"
              >
                Apply
              </Button>
            </div>
          )}
          
          {codeError && (
            <p className="text-sm text-destructive mt-2">{codeError}</p>
          )}
        </section>

        {/* Order Total */}
        <section className="mb-8 p-6 border border-border">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-foreground">
                <span>Discount</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            
            <div className="pt-3 border-t border-border flex justify-between">
              <span className="font-medium">Total</span>
              <span className="text-lg font-medium">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </section>

        {/* Checkout Button */}
        <Button
          onClick={handleWhatsAppCheckout}
          className="w-full h-14 text-sm tracking-[0.15em] uppercase"
        >
          Proceed to WhatsApp
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          You'll be redirected to WhatsApp to complete your order
        </p>
      </main>
    </div>
  );
};

const OrderConfirmation = () => {
  return (
    <CartProvider>
      <OrderConfirmationContent />
    </CartProvider>
  );
};

export default OrderConfirmation;
