
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/Product";

interface WishlistPageProps {
  products: Product[];
  wishlist: number[];
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (product: Product, size: string) => void;
  onBack: () => void;
}

const WishlistPage = ({ products, wishlist, onProductClick, onToggleWishlist, onAddToCart, onBack }: WishlistPageProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-light">Wishlist</h1>
          </div>
          <span className="text-sm text-gray-500">{products.length} items</span>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-light mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 text-sm mb-6">Save items you love to view them later</p>
            <Button 
              onClick={onBack}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <ProductGrid 
            products={products}
            wishlist={wishlist}
            onProductClick={onProductClick}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
