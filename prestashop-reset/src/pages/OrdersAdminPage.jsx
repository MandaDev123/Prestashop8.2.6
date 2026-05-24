import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchOrders, fetchCarts, updateOrderStatus, fetchCustomers, fetchProducts, fetchTaxRates } from '../psApi';

const ALL_STATES = [
  { id: 13, label: 'En attente de paiement à la livraison', color: '#854f0b' },
  { id: 2,  label: 'Paiement effectué', color: '#3b6d11' },
  { id: 5,  label: 'Livré', color: '#185fa5' },
  { id: 6,  label: 'Annulé', color: '#888' },
];

const ACTION_STATES = [
  { id: 2, label: 'Paiement effectué', color: '#3b6d11', bg: '#eaf3de' },
  { id: 5, label: 'Livré',             color: '#185fa5', bg: '#e6f1fb' },
  { id: 6, label: 'Annulé',            color: '#888',    bg: '#f7f7f5' },
];

const STATE_BADGE = {
  cart: { color: '#854f0b', bg: '#faeeda' },
  13:   { color: '#854f0b', bg: '#faeeda' },
  2:    { color: '#3b6d11', bg: '#eaf3de' },
  5:    { color: '#185fa5', bg: '#e6f1fb' },
  6:    { color: '#888',    bg: '#f1f1ef' },
};

const styles = `
  .ord-topbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-bottom: 0.5px solid #e5e5e2;
    background: #fff;
    flex-wrap: wrap;
  }
  .ord-topbar-btn {
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
  .ord-topbar-btn:hover { background: rgba(0,0,0,0.04); }
  .ord-topbar-btn.active { background: rgba(0,0,0,0.04); color: #111; font-weight: 500; }
  .ord-topbar-btn.danger { color: #a32d2d; }
  .ord-spacer { flex: 1; }

  .ord-page {
    padding: 28px 24px;
    max-width: 1100px;
    background: #fff;
    min-height: 100vh;
  }
  .ord-page-header { margin-bottom: 24px; }
  .ord-page-header h1 { font-size: 20px; font-weight: 500; margin-bottom: 4px; }
  .ord-page-header p  { font-size: 14px; color: #888; }

  .ord-metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .ord-metric-card {
    background: #f7f7f5;
    border-radius: 8px;
    padding: 16px 20px;
  }
  .ord-metric-card .m-label {
    font-size: 11px;
    font-weight: 500;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
  .ord-metric-card .m-count {
    font-size: 26px;
    font-weight: 500;
    color: #111;
    line-height: 1;
    margin-bottom: 4px;
  }
  .ord-metric-card .m-count span {
    font-size: 14px;
    font-weight: 400;
    color: #aaa;
    margin-left: 4px;
  }
  .ord-metric-card .m-amount {
    font-size: 18px;
    font-weight: 500;
    margin-top: 6px;
  }
  .m-amount.success { color: #3b6d11; }
  .m-amount.info    { color: #185fa5; }

  .ord-section-title {
    font-size: 14px;
    font-weight: 500;
    color: #111;
    margin-bottom: 14px;
  }

  .ord-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    border-bottom: 0.5px solid #e5e5e2;
  }
  .ord-tab {
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
  .ord-tab:hover { color: #111; }
  .ord-tab.active { color: #111; font-weight: 500; border-bottom-color: #111; }
  .ord-tab .material-icons-outlined { font-size: 16px; }

  .ord-refresh-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 0.5px solid #d5d5d2;
    cursor: pointer;
    font-size: 13px;
    color: #555;
    padding: 7px 14px;
    border-radius: 8px;
    margin-top: 16px;
    transition: background 0.15s;
  }
  .ord-refresh-btn:hover { background: #f7f7f5; }
  .ord-refresh-btn .material-icons-outlined { font-size: 16px; }

  .ord-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
    gap: 12px;
  }

  .ord-card {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.15s;
  }
  .ord-card:hover { border-color: #bbb; }
  .ord-card.is-cart { border-color: #fde68a; }
  .ord-card.is-cart:hover { border-color: #fbbf24; }

  .ord-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 0.5px solid #e5e5e2;
    background: #fafafa;
  }
  .ord-card-id {
    font-size: 12px;
    font-weight: 500;
    color: #888;
    font-variant-numeric: tabular-nums;
  }
  .ord-state-badge {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 20px;
  }

  .ord-card-body {
    padding: 14px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
  }
  .ord-field-label {
    font-size: 11px;
    font-weight: 500;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 2px;
  }
  .ord-field-value {
    font-size: 13px;
    font-weight: 500;
    color: #111;
  }
  .ord-field-email {
    font-size: 12px;
    color: #888;
    margin-top: 1px;
  }
  .ord-field-muted {
    font-size: 13px;
    color: #aaa;
  }

  .ord-card-actions {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-top: 0.5px solid #e5e5e2;
    flex-wrap: wrap;
  }
  .ord-action-btn {
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 6px;
    border: 0.5px solid;
    cursor: pointer;
    background: none;
    transition: opacity 0.15s, background 0.15s;
  }
  .ord-action-btn:disabled { opacity: 0.3; cursor: default; }
  .ord-action-btn:not(:disabled):hover { opacity: 0.85; }

  .ord-empty {
    text-align: center;
    padding: 40px;
    color: #aaa;
    font-size: 13px;
  }
  .ord-loading {
    text-align: center;
    padding: 40px;
    color: #aaa;
    font-size: 14px;
  }
`;

