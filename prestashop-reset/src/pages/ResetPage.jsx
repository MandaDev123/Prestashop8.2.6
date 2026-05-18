import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchAllIds, deleteIds, ALL_RESET_RESOURCES, fetchCustomerIdsExceptAnonymous, fetchCategoryIdsExceptSystem } from '../psApi';

export default function ResetPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [phase, setPhase] = useState('idle'); // 'idle' | 'running' | 'done'
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  const exec = async () => {
    setShowModal(false); setConfirmText(''); setPhase('running'); setLogs([]); setProgress(0);
    const add = l => setLogs(p => [...p, l]);
    let proc = 0, totDel = 0, totErr = 0;
    const total = ALL_RESET_RESOURCES.length;

    for (const r of ALL_RESET_RESOURCES) {
      try {
        let ids;
        if (r === 'customers') {
          // Special: keep "Anonymous" user
          add({ icon: 'working', text: `${r} — filtrage (exclusion Anonymous)...` });
          ids = await fetchCustomerIdsExceptAnonymous(apiKey);
        } else if (r === 'categories') {
          // Special: keep Root (#1) and Home (#2)
          add({ icon: 'working', text: `${r} — filtrage (exclusion Root/Accueil)...` });
          ids = await fetchCategoryIdsExceptSystem(apiKey);
        } else {
          ids = await fetchAllIds(apiKey, r);
        }

        if (!ids.length) {
          add({ icon: 'success', text: `${r} — vide`, count: '0' });
        } else {
          const res = await deleteIds(apiKey, r, ids);
          totDel += res.deleted;
          if (res.errors.length) {
            totErr += res.errors.length;
            res.errors.forEach(e => add({ icon: 'error', text: e }));
          }
          add({ icon: res.errors.length ? 'error' : 'success', text: r, count: `${res.deleted} supprimés` });
        }
      } catch (e) {
        totErr++;
        add({ icon: 'error', text: `${r} — ${e.message}` });
      }
      proc++;
      setProgress(Math.round((proc / total) * 100));
    }

    setProgress(100);
    setResults({ totalDeleted: totDel, totalErrors: totErr });
    setPhase('done');
  };

  const reset = () => { setPhase('idle'); setLogs([]); setProgress(0); setResults(null); };

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link topbar-link--right" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
      </div>

      <header className="header">
        <h1 className="header__title">Réinitialisation</h1>
        <p className="header__subtitle">Suppression complète de toutes les données (produits, commandes, clients, paniers…)</p>
      </header>

      {phase === 'idle' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '40px 0' }}>
          <div className="results-card" style={{ maxWidth: 560, textAlign: 'center', padding: 32 }}>
            <span className="material-icons-outlined" style={{ fontSize: 56, color: 'var(--danger)', marginBottom: 16 }}>warning_amber</span>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>Réinitialisation complète</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>
              Cette action va <strong>supprimer définitivement</strong> toutes les données suivantes :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0', textAlign: 'left' }}>
              {[
                { icon: 'inventory_2', label: 'Produits & déclinaisons' },
                { icon: 'category', label: 'Catégories' },
                { icon: 'receipt_long', label: 'Commandes & paiements' },
                { icon: 'shopping_cart', label: 'Paniers' },
                { icon: 'people', label: 'Clients & adresses' },
                { icon: 'local_offer', label: 'Prix spécifiques' },
                { icon: 'visibility_off', label: 'Visiteurs anonymes' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(239,68,68,0.06)', borderRadius: 10, border: '1px solid rgba(239,68,68,0.12)' }}>
                  <span className="material-icons-outlined" style={{ fontSize: 20, color: 'var(--danger)' }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
              ))}
            </div>
            
            <button className="btn btn--danger" style={{ width: '100%', padding: '14px 0', fontSize: 15 }} onClick={() => setShowModal(true)}>
              <span className="material-icons-outlined" style={{ fontSize: 20 }}>delete_forever</span>
              Tout réinitialiser
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal__title">Confirmer la réinitialisation</h2>
            <p className="modal__text">Action irréversible. Tapez <code>REINITIALISER</code> pour confirmer.</p>
            <input className="modal__input" value={confirmText} onChange={e => setConfirmText(e.target.value)} autoFocus placeholder="REINITIALISER" />
            <div className="modal__actions">
              <button className="btn btn--ghost" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn btn--danger" disabled={confirmText !== 'REINITIALISER'} onClick={exec}>Supprimer tout</button>
            </div>
          </div>
        </div>
      )}

      {(phase === 'running' || phase === 'done') && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-header__title">{phase === 'running' ? 'Réinitialisation en cours...' : 'Réinitialisation terminée'}</span>
            <span className="progress-header__percent">{progress}%</span>
          </div>
          <div className="progress-bar"><div className={`progress-bar__fill ${phase === 'done' ? 'progress-bar__fill--done' : ''}`} style={{ width: `${progress}%` }} /></div>
          <div className="progress-log">
            {logs.map((l, i) => (
              <div key={i} className="log-entry">
                <span className={`material-icons-outlined log-entry__icon log-entry__icon--${l.icon}`}>{l.icon === 'success' ? 'check_circle' : l.icon === 'error' ? 'error' : 'sync'}</span>
                <span className="log-entry__text">{l.text}</span>
                {l.count && <span className="log-entry__count">{l.count}</span>}
              </div>
            ))}
          </div>
          {phase === 'done' && results && (
            <div className="results-card">
              <div className="results-card__icon" style={{ fontSize: 48, marginBottom: 12, color: results.totalErrors === 0 ? 'var(--success)' : 'var(--danger)' }}>
                <span className="material-icons-outlined">{results.totalErrors === 0 ? 'check_circle' : 'warning'}</span>
              </div>
              <h3 className="results-card__title">{results.totalErrors === 0 ? 'Réinitialisation réussie !' : 'Terminé avec erreurs'}</h3>
              <div className="results-stats">
                <div className="results-stat"><div className="results-stat__value">{results.totalDeleted}</div><div className="results-stat__label">Supprimés</div></div>
                <div className="results-stat"><div className="results-stat__value" style={{ color: 'var(--danger)' }}>{results.totalErrors}</div><div className="results-stat__label">Erreurs</div></div>
              </div>
              <button className="btn btn--success" onClick={reset} style={{ marginTop: 20 }}>Retour</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
