import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal'; 

export default function Catalog({ category, sort, search }) {
  const { products, loading, error } = useProducts({ category, sort, search });

  const [selectedProduct, setSelectedProduct] = useState(null); 

  if (loading) return <div style={{ color: 'var(--tx2)', textAlign: 'center', marginTop: '40px' }}>Procurando no estoque de Arcadia Bay...</div>;
  if (error) return <div style={{ color: 'var(--pink)', textAlign: 'center', marginTop: '40px' }}>Oops! Erro na conexão: {error}</div>;

  return (
    <div>
      <h2 style={{ color: 'var(--tx)', marginBottom: '24px', fontFamily: "'Playfair Display', serif" }}>
        Catálogo
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {products && products.length > 0 ? (
          products.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onOpenModal={() => setSelectedProduct(p)} 
            />
          ))
        ) : (
          <div style={{ color: 'var(--tx3)', gridColumn: '1 / -1' }}>Nenhum item encontrado com estes filtros.</div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}