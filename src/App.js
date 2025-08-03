import "./styles.css";
import { useState, useEffect } from "react";
import { PRODUCTS_URL } from "./constant";

const PAGE_SIZE = 10;

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <span>{title}</span>
    </div>
  );
};

export default function App() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalProducts = productList.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(function () {
    const fetchProducts = async () => {
      const products = await fetch(PRODUCTS_URL);
      const productJson = await products.json();
      setProductList(productJson.products);
    };

    fetchProducts();
  }, []);

  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagenumber-container">
        {[...Array(totalPages).keys()].map((n) => {
          return (
            <span className="page-number" key={n} onClick={handlePageChange}>
              {n}
            </span>
          );
        })}
      </div>
      <div className="products">
        {productList.slice(start, end)?.map((product, index) => {
          return (
            <ProductCard
              key={index}
              image={product?.images[0]}
              title={product?.title}
            />
          );
        })}
      </div>
    </div>
  );
}
