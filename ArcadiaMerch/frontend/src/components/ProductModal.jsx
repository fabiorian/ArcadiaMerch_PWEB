import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

// Função para desenhar as estrelinhas
function Stars({ rating }) {
  return (
    <span style={{color:'var(--amber)',fontSize:'.8rem',letterSpacing:'1px'}}>
      {[1,2,3,4,5].map(i => i <= Math.floor(rating) ? '★' : i - rating < 1 ? '⯨' : '☆').join('')}
    </span>
  );
}

export default function ProductModal({ product, onClose }) {
  const { addToCart, inCart } = useStore();
  
  // Seleciona o primeiro tamanho por padrão (se o produto tiver tamanhos)
  const [activeSize, setActiveSize] = useState(product?.sizes ? product.sizes[0] : null);
  
  if (!product) return null;
  const carted = inCart(product.id);

  return (
    // Fundo escuro desfocado
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(5,3,15,.85)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px',
      backdropFilter: 'blur(6px)'
    }} onClick={onClose}>

      <div style={{
        position: 'relative', background: 'var(--bg2)', border: '1px solid var(--bd3)',
        borderRadius: 'var(--r3)', maxWidth: '640px', width: '100%', maxHeight: '88vh',
        overflowY: 'auto', display: 'flex', flexDirection: 'row'
      }} onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{
          position: 'absolute', top: '14px', right: '14px', background: 'var(--bg4)',
          border: '1px solid var(--bd)', borderRadius: '50%', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: 'var(--tx2)', fontSize: '16px', zIndex: 10
        }}>✕</button>

        <div style={{
          flex: 1, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem', borderRadius: 'var(--r3) 0 0 var(--r3)',
          background: product.image ? 'transparent' : (product.gradient || 'var(--bg3)'),
          overflow: 'hidden'
        }}>
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            product.emoji
          )}
        </div>

        <div style={{ flex: 1, padding: '28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '9px', fontFamily: "'Space Mono', monospace", letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--tll)', marginBottom: '8px' }}>
            {product.category}
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--tx)', marginBottom: '10px', lineHeight: 1.25 }}>
            {product.name}
          </h2>
          
          <p style={{ fontSize: '12.5px', color: 'var(--tx2)', lineHeight: 1.7, marginBottom: '14px' }}>
            {product.description || 'Produto oficial Arcadia Merch.'}
          </p>
          
          {/* Tags */}
          {product.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
              {product.tags.map(t => (
                <span key={t} style={{ background: 'var(--bg4)', border: '1px solid var(--bd)', borderRadius: '999px', padding: '2px 9px', fontSize: '10px', color: 'var(--tx3)', fontFamily: "'Space Mono', monospace" }}>
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Stars rating={product.rating || 5} />
            <span style={{ fontSize: '11px', color: 'var(--tx3)' }}>{product.rating} · {product.reviews} avaliações</span>
            {product.available !== false ? (
              <span style={{ fontSize: '10.5px', color: 'var(--tll)', marginLeft: 'auto' }}>✓ Em estoque</span>
            ) : (
              <span style={{ fontSize: '10.5px', color: 'var(--pk)', marginLeft: 'auto' }}>✗ Esgotado</span>
            )}
          </div>

          {product.sizes && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '9.5px', fontFamily: "'Space Mono', monospace", letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--tx3)', marginBottom: '8px' }}>Tamanho</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button 
                    key={s}
                    onClick={() => setActiveSize(s)}
                    style={{
                      background: activeSize === s ? 'var(--violet)' : 'var(--bg4)',
                      border: `1px solid ${activeSize === s ? 'var(--violet)' : 'var(--bd)'}`,
                      borderRadius: 'var(--r2)', padding: '4px 10px', cursor: 'pointer',
                      color: activeSize === s ? '#fff' : 'var(--tx2)', fontSize: '11.5px', transition: '.15s'
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Preço e Botão Adicionar */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--vg)' }}>R${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span style={{ fontSize: '.85rem', color: 'var(--tx3)', textDecoration: 'line-through' }}>R${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            <button 
              onClick={() => addToCart(product)}
              disabled={product.available === false}
              style={{
                width: '100%', background: 'var(--violet)', border: 'none', borderRadius: '999px',
                padding: '11px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: product.available !== false ? 'pointer' : 'not-allowed',
                transition: '.15s', opacity: product.available !== false ? 1 : 0.5
              }}
            >
              {product.available === false ? 'Esgotado' : carted ? '✓ Adicionado ao carrinho' : '✦ Adicionar ao Carrinho'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}