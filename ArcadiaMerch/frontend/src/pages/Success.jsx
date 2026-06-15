import React from 'react';

export default function Success({ onNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '16px', marginTop: '40px' }}>
      <div style={{ fontSize: '4rem' }}>✨</div>
      
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--violet-glow)' }}>
        Pedido Confirmado!
      </h1>
      
      <p style={{ fontSize: '14px', color: 'var(--tx2)', maxWidth: '400px', lineHeight: 1.7 }}>
        Sua encomenda está sendo preparada com cuidado na Arcadia Bay. Reviva cada momento enquanto aguarda a entrega na sua casa.
      </p>
      
      <button 
        onClick={() => onNav('home')}
        style={{ 
          marginTop: '16px', background: 'var(--violet)', border: 'none', borderRadius: '999px', 
          padding: '12px 28px', color: '#fff', fontSize: '13.5px', fontWeight: 700, 
          cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: '.15s' 
        }}
      >
        ↩ Voltar para a Loja
      </button>
    </div>
  );
}