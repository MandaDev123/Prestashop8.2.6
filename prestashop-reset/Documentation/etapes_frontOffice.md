# Étapes et Extraits de Code d'Implémentation

Ce document complète les étapes d'implémentation en fournissant des **snippets de code React/JavaScript** prêts à être intégrés dans les fichiers correspondants.

---

## 🛒 1. FRONT-OFFICE : Boutique Client

### 🏠 HomePage (Catalogue)

**1. Tri des produits**
```jsx
// 1. Déclarer l'état
const [sortOption, setSortOption] = useState('pertinence');

// 2. Interface UI (barre de recherche)
<select className="form-input" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
  <option value="pertinence">Pertinence</option>
  <option value="priceAsc">Prix croissant</option>
  <option value="priceDesc">Prix décroissant</option>
</select>

// 3. Logique de tri (à appliquer sur 'filtered' avant le .map)
const sortedProducts = [...filtered].sort((a, b) => {
  const priceA = getPrices(a).finalPrice;
  const priceB = getPrices(b).finalPrice;
  if (sortOption === 'priceAsc') return priceA - priceB;
  if (sortOption === 'priceDesc') return priceB - priceA;
  return 0; // pertinence par défaut
});
```

**2. Vue Liste / Vue Grille**
```jsx
// 1. Déclarer l'état
const [isListView, setIsListView] = useState(false);

// 2. Boutons UI
<div style={{ display: 'flex', gap: 8 }}>
  <button className={`btn-icon ${!isListView ? 'active' : ''}`} onClick={() => setIsListView(false)}>
    <span className="material-icons-outlined">grid_view</span>
  </button>
  <button className={`btn-icon ${isListView ? 'active' : ''}`} onClick={() => setIsListView(true)}>
    <span className="material-icons-outlined">view_list</span>
  </button>
</div>

// 3. Utilisation dans le rendu parent
<div className={isListView ? "product-list" : "product-grid"}>
```

**4. Bouton Favoris (localStorage)**
```jsx
// 1. État initialisé avec localStorage
const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favs') || '[]'));

// 2. Fonction de bascule
const toggleFav = (e, id) => {
  e.stopPropagation(); // Évite de cliquer sur la carte
  const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
  setFavorites(newFavs);
  localStorage.setItem('favs', JSON.stringify(newFavs));
};

// 3. UI (dans la carte produit)
<button className="btn-icon" onClick={(e) => toggleFav(e, p.id)}>
  <span className="material-icons-outlined" style={{ color: favorites.includes(p.id) ? 'red' : 'inherit' }}>
    {favorites.includes(p.id) ? 'favorite' : 'favorite_border'}
  </span>
</button>
```

### 📦 ProductPage (Fiche Produit)

**9. Galerie multi-images**
```jsx
// 1. État de l'image principale
const [mainImgId, setMainImgId] = useState(imgs.length > 0 ? imgs[0].id : null);

// 2. Affichage (remplace l'image unique)
<div className="gallery">
  <img src={productImageUrl(apiKey, product.id, mainImgId)} alt={name} className="gallery__main" />
  <div className="gallery__thumbs" style={{ display: 'flex', gap: 8, marginTop: 8 }}>
    {imgs.map(img => (
      <img 
        key={img.id} 
        src={productImageUrl(apiKey, product.id, img.id)} 
        style={{ width: 60, height: 60, border: mainImgId === img.id ? '2px solid var(--accent)' : 'none', cursor: 'pointer' }}
        onClick={() => setMainImgId(img.id)} 
      />
    ))}
  </div>
</div>
```

**10. Sélecteur de quantité**
```jsx
// 1. État de la quantité choisie
const [qty, setQty] = useState(1);

// 2. Interface UI (avant le bouton ajouter)
<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
  <label>Quantité :</label>
  <input 
    type="number" className="form-input" 
    style={{ width: 80 }} min="1" max={availableQuantity} 
    value={qty} onChange={e => setQty(Math.max(1, Math.min(availableQuantity, parseInt(e.target.value) || 1)))} 
  />
</div>

// 3. Modification de handleAdd
const handleAdd = () => { 
  // S'assurer que addItem gère la clé 'qtyToAdd' ou la surcharge de 'qty'
  addItem({ ...product, price: finalPrice, qtyToAdd: qty }); 
};
```

