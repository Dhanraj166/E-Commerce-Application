import React, { useContext } from 'react';
import { NameContext } from './App';
import { useNavigate } from 'react-router-dom';
import './styles/index.css';
import './styles/AddCart.css';

function AddCart() {
  const { addProduct, setAddProduct } = useContext(NameContext);
  const navigate = useNavigate();

  function increaseQty(index) {
    setAddProduct(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQty(index) {
    setAddProduct(prev =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function removeItem(index) {
    setAddProduct(prev => prev.filter((item, i) => i !== index));
  }

  const totalItems = addProduct.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = addProduct.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">

      {/* ── Header ── */}
      <div className="cart-header">
        <div className="cart-header-inner">
          <button className="cart-back-btn" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1 className="cart-header-title">Your Cart</h1>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="cart-layout">
        {addProduct.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Your cart is empty. Start shopping!</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div>
              <p className="cart-items-count-label">
                {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
              </p>
              <div className="cart-items-list">
                {addProduct.map((item, index) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-img-wrap">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>

                    <div className="cart-item-info">
                      <p className="cart-item-title">{item.title}</p>
                      <p className="cart-item-unit-price">${item.price} each</p>
                      <p className="cart-item-total-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="cart-item-controls">
                      <div className="cart-qty-wrap">
                        <button className="cart-qty-btn" onClick={() => decreaseQty(index)}>−</button>
                        <span className="cart-qty-value">{item.quantity}</span>
                        <button className="cart-qty-btn" onClick={() => increaseQty(index)}>+</button>
                      </div>
                      <button className="cart-remove-btn" onClick={() => removeItem(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>
              <div className="cart-summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="cart-checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddCart;