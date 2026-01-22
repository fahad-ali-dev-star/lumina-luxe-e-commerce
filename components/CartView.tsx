
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  onContinueShopping: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, updateQuantity, removeFromCart, clearCart, onContinueShopping }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Order Successful!</h2>
        <p className="text-slate-500 max-w-md">Thank you for shopping with Lumina Luxe. Your order #LX-9402 has been confirmed and is being prepared for shipment.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center text-4xl">
          <i className="fas fa-shopping-bag"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold text-slate-800">Shopping Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm items-center">
              <img src={item.image} className="w-24 h-24 rounded-xl object-cover" alt={item.name} />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-slate-500 text-sm">{item.category}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-slate-400">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm sticky top-24">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Order Summary</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-slate-100 pt-4 flex justify-between text-xl font-bold text-slate-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase">Payment Info (Stripe Mock)</p>
              <div className="flex items-center gap-3 text-slate-700">
                <i className="fab fa-cc-visa text-2xl"></i>
                <span className="font-mono text-sm">•••• •••• •••• 4242</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full py-4 rounded-xl font-bold text-white transition shadow-lg flex items-center justify-center gap-2 ${
                isCheckingOut ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isCheckingOut ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                'Pay & Checkout'
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400">Secure payments powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
