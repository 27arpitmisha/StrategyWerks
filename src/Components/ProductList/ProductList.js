import React from 'react';
import './ProductList.css';
// Product List Component for modularity
const ProductList = ({ products, onSelect }) => {
    return (
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product" onClick={() => onSelect(product)}>
            <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    );
  };

  export default ProductList;