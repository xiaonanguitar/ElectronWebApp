const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory store
let goods = [
  { id: '1', name: '笔记本', price: 5999 },
  { id: '2', name: '鼠标', price: 99 },
  { id: '3', name: '键盘', price: 199 }
];

// GET /api/goods  支持 query: id, name, minPrice, maxPrice
app.get('/api/goods', (req, res) => {
  const { id, name, minPrice, maxPrice } = req.query;
  let result = goods;
  if (id) result = result.filter(g => g.id === id);
  if (name) result = result.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
  if (minPrice) result = result.filter(g => g.price >= Number(minPrice));
  if (maxPrice) result = result.filter(g => g.price <= Number(maxPrice));
  res.json(result);
});

// GET /api/goods/:id
app.get('/api/goods/:id', (req, res) => {
  const g = goods.find(x => x.id === req.params.id);
  if (!g) return res.status(404).json({ message: 'not found' });
  res.json(g);
});

// POST /api/goods {id, name, price}
app.post('/api/goods', (req, res) => {
  const { id, name, price } = req.body;
  if (!id || !name || price === undefined) {
    return res.status(400).json({ message: 'id, name and price are required' });
  }
  if (goods.find(g => g.id === id)) {
    return res.status(409).json({ message: 'id exists' });
  }
  const p = Number(price);
  if (Number.isNaN(p) || p < 0) return res.status(400).json({ message: 'price invalid' });
  const newG = { id, name, price: p };
  goods.push(newG);
  res.status(201).json(newG);
});

// Serve static files when built (production)
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, '../../dist/web');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

function startServer(port = PORT) {
  const server = app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
  return server;
}

// When required by electron main, caller can call startServer();
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
