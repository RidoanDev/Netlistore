
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import BottomNav from "@/components/BottomNav";

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, size: string, quantity: number) => void;
  onClose: () => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onContactClick: () => void;
  cartCount: number;
}

const CartPage = ({ 
  items, 
  onUpdateQuantity, 
  onClose, 
  onHomeClick, 
  onSearchClick, 
  onContactClick, 
  cartCount 
}: CartPageProps) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 200 ? 0 : 15;
  const finalTotal = total + shipping;

  const handleCheckout = () => {
    // Create order summary
    const orderSummary = items.map(item => 
      `${item.product.name} (Size: ${item.size}) - Quantity: ${item.quantity}`
    ).join('\n');
    
    const orderDetails = `Order Details:\n${orderSummary}\n\nTotal Amount: ৳${finalTotal.toFixed(2)}`;
    
    // Copy order details to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(orderDetails).catch(() => {
        console.log('Order details:', orderDetails);
      });
    }
    
    // Open the Google Form URL directly
    window.open("https://forms.gle/pCunH9M1Z3ez9VnU9", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-extralight tracking-wide">Cart</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col min-h-screen">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-200 mb-4" />
            <h4 className="text-lg font-light mb-2">Your cart is empty</h4>
            <p className="text-gray-500 text-sm mb-6">Discover our beautiful products</p>
            <Button 
              onClick={onClose}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Banner */}
            {total < 200 && (
              <div className="bg-gray-50 p-3 text-center text-sm">
                <span className="text-gray-600">
                  Add ৳{(200 - total).toFixed(2)} more for free shipping
                </span>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className="bg-black h-1 rounded-full transition-all"
                    style={{ width: `${(total / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-3">
                  <div className="w-16 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-light text-sm line-clamp-2 mb-1">{item.product.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">Size: {item.size}</p>
                    <p className="font-medium text-sm">৳{item.product.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-medium text-sm">৳{(item.product.price * item.quantity).toFixed(2)}</p>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 0)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-50 p-4 space-y-4 bg-white">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `৳${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t">
                  <span>Total</span>
                  <span>৳{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800 rounded-full"
                onClick={handleCheckout}
              >
                Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button variant="outline" className="w-full rounded-full" onClick={onClose}>
                Continue Shopping
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Secure checkout via Google Forms
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartCount}
        onHomeClick={onHomeClick}
        onSearchClick={onSearchClick}
        onCartClick={onClose}
        onContactClick={onContactClick}
        activeTab="cart"
      />
    </div>
  );
};

export default CartPage;
