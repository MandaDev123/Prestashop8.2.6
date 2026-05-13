import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchOrdersByCustomer } from '../psApi';

const STATE_LABELS = { 1: 'En attente', 2: 'Paiement effectué', 3: 'Préparation', 4: 'Expédié', 5: 'Livré', 6: 'Annulé', 7: 'Remboursé', 8: 'Échec paiement', 13: 'En attente de paiement à la livraison' };
const STATE_COLORS = { 1: '#f59e0b', 2: '#22c55e', 3: '#6366f1', 4: '#3b82f6', 5: '#22c55e', 6: '#64748b', 7: '#8b5cf6', 8: '#ef4444', 13: '#f59e0b' };

export default function MyOrdersPage() {
  const { apiKey, customer, frontLogout } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey || !customer) return;
    (async () => {
      setLoading(true);
      const o = await fetchOrdersByCustomer(apiKey, customer.id);
      setOrders(o);
      setLoading(false);
    })();
  }, [apiKey, customer]);

  const handleLogout = () => {
    frontLogout();
    nav('/');
  };

  return (
    <div className="app front">
      <header className="front-header">
        <button className="btn-icon" onClick={() => nav('/front')}>
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <h2 style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Mes commandes</h2>
        <div className="front-header__actions">
          <button className="btn-icon" onClick={handleLogout} title="Déconnexion">
            <span className="material-icons-outlined" style={{ color: 'var(--danger)' }}>logout</span>
          </button>
        </div>
      </header>

      {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement...</div>}

      {orders !== null && (
        orders.length === 0 ? (
          <div className="results-card"><h3 className="results-card__title">Aucune commande</h3></div>
        ) : (
          <div className="orders-list">
            {orders.map(o => (
              <div key={o.id} className="order-card">
                <div className="order-card__header">
                  <span className="order-card__id">Commande #{o.id}</span>
                  <span className="order-card__state" style={{ color: STATE_COLORS[o.current_state] || 'var(--text-muted)' }}>
                    {STATE_LABELS[o.current_state] || `État #${o.current_state}`}
                  </span>
                </div>
                <div className="order-card__details">
                  <div><span className="order-card__label">Date:</span> {o.date_add}</div>
                  <div><span className="order-card__label">Total:</span> {parseFloat(o.total_paid).toFixed(2)} €</div>
                  <div><span className="order-card__label">Paiement:</span> {o.payment}</div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
