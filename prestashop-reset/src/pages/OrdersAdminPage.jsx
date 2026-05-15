import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchOrders, fetchCarts, updateOrderStatus, fetchCustomers } from '../psApi';

const ALL_STATES = [
  { id: 13, label: 'En attente de paiement à la livraison', color: '#f59e0b' },
  { id: 2, label: 'Paiement effectué', color: '#22c55e' },
  { id: 6, label: 'Annulé', color: '#64748b' },
];

const ACTION_STATES = [
  { id: 2, label: 'Paiement effectué', color: '#22c55e' },
  { id: 6, label: 'Annulé', color: '#64748b' },
];

export default function OrdersAdminPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const load = async () => { 
    setLoading(true); 
    const [o, c, custs] = await Promise.all([
      fetchOrders(apiKey),
      fetchCarts(apiKey),
      fetchCustomers(apiKey)
    ]);
    
    const ordersList = Array.isArray(o) ? o : [];
    const cartsList = Array.isArray(c) ? c : [];
    const customersList = Array.isArray(custs) ? custs : [];

    const customerMap = {};
    customersList.forEach(cust => {
      customerMap[cust.id] = cust;
    });

    const getCustomerDetails = (id) => {
      const cust = customerMap[id];
      if (!cust) return { name: `Client #${id}`, email: '' };
      return { name: `${cust.firstname} ${cust.lastname}`, email: cust.email };
    };

    // Map orders
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

    // Find carts that are NOT converted to orders
    const orderCartIds = new Set(ordersList.map(ord => String(ord.id_cart)));
    const activeCarts = cartsList.filter(cart => !orderCartIds.has(String(cart.id)));

    // Map carts
    const mappedCarts = activeCarts.map(cart => {
      const custInfo = getCustomerDetails(cart.id_customer);
      return {
        id: cart.id,
        id_customer: cart.id_customer,
        date_add: cart.date_add,
        date: new Date(cart.date_add),
        type: 'cart',
        current_state: 'cart',
        amount: 0, 
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

  const changeStatus = async (orderId, stateId) => {
    setUpdating(orderId);
    await updateOrderStatus(apiKey, orderId, stateId);
    await load();
    setUpdating(null);
  };

  const getStateName = (id) => {
    if (id === 'cart') return 'Dans le panier';
    const s = ALL_STATES.find(s => s.id === Number(id));
    return s ? s.label : `État #${id}`;
  };

  const getStateColor = (id) => {
    if (id === 'cart') return '#eab308'; // yellow/orange
    const s = ALL_STATES.find(s => s.id === Number(id));
    return s ? s.color : 'var(--text-muted)';
  };

  const dashboardData = useMemo(() => {
    const orders = items.filter(i => i.type === 'order');
    const totalAmount = orders.reduce((sum, o) => sum + o.amount, 0);
    const totalCount = orders.length;

    // Per day stats
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.date_add.startsWith(today));
    const todayAmount = todayOrders.reduce((sum, o) => sum + o.amount, 0);
    const todayCount = todayOrders.length;

    return { totalAmount, totalCount, todayAmount, todayCount };
  }, [items]);

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link topbar-link--right" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
      </div>
      
      <header className="header" style={{ marginBottom: 24 }}>
        <h1 className="header__title">Tableau de bord & Commandes</h1>
        <p className="header__subtitle">Gérez vos commandes et analysez vos ventes</p>
      </header>

      {/* Dashboard Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <div className="category-card" style={{ padding: 24, cursor: 'default' }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>Aujourd'hui</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--text)' }}>{dashboardData.todayCount} <span style={{ fontSize: 16, fontWeight: 'normal', color: 'var(--text-muted)' }}>commandes</span></div>
          <div style={{ fontSize: 24, fontWeight: '600', color: 'var(--success)', marginTop: 8 }}>{dashboardData.todayAmount.toFixed(2)} €</div>
        </div>
        <div className="category-card" style={{ padding: 24, cursor: 'default' }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>Total Général</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--text)' }}>{dashboardData.totalCount} <span style={{ fontSize: 16, fontWeight: 'normal', color: 'var(--text-muted)' }}>commandes</span></div>
          <div style={{ fontSize: 24, fontWeight: '600', color: 'var(--primary)', marginTop: 8 }}>{dashboardData.totalAmount.toFixed(2)} €</div>
        </div>
      </div>

      {/* Orders Section */}
      <h2 style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>Liste des commandes & paniers</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement...</div>
      ) : items.length === 0 ? (
        <div className="results-card"><h3 className="results-card__title">Aucune commande ou panier</h3></div>
      ) : (
        <div className="orders-list">
          {items.map(item => (
            <div key={`${item.type}-${item.id}`} className="order-card" style={{ borderColor: item.type === 'cart' ? '#fef08a' : 'var(--border)' }}>
              <div className="order-card__header">
                <span className="order-card__id">{item.type === 'cart' ? 'Panier' : 'Cmd'} #{item.id}</span>
                <span className="order-card__state" style={{ color: getStateColor(item.current_state), fontWeight: 'bold' }}>
                  {getStateName(item.current_state)}
                </span>
              </div>
              <div className="order-card__details" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <span className="order-card__label">Client:</span> <strong style={{ color: 'var(--text)' }}>{item.customerName}</strong>
                  {item.customerEmail && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{item.customerEmail}</div>}
                </div>
                <div><span className="order-card__label">{item.type === 'cart' ? 'Total estimé:' : 'Total payé:'}</span> {item.type === 'cart' ? '-' : <strong style={{ color: 'var(--text)' }}>{item.amount.toFixed(2)} €</strong>}</div>
                <div><span className="order-card__label">Paiement:</span> {item.payment}</div>
                <div><span className="order-card__label">Date:</span> {item.date_add}</div>
              </div>
              {item.type === 'order' && (
                <div className="order-card__actions">
                  {ACTION_STATES.map(s => (
                    <button key={s.id} className="btn-state" style={{ borderColor: s.color, color: s.color }}
                      disabled={updating === item.id || Number(item.current_state) === s.id}
                      onClick={() => changeStatus(item.id, s.id)}>
                      {updating === item.id ? '...' : s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="btn btn--ghost" onClick={load} style={{ marginTop: 16 }}>
        <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span> Rafraîchir
      </button>
    </div>
  );
}
