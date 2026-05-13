import { useNavigate } from 'react-router-dom';

export default function EntryPage() {
  const nav = useNavigate();

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <h1 className="header__title" style={{ marginBottom: 32 }}>Sélectionnez l'interface</h1>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div className="login-card" style={{ cursor: 'pointer', transition: 'var(--transition)' }} onClick={() => nav('/front/login')}>
          <div className="login-card__icon">
            <span className="material-icons-outlined" style={{ fontSize: 32, color: 'var(--success)' }}>storefront</span>
          </div>
          <h2 className="login-card__title">Front-Office</h2>
          <p className="login-card__sub" style={{ marginBottom: 0 }}>Accéder à la boutique, commander des produits, voir le panier</p>
        </div>
        <div className="login-card" style={{ cursor: 'pointer', transition: 'var(--transition)' }} onClick={() => nav('/login')}>
          <div className="login-card__icon">
            <span className="material-icons-outlined" style={{ fontSize: 32, color: 'var(--accent-light)' }}>admin_panel_settings</span>
          </div>
          <h2 className="login-card__title">Back-Office</h2>
          <p className="login-card__sub" style={{ marginBottom: 0 }}>Gérer les commandes, importer des données, réinitialiser</p>
        </div>
      </div>
    </div>
  );
}
