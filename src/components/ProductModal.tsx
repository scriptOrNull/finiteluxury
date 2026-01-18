import { useState } from 'react';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, formatPrice } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  const hasMultipleImages = product.images.length > 1;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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
          {/* Image Gallery */}
          <div className="relative aspect-square md:aspect-[3/4] bg-muted">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-foreground' : 'bg-foreground/30'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 px-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
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
