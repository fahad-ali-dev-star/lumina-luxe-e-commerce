
import React, { useState } from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
  userRole: 'admin' | 'customer';
  setUserRole: (role: 'admin' | 'customer') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, cartCount, userRole, setUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <h1
              onClick={() => setView('shop')}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 cursor-pointer"
            >
              Lumina Luxe
            </h1>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setView('shop')}
                className={`text-sm font-medium transition-colors ${currentView === 'shop' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
              >
                Shop
              </button>
              {userRole === 'admin' && (
                <button
                  onClick={() => setView('admin')}
                  className={`text-sm font-medium transition-colors ${currentView === 'admin' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
                >
                  Admin
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setUserRole(userRole === 'admin' ? 'customer' : 'admin')}
              className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-500 hover:bg-slate-200"
            >
              Switch to {userRole === 'admin' ? 'User' : 'Admin'}
            </button>

            <button
              onClick={() => setView('cart')}
              className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <button
                onClick={() => { setView('shop'); setIsMenuOpen(false); }}
                className={`text-left text-sm font-medium transition-colors ${currentView === 'shop' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
              >
                Shop
              </button>
              {userRole === 'admin' && (
                <button
                  onClick={() => { setView('admin'); setIsMenuOpen(false); }}
                  className={`text-left text-sm font-medium transition-colors ${currentView === 'admin' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
                >
                  Admin
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
