const fs = require('fs');

function update(file, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<div className="admin-topbar">[\s\S]*?<\/div>/, replacement);
  fs.writeFileSync(file, content);
}

const stats = `<div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Statistiques</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={logout} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>`;
update('src/pages/StatsAdminPage.jsx', stats);

const orders = `<div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link" onClick={() => nav('/admin/stats')}>Statistiques</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={() => { logout(); nav('/login'); }} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>`;
update('src/pages/OrdersAdminPage.jsx', orders);

const stocks = `<div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Stocks</button>
        <button className="topbar-link" onClick={() => nav('/admin/stats')}>Statistiques</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={() => { logout(); nav('/login'); }} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>`;
update('src/pages/StockAdminPage.jsx', stocks);

const reset = `<div className="admin-topbar">
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Réinitialisation</button>
        <button className="topbar-link" onClick={() => nav('/admin/import')}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link" onClick={() => nav('/admin/stats')}>Statistiques</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={() => { logout(); nav('/login'); }} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>`;
update('src/pages/ResetPage.jsx', reset);

const imp = `<div className="admin-topbar">
        <button className="topbar-link" onClick={() => nav('/admin/reset')}>Réinitialisation</button>
        <button className="topbar-link" style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.04)' }}>Import</button>
        <button className="topbar-link" onClick={() => nav('/admin/orders')}>Commandes</button>
        <button className="topbar-link" onClick={() => nav('/admin/stocks')}>Stocks</button>
        <button className="topbar-link" onClick={() => nav('/admin/stats')}>Statistiques</button>
        <div style={{ flex: 1 }}></div>
        <button className="topbar-link" onClick={() => { logout(); nav('/login'); }} style={{ color: 'var(--danger)' }}>Déconnexion</button>
      </div>`;
update('src/pages/ImportPage.jsx', imp);

console.log('Navbars updated');
