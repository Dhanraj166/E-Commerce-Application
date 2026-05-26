import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { NameContext } from './App';
import { useNavigate } from 'react-router-dom';
import cartIcon from './assets/addCart.png';
import './styles/index.css';
import './styles/Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const { addProduct, setAddProduct } = useContext(NameContext);
  const navigate = useNavigate();
  console.log(addProduct);

  useEffect(() => {
    axios("https://dummyjson.com/products?limit=100")
      .then(res => {
        setProducts(res.data.products);
        console.log(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter(product =>
      selectedCategory === "all" || selectedCategory === product.category
    );

  const categories = ["all", ...new Set(products.map(p => p.category))];

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

  function viewProduct(product) {
    navigate(`/product/${product.id}`);
  }

  if (loading) return <div className="product-loading">Loading products…</div>;

  return (
    <div className="product-page">

      {/* ── Top Bar ── */}
      <div className="product-topbar">
        <div className="product-topbar-inner">
          <span className="product-topbar-logo">ShopNow</span>

          <div className="product-search-wrap">
            {/* <span className="product-search-icon">🔍</span> */}
            <input
              type="text"
              placeholder="Search a product here..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="product-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="cart-btn" onClick={() => navigate('/cartpage')}>
            <img src={cartIcon} alt="cart" />
            <span className="cart-btn-count">{addProduct.length}</span>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="product-main-content">
        {filteredProducts.length === 0 ? (
          <div className="product-empty">
            <p>No products found for "<strong>{search}</strong>"</p>
          </div>        
        ) : (
          <>
            <p className="product-results-label">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div
                    className="product-card-image-wrap"
                    onClick={() => viewProduct(product)}
                  >
                    <span className="product-card-category-badge">
                      {product.category}
                    </span>
                    <img src={product.thumbnail} alt={product.title} />
                  </div>

                  <div className="product-card-body">
                    <h5 className="product-card-title">{product.title}</h5>
                    <p className="product-card-rating">⭐ {product.rating}</p>
                    <p className="product-card-price">${product.price}</p>
                  </div>

                  <div className="product-card-footer">
                    <button
                      className="product-card-add-btn"
                      onClick={() => handleAddcart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;