import React from 'react';
import { useStore } from '../context/StoreContext';

function Stars({ rating }) {
  return (
    <span style={{color:'var(--amber)',fontSize:'.72rem',letterSpacing:'1px'}}>
      {[1,2,3,4,5].map(i =>
        i <= Math.floor(rating) ? '★' : i - rating < 1 ? '⯨' : '☆'
      ).join('')}
    </span>
  );
}

const BADGE_STYLES = {
  hot:      { background:'#ec4899', color:'#fff' },
  new:      { background:'#0891b2', color:'#fff' },
  featured: { background:'#f59e0b', color:'#1a0a2e' },
  sale:     { background:'#7c3aed', color:'#fff' },
};
const BADGE_LABELS = { hot:'🔥 Hot', new:'✦ New', featured:'⭐ Destaque', sale:'🏷️ Sale' };

export default function ProductCard({ product, onOpenModal }) {
  const { addToCart, toggleWish, inWishlist, inCart } = useStore();
  const [hovered, setHovered] = React.useState(false);
  const wished = inWishlist(product.id);
  const carted = inCart(product.id);

  const card = {
    background:'var(--bg3)',border:`1px solid ${hovered ? 'var(--bd3)' : 'var(--bd)'}`,
    borderRadius:'var(--r)',overflow:'hidden',cursor:'pointer',
    transform: hovered ? 'translateY(-3px)' : 'none',
    transition:'.2s',boxShadow: hovered ? '0 8px 24px rgba(124,58,237,.12)' : 'none',
  };

  return (
    <article
      style={card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenModal(product)}
      aria-label={`Produto: ${product.name}`}
    >
      {/* Image area atualizada */}
      <div style={{position:'relative',aspectRatio:'1',overflow:'hidden'}}>
        <div style={{
          width:'100%',height:'100%',display:'flex',alignItems:'center',
          justifyContent:'center',fontSize:'2.5rem',
          // Se tiver imagem, o fundo fica transparente. Se não, usa o degradê antigo.
          background: product.image ? 'transparent' : product.gradient,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition:'.3s',
        }}>
          {/* Lógica condicional: Se existir product.image, renderiza a tag <img> */}
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

        {/* Badge */}
        {product.badge && (
          <span style={{
            position:'absolute',top:'8px',left:'8px',
            fontSize:'9px',fontWeight:700,letterSpacing:'.1em',
            textTransform:'uppercase',padding:'3px 8px',borderRadius:'999px',
            ...BADGE_STYLES[product.badge],
          }}>
            {BADGE_LABELS[product.badge]}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); toggleWish(product); }}
          aria-label={wished ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          style={{
            position:'absolute',top:'8px',right:'8px',
            background: wished ? 'rgba(236,72,153,.3)' : 'rgba(12,9,23,.6)',
            border:'none',borderRadius:'50%',width:'28px',height:'28px',
            display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',fontSize:'.85rem',backdropFilter:'blur(4px)',
            transition:'.15s',
          }}
        >
          {wished ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Body */}
      <div style={{padding:'12px'}}>
        <div style={{fontSize:'9px',fontFamily:"'Space Mono',monospace",letterSpacing:'.15em',textTransform:'uppercase',color:'var(--tx3)',marginBottom:'4px'}}>
          {product.category}
        </div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'.9rem',fontWeight:700,marginBottom:'6px',color:'var(--tx)',lineHeight:1.3}}>
          {product.name}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'10px'}}>
          <Stars rating={product.rating} />
          <span style={{fontSize:'10px',color:'var(--tx3)'}}>({product.reviews})</span>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <span style={{fontSize:'1rem',fontWeight:700,color:'var(--violet-glow)'}}>
              R${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span style={{fontSize:'.75rem',color:'var(--tx3)',textDecoration:'line-through',marginLeft:'4px'}}>
                R${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              if (!product.sizes && !product.colors) {
                addToCart(product);
              } else {
                onOpenModal(product);
              }
            }}
            disabled={!product.available}
            aria-label={carted ? 'Já no carrinho' : 'Adicionar ao carrinho'}
            style={{
              background: carted ? 'var(--bg5)' : 'var(--violet)',
              border: carted ? '1px solid var(--bd3)' : 'none',
              borderRadius:'999px',padding:'5px 12px',
              color: carted ? 'var(--violet-glow)' : '#fff',
              fontSize:'11px',fontWeight:600,cursor: product.available ? 'pointer' : 'not-allowed',
              transition:'.15s',fontFamily:"'Inter',sans-serif",whiteSpace:'nowrap',
              opacity: product.available ? 1 : .5,
            }}
          >
            {!product.available ? 'Esgotado' : carted ? '✓ Adicionado' : '+ Carrinho'}
          </button>
        </div>
      </div>
    </article>
  );
}