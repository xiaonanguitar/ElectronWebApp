import React, { useEffect, useState } from 'react';
import axios from 'axios';

// detect electron runtime (file://) to avoid needing build-time env injection
const isElectron = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
const API_BASE = isElectron ? 'http://localhost:3001' : '';

export default function App() {
  const [goods, setGoods] = useState([]);
  const [query, setQuery] = useState({ id: '', name: '', minPrice: '', maxPrice: '' });
  const [form, setForm] = useState({ id: '', name: '', price: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchGoods();
  }, []);

  async function fetchGoods(params = {}) {
    try {
      const res = await axios.get(API_BASE + '/api/goods', { params });
      setGoods(res.data);
    } catch (e) {
      console.error(e);
      setMsg('获取数据失败');
    }
  }

  async function onSearch(e) {
    e.preventDefault();
    await fetchGoods(query);
  }

  async function onAdd(e) {
    e.preventDefault();
    try {
      await axios.post(API_BASE + '/api/goods', { id: form.id, name: form.name, price: Number(form.price) });
      setMsg('添加成功');
      setForm({ id: '', name: '', price: '' });
      fetchGoods();
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || '添加失败');
    }
  }

  return (
    <div className="container">
      <h1>Sicarrier Platform Tools</h1>

      <section className="card">
        <h2>查询人员</h2>
        <form onSubmit={onSearch} className="form">
          <input placeholder="ID" value={query.id} onChange={e => setQuery({ ...query, id: e.target.value })} />
          <input placeholder="姓名" value={query.name} onChange={e => setQuery({ ...query, name: e.target.value })} />
          <input placeholder="最小工号" value={query.minPrice} onChange={e => setQuery({ ...query, minPrice: e.target.value })} />
          <input placeholder="最大工号" value={query.maxPrice} onChange={e => setQuery({ ...query, maxPrice: e.target.value })} />
          <button type="submit">搜索</button>
        </form>

        <table className="goods-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>工号</th>
            </tr>
          </thead>
          <tbody>
            {goods.map(g => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>{g.name}</td>
                <td>{g.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>添加人员</h2>
        <form onSubmit={onAdd} className="form">
          <input placeholder="ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
          <input placeholder="姓名" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="工号" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <button type="submit">添加</button>
        </form>
        <div className="msg">{msg}</div>
      </section>
    </div>
  );
}
