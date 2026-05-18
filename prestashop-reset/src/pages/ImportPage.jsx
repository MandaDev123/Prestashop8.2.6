import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { parseCSV } from '../psApi';
import { executeCustomImport } from '../customImport';

export default function ImportPage() {
  const { apiKey, logout } = useAuth();
  const nav = useNavigate();
  const [csvFiles, setCsvFiles] = useState([null, null, null]);
  const [zipFile, setZipFile] = useState(null);
  const [phase, setPhase] = useState('upload');
  const [analysis, setAnalysis] = useState([]);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const csvRefs = [useRef(), useRef(), useRef()];
  const zipRef = useRef();

  const handleCSV = async (idx, file) => {
    if (!file) return;
    // Try UTF-8 first, fallback to Windows-1252 (common for French Excel exports)
    let text = await file.text();
    if (text.includes('\uFFFD') || /[^\x20-\x7F]/.test(text) === false) {
      // If we see replacement chars or no accented chars, try Latin-1/Windows-1252
      try {
        const buffer = await file.arrayBuffer();
        const decoder = new TextDecoder('windows-1252');
        const altText = decoder.decode(buffer);
        // Use the version that has more valid characters
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

  const executeImport = async () => {
    setPhase('importing'); setLogs([]); setProgress(0);
    const add = l => setLogs(p => [...p, l]);
    try {
      const res = await executeCustomImport(apiKey, csvFiles, zipFile, add, setProgress);
      setResults(res);
    } catch (e) {
      add({ icon: 'error', text: `Erreur fatale: ${e.message}` });
      setResults({ totalCreated: 0, totalErrors: 1 });
    }
    setPhase('done');
  };

  const resetAll = () => { setCsvFiles([null, null, null]); setZipFile(null); setPhase('upload'); setAnalysis([]); setResults(null); setLogs([]); };

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link topbar-link--right" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
      </div>
      <header className="header">
        <h1 className="header__title">Import de données</h1>
        <p className="header__subtitle">3 fichiers CSV pour le contenu + 1 fichier ZIP pour les images</p>
      </header>

      {phase === 'upload' && (
        <>
          <div className="import-grid">
            {['CSV Produits', 'CSV Déclinaisons/Stocks', 'CSV Commandes'].map((label, idx) => (
              <div key={idx} className={`import-slot ${csvFiles[idx] ? 'import-slot--filled' : ''}`}
                onClick={() => csvRefs[idx].current?.click()}>
                <input ref={csvRefs[idx]} type="file" accept=".csv" hidden onChange={e => handleCSV(idx, e.target.files[0])} />
                <span className="material-icons-outlined" style={{ fontSize: 28 }}>{csvFiles[idx] ? 'check_circle' : 'upload_file'}</span>
                <span className="import-slot__label">{csvFiles[idx] ? csvFiles[idx].name : label}</span>
                {csvFiles[idx] && <span className="import-slot__meta">{csvFiles[idx].rows.length} lignes</span>}
              </div>
            ))}
            <div className={`import-slot import-slot--zip ${zipFile ? 'import-slot--filled' : ''}`}
              onClick={() => zipRef.current?.click()}>
              <input ref={zipRef} type="file" accept=".zip" hidden onChange={e => handleZip(e.target.files[0])} />
              <span className="material-icons-outlined" style={{ fontSize: 28 }}>{zipFile ? 'check_circle' : 'folder_zip'}</span>
              <span className="import-slot__label">{zipFile ? zipFile.name : 'images.zip'}</span>
              {zipFile && <span className="import-slot__meta">{(zipFile.size / 1024).toFixed(0)} Ko</span>}
            </div>
          </div>
          <div className="actions">
            <button className="btn btn--primary" disabled={!hasFiles || csvFiles.filter(Boolean).length !== 3} onClick={executeImport}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>publish</span>
              Démarrer l'import automatique
            </button>
          </div>
        </>
      )}

      {(phase === 'importing' || phase === 'done') && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-header__title">{phase === 'importing' ? 'Import en cours...' : 'Terminé'}</span>
            <span className="progress-header__percent">{progress}%</span>
          </div>
          <div className="progress-bar"><div className={`progress-bar__fill ${phase === 'done' ? 'progress-bar__fill--done' : ''}`} style={{ width: `${progress}%` }} /></div>
          <div className="progress-log">
            {logs.map((l, i) => (
              <div key={i} className="log-entry">
                <span className={`material-icons-outlined log-entry__icon log-entry__icon--${l.icon}`}>{l.icon === 'success' ? 'check_circle' : l.icon === 'error' ? 'error' : 'sync'}</span>
                <span className="log-entry__text">{l.text}</span>
              </div>
            ))}
          </div>
          {phase === 'done' && results && (
            <div className="results-card">
              <h3 className="results-card__title">{results.totalErrors === 0 ? 'Import réussi !' : 'Terminé avec erreurs'}</h3>
              <div className="results-stats">
                <div className="results-stat"><div className="results-stat__value" style={{ color: 'var(--success)' }}>{results.totalCreated}</div><div className="results-stat__label">Créés</div></div>
                <div className="results-stat"><div className="results-stat__value" style={{ color: 'var(--danger)' }}>{results.totalErrors}</div><div className="results-stat__label">Erreurs</div></div>
              </div>
              <button className="btn btn--success" onClick={resetAll} style={{ marginTop: 20 }}>Nouvel import</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
