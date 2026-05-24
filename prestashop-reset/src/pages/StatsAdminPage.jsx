import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';

const styles = `
  .stats-topbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-bottom: 0.5px solid var(--color-border-tertiary, #e5e5e5);
    background: #fff;
    flex-wrap: wrap;
  }
  .stats-topbar-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    padding: 6px 12px;
    border-radius: 8px;
    color: var(--text-muted, #888);
    transition: background 0.15s;
  }
  .stats-topbar-btn:hover { background: rgba(0,0,0,0.04); }
  .stats-topbar-btn.active {
    background: rgba(0,0,0,0.04);
    color: var(--text-primary, #111);
    font-weight: 500;
  }
  .stats-topbar-btn.danger { color: var(--danger, #e24b4a); }
  .stats-spacer { flex: 1; }

  .stats-page {
    padding: 28px 24px;
    max-width: 1100px;
    background: #fff;
    min-height: 100vh;
  }
  .stats-page-header { margin-bottom: 28px; }
  .stats-page-header h1 { font-size: 20px; font-weight: 500; margin-bottom: 4px; }
  .stats-page-header p { font-size: 14px; color: var(--text-muted, #888); }

  .stats-metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .stats-metric-card {
    background: #f7f7f5;
    border-radius: 8px;
    padding: 16px 20px;
  }
  .stats-metric-card .s-label {
    font-size: 11px;
    font-weight: 500;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
  }
  .stats-metric-card .s-value {
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 6px;
  }
  .stats-metric-card .s-sub {
    font-size: 12px;
    color: #aaa;
  }
  .s-value.s-success { color: #3b6d11; }
  .s-value.s-danger  { color: #a32d2d; }

  .stats-tables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 16px;
    align-items: start;
  }

  .stats-table-card {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 12px;
    overflow: hidden;
  }
  .stats-table-card-header {
    padding: 16px 20px 14px;
    border-bottom: 0.5px solid #e5e5e2;
  }
  .stats-table-card-header h3 {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  }

  .stats-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .stats-table thead th {
    padding: 10px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
    background: #f7f7f5;
    border-bottom: 0.5px solid #e5e5e2;
  }
  .stats-table thead th.right { text-align: right; }
  .stats-table tbody tr { border-bottom: 0.5px solid #e5e5e2; }
  .stats-table tbody tr:last-child { border-bottom: none; }
  .stats-table tbody tr:hover { background: #fafafa; }
  .stats-table tbody td {
    padding: 11px 20px;
    vertical-align: middle;
  }
  .stats-table tbody td.right { text-align: right; }
  .stats-table .s-cat-name { font-weight: 500; }

  .s-badge {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 20px;
  }
  .s-badge.success { background: #eaf3de; color: #3b6d11; }
  .s-badge.danger  { background: #fcebeb; color: #a32d2d; }
  .s-badge.info    { background: #e6f1fb; color: #185fa5; }

  .s-dispo { font-weight: 500; }
  .s-dispo.low  { color: #a32d2d; }
  .s-dispo.ok   { color: #3b6d11; }
  .s-dispo.zero { color: #aaa; }
`;

