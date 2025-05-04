import React, { useEffect, useState } from 'react';
import '../products.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/all-products/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handlePayClick = (email) => {
    alert(`Contact seller: ${email}`);
  };

  return (
    <div className="products-container">
      <h2>All Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>Condition: {product.condition}</p>
            <p>Price: ₹{product.price}</p>
            <p>Seller: {product.user}</p>
            <button
              className="pay-button"
              onClick={() => handlePayClick(product.user_email)}
            >
              Pay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
