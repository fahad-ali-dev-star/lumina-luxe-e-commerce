
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [activeImage, setActiveImage] = useState(product.image);

  return (
    <div className="animate-fade-in pb-20">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <i className="fas fa-arrow-left"></i> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="flex gap-4">
            {[product.image, `https://picsum.photos/seed/${product.id}alt1/600/600`, `https://picsum.photos/seed/${product.id}alt2/600/600`].map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-indigo-600 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="Gallery" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{product.category}</span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-slate-200'}`}></i>
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-medium">{product.rating} / 5.0 (128 Reviews)</span>
              </div>
            </div>

            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</p>

            <div className="border-t border-b border-slate-100 py-6">
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-semibold text-slate-700">
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock === 0}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
                >
                  Add to Cart
                </button>
                <button className="w-16 h-16 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-colors">
                  <i className="far fa-heart text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
              <i className="fas fa-shipping-fast text-indigo-500"></i>
              Lumina Express Shipping
            </h3>
            <p className="text-sm text-slate-500">Free standard shipping on orders over $500. Estimated delivery: 2-4 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
