import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../contexts';
import { productImageUrl } from '../psApi';

export default function CartPage() {
  const { items, updateQty, removeItem, total, count } = useCart();
  const { apiKey } = useAuth();
  const nav = useNavigate();

  return (
    <div className="app front">
      <header className="front-header">
        <button className="btn-icon" onClick={() => nav('/front')}>
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        
        <h2 style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Panier ({count})</h2>
      </header>

      {items.length === 0 ? (
        <div className="results-card">
          <h3 className="results-card__title">Panier vide</h3>
          <p className="results-card__subtitle">Ajoutez des produits depuis la boutique.</p>
          <button className="btn btn--primary" onClick={() => nav('/front')} style={{ marginTop: 16 }}>Voir les produits</button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map(item => (
              <div key={item.cartKey} className="cart-item">
                <div className="cart-item__img">
                  {item.imageId && apiKey ? (
                    <img src={productImageUrl(apiKey, item.id, item.imageId)} alt={item.name} />
                  ) : (
                    <span className="material-icons-outlined" style={{ fontSize: 32, color: 'var(--text-muted)' }}>image</span>
                  )}
                </div>
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.name}</div>
                  <div className="cart-item__price">{item.price.toFixed(2)} €</div>
                </div>
                <div className="cart-item__qty">
                  <button className="qty-btn" onClick={() => updateQty(item.cartKey, item.qty - 1)}>−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.cartKey, item.qty + 1)}>+</button>
                </div>
                <div className="cart-item__subtotal">{(item.price * item.qty).toFixed(2)} €</div>
                <button className="btn-icon" onClick={() => removeItem(item.cartKey)}>
                  <span className="material-icons-outlined" style={{ fontSize: 18, color: 'var(--danger)' }}>delete</span>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <span className="cart-total__value">{total.toFixed(2)} €</span>
          </div>

          <button className="btn btn--primary" onClick={() => nav('/front/checkout')} style={{ width: '100%', marginTop: 16 }}>
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>shopping_bag</span>
            Valider la commande
          </button>
        </>
      )}
    </div>
  );
}
