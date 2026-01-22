
import React from 'react';
import { Product } from '../types';

interface StoreFrontProps {
  products: Product[];
  addToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const StoreFront: React.FC<StoreFrontProps> = ({ products, addToCart, onViewDetail, selectedCategory, setSelectedCategory }) => {
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[450px] flex items-center px-6 sm:px-12 animate-fade-in group">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-transform duration-1000 group-hover:scale-105"
          alt="Hero"
        />
        <div className="relative z-10 max-w-2xl text-white space-y-4 sm:space-y-6">
          <span className="inline-block bg-indigo-600/80 backdrop-blur-md px-3 sm:px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Seasonal Sale</span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight">Elevate Your Lifestyle with Lumina Luxe</h2>
          <p className="text-lg sm:text-xl text-slate-200">Experience premium essentials curated with artificial intelligence to match your unique style.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-xl active:scale-95 text-sm sm:text-base">
              Explore Collection
            </button>
            <button className="bg-transparent border-2 border-white/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/10 transition-all text-sm sm:text-base">
              Watch Vision Pro
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar items-center">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Filter:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all shadow-sm border ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-indigo-100' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 border border-slate-100 flex flex-col"
          >
            <div 
              onClick={() => onViewDetail(product)}
              className="relative h-72 overflow-hidden bg-slate-100 cursor-pointer"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-sm border border-white/50">
                  ★ {product.rating}
                </div>
                {product.stock < 10 && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    Low Stock
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{product.category}</span>
              </div>
              <h3 
                onClick={() => onViewDetail(product)}
                className="text-xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                {product.name}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">Price</span>
                  <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-slate-900 text-white h-14 w-14 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-90 flex items-center justify-center"
                  title="Quick Add"
                >
                  <i className="fas fa-plus text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreFront;
