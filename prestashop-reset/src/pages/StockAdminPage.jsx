import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchProducts, fetchProductCombinations, fetchProductOptionValues } from '../psApi';

const styles = `
  .stk-topbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-bottom: 0.5px solid #e5e5e2;
    background: #fff;
    flex-wrap: wrap;
  }
  .stk-topbar-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    padding: 6px 12px;
    border-radius: 8px;
    color: #888;
    transition: background 0.15s;
  }
  .stk-topbar-btn:hover { background: rgba(0,0,0,0.04); }
  .stk-topbar-btn.active {
    background: rgba(0,0,0,0.04);
    color: #111;
    font-weight: 500;
  }
  .stk-topbar-btn.danger { color: #a32d2d; }
  .stk-spacer { flex: 1; }

  .stk-page {
    padding: 28px 24px;
    max-width: 1100px;
    background: #fff;
    min-height: 100vh;
  }
  .stk-page-header { margin-bottom: 24px; }
  .stk-page-header h1 { font-size: 20px; font-weight: 500; margin-bottom: 4px; }
  .stk-page-header p { font-size: 14px; color: #888; }

  .stk-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 0.5px solid #e5e5e2;
    padding-bottom: 0;
  }
  .stk-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    padding: 8px 14px;
    color: #888;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    border-radius: 0;
    transition: color 0.15s;
  }
  .stk-tab:hover { color: #111; }
  .stk-tab.active {
    color: #111;
    font-weight: 500;
    border-bottom-color: #111;
  }
  .stk-tab .material-icons-outlined {
    font-size: 16px;
  }

  .stk-form-card {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 12px;
    padding: 24px;
    max-width: 480px;
  }
  .stk-form-card h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .stk-form-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .stk-field { display: flex; flex-direction: column; gap: 6px; }
  .stk-label {
    font-size: 12px;
    font-weight: 500;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .stk-select,
  .stk-input {
    width: 100%;
    padding: 9px 12px;
    font-size: 13px;
    border: 0.5px solid #d5d5d2;
    border-radius: 8px;
    background: #fff;
    color: #111;
    outline: none;
    transition: border-color 0.15s;
    appearance: auto;
  }
  .stk-select:focus,
  .stk-input:focus { border-color: #888; }

  .stk-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #111;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 8px;
    margin-top: 8px;
    transition: background 0.15s;
  }
  .stk-btn-primary:hover { background: #333; }

  .stk-history-card {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 12px;
    overflow: hidden;
  }
  .stk-history-filter {
    padding: 16px 20px;
    border-bottom: 0.5px solid #e5e5e2;
    background: #f7f7f5;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .stk-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .stk-table thead th {
    padding: 10px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
    background: #f7f7f5;
    border-bottom: 0.5px solid #e5e5e2;
    white-space: nowrap;
  }
  .stk-table thead th.center { text-align: center; }
  .stk-table thead th.th-success { color: #3b6d11; }
  .stk-table thead th.th-danger  { color: #a32d2d; }

  .stk-table tbody tr { border-bottom: 0.5px solid #e5e5e2; }
  .stk-table tbody tr:last-child { border-bottom: none; }
  .stk-table tbody tr:hover { background: #fafafa; }
  .stk-table tbody td {
    padding: 13px 20px;
    vertical-align: middle;
    color: #333;
  }
  .stk-table tbody td.center { text-align: center; }
  .stk-table .td-product { font-weight: 500; color: #111; }
  .stk-table .td-date { color: #555; font-size: 13px; }
  .stk-table .td-initial { font-weight: 500; color: #888; text-align: center; }
  .stk-table .td-entree { color: #3b6d11; font-weight: 500; }
  .stk-table .td-sortie { color: #a32d2d; font-weight: 500; }
  .stk-table .td-dash { color: #ccc; }

  .stk-badge {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .stk-badge.ok     { background: #eaf3de; color: #3b6d11; }
  .stk-badge.low    { background: #faeeda; color: #854f0b; }
  .stk-badge.danger { background: #fcebeb; color: #a32d2d; }

  .stk-empty {
    padding: 40px;
    text-align: center;
    color: #aaa;
    font-size: 13px;
  }
  .stk-loading {
    text-align: center;
    padding: 40px;
    color: #aaa;
    font-size: 14px;
  }
`;

