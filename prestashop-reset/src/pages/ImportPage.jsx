import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { parseCSV, detectEntity, autoMapColumns, buildXML, sortByDeps, createEntity, uploadProductImage, fetchAllIds, IMPORT_ENTITIES } from '../psApi';
import JSZip from 'jszip';

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
    const text = await file.text();
    const parsed = parseCSV(text);
    if (parsed.length < 2) return;
    const n = [...csvFiles];
    n[idx] = { name: file.name, headers: parsed[0], rows: parsed.slice(1), preview: parsed.slice(1, 4) };
    setCsvFiles(n);
  };

  const handleZip = (file) => { if (file?.name.endsWith('.zip')) setZipFile(file); };

  const hasFiles = csvFiles.some(f => f !== null);

  const analyzeFiles = () => {
    const results = csvFiles.filter(Boolean).map(f => {
      const { best } = detectEntity(f.headers);
      return { ...f, entity: best, entityLabel: IMPORT_ENTITIES[best].label, mapping: autoMapColumns(f.headers, best) };
    });
    setAnalysis(results);
    setPhase('mapping');
  };

  const updateMapping = (fi, col, field) => {
    setAnalysis(p => { const n = [...p]; n[fi] = { ...n[fi], mapping: { ...n[fi].mapping, [col]: field } }; return n; });
  };

  const updateEntity = (fi, ent) => {
    setAnalysis(p => { const n = [...p]; n[fi] = { ...n[fi], entity: ent, entityLabel: IMPORT_ENTITIES[ent]?.label, mapping: autoMapColumns(n[fi].headers, ent) }; return n; });
  };

  const executeImport = async () => {
    setPhase('importing'); setLogs([]); setProgress(0);
    const add = l => setLogs(p => [...p, l]);
    const sorted = sortByDeps(analysis);
    const totalRows = sorted.reduce((s, f) => s + f.rows.length, 0) + (zipFile ? 1 : 0);
    let proc = 0, created = 0, errors = 0;

    // Import CSVs
    for (const file of sorted) {
      const ent = IMPORT_ENTITIES[file.entity];
      add({ icon: 'working', text: `── ${ent.label} — ${file.name} ──` });
      for (let i = 0; i < file.rows.length; i++) {
        const row = {};
        file.headers.forEach((h, j) => { row[h] = file.rows[i][j] || ''; });
        const xml = buildXML(file.entity, row, file.mapping);
        const res = await createEntity(apiKey, ent.resource, xml);
        proc++;
        setProgress(Math.round((proc / totalRows) * 100));
        if (res.success) { created++; add({ icon: 'success', text: `Ligne ${i + 1} → ID #${res.id}` }); }
        else { errors++; add({ icon: 'error', text: `Ligne ${i + 1}: ${res.error}` }); }
      }
    }

    // Import ZIP images
    if (zipFile) {
      add({ icon: 'working', text: '── Upload images ──' });
      try {
        const zip = await JSZip.loadAsync(zipFile);
        // Get all product IDs + references to match filenames
        let products = [];
        try {
          const ids = await fetchAllIds(apiKey, 'products');
          for (const id of ids) {
            const r = await fetch(`/ps-api/products/${id}?ws_key=${apiKey}&output_format=JSON`);
            if (r.ok) { const d = await r.json(); if (d.product) products.push(d.product); }
          }
        } catch {}

        for (const [filename, entry] of Object.entries(zip.files)) {
          if (entry.dir || !/\.(jpg|jpeg|png|gif|webp)$/i.test(filename)) continue;
          const baseName = filename.replace(/^.*\//, '').replace(/\.[^.]+$/, '').toLowerCase();
          // Match by reference or ID
          const product = products.find(p =>
            String(p.id) === baseName || (p.reference || '').toLowerCase() === baseName
          );
          if (!product) { add({ icon: 'error', text: `${filename} — aucun produit trouvé` }); errors++; continue; }
          const blob = await entry.async('blob');
          const ok = await uploadProductImage(apiKey, product.id, blob, filename.replace(/^.*\//, ''));
          if (ok) { created++; add({ icon: 'success', text: `${filename} → Produit #${product.id}` }); }
          else { errors++; add({ icon: 'error', text: `${filename} — échec upload` }); }
        }
      } catch (e) { add({ icon: 'error', text: `ZIP: ${e.message}` }); errors++; }
      proc++;
      setProgress(100);
    }

    setProgress(100);
    setResults({ totalCreated: created, totalErrors: errors });
    setPhase('done');
  };

  const resetAll = () => { setCsvFiles([null, null, null]); setZipFile(null); setPhase('upload'); setAnalysis([]); setResults(null); setLogs([]); };

  return (
    <div className="app">
      <div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link topbar-link--right" onClick={() => { logout(); nav('/login'); }}>Déconnexion</button>
      </div>
      <header className="header">
        <h1 className="header__title">Import de données</h1>
        <p className="header__subtitle">3 fichiers CSV pour le contenu + 1 fichier ZIP pour les images</p>
      </header>

      {phase === 'upload' && (
        <>
          <div className="import-grid">
            {['CSV 1 — Contenu', 'CSV 2 — Contenu', 'CSV 3 — Contenu'].map((label, idx) => (
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
            <button className="btn btn--primary" disabled={!hasFiles} onClick={analyzeFiles}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>auto_fix_high</span>
              Analyser et mapper
            </button>
          </div>
        </>
      )}

      {phase === 'mapping' && (
        <>
          {analysis.map((file, fi) => (
            <div key={fi} className="mapping-card">
              <div className="mapping-card__header">
                <div>
                  <div className="mapping-card__filename">{file.name}</div>
                  <div className="mapping-card__meta">{file.rows.length} lignes</div>
                </div>
                <select value={file.entity} onChange={e => updateEntity(fi, e.target.value)} className="mapping-select">
                  {Object.entries(IMPORT_ENTITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <table className="mapping-table">
                <thead><tr><th>Colonne CSV</th><th>→</th><th>Champ PS</th><th>Aperçu</th></tr></thead>
                <tbody>
                  {file.headers.map((h, hi) => (
                    <tr key={hi}>
                      <td className="mapping-table__csv-col">{h}</td>
                      <td style={{ textAlign: 'center', color: 'var(--accent-light)' }}>→</td>
                      <td>
                        <select value={file.mapping[h] || '_skip'} onChange={e => updateMapping(fi, h, e.target.value)}
                          className={`mapping-select ${file.mapping[h] === '_skip' ? 'mapping-select--skip' : ''}`}>
                          <option value="_skip">⊘ Ignorer</option>
                          {IMPORT_ENTITIES[file.entity] && Object.entries(IMPORT_ENTITIES[file.entity].fields).map(([fk, fv]) =>
                            <option key={fk} value={fk}>{fk}{fv.req ? ' ⚠️' : ''}</option>
                          )}
                        </select>
                      </td>
                      <td className="mapping-table__preview">{file.preview?.[0]?.[hi]?.substring(0, 25) || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div className="actions">
            <button className="btn btn--ghost" onClick={() => setPhase('upload')}>Retour</button>
            <button className="btn btn--primary" onClick={executeImport}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>publish</span> Importer
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
