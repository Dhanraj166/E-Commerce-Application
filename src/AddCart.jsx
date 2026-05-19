import React, { useContext } from 'react';
import { NameContext } from './App';
import { useNavigate } from 'react-router-dom';

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

  function removeItem(index){
    setAddProduct(prev => prev.filter((item,i) => i !== index))
  }

  return (
    <>
      <h1>Cart Page</h1>
      <button onClick={() => navigate('/')}>Home</button>

      {addProduct.length === 0 ? (
        <h3>No items in cart</h3>
      ) : (
        addProduct.map((item, index) => (
          <div key={item.id}>
            <img src={item.thumbnail} width="100" />
            <h4>{item.title}</h4>

            <p>
              Price: <strong>${item.price * item.quantity}</strong>
            </p>

            <button onClick={() => decreaseQty(index)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(index)}>+</button>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))
      )}
    </>
  );
}

export default AddCart;   