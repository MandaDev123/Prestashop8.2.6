import { useState, useRef, useCallback } from 'react';
import { createEntity, parseCSV, detectEntity, autoMapColumns, buildXML, sortByDeps, IMPORT_ENTITIES } from './psApi';

export default function ImportPage({ apiKey, onBack }) {
  const [files, setFiles] = useState([]);
  const [phase, setPhase] = useState('upload');
  const [analysis, setAnalysis] = useState([]);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFiles = useCallback(async (fileList) => {
    const newFiles = [];
    for (const f of fileList) {
      if (!f.name.endsWith('.csv')) continue;
      const text = await f.text();
      const parsed = parseCSV(text);
      if (parsed.length < 2) continue;
      newFiles.push({ name: f.name, headers: parsed[0], rows: parsed.slice(1), preview: parsed.slice(1, 6) });
    }
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  // ── Analyze: detect entities + map columns (100% client-side) ──
  const analyzeFiles = () => {
    const results = files.map(f => {
      const { best } = detectEntity(f.headers);
      const mapping = autoMapColumns(f.headers, best);
      return { fileName: f.name, entity: best, entityLabel: IMPORT_ENTITIES[best].label, mapping, headers: f.headers, rows: f.rows, preview: f.preview };
    });
    setAnalysis(results);
    setPhase('mapping');
  };

  const updateMapping = (fi, csvCol, psField) => {
    setAnalysis(prev => { const n = [...prev]; n[fi] = { ...n[fi], mapping: { ...n[fi].mapping, [csvCol]: psField } }; return n; });
  };

  const updateEntity = (fi, entity) => {
    const a = analysis[fi];
    const newMapping = autoMapColumns(a.headers, entity);
    setAnalysis(prev => { const n = [...prev]; n[fi] = { ...n[fi], entity, entityLabel: IMPORT_ENTITIES[entity]?.label || entity, mapping: newMapping }; return n; });
  };

  // ── Execute import via PrestaShop Webservice API ──
  const executeImport = async () => {
    if (!apiKey || apiKey.length !== 32) { alert('Retournez à la page Réinitialisation pour entrer votre clé API (32 caractères)'); return; }
    setPhase('importing'); setLogs([]); setProgress(0);
    const addLog = (l) => setLogs(prev => [...prev, l]);
    const sorted = sortByDeps(analysis);
    const totalRows = sorted.reduce((s, f) => s + f.rows.length, 0);
    let processed = 0, totalCreated = 0, totalErrors = 0;

    for (const file of sorted) {
      const ent = IMPORT_ENTITIES[file.entity];
      if (!ent) { addLog({ icon: 'error', text: `Entité inconnue: ${file.entity}` }); continue; }
      addLog({ icon: 'working', text: `── ${ent.label} — ${file.fileName} (${file.rows.length} lignes) ──` });

      for (let i = 0; i < file.rows.length; i++) {
        const row = {};
        file.headers.forEach((h, j) => { row[h] = file.rows[i][j] || ''; });
        const xml = buildXML(file.entity, row, file.mapping);
        const res = await createEntity(apiKey, ent.resource, xml);
        processed++;
        setProgress(Math.round((processed / totalRows) * 100));

        if (res.success) {
          totalCreated++;
          addLog({ icon: 'success', text: `Ligne ${i + 1} → ID #${res.id}` });
        } else {
          totalErrors++;
          addLog({ icon: 'error', text: `Ligne ${i + 1} : ${res.error}` });
        }
      }
    }

    setProgress(100);
    setResults({ totalCreated, totalErrors });
    setPhase('done');
  };

  const resetAll = () => { setFiles([]); setPhase('upload'); setAnalysis([]); setResults(null); setLogs([]); setProgress(0); };

  return (
    <div className="app">
      {/* Nav tabs */}
      <div className="nav-tabs">
        <button className="nav-tab" onClick={onBack}>
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>delete_sweep</span> Réinitialisation
        </button>
        <button className="nav-tab nav-tab--active">
          <span className="material-icons-outlined" style={{ fontSize: 16 }}>upload_file</span> Import CSV
        </button>
      </div>

      <header className="header">
        <div className="header__badge">
          <span className="material-icons-outlined" style={{ fontSize: 14 }}>auto_awesome</span>
          Import Intelligent
        </div>
        <h1 className="header__title">Import de données CSV</h1>
        <p className="header__subtitle">
          Glissez vos fichiers CSV — détection automatique du type d'entité et mapping des colonnes vers l'API Webservice PrestaShop.
        </p>
      </header>

      {/* API Key status */}
      <div className="api-key-bar">
        <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--accent-light)' }}>vpn_key</span>
        <span style={{ fontSize: 14, color: apiKey?.length === 32 ? 'var(--text-secondary)' : 'var(--danger)' }}>
          {apiKey?.length === 32 ? `Clé API: ${apiKey.substring(0, 8)}••••••••` : 'Aucune clé API — retournez à la page Réinitialisation pour la configurer'}
        </span>
        <span className={`status-bar__dot ${apiKey?.length === 32 ? 'status-bar__dot--ok' : 'status-bar__dot--error'}`} />
      </div>

      {/* ═══ UPLOAD ═══ */}
      {phase === 'upload' && (
        <>
          <div className={`drop-zone ${dragOver ? 'drop-zone--active' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept=".csv" multiple hidden onChange={e => handleFiles(e.target.files)} />
            <span className="material-icons-outlined drop-zone__icon">cloud_upload</span>
            <p className="drop-zone__title">Glissez vos fichiers CSV ici</p>
            <p className="drop-zone__sub">ou cliquez pour parcourir — plusieurs fichiers acceptés</p>
          </div>
          {files.length > 0 && (
            <>
              <div className="file-list">
                {files.map((f, i) => (
                  <div key={i} className="file-card">
                    <span className="material-icons-outlined" style={{ color: 'var(--accent-light)', fontSize: 20 }}>description</span>
                    <div className="file-card__info">
                      <div className="file-card__name">{f.name}</div>
                      <div className="file-card__meta">{f.rows.length} lignes · {f.headers.length} colonnes</div>
                    </div>
                    <div className="file-card__preview-cols">
                      {f.headers.slice(0, 5).map((h, j) => <span key={j} className="file-card__col-tag">{h}</span>)}
                      {f.headers.length > 5 && <span className="file-card__col-tag">+{f.headers.length - 5}</span>}
                    </div>
                    <button className="file-card__remove" onClick={() => removeFile(i)}>
                      <span className="material-icons-outlined" style={{ fontSize: 18 }}>close</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="actions">
                <button className="btn btn--primary" onClick={analyzeFiles}>
                  <span className="material-icons-outlined" style={{ fontSize: 18 }}>auto_fix_high</span>
                  Analyser et mapper ({files.length} fichier{files.length > 1 ? 's' : ''})
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* ═══ MAPPING ═══ */}
      {phase === 'mapping' && analysis.length > 0 && (
        <>
          <div className="mapping-info">
            <span className="material-icons-outlined" style={{ color: 'var(--success)', fontSize: 20 }}>auto_awesome</span>
            <span>Détection automatique terminée — vérifiez et ajustez les mappings ci-dessous</span>
          </div>
          {analysis.map((file, fi) => (
            <div key={fi} className="mapping-card">
              <div className="mapping-card__header">
                <div>
                  <div className="mapping-card__filename">{file.fileName}</div>
                  <div className="mapping-card__meta">{file.rows.length} lignes à importer</div>
                </div>
                <div className="mapping-card__entity-select">
                  <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Entité :</label>
                  <select value={file.entity} onChange={e => updateEntity(fi, e.target.value)} className="mapping-select">
                    {Object.entries(IMPORT_ENTITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
              </div>
              <table className="mapping-table">
                <thead><tr><th>Colonne CSV</th><th>→</th><th>Champ PrestaShop</th><th>Aperçu</th></tr></thead>
                <tbody>
                  {file.headers.map((h, hi) => (
                    <tr key={hi}>
                      <td className="mapping-table__csv-col">{h}</td>
                      <td style={{ textAlign: 'center', color: 'var(--accent-light)' }}>→</td>
                      <td>
                        <select value={file.mapping[h] || '_skip'} onChange={e => updateMapping(fi, h, e.target.value)}
                          className={`mapping-select ${file.mapping[h] === '_skip' ? 'mapping-select--skip' : ''}`}>
                          <option value="_skip">⊘ Ignorer</option>
                          {IMPORT_ENTITIES[file.entity] && Object.entries(IMPORT_ENTITIES[file.entity].fields).map(([fk, fv]) => (
                            <option key={fk} value={fk}>{fk} {fv.req ? '⚠️' : ''}</option>
                          ))}
                        </select>
                      </td>
                      <td className="mapping-table__preview">
                        {file.preview?.slice(0, 2).map((row, ri) => <span key={ri} className="preview-value">{(row[hi] || '—').substring(0, 30)}</span>)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div className="actions" style={{ marginTop: 24 }}>
            <button className="btn btn--ghost" onClick={() => setPhase('upload')}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>arrow_back</span> Retour
            </button>
            <button className="btn btn--primary" onClick={executeImport} disabled={!apiKey || apiKey.length !== 32}>
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>publish</span> Importer via l'API
            </button>
          </div>
        </>
      )}

      {/* ═══ PROGRESS / DONE ═══ */}
      {(phase === 'importing' || phase === 'done') && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-header__title">{phase === 'importing' ? 'Import en cours...' : 'Import terminé'}</span>
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
              <h3 className="results-card__title">{results.totalErrors === 0 ? 'Import réussi !' : 'Import terminé avec des erreurs'}</h3>
              <div className="results-stats">
                <div className="results-stat">
                  <div className="results-stat__value" style={{ color: 'var(--success)' }}>{results.totalCreated}</div>
                  <div className="results-stat__label">Créés</div>
                </div>
                <div className="results-stat">
                  <div className="results-stat__value" style={{ color: 'var(--danger)' }}>{results.totalErrors}</div>
                  <div className="results-stat__label">Erreurs</div>
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <button className="btn btn--success" onClick={resetAll}>
                  <span className="material-icons-outlined" style={{ fontSize: 18 }}>refresh</span> Nouvel import
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
