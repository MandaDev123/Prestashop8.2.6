import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchProducts, fetchStockAvailables, updateStockAvailable, fetchProductCombinations, fetchProductOptionValues } from '../psApi';

export default function StockAdminPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState({});
  const [combinations, setCombinations] = useState({});
  const [optValues, setOptValues] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Stock History from localStorage
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('stock_history') || '[]'); } catch { return []; }
  });

  const [selectedProduct, setSelectedProduct] = useState(null); // for evolution chart

  useEffect(() => {
    if (!apiKey) return;
    loadData();
  }, [apiKey]);

  const loadData = async () => {
    setLoading(true);
    const [pList, optVals] = await Promise.all([
      fetchProducts(apiKey),
      fetchProductOptionValues(apiKey)
    ]);
    
    setProducts(pList);
    
    const oMap = {};
    optVals.forEach(o => oMap[o.id] = o.name?.[0]?.value || o.name);
    setOptValues(oMap);
    
    // Fetch combinations and stock for each product
    const cMap = {};
    const sMap = {};
    await Promise.all(pList.map(async (p) => {
      const [c, s] = await Promise.all([
        fetchProductCombinations(apiKey, p.id),
        fetchStockAvailables(apiKey, p.id)
      ]);
      cMap[p.id] = c;
      s.forEach(stk => {
        sMap[`${p.id}-${stk.id_product_attribute}`] = stk;
      });
    }));
    
    setCombinations(cMap);
    setStocks(sMap);
    setLoading(false);
  };

  const logHistory = (productId, combId, oldQty, newQty, productName) => {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      productId,
      combId,
      productName,
      oldQty: parseInt(oldQty, 10),
      newQty: parseInt(newQty, 10),
      diff: parseInt(newQty, 10) - parseInt(oldQty, 10)
    };
    const newHist = [entry, ...history];
    setHistory(newHist);
    localStorage.setItem('stock_history', JSON.stringify(newHist));
  };

  const handleUpdateStock = async (stockObj, newQtyStr, productName) => {
    const newQty = parseInt(newQtyStr, 10);
    if (isNaN(newQty) || newQty < 0) return alert('Quantité invalide');
    if (newQty === parseInt(stockObj.quantity, 10)) return;
    
    const updated = { ...stockObj, quantity: newQty.toString() };
    const ok = await updateStockAvailable(apiKey, updated);
    if (ok) {
      logHistory(stockObj.id_product, stockObj.id_product_attribute, stockObj.quantity, newQty, productName);
      setStocks(prev => ({ ...prev, [`${stockObj.id_product}-${stockObj.id_product_attribute}`]: updated }));
    } else {
      alert('Erreur lors de la mise à jour du stock');
    }
  };

  const getName = (p) => p.name?.[0]?.value || p.name || `Produit #${p.id}`;

  const renderStockRow = (productId, combId, productName, label) => {
    const key = `${productId}-${combId}`;
    const stk = stocks[key];
    if (!stk) return null;
    return (
      <tr key={key}>
        <td style={{ padding: '12px' }}>{productName}</td>
        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{label}</td>
        <td style={{ padding: '12px' }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '4px 8px', 
            background: parseInt(stk.quantity) > 0 ? 'var(--success-glow)' : 'var(--danger-glow)',
            color: parseInt(stk.quantity) > 0 ? 'var(--success)' : 'var(--danger)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'bold'
          }}>
            {stk.quantity}
          </span>
        </td>
        <td style={{ padding: '12px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input 
              type="number" 
              className="form-input" 
              style={{ width: 100, padding: '4px 8px' }}
              defaultValue={stk.quantity} 
              id={`qty-${key}`}
            />
            <button 
              className="btn btn--primary" 
              style={{ padding: '4px 12px', fontSize: 13 }}
              onClick={() => {
                const val = document.getElementById(`qty-${key}`).value;
                handleUpdateStock(stk, val, productName + (label ? ` - ${label}` : ''));
              }}
            >
              Mettre à jour
            </button>
          </div>
        </td>
      </tr>
    );
  };

  // Evolution chart logic
  const filteredHistory = selectedProduct ? history.filter(h => h.productId === String(selectedProduct)) : history;
  
  // Group history by day
  const dailyStats = {};
  filteredHistory.forEach(h => {
    const day = h.date.split('T')[0];
    if (!dailyStats[day]) dailyStats[day] = [];
    dailyStats[day].push(h);
  });

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin')}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import / Export</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Gestion des Stocks</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={logout} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>

      <div className="header">
        <h1 className="header__title">Gestion des Stocks</h1>
        <p className="header__subtitle">Ajoutez ou modifiez les quantités de vos produits</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement des stocks...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24, alignItems: 'start' }}>
          
          {/* LEFT: STOCK TABLE */}
          <div className="results-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
              <thead style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Produit</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Déclinaison</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Stock actuel</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const combs = combinations[p.id] || [];
                  const name = getName(p);
                  if (combs.length === 0) {
                    return renderStockRow(p.id, '0', name, '-');
                  } else {
                    return combs.map(c => {
                      const vals = c.associations?.product_option_values || [];
                      const label = vals.map(v => optValues[v.id]).filter(Boolean).join(' - ');
                      return renderStockRow(p.id, c.id, name, label);
                    });
                  }
                })}
              </tbody>
            </table>
          </div>

          {/* RIGHT: EVOLUTION TABLE */}
          <div className="results-card">
            <h3 style={{ fontSize: 16, marginBottom: 16, fontWeight: 600 }}>Évolution du stock</h3>
            
            <select 
              className="form-input" 
              style={{ marginBottom: 16, width: '100%' }}
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(e.target.value || null)}
            >
              <option value="">Tous les produits</option>
              {products.map(p => <option key={p.id} value={p.id}>{getName(p)}</option>)}
            </select>

            {Object.keys(dailyStats).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Aucun mouvement enregistré.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {Object.entries(dailyStats).sort((a, b) => b[0].localeCompare(a[0])).map(([day, records]) => (
                  <div key={day}>
                    <div style={{ fontSize: 12, fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: 8, borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                      {new Date(day).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {records.map(r => (
                        <div key={r.id} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: 6 }}>
                          <div>
                            <div style={{ fontWeight: 500 }}>{r.productName}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                              {new Date(r.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ color: r.diff > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                              {r.diff > 0 ? '+' : ''}{r.diff}
                            </span>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                              {r.oldQty} → {r.newQty}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
