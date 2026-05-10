import { useState, useCallback } from 'react';
import ImportPage from './ImportPage';
import { validateKey, fetchAllIds, deleteIds, RESET_CATEGORIES } from './psApi';

function App() {
  const [currentPage, setCurrentPage] = useState('reset');
  const [apiKey, setApiKey] = useState('');
  const [keyValid, setKeyValid] = useState(null); // null | true | false
  const [selected, setSelected] = useState(new Set());
  const [counts, setCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [phase, setPhase] = useState('select');
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  // ── Validate API key ──
  const checkKey = async () => {
    if (apiKey.length !== 32) return;
    const ok = await validateKey(apiKey);
    setKeyValid(ok);
    if (ok) loadCounts();
  };

  // ── Load row counts for each resource ──
  const loadCounts = async () => {
    const c = {};
    for (const [catKey, cat] of Object.entries(RESET_CATEGORIES)) {
      let total = 0;
      for (const res of cat.resources) {
        try {
          const ids = await fetchAllIds(apiKey, res);
          total += ids.length;
        } catch { /* resource might not be accessible */ }
      }
      c[catKey] = total;
    }
    setCounts(c);
  };

  const toggleCategory = useCallback((key) => {
    if (phase !== 'select') return;
    setSelected(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }, [phase]);

  const toggleAll = () => {
    const keys = Object.keys(RESET_CATEGORIES);
    setSelected(selected.size === keys.length ? new Set() : new Set(keys));
  };

  const totalSelected = [...selected].reduce((s, k) => s + (counts[k] || 0), 0);

  // ── Execute Reset via PrestaShop API ──
  const executeReset = async () => {
    setShowModal(false); setConfirmText(''); setPhase('running'); setLogs([]); setProgress(0);
    const selectedKeys = [...selected];
    let allResources = [];
    for (const k of selectedKeys) allResources.push(...RESET_CATEGORIES[k].resources);
    const totalRes = allResources.length;
    let processed = 0, totalDeleted = 0, totalErrors = 0;
    const addLog = (l) => setLogs(prev => [...prev, l]);

    for (const catKey of selectedKeys) {
      const cat = RESET_CATEGORIES[catKey];
      addLog({ icon: 'working', text: `── ${cat.label} ──` });

      for (const resource of cat.resources) {
        addLog({ icon: 'working', text: `Récupération des IDs de ${resource}...` });
        try {
          const ids = await fetchAllIds(apiKey, resource);
          if (ids.length === 0) {
            addLog({ icon: 'success', text: `${resource} — déjà vide`, count: '0' });
          } else {
            addLog({ icon: 'working', text: `Suppression de ${ids.length} entrées dans ${resource}...` });
            const r = await deleteIds(apiKey, resource, ids);
            totalDeleted += r.deleted;
            if (r.errors.length) {
              totalErrors += r.errors.length;
              r.errors.forEach(e => addLog({ icon: 'error', text: e }));
            }
            addLog({ icon: r.errors.length ? 'error' : 'success', text: `${resource}`, count: `${r.deleted} supprimés` });
          }
        } catch (e) {
          totalErrors++;
          addLog({ icon: 'error', text: `${resource} — ${e.message}` });
        }
        processed++;
        setProgress(Math.round((processed / totalRes) * 100));
      }
    }

    setProgress(100);
    setResults({ totalDeleted, totalErrors });
    setPhase('done');
  };

  const resetApp = () => { setPhase('select'); setSelected(new Set()); setLogs([]); setProgress(0); setResults(null); loadCounts(); };

  if (currentPage === 'import') {
    return <ImportPage apiKey={apiKey} onBack={() => setCurrentPage('reset')} />;
  }

  return (
    <div className="app">
      {/* Nav tabs */}
      <div className="nav-tabs">
        <button className={`nav-tab ${currentPage === 'reset' ? 'nav-tab--active' : ''}`} onClick={() => setCurrentPage('reset')}>
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>delete_sweep</span> Réinitialisation
        </button>
        <button className={`nav-tab ${currentPage === 'import' ? 'nav-tab--active' : ''}`} onClick={() => setCurrentPage('import')}>
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>upload_file</span> Import CSV
        </button>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header__badge">
          <span className="material-icons-outlined" style={{ fontSize: 14 }}>database</span>
          PrestaShop 8.2.6 — API Webservice
        </div>
        <h1 className="header__title">Réinitialisation des données</h1>
        <p className="header__subtitle">
          Purge ciblée via l'API Webservice native. Commandes, clients, paniers — le catalogue reste intact.
        </p>
      </header>

      {/* API Key */}
      <div className="api-key-bar">
        <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--accent-light)' }}>vpn_key</span>
        <input className="api-key-input" type="text" placeholder="Clé API Webservice (32 caractères)" value={apiKey}
          onChange={e => { setApiKey(e.target.value); setKeyValid(null); }} maxLength={32} />
        <button className="btn btn--ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={checkKey}
          disabled={apiKey.length !== 32}>Connecter</button>
        {keyValid !== null && (
          <span className={`status-bar__dot ${keyValid ? 'status-bar__dot--ok' : 'status-bar__dot--error'}`} />
        )}
      </div>

      {keyValid === false && (
        <div className="mapping-info" style={{ background: 'var(--danger-glow)', borderColor: 'rgba(239,68,68,0.2)' }}>
          <span className="material-icons-outlined" style={{ color: 'var(--danger)' }}>error</span>
          <span>Clé API invalide ou Webservice désactivé. Vérifiez dans le Back-Office → Paramètres avancés → Webservice.</span>
        </div>
      )}

      {/* Category Selection */}
      {phase === 'select' && keyValid && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
              Catégories de données
            </h2>
            <button className="select-all" onClick={toggleAll}>
              {selected.size === Object.keys(RESET_CATEGORIES).length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </button>
          </div>

          <div className="categories">
            {Object.entries(RESET_CATEGORIES).map(([key, cat]) => (
              <div key={key} className={`category-card ${selected.has(key) ? 'category-card--selected' : ''}`}
                onClick={() => toggleCategory(key)}>
                <div className="category-card__check">
                  <span className="material-icons-outlined">check</span>
                </div>
                <div className="category-card__icon">
                  <span className="material-icons-outlined">{cat.icon}</span>
                </div>
                <div className="category-card__content">
                  <div className="category-card__title">{cat.label}</div>
                  <div className="category-card__desc">{cat.description}</div>
                </div>
                <div className="category-card__stats">
                  <div className="category-card__rows">{(counts[key] || 0).toLocaleString('fr-FR')}</div>
                  <div className="category-card__tables">{cat.resources.length} ressources</div>
                </div>
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="btn btn--danger" disabled={selected.size === 0} onClick={() => setShowModal(true)}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>delete_forever</span>
              Réinitialiser {selected.size > 0 ? `(${totalSelected.toLocaleString('fr-FR')} entrées)` : ''}
            </button>
            <button className="btn btn--ghost" onClick={loadCounts}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span> Rafraîchir
            </button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__icon">
              <span className="material-icons-outlined">warning</span>
            </div>
            <h2 className="modal__title">Confirmer la réinitialisation</h2>
            <p className="modal__text">Cette action est <strong>irréversible</strong>. Les données seront supprimées via l'API Webservice PrestaShop.</p>
            <div className="modal__summary">
              {[...selected].map(key => (
                <div key={key} className="modal__summary-item">
                  <span>{RESET_CATEGORIES[key].label}</span>
                  <span>{(counts[key] || 0).toLocaleString('fr-FR')} entrées</span>
                </div>
              ))}
            </div>
            <label className="modal__input-label">Tapez <code>REINITIALISER</code> pour confirmer</label>
            <input className="modal__input" type="text" placeholder="REINITIALISER" value={confirmText}
              onChange={e => setConfirmText(e.target.value)} autoFocus />
            <div className="modal__actions">
              <button className="btn btn--ghost" onClick={() => { setShowModal(false); setConfirmText(''); }}>Annuler</button>
              <button className="btn btn--danger" disabled={confirmText !== 'REINITIALISER'} onClick={executeReset}>
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>delete_forever</span> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      {(phase === 'running' || phase === 'done') && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-header__title">{phase === 'running' ? 'Suppression en cours...' : 'Terminé'}</span>
            <span className="progress-header__percent">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className={`progress-bar__fill ${phase === 'done' ? 'progress-bar__fill--done' : ''}`} style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-log">
            {logs.map((log, i) => (
              <div key={i} className="log-entry">
                <span className={`material-icons-outlined log-entry__icon log-entry__icon--${log.icon}`}>
                  {log.icon === 'success' ? 'check_circle' : log.icon === 'error' ? 'error' : 'sync'}
                </span>
                <span className="log-entry__text">{log.text}</span>
                {log.count && <span className="log-entry__count">{log.count}</span>}
              </div>
            ))}
          </div>
          {phase === 'done' && results && (
            <div className="results-card">
              <div className={`results-card__icon results-card__icon--${results.totalErrors === 0 ? 'success' : 'error'}`}>
                <span className="material-icons-outlined" style={{ color: results.totalErrors === 0 ? 'var(--success)' : 'var(--danger)' }}>
                  {results.totalErrors === 0 ? 'task_alt' : 'error_outline'}
                </span>
              </div>
              <h3 className="results-card__title">{results.totalErrors === 0 ? 'Réinitialisation réussie' : 'Terminé avec des erreurs'}</h3>
              <div className="results-stats">
                <div className="results-stat">
                  <div className="results-stat__value">{results.totalDeleted.toLocaleString('fr-FR')}</div>
                  <div className="results-stat__label">Supprimés</div>
                </div>
                <div className="results-stat">
                  <div className="results-stat__value" style={{ color: 'var(--danger)' }}>{results.totalErrors}</div>
                  <div className="results-stat__label">Erreurs</div>
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <button className="btn btn--success" onClick={resetApp}>
                  <span className="material-icons-outlined" style={{ fontSize: 18 }}>arrow_back</span> Retour
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