export default function StatsAdminPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) return;
    (async () => {
      try {
        const [oRes, pRes, cRes, sRes] = await Promise.all([
          fetch(`/ps-api/orders?ws_key=${apiKey}&display=full&output_format=JSON`).then(r => r.ok ? r.json() : {}),
          fetch(`/ps-api/products?ws_key=${apiKey}&display=full&output_format=JSON`).then(r => r.ok ? r.json() : {}),
          fetch(`/ps-api/categories?ws_key=${apiKey}&display=full&output_format=JSON`).then(r => r.ok ? r.json() : {}),
          fetch(`/ps-api/stock_availables?ws_key=${apiKey}&display=full&output_format=JSON`).then(r => r.ok ? r.json() : {})
        ]);

        const orders = oRes.orders || [];
        const products = pRes.products || [];
        const categories = cRes.categories || [];
        const stocks = sRes.stock_availables || [];

        const catMap = {};
        categories.forEach(c => {
          catMap[c.id] = c.name?.[0]?.value || c.name || `Cat #${c.id}`;
        });

        const prodMap = {};
        products.forEach(p => {
          prodMap[p.id] = {
            catId: p.id_category_default,
            catName: catMap[p.id_category_default] || 'Autre',
            wholesale_price: parseFloat(p.wholesale_price || 0)
          };
        });

        let total_sales = 0;
        let total_purchases = 0;
        const catStats = {};

        orders.forEach(o => {
          const state = String(o.current_state);
          const isValidSale = ['2', '11', '5'].includes(state);
          const isReserved = ['2', '11'].includes(state);

          if (isValidSale) {
            total_sales += parseFloat(o.total_products || 0);
          }

          const rows = o.associations?.order_rows || [];
          rows.forEach(r => {
            const pId = r.product_id;
            const pInfo = prodMap[pId] || { catName: 'Autre', wholesale_price: 0 };
            const qty = parseInt(r.product_quantity || 0, 10);

            if (!catStats[pInfo.catName]) {
              catStats[pInfo.catName] = { sales: 0, purchases: 0, reserve: 0, dispo: 0 };
            }

            if (isValidSale) {
              const rowCost = pInfo.wholesale_price * qty;
              total_purchases += rowCost;
              catStats[pInfo.catName].purchases += rowCost;
              catStats[pInfo.catName].sales += parseFloat(r.unit_price_tax_excl || 0) * qty;
            }

            if (isReserved) {
              catStats[pInfo.catName].reserve += qty;
            }
          });
        });

        stocks.forEach(s => {
          if (s.id_product_attribute !== '0') return;
          const pId = s.id_product;
          if (pId === '0') return;
          const pInfo = prodMap[pId] || { catName: 'Autre' };
          if (!catStats[pInfo.catName]) {
            catStats[pInfo.catName] = { sales: 0, purchases: 0, reserve: 0, dispo: 0 };
          }
          catStats[pInfo.catName].dispo += parseInt(s.quantity || 0, 10);
        });

        const profit_by_category = Object.entries(catStats)
          .filter(([_, d]) => d.sales > 0 || d.purchases > 0)
          .map(([category, d]) => ({
            category,
            sales: d.sales,
            purchases: d.purchases,
            profit: d.sales - d.purchases
          }));

        const stock_by_category = Object.entries(catStats)
          .filter(([_, d]) => d.reserve > 0 || d.dispo > 0)
          .map(([category, d]) => ({
            category,
            reserve: d.reserve,
            dispo: d.dispo,
            physique: d.reserve + d.dispo
          }));

        setStats({ total_sales, total_purchases, profit_by_category, stock_by_category });
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch stats', e);
        setLoading(false);
      }
    })();
  }, [apiKey]);

  const profit = stats ? stats.total_sales - stats.total_purchases : 0;

  return (
    <>
      <style>{styles}</style>
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <div className="stats-topbar">
          <button className="stats-topbar-btn" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
          <button className="stats-topbar-btn" onClick={() => nav('/admin/import')}>Import</button>
          <button className="stats-topbar-btn" onClick={() => nav('/admin/orders')}>Commandes</button>
          <button className="stats-topbar-btn" onClick={() => nav('/admin/stocks')}>Stocks</button>
          <button className="stats-topbar-btn active">Statistiques</button>
          <div className="stats-spacer" />
          <button className="stats-topbar-btn danger" onClick={logout}>Déconnexion</button>
        </div>

        <div className="stats-page">
          <div className="stats-page-header">
            <h1>Statistiques</h1>
            <p>Vue d'ensemble des performances et des stocks par catégorie</p>
          </div>

          {loading || !stats ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#aaa', fontSize: 14 }}>
              Chargement...
            </div>
          ) : (
            <>
              <div className="stats-metric-grid">
                <div className="stats-metric-card">
                  <div className="s-label">Montant total des ventes</div>
                  <div className="s-value s-success">{stats.total_sales.toFixed(2)} €</div>
                  <div className="s-sub">Commandes payées ou livrées (HT)</div>
                </div>
                <div className="stats-metric-card">
                  <div className="s-label">Montant total d'achat</div>
                  <div className="s-value s-danger">{stats.total_purchases.toFixed(2)} €</div>
                  <div className="s-sub">Coût fournisseur des commandes</div>
                </div>
                <div className="stats-metric-card">
                  <div className="s-label">Bénéfice net</div>
                  <div className={`s-value ${profit >= 0 ? 's-success' : 's-danger'}`}>
                    {profit > 0 ? '+' : ''}{profit.toFixed(2)} €
                  </div>
                  <div className="s-sub">Marge brute HT</div>
                </div>
              </div>

              <div className="stats-tables-grid">
                <div className="stats-table-card">
                  <div className="stats-table-card-header">
                    <h3>Bénéfice par catégorie (HT)</h3>
                  </div>
                  {stats.profit_by_category.length === 0 ? (
                    <div style={{ padding: '20px', color: '#aaa', fontSize: 13 }}>Aucun bénéfice enregistré.</div>
                  ) : (
                    <table className="stats-table">
                      <thead>
                        <tr>
                          <th>Catégorie</th>
                          <th className="right">Ventes HT</th>
                          <th className="right">Coût</th>
                          <th className="right">Bénéfice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.profit_by_category.map((cat, i) => (
                          <tr key={i}>
                            <td className="s-cat-name">{cat.category}</td>
                            <td className="right">{cat.sales.toFixed(2)} €</td>
                            <td className="right">{cat.purchases.toFixed(2)} €</td>
                            <td className="right">
                              <span className={`s-badge ${cat.profit >= 0 ? 'success' : 'danger'}`}>
                                {cat.profit > 0 ? '+' : ''}{cat.profit.toFixed(2)} €
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="stats-table-card">
                  <div className="stats-table-card-header">
                    <h3>État des stocks par catégorie</h3>
                  </div>
                  {stats.stock_by_category.length === 0 ? (
                    <div style={{ padding: '20px', color: '#aaa', fontSize: 13 }}>Aucun stock enregistré.</div>
                  ) : (
                    <table className="stats-table">
                      <thead>
                        <tr>
                          <th>Catégorie</th>
                          <th className="right">Physique</th>
                          <th className="right">Réservé</th>
                          <th className="right">Disponible</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.stock_by_category.map((cat, i) => (
                          <tr key={i}>
                            <td className="s-cat-name">{cat.category}</td>
                            <td className="right" style={{ fontWeight: 500 }}>{cat.physique}</td>
                            <td className="right">
                              {cat.reserve > 0
                                ? <span className="s-badge info">{cat.reserve}</span>
                                : <span style={{ color: '#aaa' }}>0</span>
                              }
                            </td>
                            <td className="right">
                              <span className={`s-dispo ${cat.dispo > 10 ? 'ok' : cat.dispo > 0 ? 'low' : 'zero'}`}>
                                {cat.dispo}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}