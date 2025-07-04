import { useState } from "react";
import { X, Heart, ShoppingBag, Ruler, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface ProductModalProps {
  product: Product;
  isInWishlist: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow?: (product: Product, size: string) => void;
  onToggleWishlist: () => void;
}

const ProductModal = ({ product, isInWishlist, onClose, onAddToCart, onBuyNow, onToggleWishlist }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? "" : "Default");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
    }
  };

  const handleBuyNow = () => {
    // Copy product details to clipboard
    const productDetails = `Product: ${product.name}\nSize: ${selectedSize}\nPrice: ৳${product.price}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productDetails).catch(() => {
        console.log('Product details:', productDetails);
      });
    }
    
    // Open the Google Form URL directly
    window.open("https://forms.gle/pCunH9M1Z3ez9VnU9", "_blank");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : i < rating 
            ? "text-yellow-400 fill-current opacity-50" 
            : "text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 md:mx-0 rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-hidden animate-slide-in-right md:animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-50">
          <h3 className="font-light tracking-wide">printpoka</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Product Image */}
          <div className="aspect-[3/4] bg-gray-50 relative">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 right-4 h-10 w-10 rounded-full transition-all ${
                isInWishlist
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white/80 hover:bg-white"
              }`}
              onClick={onToggleWishlist}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
            </Button>
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-xl font-light mb-1">{product.name}</h2>
              <p className="text-lg font-medium">৳{product.price}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">
                  {product.subcategory}
                </span>
                {product.brand && (
                  <span className="text-sm text-gray-600">{product.brand}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating}/5)</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection - Only show if product has sizes */}
            {product.sizes && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Select Size</h4>
                  <Button 
                    variant="ghost" 
                    className="text-xs text-gray-600 p-0 h-auto hover:text-black"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                  >
                    <Ruler className="h-3 w-3 mr-1" />
                    Size Guide
                  </Button>
                </div>
                
                {showSizeGuide && (
                  <div className="bg-gray-50 rounded-lg p-3 text-xs space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-center font-medium">
                      <span>Size</span>
                      <span>Chest</span>
                      <span>Length</span>
                    </div>
                    {product.sizes.map((size, index) => (
                      <div key={size} className="grid grid-cols-3 gap-2 text-center">
                        <span>{size}</span>
                        <span>{32 + index * 2}"</span>
                        <span>{28 + index}"</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-sm border rounded-lg transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-50 bg-white">
          <div className="flex gap-2">
            <Button
              onClick={handleBuyNow}
              disabled={!selectedSize || !product.inStock}
              className="flex-1 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 rounded-full"
            >
              <Zap className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !product.inStock}
              variant="outline"
              className="flex-1 border-black text-black hover:bg-black hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 rounded-full"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
