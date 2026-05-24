import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useCart } from '../contexts';
import { fetchProducts, productImageUrl, fetchCategoriesList, fetchSpecificPrices, fetchTaxRates } from '../psApi';

export default function HomePage() {
  const { apiKey, customer, frontLogout } = useAuth();
  const { count } = useCart();
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState({});
  const [taxes, setTaxes] = useState({});
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchName, setSearchName] = useState('');
  const [searchCat, setSearchCat] = useState('');
  const [searchSubCat, setSearchSubCat] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (!apiKey) return;
    (async () => { 
      setLoading(true); 
      const [p, c, sp, tx] = await Promise.all([
        fetchProducts(apiKey), 
        fetchCategoriesList(apiKey),
        fetchSpecificPrices(apiKey),
        fetchTaxRates(apiKey)
      ]);
      setProducts(p); 
      setCategories(c);
      setTaxes(tx);
      
      const discMap = {};
      sp.forEach(d => {
        if (d.id_product) discMap[d.id_product] = d;
      });
      setDiscounts(discMap);
      
      setLoading(false); 
    })();
  }, [apiKey]);

  const getName = (p) => p.name?.[0]?.value || p.name || `Produit #${p.id}`;
  
  const getPrices = (p) => {
    const basePriceHT = parseFloat(p.price || 0);
    const taxRate = p.id_tax_rules_group && taxes[p.id_tax_rules_group] ? parseFloat(taxes[p.id_tax_rules_group]) : 0;
    const basePrice = basePriceHT * (1 + taxRate / 100);
    
    const discount = discounts[p.id];
    let finalPrice = basePrice;
    
    if (discount) {
      if (discount.reduction_type === 'percentage') {
        finalPrice = basePrice * (1 - parseFloat(discount.reduction));
      } else if (discount.reduction_type === 'amount') {
        finalPrice = basePrice - parseFloat(discount.reduction);
      }
    }
    return { basePriceHT, basePrice, finalPrice, hasDiscount: !!discount };
  };
  
  const getImage = (p) => {
    const imgs = p.associations?.images;
    if (imgs?.length) return productImageUrl(apiKey, p.id, imgs[0].id);
    return null;
  };
  const getCatName = (c) => c.name?.[0]?.value || c.name || `Catégorie #${c.id}`;

  const getBadge = (p) => {
    const d = p.available_date && p.available_date !== '0000-00-00' ? p.available_date : p.date_add;
    if (!d) return null;
    const diffDays = (new Date() - new Date(d)) / (1000 * 60 * 60 * 24);
    if (diffDays <= 1) return { text: 'HOT', color: 'var(--danger)' };
    if (diffDays <= 7) return { text: 'NEW', color: 'var(--success)' };
    return null;
  };

  if (!apiKey) return (
    <div className="app front">
      <div className="results-card">
        <h3 className="results-card__title">Configuration requise</h3>
        <p className="results-card__subtitle">Un administrateur doit d'abord se connecter pour activer l'API.</p>
        <button className="btn btn--primary" onClick={() => nav('/login')} style={{ marginTop: 16 }}>Aller au Back-Office</button>
      </div>
    </div>
  );

  const subCats = searchCat ? categories.filter(c => String(c.id_parent) === String(searchCat)) : [];

  const filtered = products.filter(p => {
    if (searchName && !getName(p).toLowerCase().includes(searchName.toLowerCase())) return false;
    
    if (searchCat) {
      if (searchSubCat) {
        if (String(p.id_category_default) !== String(searchSubCat)) return false;
      } else {
        const validCatIds = [String(searchCat), ...subCats.map(c => String(c.id))];
        if (!validCatIds.includes(String(p.id_category_default))) return false;
      }
    }
    
    const { finalPrice } = getPrices(p);
    if (minPrice && finalPrice < parseFloat(minPrice)) return false;
    if (maxPrice && finalPrice > parseFloat(maxPrice)) return false;
    return true;
  });

  // Root categories to display in the main dropdown (usually id_parent = 2 for Home)
  const rootCategories = categories.filter(c => String(c.id_parent) === '2' || c.level_depth === '2');

  return (
    <div className="app front">
      <header className="front-header">
        <h1 className="front-header__title">Boutique</h1>
        <div className="front-header__actions">
          <button className="btn-icon" onClick={() => nav('/front/cart')} title="Panier">
            <span className="material-icons-outlined">shopping_cart</span>
            {count > 0 && <span className="badge">{count}</span>}
          </button>
          <button className="btn-icon" onClick={() => nav('/front/my-orders')} title="Mes commandes">
            <span className="material-icons-outlined">receipt_long</span>
          </button>
          <button className="btn-icon" onClick={() => { frontLogout(); nav('/'); }} title="Déconnexion">
            <span className="material-icons-outlined" style={{ color: 'var(--danger)' }}>logout</span>
          </button>
        </div>
      </header>

      <div className="search-bar" style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', background: 'var(--bg-card)', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <input className="form-input" style={{ flex: '1 1 200px' }} placeholder="Rechercher par nom..." value={searchName} onChange={e => setSearchName(e.target.value)} />
        
        <select className="form-input" style={{ flex: '1 1 150px' }} value={searchCat} onChange={e => { setSearchCat(e.target.value); setSearchSubCat(''); }}>
          <option value="">Toutes catégories</option>
          {rootCategories.map(c => <option key={c.id} value={c.id}>{getCatName(c)}</option>)}
        </select>

        {subCats.length > 0 && (
          <select className="form-input" style={{ flex: '1 1 150px' }} value={searchSubCat} onChange={e => setSearchSubCat(e.target.value)}>
            <option value="">Toutes sous-catégories</option>
            {subCats.map(c => <option key={c.id} value={c.id}>{getCatName(c)}</option>)}
          </select>
        )}

        <div style={{ display: 'flex', gap: 8, flex: '1 1 150px' }}>
          <input className="form-input" type="number" placeholder="Prix min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <input className="form-input" type="number" placeholder="Prix max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="product-grid">{[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: 280 }} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="results-card"><h3 className="results-card__title">Aucun produit trouvé</h3></div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => {
            const badge = getBadge(p);
            const { basePrice, finalPrice, hasDiscount } = getPrices(p);
            return (
              <div key={p.id} className="product-card" onClick={() => nav(`/front/product/${p.id}`)} style={{ position: 'relative' }}>
                {badge && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: badge.color, color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 'bold', zIndex: 10 }}>
                    {badge.text}
                  </div>
                )}
                <div className="product-card__img">
                  {getImage(p) ? <img src={getImage(p)} alt={getName(p)} loading="lazy" /> : <span className="material-icons-outlined" style={{ fontSize: 48, color: 'var(--text-muted)' }}>image</span>}
                </div>
                <div className="product-card__body">
                  <h3 className="product-card__name">{getName(p)}</h3>
                  <p className="product-card__price">
                    {hasDiscount ? (
                      <>
                        <del style={{ color: 'var(--text-muted)', fontSize: '0.85em', marginRight: 8, fontWeight: 'normal' }}>
                          {basePrice.toFixed(2)} €
                        </del>
                        <span style={{ color: 'var(--accent)' }}>{finalPrice.toFixed(2)} €</span>
                      </>
                    ) : (
                      <span>{finalPrice.toFixed(2)} €</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
