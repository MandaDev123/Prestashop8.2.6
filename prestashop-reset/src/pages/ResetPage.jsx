import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchAllIds, deleteIds, RESET_CATEGORIES } from '../psApi';

export default function ResetPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [selected, setSelected] = useState(new Set());
  const [counts, setCounts] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [phase, setPhase] = useState('select');
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  const loadCounts = async () => {
    const c = {};
    for (const [k, cat] of Object.entries(RESET_CATEGORIES)) {
      let t = 0;
      for (const res of cat.resources) { try { t += (await fetchAllIds(apiKey, res)).length; } catch {} }
      c[k] = t;
    }
    setCounts(c); setLoaded(true);
  };
  if (!loaded) loadCounts();

  const toggle = useCallback((k) => {
    if (phase !== 'select') return;
    setSelected(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  }, [phase]);

  const totalSel = [...selected].reduce((s, k) => s + (counts[k] || 0), 0);

  const exec = async () => {
    setShowModal(false); setConfirmText(''); setPhase('running'); setLogs([]); setProgress(0);
    const keys = [...selected];
    let allRes = []; keys.forEach(k => allRes.push(...RESET_CATEGORIES[k].resources));
    let proc = 0, totDel = 0, totErr = 0;
    const add = l => setLogs(p => [...p, l]);
    for (const ck of keys) {
      const cat = RESET_CATEGORIES[ck];
      add({ icon: 'working', text: `── ${cat.label} ──` });
      for (const r of cat.resources) {
        try {
          const ids = await fetchAllIds(apiKey, r);
          if (!ids.length) { add({ icon: 'success', text: `${r} — vide`, count: '0' }); }
          else {
            const res = await deleteIds(apiKey, r, ids);
            totDel += res.deleted;
            if (res.errors.length) { totErr += res.errors.length; res.errors.forEach(e => add({ icon: 'error', text: e })); }
            add({ icon: res.errors.length ? 'error' : 'success', text: r, count: `${res.deleted} supprimés` });
          }
        } catch (e) { totErr++; add({ icon: 'error', text: `${r} — ${e.message}` }); }
        proc++; setProgress(Math.round((proc / allRes.length) * 100));
      }
    }
    setProgress(100); setResults({ totalDeleted: totDel, totalErrors: totErr }); setPhase('done');
  };

  const reset = () => { setPhase('select'); setSelected(new Set()); setLogs([]); setProgress(0); setResults(null); loadCounts(); };

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link topbar-link--right" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
      </div>
      <header className="header">
        <h1 className="header__title">Réinitialisation</h1>
        <p className="header__subtitle">Purge ciblée via l'API Webservice native PrestaShop</p>
      </header>

      {phase === 'select' && (
        <>
          <div className="categories">
            {Object.entries(RESET_CATEGORIES).map(([k, cat]) => (
              <div key={k} className={`category-card ${selected.has(k) ? 'category-card--selected' : ''}`} onClick={() => toggle(k)}>
                <div className="category-card__check"><span className="material-icons-outlined">check</span></div>
                <div className="category-card__icon"><span className="material-icons-outlined">{cat.icon}</span></div>
                <div className="category-card__content">
                  <div className="category-card__title">{cat.label}</div>
                  <div className="category-card__desc">{cat.description}</div>
                </div>
                <div className="category-card__stats">
                  <div className="category-card__rows">{(counts[k] || 0).toLocaleString('fr-FR')}</div>
                  <div className="category-card__tables">{cat.resources.length} ressources</div>
                </div>
              </div>
            ))}
          </div>
          <div className="actions">
            <button className="btn btn--danger" disabled={!selected.size} onClick={() => setShowModal(true)}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>delete_forever</span>
              Réinitialiser ({totalSel})
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal__title">Confirmer la réinitialisation</h2>
            <p className="modal__text">Action irréversible. Tapez <code>REINITIALISER</code> pour confirmer.</p>
            <input className="modal__input" value={confirmText} onChange={e => setConfirmText(e.target.value)} autoFocus placeholder="REINITIALISER" />
            <div className="modal__actions">
              <button className="btn btn--ghost" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn btn--danger" disabled={confirmText !== 'REINITIALISER'} onClick={exec}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {(phase === 'running' || phase === 'done') && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-header__title">{phase === 'running' ? 'En cours...' : 'Terminé'}</span>
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
              <h3 className="results-card__title">{results.totalErrors === 0 ? 'Réinitialisation réussie' : 'Terminé avec erreurs'}</h3>
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
