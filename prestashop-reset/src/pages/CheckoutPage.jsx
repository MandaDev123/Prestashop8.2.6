import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../contexts';
import { createFullOrder, fetchCountries } from '../psApi';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { apiKey, customer } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ 
    firstname: customer?.firstname || '', 
    lastname: customer?.lastname || '', 
    email: customer?.email || '', 
    phone: '', address: '', city: '', postcode: '', id_country: '8'
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!apiKey) return;
    (async () => {
      const cList = await fetchCountries(apiKey);
      setCountries(cList);
      if (cList.length > 0 && !cList.find(c => c.id === '8')) {
        setForm(p => ({ ...p, id_country: cList[0].id }));
      }
    })();
  }, [apiKey]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.firstname && form.lastname && form.email && form.address && form.city && form.postcode && items.length > 0;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || !apiKey) return;
    setLoading(true); setError('');
    const savedTotal = total; // Save total before clearing
    const r = await createFullOrder(apiKey, form, items);
    setLoading(false);
    if (r.success) { 
      setResult({ ...r, totalPaid: savedTotal }); 
      
      // Le mouvement de stock physique se fera uniquement lors du passage au statut "Livré" dans le Back-Office

      clearCart(); 
    }
    else setError(r.error);
  };

  if (result) return (
    <div className="app front">
      <div className="results-card" style={{ marginTop: 60 }}>
        <div className="results-card__icon results-card__icon--success">
          <span className="material-icons-outlined" style={{ color: 'var(--success)', fontSize: 32 }}>task_alt</span>
        </div>
        <h3 className="results-card__title">Commande confirmée !</h3>
        <p className="results-card__subtitle">Commande #{result.orderId} — Paiement à distance accepté</p>
        <div className="results-stats" style={{ marginTop: 16 }}>
          <div className="results-stat"><div className="results-stat__value">{result.totalPaid.toFixed(2)} €</div><div className="results-stat__label">Total</div></div>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn--primary" onClick={() => nav('/front')}>Continuer mes achats</button>
          <button className="btn btn--ghost" onClick={() => nav('/front/my-orders')}>Voir mes commandes</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app front">
      <header className="front-header">
        <button className="btn-icon" onClick={() => nav('/front/cart')}>
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <h2 style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Validation de commande</h2>
      </header>

      <form className="checkout-form" onSubmit={submit}>
        <div className="checkout-section">
          <h3 className="checkout-section__title">Informations personnelles</h3>
          <div className="form-row">
            <div><label className="form-label">Prénom *</label><input className="form-input" value={form.firstname} onChange={e => set('firstname', e.target.value)} disabled={customer?.id && !customer?.isAnonymous} required /></div>
            <div><label className="form-label">Nom *</label><input className="form-input" value={form.lastname} onChange={e => set('lastname', e.target.value)} disabled={customer?.id && !customer?.isAnonymous} required /></div>
          </div>
          <label className="form-label">Email *</label>
          <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} disabled={customer?.id && !customer?.isAnonymous} required />
          <label className="form-label">Téléphone</label>
          <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} />
        </div>

        <div className="checkout-section">
          <h3 className="checkout-section__title">Adresse de livraison</h3>
          <label className="form-label">Pays *</label>
          <select className="form-input" value={form.id_country} onChange={e => set('id_country', e.target.value)} required>
            {countries.map(c => (
              <option key={c.id} value={c.id}>{c.name?.[0]?.value || c.name || `Pays #${c.id}`}</option>
            ))}
          </select>
          <label className="form-label">Adresse *</label>
          <input className="form-input" value={form.address} onChange={e => set('address', e.target.value)} required />
          <div className="form-row">
            <div><label className="form-label">Ville *</label><input className="form-input" value={form.city} onChange={e => set('city', e.target.value)} required /></div>
            <div><label className="form-label">Code postal *</label><input className="form-input" value={form.postcode} onChange={e => set('postcode', e.target.value)} required /></div>
          </div>
        </div>

        <div className="checkout-section">
          <h3 className="checkout-section__title">Mode de paiement</h3>
          <div className="checkout-payment">
            <span className="material-icons-outlined" style={{ color: 'var(--accent-light)' }}>local_shipping</span>
            <div>
              <strong>Paiement à la livraison</strong>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Pas de frais de livraison</p>
            </div>
          </div>
        </div>

        <div className="cart-total" style={{ marginBottom: 16 }}>
          <span>Total à payer</span>
          <span className="cart-total__value">{total.toFixed(2)} €</span>
        </div>

        {error && <p className="form-error">{error}</p>}
        <button className="btn btn--primary" type="submit" disabled={!valid || loading} style={{ width: '100%' }}>
          {loading ? 'Envoi en cours...' : 'Confirmer la commande'}
        </button>
      </form>
    </div>
  );
}
