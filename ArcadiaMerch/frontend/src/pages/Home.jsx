import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

export default function Home({ onNav }) {
  const { products } = useProducts();

  const featuredProducts = products?.filter(p => p.featured) || [];
  const bestSellers = products?.filter(p => p.badge === 'hot' || p.reviews > 200).slice(0, 4) || [];
  const newArrivals = products?.filter(p => p.badge === 'new').slice(0, 4) || [];

  return (
    <div className="page-home">
      
      {/* ── HERO DESKTOP ── */}
      <div className="hero-desktop">
        <div>
          <div className="hero-eyebrow">— Arcadia Bay · Life Is Strange · Coleção Oficial —</div>
          <h1 className="hero-title">O tempo parou.<br/><em>A coleção,</em> <strong>não.</strong></h1>
          <p className="hero-sub">Merchandise oficial inspirado na série mais emotiva dos games. Cada peça conta uma história — a sua.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => onNav('catalog')}>✦ Explorar Catálogo</button>
            <button className="btn-ghost" onClick={() => onNav('about')}>Nossa História</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-num">16+</div><div className="hero-stat-label">Produtos</div></div>
            <div className="hero-stat"><div class="hero-stat-num">12k</div><div className="hero-stat-label">Fãs</div></div>
            <div className="hero-stat"><div class="hero-stat-num">4.8★</div><div className="hero-stat-label">Avaliação</div></div>
            <div className="hero-stat"><div class="hero-stat-num">Grátis</div><div className="hero-stat-label">Frete</div></div>
          </div>
        </div>

        {/* 4 Cards menores no canto do Hero */}
        <div className="hero-visual">
          {featuredProducts.slice(0, 4).map(p => (
            <div key={p.id} className="hero-mini-card" onClick={() => onNav('catalog')}>
              <div className="hmc-emoji">
                {p.image ? <img src={p.image} alt={p.name} /> : p.emoji}
              </div>
              <div className="hmc-name">{p.name}</div>
              <div className="hmc-price">R${p.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BANNER MARQUEE ── */}
      <div className="banner-strip">
        <div className="banner-text">
          ✦ A escolha é sua — mas o tempo não volta &nbsp;✦&nbsp; Life Is Strange Official Merch &nbsp;✦&nbsp; Novidades da Arcadia Bay &nbsp;✦&nbsp; Frete grátis em todo o Brasil &nbsp;✦&nbsp; Edições limitadas disponíveis &nbsp;✦&nbsp; A escolha é sua — mas o tempo não volta &nbsp;✦&nbsp; Life Is Strange Official Merch &nbsp;✦&nbsp; Novidades da Arcadia Bay &nbsp;✦&nbsp;
        </div>
      </div>

      {/* ── CARDS EM DESTAQUE (FEAT ROW) ── */}
      <div className="sec-hd">
        <h2 className="sec-title">Em <span>Destaque</span></h2>
        <span className="sec-link" onClick={() => onNav('catalog')}>Ver tudo →</span>
      </div>
      <div className="featured-row">
        {featuredProducts.slice(0, 3).map(p => (
          <div key={p.id} className="feat-card" style={{ background: p.gradient || 'var(--bg3)' }} onClick={() => onNav('catalog')}>
            <div className="feat-bg">
              {p.image ? <img src={p.image} alt={p.name} /> : p.emoji}
            </div>
            <div className="feat-overlay"></div>
            <div className="feat-content">
              <div className="feat-tag">{p.category}</div>
              <div className="feat-title">{p.name}</div>
              <div className="feat-price">R${p.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIS VENDIDOS ── */}
      {bestSellers.length > 0 && (
        <>
          <div className="sec-hd">
            <h2 className="sec-title">Mais <span>Vendidos</span></h2>
            <span className="sec-link" onClick={() => onNav('catalog')}>Ver tudo →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {bestSellers.map(p => <ProductCard key={p.id} product={p} onOpenModal={() => onNav('catalog')} />)}
          </div>
        </>
      )}

      {/* ── NOVIDADES ── */}
      {newArrivals.length > 0 && (
        <>
          <div className="sec-hd">
            <h2 className="sec-title"><span>Novidades</span></h2>
            <span className="sec-link" onClick={() => onNav('catalog')}>Ver tudo →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} onOpenModal={() => onNav('catalog')} />)}
          </div>
        </>
      )}

      {/* ── RODAPÉ ── */}
      <div className="main-footer">
        <div className="footer-grid">
          <div>
            <div className="ft-brand-name">Arcadia <span>Merch</span></div>
            <p className="ft-brand-p">Merchandise oficial inspirado em Life Is Strange. Cada peça é uma escolha. Cada escolha, uma memória.</p>
          </div>
          <div className="ft-col">
            <div className="ft-col-h">Loja</div>
            <a onClick={() => onNav('catalog')}>Catálogo</a>
          </div>
          <div class="ft-col">
            <div className="ft-col-h">Sobre</div>
            <a onClick={() => onNav('about')}>Nossa História</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Arcadia Merch — Fan Store inspirada em Life Is Strange</span>
          <span style={{ color: 'var(--vg)' }}>✦ A escolha é sua ✦</span>
        </div>
      </div>

    </div>
  );
}