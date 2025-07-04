
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, size: string, quantity: number) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 200 ? 0 : 15;
  const finalTotal = total + shipping;

  const handleCheckout = () => {
    // Create order summary for Google Form
    const orderSummary = items.map(item => 
      `${item.product.name} (Size: ${item.size}, Qty: ${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const orderDetails = `
Order Summary:
${orderSummary}

Subtotal: $${total.toFixed(2)}
Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
Total: $${finalTotal.toFixed(2)}
    `.trim();

    // Google Form URL - replace with your actual Google Form URL
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf_EXAMPLE_FORM_ID/viewform";
    
    // Pre-fill the form with order details (you'll need to get the field IDs from your Google Form)
    const formUrlWithData = `${googleFormUrl}?usp=pp_url&entry.REPLACE_WITH_FIELD_ID=${encodeURIComponent(orderDetails)}`;
    
    // Open Google Form in new tab
    window.open(formUrlWithData, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-50">
          <h3 className="font-light tracking-wide">Cart ({items.length})</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-200 mb-4" />
              <h4 className="text-lg font-light mb-2">Your cart is empty</h4>
              <p className="text-gray-500 text-sm mb-6">Discover our beautiful dresses</p>
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
                    Add ${(200 - total).toFixed(2)} more for free shipping
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
                  <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-3 group">
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
                      <p className="font-medium text-sm">${item.product.price}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2">
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
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 0)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-50 p-4 space-y-4 bg-white">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
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
      </div>
    </div>
  );
};

export default Cart;
