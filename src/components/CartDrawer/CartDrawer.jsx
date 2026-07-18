import { X, Minus, Plus, ShoppingBag } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { t, isAr } = useLanguage();
  const { cartItems, removeFromCart, updateQty, totalPrice, isOpen, setIsOpen } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
        id="cart-overlay"
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} id="cart-drawer">
        <div className="cart-header">
          <h2 className="cart-header-title">
            🛒 {isAr ? 'سلة التسوق' : 'Shopping Cart'}
            {cartItems.length > 0 && (
              <span style={{ marginLeft: isAr ? 0 : 8, marginRight: isAr ? 8 : 0, color: 'var(--accent-dark)', fontSize: '0.9rem' }}>
                ({cartItems.length})
              </span>
            )}
          </h2>
          <button className="cart-close" onClick={() => setIsOpen(false)} id="cart-close-btn">
            <X size={18} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon"><ShoppingBag /></div>
              <p style={{ fontWeight: 600 }}>{isAr ? 'السلة فارغة' : 'Your cart is empty'}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isAr ? 'أضف بعض المنتجات لتبدأ' : 'Add some products to get started'}
              </p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    {(item.price * item.qty).toLocaleString()} {t.aed}
                  </div>
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      id={`qty-minus-${item.id}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      id={`qty-plus-${item.id}`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id)}
                  id={`cart-remove-${item.id}`}
                  aria-label="Remove item"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">{isAr ? 'المجموع' : 'Total'}</span>
              <span className="cart-total-value">
                {totalPrice.toLocaleString()} {t.aed}
              </span>
            </div>
            <a
              href={`https://wa.me/971542395964?text=${encodeURIComponent(
                `Hello Two Line!\nI'd like to order:\n${cartItems.map(i => `- ${i.name} x${i.qty} (${(i.price * i.qty).toLocaleString()} AED)`).join('\n')}\nTotal: ${totalPrice.toLocaleString()} AED`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
              id="cart-checkout-btn"
            >
              💬 {isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
