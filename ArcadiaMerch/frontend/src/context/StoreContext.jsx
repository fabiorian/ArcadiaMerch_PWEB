import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [theme, setTheme] = useState('dark');

  // ─── LÓGICA DO CARRINHO ───
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Função para esvaziar o carrinho após a compra
  const clearCart = () => {
    setCart([]);
  };

  const inCart = (id) => cart.some(item => item.id === id);
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // ─── LÓGICA DOS FAVORITOS ───
  const toggleWish = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };
  
  const inWishlist = (id) => wishlist.some(item => item.id === id);

  // ─── LÓGICA DO TEMA ───
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--bg', '#f0eaff'); root.style.setProperty('--bg2', '#e8e0ff'); root.style.setProperty('--bg3', '#ddd4ff'); root.style.setProperty('--bg4', '#d0c6ff'); root.style.setProperty('--bg5', '#c4b6ff'); root.style.setProperty('--tx', '#1a0a2e'); root.style.setProperty('--tx2', '#4a2a6a'); root.style.setProperty('--tx3', '#7a5a9a'); root.style.setProperty('--tx4', '#a080c0'); root.style.setProperty('--bd', '#c0a8e0'); root.style.setProperty('--bd2', '#a888cc'); root.style.setProperty('--bd3', '#8860b0');
    } else {
      root.style.setProperty('--bg', '#0c0917'); root.style.setProperty('--bg2', '#110e20'); root.style.setProperty('--bg3', '#171228'); root.style.setProperty('--bg4', '#1e1934'); root.style.setProperty('--bg5', '#241f3d'); root.style.setProperty('--tx', '#f0e6ff'); root.style.setProperty('--tx2', '#b8a8d4'); root.style.setProperty('--tx3', '#7a6a9a'); root.style.setProperty('--tx4', '#4a3a6a'); root.style.setProperty('--bd', '#231b40'); root.style.setProperty('--bd2', '#302560'); root.style.setProperty('--bd3', '#3d2d70');
    }
  }, [theme]);

  return (
    <StoreContext.Provider value={{
      cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, inCart,
      wishlist, toggleWish, inWishlist,
      theme, toggleTheme
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);