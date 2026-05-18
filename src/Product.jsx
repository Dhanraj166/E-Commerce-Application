import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { NameContext } from './App';
import { useNavigate } from 'react-router-dom';
import cartIcon from './assets/addCart.png';

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addProduct, setAddProduct } = useContext(NameContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

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

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <input
        type="text"
        placeholder="Search a product here..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="addCart-logo" onClick={() => navigate('/cartpage')}>
        <img src={cartIcon} alt="cart" width="80" />
        <span>{addProduct.length}</span>
      </div>

      {filteredProducts.length === 0 ? (
        <h1>Product not found</h1>
      ) : (
        filteredProducts.map(product => (
          <div key={product.id}>
            <p>{product.category}</p>

            <img
              src={product.thumbnail}
              width="100"
              onClick={() => viewProduct(product)}
              style={{ cursor: "pointer" }}
            />

            <h5>{product.title}</h5>
            <p>Price: ${product.price}</p>
            <h6>Rating: {product.rating}</h6>

            <button onClick={() => handleAddcart(product)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default Product;
