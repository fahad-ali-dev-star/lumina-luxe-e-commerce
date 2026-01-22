
import React, { useState, useEffect } from 'react';
import { Product, CartItem, View, User } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Header from './components/Header';
import StoreFront from './components/StoreFront';
import AdminDashboard from './components/AdminDashboard';
import CartView from './components/CartView';
import AIChatBot from './components/AIChatBot';
import ProductDetail from './components/ProductDetail';

const App: React.FC = () => {
  const [view, setView] = useState<View>('shop');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userRole, setUserRole] = useState<'admin' | 'customer'>('customer');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: Auto-navigate to cart or show a toast
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFE]">
      <Header 
        currentView={view} 
        setView={setView} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {view === 'shop' && (
          <StoreFront 
            products={products} 
            addToCart={addToCart} 
            onViewDetail={handleViewDetail}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {view === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart}
            onBack={() => setView('shop')}
          />
        )}
        
        {view === 'admin' && userRole === 'admin' && (
          <AdminDashboard products={products} setProducts={setProducts} />
        )}

        {view === 'cart' && (
          <CartView 
            cartItems={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onContinueShopping={() => setView('shop')}
          />
        )}

        {view === 'admin' && userRole === 'customer' && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <div className="text-red-500 text-6xl mb-6">
              <i className="fas fa-lock"></i>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Access Restricted</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">This area is reserved for Lumina Luxe administrators. Please return to the storefront to browse our catalog.</p>
            <button 
              onClick={() => setView('shop')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Back to Storefront
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Lumina Luxe</h2>
              <p className="text-slate-500 text-sm leading-relaxed">The intersection of premium aesthetics and intelligent commerce. Shaping the future of luxury essentials.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Shop</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => { setSelectedCategory('All'); setView('shop'); }} className="hover:text-indigo-600">All Products</button></li>
                <li><button onClick={() => { setSelectedCategory('Electronics'); setView('shop'); }} className="hover:text-indigo-600">Electronics</button></li>
                <li><button onClick={() => { setSelectedCategory('Home'); setView('shop'); }} className="hover:text-indigo-600">Home Office</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="email@example.com" className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-indigo-500" />
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-slate-400 text-xs">© 2024 Lumina Luxe E-Commerce. Built with Intelligence.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </footer>

      <AIChatBot products={products} />
    </div>
  );
};

export default App;
