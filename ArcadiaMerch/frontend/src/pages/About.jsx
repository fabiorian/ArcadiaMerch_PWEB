import React from 'react';

export default function About() {
  return (
    <div className="page-about">
      
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', color: 'var(--tx)' }}>
          Sobre a <span style={{ color: 'var(--vg)', fontStyle: 'italic' }}>Arcadia Merch</span>
        </h1>
      </div>

      <div className="about-wrap">

        <div className="about-card">
          <div className="about-emoji">🦋</div>
          <h2 className="about-h">Nossa <em>história</em></h2>
          <p className="about-p">
            Somos uma loja oficial de merchandise da série Life Is Strange. Cada produto é criado com cuidado para capturar a essência emocional da franquia — nostalgia, amizade, escolhas e consequências.
          </p>
          <p className="about-p">
            Nossa coleção celebra Max, Chloe, Arcadia Bay e todos os momentos que nos fizeram pausar, respirar, e sentir. Cada peça é um fragmento de memória que você pode levar com você.
          </p>
          <div className="about-quote">"A vida é estranha. Mas nós amamos assim."</div>
        </div>

        <div>
          <div className="about-stats">
            <div className="about-stat">
              <div className="as-num">16+</div>
              <div className="as-label">Produtos</div>
            </div>
            <div className="about-stat">
              <div className="as-num" style={{ color: 'var(--am)' }}>12k</div>
              <div className="as-label">Fãs</div>
            </div>
            <div className="about-stat">
              <div className="as-num" style={{ color: 'var(--pkl)' }}>4.8★</div>
              <div className="as-label">Nota</div>
            </div>
          </div>

          <div className="af-item">
            <span className="af-icon">🚚</span>
            <span className="af-text"><strong>Frete grátis</strong> para todo o Brasil em pedidos acima de R$80</span>
          </div>
          <div className="af-item">
            <span className="af-icon">✦</span>
            <span className="af-text"><strong>Produtos exclusivos</strong> — artes criadas especialmente para a série</span>
          </div>
          <div className="af-item">
            <span className="af-icon">🔄</span>
            <span className="af-text"><strong>Troca garantida</strong> em até 30 dias sem perguntas</span>
          </div>
          <div className="af-item">
            <span className="af-icon">🎁</span>
            <span className="af-text"><strong>Embalagem premium</strong> com caixa temática de Arcadia Bay</span>
          </div>
        </div>

      </div>
    </div>
  );
}