### 🛒 CartPage & CheckoutPage

**15. Code Promo**
```jsx
// 1. États
const [promoCode, setPromoCode] = useState('');
const [discount, setDiscount] = useState(0);

// 2. Logique
const applyPromo = () => {
  if (promoCode.toUpperCase() === 'WELCOME10') {
    setDiscount(total * 0.10); // 10% de réduction
  } else {
    alert('Code invalide');
    setDiscount(0);
  }
};

// 3. Affichage Total
<div className="cart-total">
  {discount > 0 && <span>Remise : -{discount.toFixed(2)} €</span>}
  <span className="cart-total__value">{(total - discount).toFixed(2)} €</span>
</div>
```

**16. Sauvegarder le panier (dans `contexts.jsx`)**
```jsx
// 1. Initialiser le state depuis le localStorage
const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('ps_cart') || '[]'));

// 2. Persister à chaque changement
useEffect(() => {
  localStorage.setItem('ps_cart', JSON.stringify(items));
}, [items]);
```

### 📋 MyOrdersPage

**24. Détail des articles d'une commande (Accordéon)**
```jsx
// 1. État de l'accordéon
const [expandedId, setExpandedId] = useState(null);

// 2. Rendu dans le map() des commandes
<button className="btn btn--ghost" onClick={() => setExpandedId(expandedId === o.id ? null : o.id)}>
  {expandedId === o.id ? 'Masquer détails' : 'Voir détails'}
</button>

{expandedId === o.id && (
  <div className="order-details" style={{ marginTop: 16, background: 'var(--bg-secondary)', padding: 12 }}>
    {/* Idéalement on fetch order_details via API, sinon on pré-charge */}
    <p>Lignes de la commande affichées ici...</p>
  </div>
)}
```

---

## ⚙️ 2. BACK-OFFICE : Admin & Import

### 🗂️ Import CSV (`customImport.js` & `ImportPage.jsx`)

**12. Export des logs en .txt**
```jsx
// 1. Fonction
const downloadLogs = () => {
  const textContent = logs.map(l => `[${new Date().toLocaleTimeString()}] ${l.icon.toUpperCase()} - ${l.text}`).join('\n');
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'import_logs.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 2. Bouton
<button className="btn btn--ghost" onClick={downloadLogs} disabled={logs.length === 0}>
  <span className="material-icons-outlined">download</span> Exporter les logs
</button>
```

**15. Annulation de l'import en cours**
```jsx
// 1. Dans ImportPage.jsx (Passer le ref à customImport)
const isCancelled = useRef(false);

const handleCancel = () => { isCancelled.current = true; };

// 2. Dans customImport.js (dans les boucles for)
for (let i = 0; i < productsRows.length; i++) {
  if (isCancelled.current) {
    addLog({ icon: 'error', text: 'Import annulé par l\'utilisateur.' });
    return; // Stop l'import
  }
  // ...
}
```

### 🔧 Administration Commandes & Stock

**16. Recherche par référence dans la page stock**
```jsx
// 1. État
const [searchRef, setSearchRef] = useState('');

// 2. Input
<input 
  className="form-input" 
  placeholder="Chercher une référence..." 
  value={searchRef} 
  onChange={(e) => setSearchRef(e.target.value)} 
/>

// 3. Filtrage du tableau 'stockData' existant
const filteredStock = stockData.filter(item => 
  (item.reference || '').toLowerCase().includes(searchRef.toLowerCase())
);
// Utiliser filteredStock.map(...) pour afficher le tableau
```

**20. Export CSV des commandes**
```jsx
const exportOrdersToCSV = () => {
  const headers = ["ID", "Date", "Montant", "Statut"];
  const rows = orders.map(o => [
    o.id,
    o.date_add,
    o.total_paid,
    o.current_state
  ].join(";"));
  
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(";"), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "commandes.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```
