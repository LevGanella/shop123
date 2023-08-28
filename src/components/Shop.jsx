import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Shop = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 10, count: 1 },
    { id: 2, name: 'Product 2', price: 20, count: 1 },
    { id: 3, name: 'Product 3', price: 30, count: 1 },
  ];

  const { login } = useParams();

  const [counts, setCounts] = useState({})

  const onClickPlus = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }))
  }

  const onClickMinus = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 1) - 1, 1),
    }))
  }

  const onAddToCart = (id, name, price, count, login) => {
    fetch('http://localhost:5000/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: name,
        price: price,
        login: login,
        count: count,
      }),
    });
  };

  return (
    <div>
      {login == localStorage.getItem('LogIn') ? (
        <div className="shop-container">
          <h1>Welcome to the Shop</h1>
          <NavLink to={`/${login}/cart`}>
          <button className="cart-button">Cart</button>
          </NavLink>
          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <div>
                  <div className="button-container">
                    <button
                      className="button-minus"
                      onClick={() => onClickMinus(product.id)}
                    >
                      -
                    </button>
                    <h1 className="button-count">
                      {counts[product.id] || product.count}
                    </h1>
                    <button
                      className="button-plus"
                      onClick={() => onClickPlus(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="add-to-cart"
                  onClick={() =>
                    onAddToCart(
                      product.id,
                      product.name,
                      product.price,
                      counts[product.id] || product.count,
                      localStorage.getItem('LogIn')
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>404</h1>
      )}
    </div>
  );
};

export default Shop;
