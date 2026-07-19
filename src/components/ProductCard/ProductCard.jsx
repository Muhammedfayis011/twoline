import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { t, isAr } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);

  const selectedColorHex = product.colors[selectedColor];

  const getOverlayStyle = (hex) => {
    if (!hex) return {};
    const isDark = hex === '#1A1A1A' || hex === '#2C2C2C' || hex === '#4A4A4A' || hex === '#6B6B6B' || hex === '#8B8B8B';
    const isWhite = hex === '#FFFFFF' || hex === '#F5F5F0';
    return {
      position: 'absolute',
      inset: 0,
      backgroundColor: hex,
      mixBlendMode: 'multiply',
      opacity: isWhite ? 0 : isDark ? 0.5 : 0.35,
      pointerEvents: 'none',
      transition: 'background-color 0.3s ease, opacity 0.3s ease',
    };
  };

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      {/* Image */}
      <div
        className="product-card-img"
        onClick={goToDetail}
        style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      >
        <img src={product.image} alt={t[product.nameKey]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={getOverlayStyle(selectedColorHex)} />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{t[product.nameKey]}</h3>
        <p className="product-card-desc">{t[product.descKey]}</p>

        {/* Color Swatches */}
        <div className="swatch-row">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className={`swatch ${i === selectedColor ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={(e) => { e.stopPropagation(); setSelectedColor(i); }}
              aria-label={`Color ${i + 1}`}
              id={`swatch-${product.id}-${i}`}
            />
          ))}
        </div>

        <div className="product-card-footer">
          <div className="product-price">
            <span className="product-price-label">{t.from_price}</span>
            <span className="product-price-value">
              {product.price.toLocaleString()} <span>{t.aed}</span>
            </span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            id={`explore-btn-${product.id}`}
            onClick={goToDetail}
          >
            {t.explore}
            {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>
    </article>
  );
}
