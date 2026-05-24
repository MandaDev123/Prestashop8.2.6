import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchOrdersByCustomer, duplicateOrderWithMultiplier } from '../psApi';

const STATE_LABELS = { 1: 'En attente', 2: 'Paiement effectué', 3: 'Préparation', 4: 'Expédié', 5: 'Livré', 6: 'Annulé', 7: 'Remboursé', 8: 'Échec paiement', 13: 'En attente de paiement à la livraison' };
const STATE_COLORS = { 1: '#f59e0b', 2: '#22c55e', 3: '#6366f1', 4: '#3b82f6', 5: '#22c55e', 6: '#64748b', 7: '#8b5cf6', 8: '#ef4444', 13: '#f59e0b' };

export default function MyOrdersPage() {
  const { apiKey, customer, frontLogout } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [multipliers, setMultipliers] = useState({});
  const [dupLoading, setDupLoading] = useState(false);

  const handleDuplicate = async (originalOrder, factor) => {
    if (!window.confirm(`Confirmez-vous la duplication de la commande #${originalOrder.id} avec des quantités multipliées par ${factor} ?`)) return;
    
    setDupLoading(true);
    const res = await duplicateOrderWithMultiplier(apiKey, originalOrder, factor);
    
    if (res.success) {
      if (res.warning) {
        alert(`Commande #${res.orderId} créée, mais : ${res.warning}`);
      } else {
        alert(`Succès ! La commande #${res.orderId} a été créée au statut Livré.`);
      }
      // Refresh the orders list
      const o = await fetchOrdersByCustomer(apiKey, customer.id);
      setOrders(o);
    } else {
      alert("Erreur lors de la duplication : " + res.error);
    }
    setDupLoading(false);
  };

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
                
                <div className="order-card__actions" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Multiplier qté:</span>
                  <input
                    type="number"
                    min="1"
                    value={multipliers[o.id] || 1}
                    onChange={(e) => setMultipliers({ ...multipliers, [o.id]: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                    style={{ width: 60, padding: '4px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
                    disabled={dupLoading}
                  />
                  <button
                    className="btn-action"
                    style={{ padding: '6px 12px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    onClick={() => handleDuplicate(o, multipliers[o.id] || 1)}
                    disabled={dupLoading}
                  >
                    <span className="material-icons-outlined" style={{ fontSize: 16 }}>content_copy</span> Dupliquer & Livrer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
