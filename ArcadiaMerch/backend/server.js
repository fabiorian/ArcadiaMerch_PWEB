const express = require('express');
const cors = require('cors');
const { products } = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── GET /api/products ──────────────────────────────────────
// Query params: category, sort, search, featured, badge
app.get('/api/products', (req, res) => {
  const { category, sort, search, featured, badge } = req.query;

  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }
  if (featured === 'true') {
    result = result.filter(p => p.featured);
  }
  if (badge) {
    result = result.filter(p => p.badge === badge);
  }
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  res.json({ total: result.length, products: result });
});

// ── GET /api/products/:id ──────────────────────────────────
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
});

// ── GET /api/categories ────────────────────────────────────
app.get('/api/categories', (req, res) => {
  const cats = {};
  products.forEach(p => {
    cats[p.category] = (cats[p.category] || 0) + 1;
  });
  res.json(cats);
});

// ── POST /api/orders (simulated checkout) ─────────────────
app.post('/api/orders', (req, res) => {
  const { items, customer } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Carrinho vazio' });
  }
  const order = {
    id: `ARC-${Date.now()}`,
    items,
    customer,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  console.log('✅ Novo pedido:', order.id, '— Total: R$' + order.total.toFixed(2));
  res.status(201).json({ success: true, order });
});

app.get('/', (req, res) => {
  res.json({ message: '🦋 Arcadia Merch API running', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`\n🦋 Arcadia Merch API rodando em http://localhost:${PORT}`);
  console.log(`   Produtos carregados: ${products.length}\n`);
});