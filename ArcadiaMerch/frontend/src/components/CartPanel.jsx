import React from 'react';
import { useStore } from '../context/StoreContext';

export default function CartPanel({ isOpen, onClose, onNav }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    clearCart();
    onClose();
    onNav('success');
  };

  return (
    <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
      <div className="cp-head">
        <h3>🛒 Carrinho</h3>
        <button className="cp-close" onClick={onClose}>✕</button>
      </div>

      <div className="cp-items">
        {cart.length === 0 ? (
          <div className="cp-empty">
            <div className="cp-empty-icon">📷</div>
            <p>Seu carrinho está vazio...<br/>como Arcadia Bay antes da tempestade.</p>
          </div>
        ) : (
          cart.map(item => {
            const qty = item.quantity || 1;
            return (
              <div className="cp-item" key={item.id}>
                <div className="cp-img" style={{ background: item.image ? 'transparent' : item.gradient || 'var(--bg3)' }}>
                  {item.image ? <img src={item.image} alt={item.name} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'var(--r2)'}}/> : item.emoji}
                </div>
                <div className="cp-info">
                  <div className="cp-name">{item.name}</div>
                  <div className="cp-meta">R${item.price.toFixed(2)} cada</div>
                  <div className="cp-row">
                    <div className="qty-ctrl">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, qty - 1)}>−</button>
                      <span className="qty-n">{qty}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, qty + 1)}>+</button>
                    </div>
                    <button className="cp-rm" onClick={() => removeFromCart(item.id)} title="Remover item">🗑</button>
                    <span className="cp-price">R${(item.price * qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cart.length > 0 && (
        <div className="cp-foot">
          <div className="cp-row2"><span>Subtotal</span><span>R${total.toFixed(2)}</span></div>
          <div className="cp-row2"><span>Frete</span><span style={{ color: 'var(--tll)' }}>Grátis ✦</span></div>
          <div className="cp-row2 main"><span>Total</span><span>R${total.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={handleCheckout}>
            ✦ Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}