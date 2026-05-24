import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, useCart } from '../contexts';
import { fetchProduct, productImageUrl, fetchProductCombinations, fetchProductOptionValues, fetchProductOptions, fetchSpecificPrices, fetchStockAvailables, fetchTaxRates } from '../psApi';

export default function ProductPage() {
  const { id } = useParams();
  const { apiKey } = useAuth();
  const { addItem, count } = useCart();
  const nav = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [combinations, setCombinations] = useState([]);
  const [optionValuesMap, setOptionValuesMap] = useState({});
  const [optionsMap, setOptionsMap] = useState({});
  const [bundleProducts, setBundleProducts] = useState([]);
  const [specificPrices, setSpecificPrices] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [taxes, setTaxes] = useState({});
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  
  const [selections, setSelections] = useState({});

  useEffect(() => {
    if (!apiKey) return;
    (async () => { 
      setLoading(true); 
      const [p, combs, optVals, opts, sp, stks, tx] = await Promise.all([
        fetchProduct(apiKey, id),
        fetchProductCombinations(apiKey, id),
        fetchProductOptionValues(apiKey),
        fetchProductOptions(apiKey),
        fetchSpecificPrices(apiKey),
        fetchStockAvailables(apiKey, id),
        fetchTaxRates(apiKey)
      ]);
      setProduct(p);
      setCombinations(combs);
      setSpecificPrices(sp);
      setStockData(stks);
      setTaxes(tx);
      
      const vMap = {};
      optVals.forEach(v => vMap[v.id] = v);
      setOptionValuesMap(vMap);
      
      const oMap = {};
      opts.forEach(o => oMap[o.id] = o);
      setOptionsMap(oMap);
      
      if (combs && combs.length > 0) {
        const firstComb = combs[0];
        const initialSelections = {};
        const vals = firstComb.associations?.product_option_values || [];
        vals.forEach(val => {
          const vData = vMap[val.id];
          if (vData) {
            initialSelections[vData.id_attribute_group] = val.id;
          }
        });
        setSelections(initialSelections);
      }
      
      // Fetch bundle products if it's a pack
      if (p?.associations?.product_bundle) {
        const bp = await Promise.all(p.associations.product_bundle.map(async b => {
          const bpData = await fetchProduct(apiKey, b.id);
          return { ...bpData, bundleQty: b.quantity };
        }));
        setBundleProducts(bp);
      }

      setLoading(false); 
    })();
  }, [apiKey, id]);

  if (loading) return <div className="app front"><div className="skeleton" style={{ height: 400 }} /></div>;
  if (!product) return <div className="app front"><p>Produit introuvable</p></div>;

  const name = product.name?.[0]?.value || product.name || '';
  const desc = product.description?.[0]?.value || product.description || '';
  const descShort = product.description_short?.[0]?.value || product.description_short || '';
  const basePriceHT = parseFloat(product.price || 0);
  const taxRate = product.id_tax_rules_group && taxes[product.id_tax_rules_group] ? parseFloat(taxes[product.id_tax_rules_group]) : 0;
  const basePrice = basePriceHT * (1 + taxRate / 100);
  const ref = product.reference || '';
  const imgs = product.associations?.images || [];

  const availableOptions = {};
  combinations.forEach(comb => {
    const vals = comb.associations?.product_option_values || [];
    vals.forEach(val => {
      const vData = optionValuesMap[val.id];
      if (vData) {
        const optId = vData.id_attribute_group;
        const optData = optionsMap[optId];
        if (!availableOptions[optId]) {
          availableOptions[optId] = {
            name: optData?.name?.[0]?.value || optData?.name || `Option #${optId}`,
            values: new Map()
          };
        }
        if (!availableOptions[optId].values.has(val.id)) {
          availableOptions[optId].values.set(val.id, {
            id: val.id,
            name: vData.name?.[0]?.value || vData.name || `Valeur #${val.id}`
          });
        }
      }
    });
  });

  let currentCombination = null;
  if (combinations.length > 0) {
    currentCombination = combinations.find(comb => {
      const combVals = (comb.associations?.product_option_values || []).map(v => v.id);
      const selectedVals = Object.values(selections);
      return combVals.length === selectedVals.length && combVals.every(v => selectedVals.includes(v));
    }) || combinations[0];
  }

  const combinationImpactHT = currentCombination ? parseFloat(currentCombination.price || 0) : 0;
  const combinationImpact = combinationImpactHT * (1 + taxRate / 100);
  const currentCombId = currentCombination ? currentCombination.id : '0';
  const currentStockObj = stockData.find(s => String(s.id_product_attribute) === String(currentCombId));
  const availableQuantity = currentStockObj ? parseInt(currentStockObj.quantity || 0, 10) : 0;
  const initialPrice = basePrice + combinationImpact;
  
  // Find discount if any
  const discount = specificPrices.find(d => String(d.id_product) === String(product.id));
  let finalPrice = initialPrice;
  if (discount) {
    if (discount.reduction_type === 'percentage') {
      finalPrice = initialPrice * (1 - parseFloat(discount.reduction));
    } else if (discount.reduction_type === 'amount') {
      finalPrice = initialPrice - parseFloat(discount.reduction);
    }
  }
  const hasDiscount = !!discount;

  const getBadge = (p) => {
    const d = p.available_date && p.available_date !== '0000-00-00' ? p.available_date : p.date_add;
    if (!d) return null;
    const diffDays = (new Date() - new Date(d)) / (1000 * 60 * 60 * 24);
    if (diffDays <= 1) return { text: 'HOT', color: 'var(--danger)' };
    if (diffDays <= 7) return { text: 'NEW', color: 'var(--success)' };
    return null;
  };
  const badge = getBadge(product);

  const handleSelectChange = (optId, valId) => {
    setSelections(prev => ({ ...prev, [optId]: valId }));
  };

  const handleAdd = () => { 
    addItem({ ...product, price: finalPrice, basePriceHT: finalPrice / (1 + taxRate / 100), combinationId: currentCombination?.id }); 
    setAdded(true); 
    setTimeout(() => setAdded(false), 1500); 
  };

  const getName = (p) => p.name?.[0]?.value || p.name || `Produit #${p.id}`;

  return (
    <div className="app front">
      <header className="front-header">
        <button className="btn-icon" onClick={() => nav('/front')}>
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <div className="front-header__actions">
          <button className="btn-icon" onClick={() => nav('/front/cart')}>
            <span className="material-icons-outlined">shopping_cart</span>
            {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </header>

      <div className="product-detail" style={{ position: 'relative' }}>
        <div className="product-detail__gallery">
          {badge && (
            <div style={{ position: 'absolute', top: 16, left: 16, background: badge.color, color: 'white', padding: '6px 12px', borderRadius: 4, fontSize: 13, fontWeight: 'bold', zIndex: 10 }}>
              {badge.text}
            </div>
          )}
          {imgs.length > 0 ? (
            <img src={productImageUrl(apiKey, product.id, imgs[0].id)} alt={name} className="product-detail__img" />
          ) : (
            <div className="product-detail__no-img"><span className="material-icons-outlined" style={{ fontSize: 64 }}>image</span></div>
          )}
        </div>
        <div className="product-detail__info">
          <h1 className="product-detail__name">{name}</h1>
          {ref && <p className="product-detail__ref">Réf: {ref}</p>}
          <p className="product-detail__price" style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            {hasDiscount ? (
              <>
                <del style={{ color: 'var(--text-muted)', fontSize: '0.6em', fontWeight: 'normal' }}>
                  {initialPrice.toFixed(2)} €
                </del>
                <span style={{ color: 'var(--accent)' }}>{finalPrice.toFixed(2)} €</span>
              </>
            ) : (
              <span>{finalPrice.toFixed(2)} €</span>
            )}
          </p>
          <div style={{ marginTop: 8, marginBottom: 16 }}>
            {availableQuantity > 0 ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--success)', fontSize: 13, fontWeight: 500 }}>
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>check_circle</span>
                En stock ({availableQuantity} disponible{availableQuantity > 1 ? 's' : ''})
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--danger)', fontSize: 13, fontWeight: 500 }}>
                <span className="material-icons-outlined" style={{ fontSize: 16 }}>cancel</span>
                Rupture de stock
              </span>
            )}
          </div>
          <div className="product-detail__desc" dangerouslySetInnerHTML={{ __html: descShort || desc }} />
          
          {Object.keys(availableOptions).length > 0 && (
            <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: 14, marginBottom: 12 }}>Options disponibles</h3>
              {Object.entries(availableOptions).map(([optId, optData]) => (
                <div key={optId} style={{ marginBottom: 12 }}>
                  <label className="form-label">{optData.name}</label>
                  <select 
                    className="form-input" 
                    value={selections[optId] || ''} 
                    onChange={e => handleSelectChange(optId, e.target.value)}
                  >
                    {Array.from(optData.values.values()).map(val => (
                      <option key={val.id} value={val.id}>{val.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <button 
            className={`btn ${added ? 'btn--success' : 'btn--primary'}`} 
            onClick={handleAdd} 
            disabled={availableQuantity <= 0}
            style={{ marginTop: 24, width: '100%', opacity: availableQuantity <= 0 ? 0.5 : 1 }}
          >
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>{added ? 'check' : 'add_shopping_cart'}</span>
            {added ? 'Ajouté au panier !' : 'Ajouter au panier'}
          </button>

          {bundleProducts.length > 0 && (
            <div style={{ marginTop: 32, padding: 20, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Ce pack contient :</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {bundleProducts.map(bp => {
                  const bImgs = bp.associations?.images || [];
                  return (
                    <div key={bp.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-card)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ width: 48, height: 48, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {bImgs.length > 0 ? (
                          <img src={productImageUrl(apiKey, bp.id, bImgs[0].id)} alt={getName(bp)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span className="material-icons-outlined" style={{ fontSize: 24, color: 'var(--text-muted)' }}>image</span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{bp.bundleQty}x {getName(bp)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