export default function StockAdminPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState('add');

  const [products, setProducts] = useState([]);
  const [combinations, setCombinations] = useState({});
  const [optValues, setOptValues] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedProductStr, setSelectedProductStr] = useState('');
  const [delta, setDelta] = useState('');

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
    if (tab === 'history') loadHistory(historySelectedProduct);
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

  const dailyStats = {};
  historyData.forEach(h => {
    const day = h.date_add.split(' ')[0];
    const key = `${day}_${h.id_product}_${h.id_product_attribute}`;

    if (!dailyStats[key]) {
      const p = products.find(prod => String(prod.id) === String(h.id_product));
      let pName = p ? getName(p) : `Produit #${h.id_product}`;
      if (h.id_product_attribute != 0) {
        const cList = combinations[h.id_product] || [];
        const c = cList.find(c => String(c.id) === String(h.id_product_attribute));
        if (c) {
          const vals = c.associations?.product_option_values || [];
          const label = vals.map(v => optValues[v.id]).filter(Boolean).join(' - ');
          if (label) pName += ` (${label})`;
        }
      }
      dailyStats[key] = {
        key, date: day, productName: pName,
        stock_initial: parseInt(h.stock_initial),
        entrees: 0, sorties: 0,
        stock_final: parseInt(h.stock_final)
      };
    }
    const d = parseInt(h.delta);
    if (d > 0) dailyStats[key].entrees += d;
    else dailyStats[key].sorties += Math.abs(d);

    if (!dailyStats[key].encountered) {
      dailyStats[key].stock_final = parseInt(h.stock_final);
      dailyStats[key].encountered = true;
    }
    dailyStats[key].stock_initial = parseInt(h.stock_initial);
  });

  const getFinalBadgeClass = (v) => v > 10 ? 'ok' : v > 0 ? 'low' : 'danger';

  return (
    <>
      <style>{styles}</style>
      <div style={{ background: '#fff', minHeight: '100vh' }}>

        <div className="stk-topbar">
          <button className="stk-topbar-btn" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
          <button className="stk-topbar-btn" onClick={() => nav('/admin/import')}>Import</button>
          <button className="stk-topbar-btn" onClick={() => nav('/admin/orders')}>Commandes</button>
          <button className="stk-topbar-btn active">Stocks</button>
          <button className="stk-topbar-btn" onClick={() => nav('/admin/stats')}>Statistiques</button>
          <div className="stk-spacer" />
          <button className="stk-topbar-btn danger" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
        </div>

        <div className="stk-page">
          <div className="stk-page-header">
            <h1>Gestion des stocks</h1>
            <p>Ajoutez du stock et suivez l'évolution journalière</p>
          </div>

          <div className="stk-tabs">
            <button className={`stk-tab ${tab === 'add' ? 'active' : ''}`} onClick={() => setTab('add')}>
              <span className="material-icons-outlined">add_box</span>
              Ajouter en stock
            </button>
            <button className={`stk-tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>
              <span className="material-icons-outlined">trending_up</span>
              Évolution journalière
            </button>
          </div>

          {loading ? (
            <div className="stk-loading">Chargement...</div>
          ) : (
            <>
              {tab === 'add' && (
                <div className="stk-form-card">
                  <h3>Entrée de stock</h3>
                  <form onSubmit={handleUpdateStock} className="stk-form-group">
                    <div className="stk-field">
                      <label className="stk-label">Produit concerné</label>
                      <select
                        className="stk-select"
                        value={selectedProductStr}
                        onChange={e => setSelectedProductStr(e.target.value)}
                        required
                      >
                        <option value="">Sélectionnez un produit...</option>
                        {renderProductOptions()}
                      </select>
                    </div>
                    <div className="stk-field">
                      <label className="stk-label">Quantité à ajouter</label>
                      <input
                        type="number"
                        className="stk-input"
                        value={delta}
                        onChange={e => setDelta(e.target.value)}
                        placeholder="Ex : 50"
                        min="1"
                        required
                      />
                    </div>
                    <button type="submit" className="stk-btn-primary">
                      Confirmer l'ajout
                    </button>
                  </form>
                </div>
              )}

              {tab === 'history' && (
                <div className="stk-history-card">
                  <div className="stk-history-filter">
                    <label className="stk-label">Filtrer par produit</label>
                    <select
                      className="stk-select"
                      style={{ maxWidth: 380 }}
                      value={historySelectedProduct}
                      onChange={e => setHistorySelectedProduct(e.target.value)}
                    >
                      <option value="">Tous les produits</option>
                      {products.map(p => <option key={p.id} value={p.id}>{getName(p)}</option>)}
                    </select>
                  </div>

                  {loadingHistory ? (
                    <div className="stk-empty">Chargement de l'historique...</div>
                  ) : Object.keys(dailyStats).length === 0 ? (
                    <div className="stk-empty">Aucune évolution enregistrée.</div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="stk-table">
                        <thead>
                          <tr>
                            <th>Produit</th>
                            <th>Date</th>
                            <th className="center">Stock initial</th>
                            <th className="th-success">Entrées</th>
                            <th className="th-danger">Sorties</th>
                            <th className="center">Stock final</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(dailyStats).map((stat, i) => (
                            <tr key={i}>
                              <td className="td-product">{stat.productName}</td>
                              <td className="td-date">
                                {new Date(stat.date).toLocaleDateString('fr-FR', {
                                  weekday: 'long', day: 'numeric',
                                  month: 'long', year: 'numeric'
                                })}
                              </td>
                              <td className="td-initial">{stat.stock_initial}</td>
                              <td className={stat.entrees > 0 ? 'td-entree' : 'td-dash'}>
                                {stat.entrees > 0 ? `+${stat.entrees}` : '—'}
                              </td>
                              <td className={stat.sorties > 0 ? 'td-sortie' : 'td-dash'}>
                                {stat.sorties > 0 ? `−${stat.sorties}` : '—'}
                              </td>
                              <td className="center">
                                <span className={`stk-badge ${getFinalBadgeClass(stat.stock_final)}`}>
                                  {stat.stock_final}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}