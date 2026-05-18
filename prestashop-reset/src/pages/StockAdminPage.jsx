import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchProducts, fetchProductCombinations, fetchProductOptionValues } from '../psApi';

export default function StockAdminPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState('add'); // 'add' or 'history'
  
  const [products, setProducts] = useState([]);
  const [combinations, setCombinations] = useState({});
  const [optValues, setOptValues] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Add Stock State
  const [selectedProductStr, setSelectedProductStr] = useState('');
  const [delta, setDelta] = useState('');
  
  // History State
  const [historySelectedProduct, setHistorySelectedProduct] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

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
    
    const cMap = {};
    await Promise.all(pList.map(async (p) => {
      const c = await fetchProductCombinations(apiKey, p.id);
      cMap[p.id] = c;
    }));
    
    setCombinations(cMap);
    setLoading(false);
  };

  const loadHistory = async (id_product) => {
    setLoadingHistory(true);
    try {
      const res = await fetch(`http://localhost/Prestashop/api_stock.php?action=history&ws_key=${apiKey}&id_product=${id_product || ''}`);
      const data = await res.json();
      setHistoryData(data.history || []);
    } catch (e) {
      console.error(e);
    }
    setLoadingHistory(false);
  };

  useEffect(() => {
    if (tab === 'history') {
      loadHistory(historySelectedProduct);
    }
  }, [tab, historySelectedProduct]);

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    if (!selectedProductStr) return alert("Sélectionnez un produit");
    const d = parseInt(delta, 10);
    if (isNaN(d) || d <= 0) return alert("La quantité doit être supérieure à 0");

    const [id_product, id_product_attribute] = selectedProductStr.split('-');
    
    try {
      const res = await fetch(`http://localhost/Prestashop/api_stock.php?action=update&ws_key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_product: parseInt(id_product, 10),
          id_product_attribute: parseInt(id_product_attribute, 10),
          delta: d,
          type: 'Entrée (Arrivages)'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Stock ajouté avec succès !");
        setDelta('');
      } else {
        alert("Erreur: " + data.error);
      }
    } catch (e) {
      alert("Erreur de connexion à l'API");
    }
  };

  const getName = (p) => p.name?.[0]?.value || p.name || `Produit #${p.id}`;

  const renderProductOptions = () => {
    const options = [];
    products.forEach(p => {
      const combs = combinations[p.id] || [];
      const name = getName(p);
      if (combs.length === 0) {
        options.push(<option key={`${p.id}-0`} value={`${p.id}-0`}>{name}</option>);
      } else {
        combs.forEach(c => {
          const vals = c.associations?.product_option_values || [];
          const label = vals.map(v => optValues[v.id]).filter(Boolean).join(' - ');
          options.push(<option key={`${p.id}-${c.id}`} value={`${p.id}-${c.id}`}>{name} ({label})</option>);
        });
      }
    });
    return options;
  };

  // Group history by day and product
  const dailyStats = {};
  historyData.forEach(h => {
    const day = h.date_add.split(' ')[0];
    const key = `${day}_${h.id_product}_${h.id_product_attribute}`;
    
    if (!dailyStats[key]) {
      // Find product name
      const p = products.find(prod => String(prod.id) === String(h.id_product));
      let pName = p ? getName(p) : `Produit #${h.id_product}`;
      if (h.id_product_attribute != 0) {
        // Try to append combination name if we have it
        const cList = combinations[h.id_product] || [];
        const c = cList.find(c => String(c.id) === String(h.id_product_attribute));
        if (c) {
          const vals = c.associations?.product_option_values || [];
          const label = vals.map(v => optValues[v.id]).filter(Boolean).join(' - ');
          if (label) pName += ` (${label})`;
        }
      }

      dailyStats[key] = {
        key,
        date: day,
        productName: pName,
        stock_initial: parseInt(h.stock_initial), // approximated to the oldest entry of the day
        entrees: 0,
        sorties: 0,
        stock_final: parseInt(h.stock_final)
      };
    }
    const d = parseInt(h.delta);
    if (d > 0) dailyStats[key].entrees += d;
    else dailyStats[key].sorties += Math.abs(d);
    
    // Update stock final based on latest entry of the day (history is ordered by date DESC)
    if (!dailyStats[key].encountered) {
      dailyStats[key].stock_final = parseInt(h.stock_final);
      dailyStats[key].encountered = true;
    }
    // Update stock initial based on the oldest entry of the day
    dailyStats[key].stock_initial = parseInt(h.stock_initial);
  });

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Stocks</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={logout} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>

      <div className="header">
        <h1 className="header__title">Gestion des Stocks</h1>
        <p className="header__subtitle">Ajoutez du stock et suivez l'évolution journalière</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button className={`btn ${tab === 'add' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setTab('add')}>
          <span className="material-icons-outlined" style={{ fontSize: 18 }}>add_box</span>
          Ajouter en stock
        </button>
        <button className={`btn ${tab === 'history' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setTab('history')}>
          <span className="material-icons-outlined" style={{ fontSize: 18 }}>trending_up</span>
          Évolution journalière
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement...</div>
      ) : (
        <>
          {tab === 'add' && (
            <div className="results-card" style={{ maxWidth: 500 }}>
              <h3 style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>Entrée de stock</h3>
              <form onSubmit={handleUpdateStock} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="form-label">Produit concerné</label>
                  <select 
                    className="form-input" 
                    value={selectedProductStr} 
                    onChange={e => setSelectedProductStr(e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez un produit...</option>
                    {renderProductOptions()}
                  </select>
                </div>
                <div>
                  <label className="form-label">Quantité à ajouter</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={delta}
                    onChange={e => setDelta(e.target.value)}
                    placeholder="Ex: 50"
                    min="1"
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary" style={{ marginTop: 8 }}>
                  Confirmer l'ajout
                </button>
              </form>
            </div>
          )}

          {tab === 'history' && (
            <div className="results-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 20, borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                <label className="form-label">Filtrer par produit</label>
                <select 
                  className="form-input" 
                  style={{ maxWidth: 400 }}
                  value={historySelectedProduct} 
                  onChange={e => setHistorySelectedProduct(e.target.value)}
                >
                  <option value="">Tous les produits</option>
                  {products.map(p => <option key={p.id} value={p.id}>{getName(p)}</option>)}
                </select>
              </div>

              {loadingHistory ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Chargement de l'historique...</div>
              ) : Object.keys(dailyStats).length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Aucune évolution enregistrée.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
                  <thead style={{ background: 'var(--bg-card)', borderBottom: '2px solid var(--border)' }}>
                    <tr>
                      <th style={{ padding: '16px 20px', fontWeight: 600 }}>Produit</th>
                      <th style={{ padding: '16px 20px', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '16px 20px', fontWeight: 600, textAlign: 'center' }}>Stock Initial</th>
                      <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--success)' }}>Entrées (Arrivages)</th>
                      <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--danger)' }}>Sorties (Ventes)</th>
                      <th style={{ padding: '16px 20px', fontWeight: 600, textAlign: 'center' }}>Stock Final (Soir)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(dailyStats).map((stat, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {stat.productName}
                        </td>
                        <td style={{ padding: '16px 20px', fontWeight: 500 }}>
                          {new Date(stat.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                          {stat.stock_initial}
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--success)', fontWeight: 500 }}>
                          {stat.entrees > 0 ? `+ ${stat.entrees}` : '-'}
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--danger)', fontWeight: 500 }}>
                          {stat.sorties > 0 ? `- ${stat.sorties}` : '-'}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 'bold' }}>
                          <span style={{ 
                            display: 'inline-block', 
                            padding: '4px 12px', 
                            background: stat.stock_final > 0 ? 'var(--success-glow)' : 'var(--danger-glow)',
                            color: stat.stock_final > 0 ? 'var(--success)' : 'var(--danger)',
                            borderRadius: '20px'
                          }}>
                            {stat.stock_final}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
