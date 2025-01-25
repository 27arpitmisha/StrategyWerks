import logo from "./logo.svg";
import "./App.css";
import ProductList from "./Components/ProductList/ProductList";
import Modal from "./Components/Modal/Modal";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "./config";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const loaderRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    applyFilters();
  }, [products, category, sortOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?limit=10&page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts((prev) => [...prev, ...data]);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let updatedProducts = [...products];
    if (category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }
    if (sortOrder === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h1>E-commerce Product Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      <ProductList products={filteredProducts} onSelect={setSelectedProduct} />
      <div ref={loaderRef} className="loader">
        {loading && "Loading..."}
      </div>
      <Modal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
