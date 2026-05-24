import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { parseCSV } from '../psApi';
import { executeCustomImport } from '../customImport';

const styles = `
  .imp-topbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-bottom: 0.5px solid #e5e5e2;
    background: #fff;
    flex-wrap: wrap;
  }
  .imp-topbar-btn {
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
  .imp-topbar-btn:hover { background: rgba(0,0,0,0.04); }
  .imp-topbar-btn.active { background: rgba(0,0,0,0.04); color: #111; font-weight: 500; }
  .imp-topbar-btn.danger { color: #a32d2d; }
  .imp-spacer { flex: 1; }

  .imp-page {
    padding: 28px 24px;
    max-width: 900px;
    background: #fff;
    min-height: 100vh;
  }
  .imp-page-header { margin-bottom: 28px; }
  .imp-page-header h1 { font-size: 20px; font-weight: 500; margin-bottom: 4px; }
  .imp-page-header p  { font-size: 14px; color: #888; }

  /* Upload grid */
  .imp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  .imp-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 24px 16px;
    border: 0.5px dashed #d5d5d2;
    border-radius: 12px;
    background: #fafafa;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    text-align: center;
    min-height: 120px;
  }
  .imp-slot:hover {
    border-color: #aaa;
    background: #f3f3f1;
  }
  .imp-slot.filled {
    border-style: solid;
    border-color: #3b6d11;
    background: #f4faea;
  }
  .imp-slot.filled-zip {
    border-style: solid;
    border-color: #185fa5;
    background: #eef4fc;
  }

  .imp-slot .material-icons-outlined {
    font-size: 26px;
    color: #bbb;
  }
  .imp-slot.filled .material-icons-outlined { color: #3b6d11; }
  .imp-slot.filled-zip .material-icons-outlined { color: #185fa5; }

  .imp-slot-label {
    font-size: 12px;
    font-weight: 500;
    color: #555;
    word-break: break-all;
    line-height: 1.4;
  }
  .imp-slot.filled .imp-slot-label,
  .imp-slot.filled-zip .imp-slot-label {
    color: #111;
  }
  .imp-slot-meta {
    font-size: 11px;
    color: #888;
  }
  .imp-slot.filled .imp-slot-meta { color: #3b6d11; }
  .imp-slot.filled-zip .imp-slot-meta { color: #185fa5; }

  /* Start button */
  .imp-start-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #111;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 8px;
    margin-bottom: 32px;
    transition: background 0.15s;
  }
  .imp-start-btn:hover:not(:disabled) { background: #333; }
  .imp-start-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .imp-start-btn .material-icons-outlined { font-size: 16px; }

  /* Progress section */
  .imp-progress-section {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 12px;
    overflow: hidden;
  }

  .imp-progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 12px;
    border-bottom: 0.5px solid #e5e5e2;
  }
  .imp-progress-title {
    font-size: 14px;
    font-weight: 500;
    color: #111;
  }
  .imp-progress-pct {
    font-size: 13px;
    font-weight: 500;
    color: #888;
    font-variant-numeric: tabular-nums;
  }

  .imp-progress-bar-wrap {
    height: 3px;
    background: #f0f0ee;
  }
  .imp-progress-bar-fill {
    height: 100%;
    background: #111;
    transition: width 0.3s ease;
  }
  .imp-progress-bar-fill.done { background: #3b6d11; }

  .imp-log {
    padding: 12px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 320px;
    overflow-y: auto;
  }
  .imp-log-entry {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: #555;
    padding: 3px 0;
    border-bottom: 0.5px solid #f3f3f1;
  }
  .imp-log-entry:last-child { border-bottom: none; }
  .imp-log-entry .material-icons-outlined {
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .imp-log-icon-success { color: #3b6d11; }
  .imp-log-icon-error   { color: #a32d2d; }
  .imp-log-icon-info    { color: #185fa5; }

  /* Results */
  .imp-results {
    padding: 20px;
    border-top: 0.5px solid #e5e5e2;
    background: #fafafa;
  }
  .imp-results h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #111;
  }
  .imp-results-stats {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
  }
  .imp-stat-box {
    background: #fff;
    border: 0.5px solid #e5e5e2;
    border-radius: 8px;
    padding: 12px 20px;
    text-align: center;
    min-width: 90px;
  }
  .imp-stat-value {
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 4px;
  }
  .imp-stat-value.success { color: #3b6d11; }
  .imp-stat-value.danger  { color: #a32d2d; }
  .imp-stat-label {
    font-size: 11px;
    font-weight: 500;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .imp-new-btn {
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
  .imp-new-btn:hover { background: #333; }
`;

