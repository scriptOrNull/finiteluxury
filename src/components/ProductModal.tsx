import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Product, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto md:rounded-none border-t md:border border-border animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square md:aspect-[3/4] bg-muted">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h2 className="text-xl md:text-2xl font-light tracking-wide mb-2">
              {product.name}
            </h2>
            <p className="text-lg font-medium mb-4">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-sm text-muted-foreground mb-6">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-10 px-3 border text-sm transition-all ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-xs tracking-wider uppercase mb-2 text-muted-foreground">
                  Color: {product.colors[0]}
                </p>
              </div>
            )}

            <div className="mt-auto">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || added}
                variant="default"
                className="w-full h-12 text-sm tracking-wider uppercase"
              >
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check size={18} /> Added
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </Button>
              {!selectedSize && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Please select a size
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
