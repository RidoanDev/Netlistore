import { Heart, ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface ProductGridProps {
  products: Product[];
  wishlist: number[];
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow?: (product: Product, size: string) => void;
}

const ProductGrid = ({ products, wishlist, onProductClick, onToggleWishlist, onAddToCart, onBuyNow }: ProductGridProps) => {
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes ? product.sizes[0] : "Default");
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    // Copy product details to clipboard
    const defaultSize = product.sizes ? product.sizes[0] : "Default";
    const productDetails = `Product: ${product.name}\nSize: ${defaultSize}\nPrice: ৳${product.price}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productDetails).catch(() => {
        console.log('Product details:', productDetails);
      });
    }
    
    // Open the Google Form URL directly
    window.open("https://forms.gle/pCunH9M1Z3ez9VnU9", "_blank");
  };

  return (
    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
      {products.map((product) => (
        <div 
          key={product.id}
          className="group cursor-pointer bg-white rounded-lg p-3 border border-gray-100 hover:shadow-md transition-all duration-300"
          onClick={() => onProductClick(product)}
        >
          <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs font-medium">Out of Stock</span>
              </div>
            )}
            
            {/* Action Icons - Positioned over the image */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                disabled={!product.inStock}
                className="h-6 w-6 bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm rounded-full border border-gray-200"
                onClick={(e) => handleBuyNow(e, product)}
              >
                <Zap className="h-3 w-3 text-orange-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={!product.inStock}
                className="h-6 w-6 bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm rounded-full border border-gray-200"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingBag className="h-3 w-3 text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-6 w-6 shadow-sm backdrop-blur-sm rounded-full border ${
                  wishlist.includes(product.id)
                    ? "bg-black hover:bg-gray-800 border-black"
                    : "bg-white/90 hover:bg-white border-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
              >
                <Heart 
                  className={`h-3 w-3 ${
                    wishlist.includes(product.id) 
                      ? "text-white fill-current" 
                      : "text-gray-700"
                  }`} 
                />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-light text-sm leading-tight line-clamp-2 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h4>
            <p className="font-medium text-sm text-black">৳{product.price}</p>
            {product.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-gray-500">{product.rating}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
