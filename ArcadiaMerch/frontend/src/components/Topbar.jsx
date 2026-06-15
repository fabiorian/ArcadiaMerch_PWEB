import React from 'react';
import { useStore } from '../context/StoreContext';

const s = {
  bar: { display:'flex',alignItems:'center',height:'52px',background:'var(--bg2)',borderBottom:'1px solid var(--bd)',position:'sticky',top:0,zIndex:50 },
  brand: { display:'flex',alignItems:'center',gap:'10px',padding:'0 20px',borderRight:'1px solid var(--bd)',height:'100%',minWidth:'220px',cursor:'pointer',flexShrink:0 },
  logo: { fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:'var(--violet-glow)' },
  logoSpan: { color:'var(--amber)', fontStyle:'italic' },
  badge: { background:'var(--violet-d)',color:'var(--violet-glow)',fontSize:'9px',fontFamily:"'Space Mono',monospace",letterSpacing:'.1em',padding:'2px 7px',borderRadius:'999px',textTransform:'uppercase' },
  center: { flex:1,display:'flex',alignItems:'center',padding:'0 20px',gap:'12px' },
  searchWrap: { flex:1,maxWidth:'480px',position:'relative' },
  searchIcon: { position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'var(--tx3)',fontSize:'14px' },
  searchInput: { width:'100%',background:'var(--bg3)',border:'1px solid var(--bd)',borderRadius:'999px',padding:'7px 14px 7px 36px',color:'var(--tx)',fontFamily:"'Inter',sans-serif",fontSize:'13px',outline:'none' },
  nav: { display:'flex',gap:'4px' },
  navBtn: (active) => ({ background: active ? 'var(--bg4)' : 'none',border:'none',color: active ? 'var(--tx)' : 'var(--tx2)',padding:'6px 14px',borderRadius:'999px',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontSize:'12.5px',fontWeight:500,transition:'.15s' }),
  right: { display:'flex',alignItems:'center',gap:'8px',padding:'0 16px',borderLeft:'1px solid var(--bd)',marginLeft:'auto' },
  themeBtn: { background:'none',border:'1px solid var(--bd)',borderRadius:'var(--r2)',padding:'0 10px',height:'34px',cursor:'pointer',color:'var(--tx3)',fontSize:'11px',fontFamily:"'Space Mono',monospace",transition:'.15s',whiteSpace:'nowrap' },
  wishBtn: { background:'none',border:'1px solid var(--bd)',borderRadius:'var(--r2)',width:'34px',height:'34px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'var(--tx2)',fontSize:'16px',transition:'.15s',position:'relative' },
  wishPill: { position:'absolute',top:'-4px',right:'-4px',background:'var(--pink)',color:'#fff',borderRadius:'50%',width:'14px',height:'14px',fontSize:'9px',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' },
  cartBtn: { background:'var(--violet)',border:'none',borderRadius:'var(--r2)',height:'34px',padding:'0 14px',display:'flex',alignItems:'center',gap:'7px',cursor:'pointer',color:'#fff',fontSize:'12.5px',fontWeight:600,fontFamily:"'Inter',sans-serif",transition:'.15s' },
  cartPill: { background:'rgba(255,255,255,.2)',borderRadius:'999px',minWidth:'18px',height:'18px',fontSize:'10px',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 5px' }
};

// Aqui as props recebem a função onToggleCart
export default function Topbar({ page, onNav, onSearch, search, onToggleCart }) {
  const { cartCount, wishlist, toggleTheme, theme } = useStore();

  return (
    <div style={s.bar}>
      <div style={s.brand} onClick={() => onNav('home')}>
        <div style={s.logo}>Arcadia <span style={s.logoSpan}>Merch</span></div>
        <span style={s.badge}>Official</span>
      </div>

      <div style={s.center}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>🔍</span>
          <input
            style={s.searchInput}
            type="text"
            placeholder="Buscar produtos, categorias..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <nav style={s.nav}>
          {['home','catalog','about'].map(p => (
            <button key={p} style={s.navBtn(page === p)} onClick={() => onNav(p)}>
              {p === 'home' ? 'Home' : p === 'catalog' ? 'Catálogo' : 'Sobre'}
            </button>
          ))}
        </nav>
      </div>

      <div style={s.right}>
        <button style={s.themeBtn} onClick={toggleTheme}>
          {theme === 'dark' ? '☀ Claro' : '☾ Escuro'}
        </button>
        <button style={s.wishBtn} onClick={() => onNav('wishlist')}>
          🤍 {wishlist.length > 0 && <span style={s.wishPill}>{wishlist.length}</span>}
        </button>
        {/* O botão avisa o App que o carrinho precisa abrir */}
        <button style={s.cartBtn} onClick={onToggleCart}>
          🛒 Carrinho
          <span style={s.cartPill}>{cartCount}</span>
        </button>
      </div>
    </div>
  );
}