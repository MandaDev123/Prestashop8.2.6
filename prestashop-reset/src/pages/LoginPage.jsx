import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';

export default function LoginPage() {
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    if (login(user, pass)) { nav('/admin/reset'); }
    else { setError('Identifiants incorrects'); setLoading(false); }
  };

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="login-card">
        <div className="login-card__icon">
          <span className="material-icons-outlined" style={{ fontSize: 32, color: 'var(--accent-light)' }}>admin_panel_settings</span>
        </div>
        <h1 className="login-card__title">Back-Office</h1>
        <p className="login-card__sub">Connectez-vous pour gérer les données PrestaShop</p>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Utilisateur</label>
          <input className="form-input" type="text" value={user} onChange={e => setUser(e.target.value)} />
          <label className="form-label">Mot de passe</label>
          <input className="form-input" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn--primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 16 }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
