import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import Header from "../components/Header";

const SearchProduct = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query"); // This gets `?query=something`
 const [matchedProduct, setMatchedProduct] = useState(null);
 const navigate = useNavigate();
  useEffect(() => {
    const fetchSearch = async () => {
      if (keyword) {
        try {
          console.log("Searching for:", keyword);
          const res = await axios.get(
            `${backendEndApi}/products/search?query=${keyword}`,{
              withCredentials:true,
            }
          );
          console.log("Search results:", res.data);
          setResults(res.data);
          // Find if any result has productCode exactly matching the keyword
          const matched = res.data.find(
            (product) => product.productCode === keyword
          );

          setMatchedProduct(matched || null);
        } catch (err) {
          console.error("Search failed:", err);
        }
      }
    };

    fetchSearch();
  }, [keyword]); // Dependency on `keyword` so it triggers when the query changes


  // If a productCode matched, show CapDetails
   useEffect(() => {
    if (matchedProduct) {
      navigate(`/details/${matchedProduct.productId}`);
    }
  }, [matchedProduct, navigate]);


  return (
    <>
     <Header name={`${results[0]?.subcategory?.name}`} />
    <div className="product-category-section">
      
      {results.length > 0 ? (
        results.map((product) => (
          <Link
            to={`/details/${encodeURIComponent(product.productId)}`}
            key={product.productId}
            className="product-category-card"
          >
            <img
              src={`${backendEndApiBannerUpload}/${product.imageUrl[0]}`}
              alt={product.productName}
              className="product-category-image"
            />
            <h3 className="product-category-name">{product.productName}</h3>
          </Link>
        ))
      ) : (
        <p>No products found for "{keyword}"</p>
      )}
    </div>
    </>
  );
};

export default SearchProduct;
