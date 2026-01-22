
import React, { useState, useRef, useEffect } from 'react';
import { shoppingAssistant } from '../services/geminiService';
import { Product } from '../types';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface AIChatBotProps {
  products: Product[];
}

const AIChatBot: React.FC<AIChatBotProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your Lumina assistant. Looking for something specific today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsLoading(true);

    const aiMsg = await shoppingAssistant(userMsg, products);
    setMessages(prev => [...prev, { text: aiMsg, sender: 'ai' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-fade-in">
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <span className="font-bold">AI Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-indigo-200">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 p-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm border border-slate-100">
                  <i className="fas fa-circle-notch fa-spin"></i> thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 text-sm p-2 outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        >
          <i className="fas fa-comment-dots text-2xl"></i>
          <span className="absolute -top-1 -left-1 bg-red-500 w-4 h-4 rounded-full border-2 border-slate-50"></span>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
