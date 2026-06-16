import { useState, useEffect, useCallback } from 'react';

const BASE = 'https://arcadiamerch-pweb.onrender.com/api';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'all') params.set('category', filters.category);
      if (filters.sort)     params.set('sort', filters.sort);
      if (filters.search)   params.set('search', filters.search);
      if (filters.featured) params.set('featured', 'true');
      if (filters.badge)    params.set('badge', filters.badge);

      const res  = await fetch(`${BASE}/products?${params}`);
      if (!res.ok) throw new Error('Erro ao carregar produtos');
      const data = await res.json();
      setProducts(data.products);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.sort, filters.search, filters.featured, filters.badge]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { products, loading, error, refetch: fetch_ };
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Produto não encontrado');
  return res.json();
}

export async function submitOrder(payload) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Erro ao finalizar pedido');
  return res.json();
}