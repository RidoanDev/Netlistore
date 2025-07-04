import { useState, useMemo } from "react";
import { ArrowLeft, Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  wishlist: number[];
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow?: (product: Product, size: string) => void;
  onToggleWishlist: (productId: number) => void;
  onProductClick: (product: Product) => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onContactClick: () => void;
  cartCount: number;
}

const ProductDetailPage = ({ 
  product, 
  allProducts, 
  wishlist, 
  onBack, 
  onAddToCart,
  onBuyNow,
  onToggleWishlist, 
  onProductClick,
  onHomeClick,
  onSearchClick,
  onCartClick,
  onContactClick,
  cartCount
}: ProductDetailPageProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? "" : "Default");

  const suggestedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 6);
  }, [allProducts, product]);

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h3 className="font-light tracking-wide">Product Details</h3>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Product Image - Premium minimalistic design */}
      <div className="bg-white px-6 py-8">
        <div className="max-w-md mx-auto">
          <AspectRatio ratio={1} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-sm transition-all shadow-lg ${
                wishlist.includes(product.id)
                  ? "bg-black/80 text-white hover:bg-black"
                  : "bg-white/80 hover:bg-white"
              }`}
              onClick={() => onToggleWishlist(product.id)}
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
            </Button>
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                <span className="text-white font-medium">Out of Stock</span>
              </div>
            )}
          </AspectRatio>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-6 bg-white mx-4 rounded-t-3xl -mt-4 relative z-10 shadow-lg">
        <div>
          <h1 className="text-2xl font-light mb-2">{product.name}</h1>
          <p className="text-2xl font-medium text-black">৳{product.price}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {product.subcategory}
            </span>
            {product.brand && (
              <span className="text-sm text-gray-600">{product.brand}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">({product.rating}/5)</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Size Selection */}
        {product.sizes && (
          <div className="space-y-3">
            <h4 className="font-medium">Select Size</h4>
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

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleBuyNow}
            disabled={!selectedSize || !product.inStock}
            className="flex-1 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 rounded-full py-3"
          >
            <Zap className="w-4 h-4 mr-2" />
            {!product.inStock ? "Out of Stock" : "Buy Now"}
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || !product.inStock}
            variant="outline"
            className="flex-1 border-black text-black hover:bg-black hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 rounded-full py-3"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <div className="p-4 bg-white mt-2">
          <h3 className="text-lg font-light mb-4">You might also like</h3>
          <ProductGrid 
            products={suggestedProducts}
            wishlist={wishlist}
            onProductClick={onProductClick}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartCount}
        onHomeClick={onHomeClick}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onContactClick={onContactClick}
        activeTab="home"
      />
    </div>
  );
};

export default ProductDetailPage;
