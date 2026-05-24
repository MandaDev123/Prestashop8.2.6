import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { fetchAllIds, deleteIds, ALL_RESET_RESOURCES, fetchCustomerIdsExceptAnonymous, fetchCategoryIdsExceptSystem } from '../psApi';

const styles = `
  .rst-topbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-bottom: 0.5px solid #e5e5e2;
    background: #fff;
    flex-wrap: wrap;
  }
  .rst-topbar-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    padding: 6px 12px;
    border-radius: 8px;
    color: #888;
    transition: background 0.15s;
  }
  .rst-topbar-btn:hover { background: rgba(0,0,0,0.04); }
  .rst-topbar-btn.active { background: rgba(0,0,0,0.04); color: #111; font-weight: 500; }
  .rst-topbar-btn.danger { color: #a32d2d; }
  .rst-spacer { flex: 1; }

  .rst-page {
    padding: 28px 24px;
    max-width: 900px;
    background: #fff;
    min-height: 100vh;
  }
  .rst-page-header { margin-bottom: 28px; }
  .rst-page-header h1 { font-size: 20px; font-weight: 500; margin-bottom: 4px; }
  .rst-page-header p  { font-size: 14px; color: #888; }

  /* Warning card */
  .rst-warning-wrap {
    display: flex;
    justify-content: center;
    padding: 16px 0 32px;
  }
  .rst-warning-card {
    background: #fff;
    border: 0.5px solid #f0c4c4;
    border-radius: 12px;
    padding: 32px;
    max-width: 540px;
    width: 100%;
    text-align: center;
  }
  .rst-warning-card .material-icons-outlined.icon-warn {
    font-size: 48px;
    color: #a32d2d;
    margin-bottom: 14px;
  }
  .rst-warning-card h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #111;
  }
  .rst-warning-card p {
    font-size: 13px;
    color: #888;
    line-height: 1.7;
    margin-bottom: 4px;
  }

  .rst-items-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 20px 0 24px;
    text-align: left;
  }
  .rst-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: #fdf3f3;
    border: 0.5px solid #f0c4c4;
    border-radius: 8px;
  }
  .rst-item .material-icons-outlined {
    font-size: 18px;
    color: #a32d2d;
    flex-shrink: 0;
  }
  .rst-item span.rst-item-label {
    font-size: 12px;
    font-weight: 500;
    color: #555;
  }

  .rst-danger-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #a32d2d;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    padding: 12px 0;
    border-radius: 8px;
    transition: background 0.15s;
  }
  .rst-danger-btn:hover { background: #791f1f; }
  .rst-danger-btn .material-icons-outlined { font-size: 17px; }

  /* Modal */
  .rst-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .rst-modal {
    background: #fff;
    border-radius: 12px;
    border: 0.5px solid #e5e5e2;
    padding: 28px;
    max-width: 420px;
    width: calc(100% - 32px);
  }
  .rst-modal h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #111;
  }
  .rst-modal p {
    font-size: 13px;
    color: #888;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  .rst-modal code {
    background: #f3f3f1;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    color: #a32d2d;
    font-family: monospace;
  }
  .rst-modal-input {
    width: 100%;
    padding: 9px 12px;
    font-size: 13px;
    border: 0.5px solid #d5d5d2;
    border-radius: 8px;
    outline: none;
    margin-bottom: 16px;
    transition: border-color 0.15s;
  }
  .rst-modal-input:focus { border-color: #888; }
  .rst-modal-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
  .rst-modal-cancel {
    background: none;
    border: 0.5px solid #d5d5d2;
    cursor: pointer;
    font-size: 13px;
    color: #555;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background 0.15s;
  }
  .rst-modal-cancel:hover { background: #f7f7f5; }
  .rst-modal-confirm {
    background: #a32d2d;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background 0.15s;
  }
  .rst-modal-confirm:hover:not(:disabled) { background: #791f1f; }
  .rst-modal-confirm:disabled { opacity: 0.35; cursor: not-allowed; }

  /* Progress */
  .rst-progress-section {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 12px;
    overflow: hidden;
  }
  .rst-progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 12px;
    border-bottom: 0.5px solid #e5e5e2;
  }
  .rst-progress-title { font-size: 14px; font-weight: 500; color: #111; }
  .rst-progress-pct   { font-size: 13px; font-weight: 500; color: #888; font-variant-numeric: tabular-nums; }

  .rst-progress-bar-wrap { height: 3px; background: #f0f0ee; }
  .rst-progress-bar-fill { height: 100%; background: #a32d2d; transition: width 0.3s ease; }
  .rst-progress-bar-fill.done { background: #3b6d11; }

  .rst-log {
    padding: 12px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 340px;
    overflow-y: auto;
  }
  .rst-log-entry {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: #555;
    padding: 3px 0;
    border-bottom: 0.5px solid #f3f3f1;
  }
  .rst-log-entry:last-child { border-bottom: none; }
  .rst-log-entry .material-icons-outlined {
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .rst-log-text { flex: 1; }
  .rst-log-count {
    font-size: 11px;
    font-weight: 500;
    color: #aaa;
    white-space: nowrap;
  }
  .rst-log-icon-success { color: #3b6d11; }
  .rst-log-icon-error   { color: #a32d2d; }
  .rst-log-icon-working { color: #185fa5; }

  /* Results */
  .rst-results {
    padding: 24px;
    border-top: 0.5px solid #e5e5e2;
    background: #fafafa;
    text-align: center;
  }
  .rst-results-icon {
    font-size: 40px;
    margin-bottom: 10px;
  }
  .rst-results-icon.success { color: #3b6d11; }
  .rst-results-icon.danger  { color: #a32d2d; }
  .rst-results h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #111;
  }
  .rst-results-stats {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .rst-stat-box {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 8px;
    padding: 12px 24px;
    text-align: center;
    min-width: 90px;
  }
  .rst-stat-value { font-size: 26px; font-weight: 500; line-height: 1; margin-bottom: 4px; }
  .rst-stat-value.neutral { color: #111; }
  .rst-stat-value.danger  { color: #a32d2d; }
  .rst-stat-label { font-size: 11px; font-weight: 500; color: #aaa; text-transform: uppercase; letter-spacing: 0.04em; }
  .rst-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #111;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    padding: 9px 18px;
    border-radius: 8px;
    transition: background 0.15s;
  }
  .rst-back-btn:hover { background: #333; }
`;