export default function ImportPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [csvFiles, setCsvFiles] = useState([null, null, null]);
  const [zipFile, setZipFile] = useState(null);
  const [phase, setPhase] = useState('upload');
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const csvRefs = [useRef(), useRef(), useRef()];
  const zipRef = useRef();

  const handleCSV = async (idx, file) => {
    if (!file) return;
    let text = await file.text();
    if (text.includes('\uFFFD') || /[^\x20-\x7F]/.test(text) === false) {
      try {
        const buffer = await file.arrayBuffer();
        const decoder = new TextDecoder('windows-1252');
        const altText = decoder.decode(buffer);
        if (altText.includes('é') || altText.includes('è') || altText.includes('à') || altText.includes('ê')) {
          text = altText;
        }
      } catch { /* stick with UTF-8 */ }
    }
    const parsed = parseCSV(text);
    if (parsed.length < 2) return;
    const n = [...csvFiles];
    n[idx] = { name: file.name, headers: parsed[0], rows: parsed.slice(1), preview: parsed.slice(1, 4) };
    setCsvFiles(n);
  };

  const handleZip = (file) => { if (file?.name.endsWith('.zip')) setZipFile(file); };

  const hasFiles = csvFiles.some(f => f !== null);
  const allThreeCSV = csvFiles.filter(Boolean).length === 3;

  const [skipImages, setSkipImages] = useState(false);

  const executeImport = async () => {
    setPhase('importing'); setLogs([]); setProgress(0);
    const add = l => setLogs(p => [...p, l]);
    try {
      const res = await executeCustomImport(apiKey, csvFiles, skipImages ? null : zipFile, add, setProgress);
      setResults(res);
    } catch (e) {
      add({ icon: 'error', text: `Erreur fatale: ${e.message}` });
      setResults({ totalCreated: 0, totalErrors: 1 });
    }
    setPhase('done');
  };

  const resetAll = () => {
    setCsvFiles([null, null, null]);
    setZipFile(null);
    setPhase('upload');
    setResults(null);
    setLogs([]);
  };

  const CSV_LABELS = ['CSV Produits', 'CSV Déclinaisons / Stocks', 'CSV Commandes'];

  const getLogIconClass = (icon) => {
    if (icon === 'success') return 'imp-log-icon-success';
    if (icon === 'error') return 'imp-log-icon-error';
    return 'imp-log-icon-info';
  };
  const getLogIconName = (icon) => {
    if (icon === 'success') return 'check_circle';
    if (icon === 'error') return 'error';
    return 'sync';
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ background: '#fff', minHeight: '100vh' }}>

        <div className="imp-topbar">
          <button className="imp-topbar-btn" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
          <button className="imp-topbar-btn active">Import</button>
          <button className="imp-topbar-btn" onClick={() => nav('/admin/orders')}>Commandes</button>
          <button className="imp-topbar-btn" onClick={() => nav('/admin/stocks')}>Stocks</button>
          <button className="imp-topbar-btn" onClick={() => nav('/admin/stats')}>Statistiques</button>

          <div className="imp-spacer" />
          <button className="imp-topbar-btn danger" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
        </div>

        <div className="imp-page">
          <div className="imp-page-header">
            <h1>Import de données</h1>
            <p>3 fichiers CSV pour le contenu + 1 fichier ZIP pour les images</p>
          </div>

          {phase === 'upload' && (
            <>
              <div className="imp-grid">
                {CSV_LABELS.map((label, idx) => {
                  const f = csvFiles[idx];
                  return (
                    <div
                      key={idx}
                      className={`imp-slot ${f ? 'filled' : ''}`}
                      onClick={() => csvRefs[idx].current?.click()}
                    >
                      <input
                        ref={csvRefs[idx]}
                        type="file"
                        accept=".csv"
                        hidden
                        onChange={e => handleCSV(idx, e.target.files[0])}
                      />
                      <span className="material-icons-outlined">
                        {f ? 'check_circle' : 'upload_file'}
                      </span>
                      <span className="imp-slot-label">{f ? f.name : label}</span>
                      {f && <span className="imp-slot-meta">{f.rows.length} lignes</span>}
                    </div>
                  );
                })}

                <div
                  className={`imp-slot ${zipFile ? 'filled-zip' : ''}`}
                  onClick={() => zipRef.current?.click()}
                >
                  <input
                    ref={zipRef}
                    type="file"
                    accept=".zip"
                    hidden
                    onChange={e => handleZip(e.target.files[0])}
                  />
                  <span className="material-icons-outlined">
                    {zipFile ? 'check_circle' : 'folder_zip'}
                  </span>
                  <span className="imp-slot-label">{zipFile ? zipFile.name : 'Images (.zip)'}</span>
                  {zipFile && <span className="imp-slot-meta">{(zipFile.size / 1024).toFixed(0)} Ko</span>}
                </div>
              </div>

              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  id="skip-img"
                  type="checkbox"
                  checked={skipImages}
                  onChange={(e) => setSkipImages(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="skip-img" style={{ fontSize: '13px', cursor: 'pointer', color: '#555' }}>
                  Ne pas importer les images (plus rapide)
                </label>
              </div>

              <button
                className="imp-start-btn"
                disabled={!hasFiles || !allThreeCSV}
                onClick={executeImport}
              >
                <span className="material-icons-outlined">publish</span>
                Démarrer l'import automatique
              </button>

            </>
          )}

          {(phase === 'importing' || phase === 'done') && (
            <div className="imp-progress-section">
              <div className="imp-progress-header">
                <span className="imp-progress-title">
                  {phase === 'importing' ? 'Import en cours…' : 'Import terminé'}
                </span>
                <span className="imp-progress-pct">{progress}%</span>
              </div>

              <div className="imp-progress-bar-wrap">
                <div
                  className={`imp-progress-bar-fill ${phase === 'done' ? 'done' : ''}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="imp-log">
                {logs.map((l, i) => (
                  <div key={i} className="imp-log-entry">
                    <span className={`material-icons-outlined ${getLogIconClass(l.icon)}`}>
                      {getLogIconName(l.icon)}
                    </span>
                    <span>{l.text}</span>
                  </div>
                ))}
              </div>

              {phase === 'done' && results && (
                <div className="imp-results">
                  <h3>{results.totalErrors === 0 ? 'Import réussi !' : 'Terminé avec des erreurs'}</h3>
                  <div className="imp-results-stats">
                    <div className="imp-stat-box">
                      <div className="imp-stat-value success">{results.totalCreated}</div>
                      <div className="imp-stat-label">Créés</div>
                    </div>
                    <div className="imp-stat-box">
                      <div className="imp-stat-value danger">{results.totalErrors}</div>
                      <div className="imp-stat-label">Erreurs</div>
                    </div>
                  </div>
                  <button className="imp-new-btn" onClick={resetAll}>
                    <span className="material-icons-outlined" style={{ fontSize: 15 }}>refresh</span>
                    Nouvel import
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