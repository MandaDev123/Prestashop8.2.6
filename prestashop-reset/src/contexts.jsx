import { createContext, useContext, useState, useEffect } from 'react';

// ══════ AUTH CONTEXT ══════
const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('isLoggedIn'));
  const apiKey = 'VEQZ2RX4XGNRRIZJDL28E4J2NXEVSCMN'; // Hardcoded API Key

  const [customer, setCustomer] = useState(() => {
    try { return JSON.parse(localStorage.getItem('customer') || 'null'); } catch { return null; }
  });

  const login = (user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const frontLogin = (customerData) => {
    localStorage.setItem('customer', JSON.stringify(customerData));
    setCustomer(customerData);
  };

  const frontLogout = () => {
    localStorage.removeItem('customer');
    setCustomer(null);
  };

  return (
    <AuthCtx.Provider value={{ isLoggedIn, apiKey, login, logout, customer, frontLogin, frontLogout }}>
      {children}
    </AuthCtx.Provider>
  );
}

// ══════ CART CONTEXT ══════
const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

  const addItem = (product) => {
    setItems(prev => {
      const combId = product.combinationId || 0;
      const cartKey = `${product.id}-${combId}`;
      const idx = prev.findIndex(i => i.cartKey === cartKey);
      if (idx >= 0) {
        const n = [...prev]; n[idx] = { ...n[idx], qty: n[idx].qty + 1 }; return n;
      }
      const name = product.name?.[0]?.value || product.name || '';
      const img = product.associations?.images?.[0]?.id || null;
      return [...prev, { 
        cartKey,
        id: product.id, 
        combinationId: combId,
        name, 
        price: parseFloat(product.price), 
        qty: 1, 
        imageId: img 
      }];
    });
  };

  const updateQty = (cartKey, qty) => {
    if (qty <= 0) return removeItem(cartKey);
    setItems(prev => prev.map(i => i.cartKey === cartKey ? { ...i, qty } : i));
  };

  const removeItem = (cartKey) => setItems(prev => prev.filter(i => i.cartKey !== cartKey));
  const clearCart = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, addItem, updateQty, removeItem, clearCart, total, count }}>
      {children}
    </CartCtx.Provider>
  );
}