export default function OrdersAdminPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [tab, setTab] = useState('orders');

  const load = async () => {
    setLoading(true);
    const [o, c, custs, products, taxRates, combRes] = await Promise.all([
      fetchOrders(apiKey),
      fetchCarts(apiKey),
      fetchCustomers(apiKey),
      fetchProducts(apiKey),
      fetchTaxRates(apiKey),
      fetch(`/ps-api/combinations?ws_key=${apiKey}&display=full&output_format=JSON`).then(r => r.ok ? r.json() : {})
    ]);

    const ordersList = Array.isArray(o) ? o : [];
    const cartsList  = Array.isArray(c) ? c : [];
    const customersList = Array.isArray(custs) ? custs : [];
    const combinationsList = combRes.combinations || [];

    const customerMap = {};
    customersList.forEach(cust => { customerMap[cust.id] = cust; });

    const prodMap = {};
    products.forEach(p => { prodMap[p.id] = p; });

    const combMap = {};
    combinationsList.forEach(cb => { combMap[cb.id] = cb; });

    const getCustomerDetails = (id) => {
      const cust = customerMap[id];
      if (!cust) return { name: `Client #${id}`, email: '' };
      return { name: `${cust.firstname} ${cust.lastname}`, email: cust.email };
    };

    const mappedOrders = ordersList.map(order => {
      const custInfo = getCustomerDetails(order.id_customer);
      return {
        ...order,
        type: 'order',
        date: new Date(order.date_add),
        amount: parseFloat(order.total_paid || 0),
        customerName: custInfo.name,
        customerEmail: custInfo.email
      };
    });

    const orderCartIds = new Set(ordersList.map(ord => String(ord.id_cart)));
    const activeCarts = cartsList.filter(cart => !orderCartIds.has(String(cart.id)));

    const mappedCarts = activeCarts.map(cart => {
      const custInfo = getCustomerDetails(cart.id_customer);
      
      let cartAmount = 0;
      let rows = cart.associations?.cart_rows || [];
      if (!Array.isArray(rows) && rows.id_product) rows = [rows];
      
      for (const row of rows) {
        if (!row.id_product) continue;
        const prod = prodMap[row.id_product];
        if (!prod) continue;

        const basePriceHT = parseFloat(prod.price || 0);
        let impactHT = 0;
        if (row.id_product_attribute && row.id_product_attribute !== '0') {
          const comb = combMap[row.id_product_attribute];
          if (comb) impactHT = parseFloat(comb.price || 0);
        }

        const taxRate = taxRates[prod.id_tax_rules_group] || 0;
        const priceTTC = (basePriceHT + impactHT) * (1 + taxRate / 100);
        
        cartAmount += priceTTC * parseInt(row.quantity || 0, 10);
      }

      return {
        id: cart.id,
        id_customer: cart.id_customer,
        date_add: cart.date_add,
        date: new Date(cart.date_add),
        type: 'cart',
        current_state: 'cart',
        amount: cartAmount,
        payment: 'Non finalisé',
        customerName: custInfo.name,
        customerEmail: custInfo.email
      };
    });

    const combined = [...mappedOrders, ...mappedCarts].sort((a, b) => b.date - a.date);
    setItems(combined);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (item, stateId) => {
    setUpdating(item.id);
    await updateOrderStatus(apiKey, item.id, stateId);

    if (stateId === 5 && item.associations?.order_rows) {
      const rows = Array.isArray(item.associations.order_rows)
        ? item.associations.order_rows
        : [item.associations.order_rows];
      for (const row of rows) {
        try {
          await fetch(`http://localhost/Prestashop/api_stock.php?action=log_sale&ws_key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id_product: parseInt(row.product_id, 10),
              id_product_attribute: parseInt(row.product_attribute_id, 10) || 0,
              qty: parseInt(row.product_quantity, 10)
            })
          });
        } catch (e) { console.error('Erreur log stock', e); }
      }
    }

    await load();
    setUpdating(null);
  };

  const getStateName = (id) => {
    if (id === 'cart') return 'Dans le panier';
    const s = ALL_STATES.find(s => s.id === Number(id));
    return s ? s.label : `État #${id}`;
  };

  const getStateBadge = (id) => {
    const key = id === 'cart' ? 'cart' : Number(id);
    return STATE_BADGE[key] || { color: '#888', bg: '#f1f1ef' };
  };

  const dashboardData = useMemo(() => {
    const orders = items.filter(i => i.type === 'order');
    const validOrders = orders.filter(o => Number(o.current_state) !== 6);
    const totalAmount = validOrders.reduce((sum, o) => sum + o.amount, 0);
    const totalCount = orders.length;

    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.date_add.startsWith(today));
    const validTodayOrders = todayOrders.filter(o => Number(o.current_state) !== 6);
    const todayAmount = validTodayOrders.reduce((sum, o) => sum + o.amount, 0);
    const todayCount = todayOrders.length;

    return { totalAmount, totalCount, todayAmount, todayCount };
  }, [items]);

  const displayedItems = useMemo(() => {
    return items.filter(i => (tab === 'orders' ? i.type === 'order' : i.type === 'cart'));
  }, [items, tab]);

  return (
    <>
      <style>{styles}</style>
      <div style={{ background: '#fff', minHeight: '100vh' }}>

        <div className="ord-topbar">
          <button className="ord-topbar-btn" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
          <button className="ord-topbar-btn" onClick={() => nav('/admin/import')}>Import</button>
          <button className="ord-topbar-btn active">Commandes</button>
          <button className="ord-topbar-btn" onClick={() => nav('/admin/stocks')}>Stocks</button>
          <button className="ord-topbar-btn" onClick={() => nav('/admin/stats')}>Statistiques</button>
          <div className="ord-spacer" />
          <button className="ord-topbar-btn danger" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
        </div>

        <div className="ord-page">
          <div className="ord-page-header">
            <h1>Tableau de bord & Commandes</h1>
            <p>Gérez vos commandes et analysez vos ventes</p>
          </div>

          <div className="ord-metric-grid">
            <div className="ord-metric-card">
              <div className="m-label">Aujourd'hui</div>
              <div className="m-count">{dashboardData.todayCount}<span>commandes</span></div>
              <div className="m-amount success">{dashboardData.todayAmount.toFixed(2)} €</div>
            </div>
            <div className="ord-metric-card">
              <div className="m-label">Total général</div>
              <div className="m-count">{dashboardData.totalCount}<span>commandes</span></div>
              <div className="m-amount info">{dashboardData.totalAmount.toFixed(2)} €</div>
            </div>
          </div>

          <div className="ord-section-title">Liste</div>

          <div className="ord-tabs">
            <button className={`ord-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
              <span className="material-icons-outlined">receipt_long</span>
              Commandes finalisées
            </button>
            <button className={`ord-tab ${tab === 'carts' ? 'active' : ''}`} onClick={() => setTab('carts')}>
              <span className="material-icons-outlined">shopping_cart</span>
              Paniers en cours
            </button>
          </div>

          {loading ? (
            <div className="ord-loading">Chargement...</div>
          ) : displayedItems.length === 0 ? (
            <div className="ord-empty">Aucun élément trouvé.</div>
          ) : (
            <div className="ord-grid">
              {displayedItems.map(item => {
                const badge = getStateBadge(item.current_state);
                const isDelivered = Number(item.current_state) === 5;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className={`ord-card ${item.type === 'cart' ? 'is-cart' : ''}`}
                  >
                    <div className="ord-card-header">
                      <span className="ord-card-id">
                        {item.type === 'cart' ? 'Panier' : 'Commande'} #{item.id}
                      </span>
                      <span
                        className="ord-state-badge"
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {getStateName(item.current_state)}
                      </span>
                    </div>

                    <div className="ord-card-body">
                      <div>
                        <div className="ord-field-label">Client</div>
                        <div className="ord-field-value">{item.customerName}</div>
                        {item.customerEmail && <div className="ord-field-email">{item.customerEmail}</div>}
                      </div>
                      <div>
                        <div className="ord-field-label">{item.type === 'cart' ? 'Total estimé' : 'Total payé'}</div>
                        <div className="ord-field-value">{item.amount.toFixed(2)} €</div>
                      </div>
                      <div>
                        <div className="ord-field-label">Paiement</div>
                        <div className="ord-field-value">{item.payment || '—'}</div>
                      </div>
                      <div>
                        <div className="ord-field-label">Date</div>
                        <div className="ord-field-value" style={{ fontSize: 12, color: '#555' }}>{item.date_add}</div>
                      </div>
                    </div>

                    {item.type === 'order' && (
                      <div className="ord-card-actions">
                        {ACTION_STATES.map(s => (
                          <button
                            key={s.id}
                            className="ord-action-btn"
                            style={{
                              borderColor: s.color,
                              color: s.color,
                              background: Number(item.current_state) === s.id ? s.bg : 'transparent'
                            }}
                            disabled={updating === item.id || Number(item.current_state) === s.id || isDelivered}
                            onClick={() => changeStatus(item, s.id)}
                          >
                            {updating === item.id ? '…' : s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <button className="ord-refresh-btn" onClick={load}>
            <span className="material-icons-outlined">refresh</span>
            Rafraîchir
          </button>
        </div>
      </div>
    </>
  );
}