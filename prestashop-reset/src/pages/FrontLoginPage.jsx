import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchCustomers } from '../psApi';

export default function FrontLoginPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { apiKey, frontLogin } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!apiKey) {
      setError('Veuillez d\'abord configurer la clé API dans le Back-Office.');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const custs = await fetchCustomers(apiKey);
        setCustomers(Array.isArray(custs) ? custs : []);
      } catch (err) {
        setError('Erreur lors du chargement des clients.');
      } finally {
        setLoading(false);
      }
    })();
  }, [apiKey]);

  const handleLogin = (customer) => {
    frontLogin(customer);
    nav('/front');
  };

  const handleAnonymous = () => {
    frontLogin({ id: null, isAnonymous: true, firstname: 'Visiteur', lastname: 'Anonyme', email: '' });
    nav('/front');
  };

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <div style={{ maxWidth: 800, width: '100%', padding: 20 }}>
        <button className="btn-icon" onClick={() => nav('/')} style={{ marginBottom: 24 }}>
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <h1 className="header__title" style={{ textAlign: 'left', marginBottom: 8 }}>Qui êtes-vous ?</h1>
        <p className="header__subtitle" style={{ textAlign: 'left', marginBottom: 32 }}>Choisissez un compte client pour accéder à la boutique.</p>

        {error && <div className="form-error" style={{ marginBottom: 24 }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
          {/* Option Anonyme */}
          <div className="category-card" onClick={handleAnonymous} style={{ borderColor: 'var(--text-muted)' }}>
            <div className="category-card__icon" style={{ background: 'var(--bg-secondary)' }}>
              <span className="material-icons-outlined" style={{ color: 'var(--text-muted)' }}>no_accounts</span>
            </div>
            <div className="category-card__content">
              <div className="category-card__title">Visiteur Anonyme</div>
              <div className="category-card__desc">Commander sans compte</div>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: 20, color: 'var(--text-muted)' }}>Chargement des clients...</div>
          ) : (
            customers.map(c => (
              <div key={c.id} className="category-card" onClick={() => handleLogin(c)} style={{ borderColor: 'var(--border)' }}>
                <div className="category-card__icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                  <span className="material-icons-outlined" style={{ color: 'var(--success)' }}>person</span>
                </div>
                <div className="category-card__content">
                  <div className="category-card__title">{c.firstname} {c.lastname}</div>
                  <div className="category-card__desc">{c.email}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
