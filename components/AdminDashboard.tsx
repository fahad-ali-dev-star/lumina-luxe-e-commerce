
import React, { useState } from 'react';
import { Product } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { generateProductDescription } from '../services/geminiService';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, setProducts }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Electronics',
    stock: 0,
    description: '',
    image: 'https://picsum.photos/seed/new/600/600'
  });
  const [aiGenerating, setAiGenerating] = useState(false);

  const stats = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 2000, orders: 150 },
    { name: 'Apr', sales: 2780, orders: 200 },
    { name: 'May', sales: 1890, orders: 120 },
    { name: 'Jun', sales: 2390, orders: 170 },
  ];

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const p: Product = {
        ...newProduct as Product,
        id: Math.random().toString(36).substr(2, 9),
        rating: 5.0
      };
      setProducts([...products, p]);
      setIsAdding(false);
      setNewProduct({ name: '', price: 0, category: 'Electronics', stock: 0, description: '', image: 'https://picsum.photos/seed/new/600/600' });
    }
  };

  const handleAiDescription = async () => {
    if (!newProduct.name) return;
    setAiGenerating(true);
    const desc = await generateProductDescription(newProduct.name, [newProduct.category || 'General', 'High quality', 'Durable']);
    setNewProduct(prev => ({ ...prev, description: desc }));
    setAiGenerating(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Admin Console</h2>
          <p className="text-slate-500">Manage your store and inventory.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
        >
          <i className="fas fa-plus mr-2"></i> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Monthly Sales (USD)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Order Frequency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700">Inventory Status</h3>
        </div>
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-lg object-cover" src={p.image} alt="" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{p.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{p.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button 
                    onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-fade-in">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Add New Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Pro Airbuds"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                  <input 
                    type="number" 
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                    className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Electronics</option>
                  <option>Home</option>
                  <option>Furniture</option>
                  <option>Fashion</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <button 
                    onClick={handleAiDescription}
                    disabled={aiGenerating || !newProduct.name}
                    className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 disabled:opacity-50"
                  >
                    {aiGenerating ? <i className="fas fa-spinner fa-spin mr-1"></i> : <i className="fas fa-magic mr-1"></i>}
                    AI Generate
                  </button>
                </div>
                <textarea 
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                  placeholder="Describe the product..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddProduct}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
