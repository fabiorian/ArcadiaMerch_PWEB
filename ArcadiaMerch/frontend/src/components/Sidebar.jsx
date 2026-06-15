import React from 'react';
import { useStore } from '../context/StoreContext';

const CATS = [
  { key: 'all',          label: 'Todos',          count: 18 },
  { key: 'camisetas',    label: 'Camisetas',       count: 2 },
  { key: 'moletons',     label: 'Moletons',        count: 2 },
  { key: 'acessórios',   label: 'Acessórios',      count: 7 },
  { key: 'colecionáveis',label: 'Colecionáveis',   count: 5 },
  { key: 'digital',      label: 'Digital',         count: 2 },
];

const SORTS = [
  { key: 'featured',    label: 'Destaque' },
  { key: 'price-asc',  label: 'Menor preço' },
  { key: 'price-desc', label: 'Maior preço' },
  { key: 'name',       label: 'Nome A–Z' },
  { key: 'rating',     label: 'Mais avaliados' },
];

const NAV_ITEMS = [
  { key: 'home',     icon: '🏠', label: 'Home' },
  { key: 'catalog',  icon: '🛍️', label: 'Catálogo' },
  { key: 'wishlist', icon: '🤍', label: 'Favoritos' },
  { key: 'about',    icon: '✦',  label: 'Sobre' },
];

export default function Sidebar({ page, onNav, category, onCategory, sort, onSort }) {
  const { wishlist } = useStore();

  const sectionLabel = {
    fontSize:'9.5px',fontFamily:"'Space Mono',monospace",
    letterSpacing:'.18em',textTransform:'uppercase',color:'var(--tx4)',
    padding:'16px 12px 8px',display:'block',
  };
  const item = (active) => ({
    display:'flex',alignItems:'center',gap:'10px',padding:'8px 14px',
    borderRadius:'var(--r2)',cursor:'pointer',transition:'.15s',
    color: active ? 'var(--violet-glow)' : 'var(--tx2)',
    background: active ? 'var(--bg5)' : 'transparent',
    fontSize:'13px',fontWeight:500,margin:'1px 6px',
    border:'none',width:'calc(100% - 12px)',fontFamily:"'Inter',sans-serif",
    textAlign:'left',
  });
  const badge = {
    marginLeft:'auto',background:'var(--violet)',color:'#fff',
    borderRadius:'999px',minWidth:'18px',height:'18px',
    fontSize:'10px',fontWeight:700,display:'flex',alignItems:'center',
    justifyContent:'center',padding:'0 5px',
  };
  const divider = { height:'1px',background:'var(--bd)',margin:'8px 16px' };
  const filterSec = { padding:'12px 14px' };
  const filterLabel = {
    fontSize:'9.5px',fontFamily:"'Space Mono',monospace",letterSpacing:'.15em',
    textTransform:'uppercase',color:'var(--tx4)',marginBottom:'10px',display:'block',
  };
  const catBtn = (active) => ({
    display:'flex',alignItems:'center',justifyContent:'space-between',
    padding:'7px 10px',borderRadius:'var(--r2)',cursor:'pointer',
    color: active ? 'var(--violet-glow)' : 'var(--tx2)',
    background: active ? 'var(--bg4)' : 'transparent',
    fontSize:'12.5px',transition:'.15s',border:'none',
    width:'100%',fontFamily:"'Inter',sans-serif",
  });
  const catCount = {
    fontSize:'10px',color:'var(--tx4)',background:'var(--bg4)',
    borderRadius:'999px',padding:'1px 7px',
  };
  const sortBtn = (active) => ({
    display:'flex',alignItems:'center',gap:'8px',padding:'6px 10px',
    borderRadius:'var(--r2)',cursor:'pointer',
    color: active ? 'var(--violet-glow)' : 'var(--tx2)',
    background: active ? 'var(--bg4)' : 'transparent',
    fontSize:'12px',transition:'.15s',border:'none',
    width:'100%',fontFamily:"'Inter',sans-serif",
  });
  const dot = (active) => ({
    width:'7px',height:'7px',borderRadius:'50%',flexShrink:0,
    background: active ? 'var(--violet-glow)' : 'transparent',
    border: `1.5px solid ${active ? 'var(--violet-glow)' : 'var(--tx4)'}`,
  });

  return (
    <aside style={{
      background:'var(--bg2)',borderRight:'1px solid var(--bd)',
      display:'flex',flexDirection:'column',overflow:'auto',
    }} aria-label="Menu lateral">
      
      {/* Navigation */}
      <span style={sectionLabel}>Navegação</span>
      {NAV_ITEMS.map(n => (
        <button key={n.key} style={item(page === n.key)} onClick={() => onNav(n.key)}
          aria-current={page === n.key ? 'page' : undefined}>
          {n.icon} {n.label}
          {n.key === 'wishlist' && wishlist.length > 0 &&
            <span style={badge}>{wishlist.length}</span>}
          {n.key === 'catalog' && <span style={badge}>18</span>}
        </button>
      ))}

      {/* Catalog filters */}
      {page === 'catalog' && (
        <>
          <div style={divider} />
          <div style={filterSec}>
            <span style={filterLabel}>Categoria</span>
            {CATS.map(c => (
              <button key={c.key} style={catBtn(category === c.key)}
                onClick={() => onCategory(c.key)}>
                {c.label}
                <span style={catCount}>{c.count}</span>
              </button>
            ))}
          </div>
          <div style={divider} />
          <div style={filterSec}>
            <span style={{...filterLabel, marginTop:'6px'}}>Ordenar por</span>
            {SORTS.map(s => (
              <button key={s.key} style={sortBtn(sort === s.key)}
                onClick={() => onSort(s.key)}>
                <span style={dot(sort === s.key)} />
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Bottom profile */}
      <div style={{flex:1}} />
      <div style={{padding:'14px',borderTop:'1px solid var(--bd)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{
            width:'34px',height:'34px',borderRadius:'50%',
            background:'linear-gradient(135deg,var(--violet),var(--pink))',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0,
          }}>M</div>
          <div>
            <div style={{fontSize:'12.5px',fontWeight:600,color:'var(--tx)'}}>Max Caulfield</div>
            <div style={{fontSize:'10.5px',color:'var(--tx3)'}}>Membro desde 2013</div>
          </div>
        </div>
      </div>
    </aside>
  );
}