import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { NameContext } from "./App";
import './styles/index.css';
import './styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setAddProduct } = useContext(NameContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImg(res.data.thumbnail);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  function handleAddcart(product) {
    setAddProduct(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  if (loading) return <div className="pd-loading">Loading product...</div>;
  if (error) return <div className="pd-error">{error}</div>;

  return (
    <div className="pd-page">

      {/* Header */}
      <div className="pd-header">
        <div className="pd-header-inner">
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <span className="pd-breadcrumb">
            {product.category} / <span>{product.title}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pd-container">

        {/* Images */}
        <div className="pd-image-panel">
          <div className="pd-main-image">
            <img src={activeImg} alt={product.title} />
          </div>
          <div className="pd-thumbnails">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`pd-thumb-btn ${activeImg === img ? 'active' : ''}`}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt={`${product.title}-${index}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info-panel">
          <div>
            <span className="pd-category-badge">{product.category}</span>
            <p className="pd-brand">{product.brand}</p>
            <h2 className="pd-title">{product.title}</h2>
          </div>

          <div className="pd-meta-row">
            <span className="pd-rating">Rating: {product.rating}</span>
            <span className={`pd-stock-badge ${product.availabilityStatus?.toLowerCase() === 'in stock' ? 'in-stock' : 'out-of-stock'}`}>
              {product.availabilityStatus}
            </span>
          </div>

          <div className="pd-price-block">
            <span className="pd-price">${product.price}</span>
            <span className="pd-discount-badge">{product.discountPercentage}% OFF</span>
          </div>

          <hr className="pd-divider" />

          <div>
            <p className="pd-section-label">Description</p>
            <p className="pd-description">{product.description}</p>
          </div>

          <p className="pd-stock-info">
            Stock: <strong>{product.stock} units</strong> available
          </p>

          <button
            className="pd-add-cart-btn"
            onClick={() => handleAddcart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;