const RESET_ITEMS = [
  { icon: 'inventory_2',    label: 'Produits & déclinaisons' },
  { icon: 'category',       label: 'Catégories' },
  { icon: 'receipt_long',   label: 'Commandes & paiements' },
  { icon: 'shopping_cart',  label: 'Paniers' },
  { icon: 'people',         label: 'Clients & adresses' },
  { icon: 'local_offer',    label: 'Prix spécifiques' },
  { icon: 'trending_up',    label: 'Évolutions de stocks' },
  { icon: 'visibility_off', label: 'Visiteurs anonymes' },
];

export default function ResetPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [phase, setPhase] = useState('idle');
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
          add({ icon: 'working', text: `${r} — filtrage (exclusion Anonymous)...` });
          ids = await fetchCustomerIdsExceptAnonymous(apiKey);
        } else if (r === 'categories') {
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

    try {
      add({ icon: 'working', text: "Évolutions de stocks — suppression de l'historique..." });
      const stockClearRes = await fetch(`http://localhost/Prestashop/api_stock.php?action=clear&ws_key=${apiKey}`);
      const stockClearData = await stockClearRes.json();
      if (stockClearData.success) {
        add({ icon: 'success', text: 'Évolutions de stocks', count: 'historique effacé' });
      } else {
        totErr++;
        add({ icon: 'error', text: 'Évolutions de stocks — échec de la suppression' });
      }
    } catch (e) {
      totErr++;
      add({ icon: 'error', text: `Évolutions de stocks — ${e.message}` });
    }

    setProgress(100);
    setResults({ totalDeleted: totDel, totalErrors: totErr });
    setPhase('done');

    // Clean up local storage (old carts, customers) but keep admin login
    const wasLoggedIn = localStorage.getItem('isLoggedIn');
    localStorage.clear();
    if (wasLoggedIn) localStorage.setItem('isLoggedIn', wasLoggedIn);
  };

  const reset = () => { setPhase('idle'); setLogs([]); setProgress(0); setResults(null); };

  const getLogIconClass = (icon) => {
    if (icon === 'success') return 'rst-log-icon-success';
    if (icon === 'error')   return 'rst-log-icon-error';
    return 'rst-log-icon-working';
  };
  const getLogIconName = (icon) => {
    if (icon === 'success') return 'check_circle';
    if (icon === 'error')   return 'error';
    return 'sync';
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ background: '#fff', minHeight: '100vh' }}>

        <div className="rst-topbar">
          <button className="rst-topbar-btn active">Réinitialisation</button>
          <button className="rst-topbar-btn" onClick={() => nav('/admin/import')}>Import</button>
          <button className="rst-topbar-btn" onClick={() => nav('/admin/orders')}>Commandes</button>
          <button className="rst-topbar-btn" onClick={() => nav('/admin/stocks')}>Stocks</button>
          <button className="rst-topbar-btn" onClick={() => nav('/admin/stats')}>Statistiques</button>
          <div className="rst-spacer" />
          <button className="rst-topbar-btn danger" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
        </div>

        <div className="rst-page">
          <div className="rst-page-header">
            <h1>Réinitialisation</h1>
            <p>Suppression complète de toutes les données (produits, commandes, clients, paniers…)</p>
          </div>

          {phase === 'idle' && (
            <div className="rst-warning-wrap">
              <div className="rst-warning-card">
                <span className="material-icons-outlined icon-warn">warning_amber</span>
                <h2>Réinitialisation complète</h2>
                <p>Cette action va <strong>supprimer définitivement</strong> toutes les données suivantes :</p>

                <div className="rst-items-grid">
                  {RESET_ITEMS.map((item, i) => (
                    <div key={i} className="rst-item">
                      <span className="material-icons-outlined">{item.icon}</span>
                      <span className="rst-item-label">{item.label}</span>
                    </div>
                  ))}
                </div>

                <button className="rst-danger-btn" onClick={() => setShowModal(true)}>
                  <span className="material-icons-outlined">delete_forever</span>
                  Tout réinitialiser
                </button>
              </div>
            </div>
          )}

          {showModal && (
            <div className="rst-modal-overlay" onClick={() => setShowModal(false)}>
              <div className="rst-modal" onClick={e => e.stopPropagation()}>
                <h2>Confirmer la réinitialisation</h2>
                <p>
                  Action irréversible. Tapez <code>REINITIALISER</code> pour confirmer.
                </p>
                <input
                  className="rst-modal-input"
                  value={confirmText}
                  onChange={e => setConfirmText(e.target.value)}
                  autoFocus
                  placeholder="REINITIALISER"
                />
                <div className="rst-modal-actions">
                  <button className="rst-modal-cancel" onClick={() => setShowModal(false)}>Annuler</button>
                  <button
                    className="rst-modal-confirm"
                    disabled={confirmText !== 'REINITIALISER'}
                    onClick={exec}
                  >
                    Supprimer tout
                  </button>
                </div>
              </div>
            </div>
          )}

          {(phase === 'running' || phase === 'done') && (
            <div className="rst-progress-section">
              <div className="rst-progress-header">
                <span className="rst-progress-title">
                  {phase === 'running' ? 'Réinitialisation en cours…' : 'Réinitialisation terminée'}
                </span>
                <span className="rst-progress-pct">{progress}%</span>
              </div>

              <div className="rst-progress-bar-wrap">
                <div
                  className={`rst-progress-bar-fill ${phase === 'done' ? 'done' : ''}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="rst-log">
                {logs.map((l, i) => (
                  <div key={i} className="rst-log-entry">
                    <span className={`material-icons-outlined ${getLogIconClass(l.icon)}`}>
                      {getLogIconName(l.icon)}
                    </span>
                    <span className="rst-log-text">{l.text}</span>
                    {l.count && <span className="rst-log-count">{l.count}</span>}
                  </div>
                ))}
              </div>

              {phase === 'done' && results && (
                <div className="rst-results">
                  <div className={`material-icons-outlined rst-results-icon ${results.totalErrors === 0 ? 'success' : 'danger'}`}>
                    {results.totalErrors === 0 ? 'check_circle' : 'warning'}
                  </div>
                  <h3>{results.totalErrors === 0 ? 'Réinitialisation réussie !' : 'Terminé avec des erreurs'}</h3>
                  <div className="rst-results-stats">
                    <div className="rst-stat-box">
                      <div className="rst-stat-value neutral">{results.totalDeleted}</div>
                      <div className="rst-stat-label">Supprimés</div>
                    </div>
                    <div className="rst-stat-box">
                      <div className="rst-stat-value danger">{results.totalErrors}</div>
                      <div className="rst-stat-label">Erreurs</div>
                    </div>
                  </div>
                  <button className="rst-back-btn" onClick={reset}>
                    <span className="material-icons-outlined" style={{ fontSize: 15 }}>arrow_back</span>
                    Retour
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}