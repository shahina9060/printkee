import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
// import "../styles/CategorySection.css";
import "../styles/product.css";
// import { products } from '../Data/productdata';
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";

const Products = ({ category: propCategory, subcategory: propSubcategory }) => {
  // const { category, subcategory } = useParams();

  const routeParams = useParams();
  const category = propCategory || routeParams.category;
  const subcategory = propSubcategory || routeParams.subcategory;

  // const productList = products[category]?.[subcategory] || [];
  console.log("subcategory", subcategory);
  console.log("category", category);
  const [products, setProducts] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState(null);

  useEffect(() => {
    const fetchSubcategoryId = async () => {
      try {
        // Fetch subcategories for the given category ID
        const categoryResponse = await fetch(`${backendEndApi}/category`);
        const categories = await categoryResponse.json();
        const categoryObj = categories.find((cat) => cat.name === category);
        if (!categoryObj) {
          console.error("Category not found:", category);
          return;
        }

        //  Fetch subcategories with the correct category ID
        const subcategoryResponse = await fetch(
          `${backendEndApi}/subcategories/${categoryObj._id}`
        );
        if (!subcategoryResponse.ok) {
          throw new Error(`HTTP error! Status: ${subcategoryResponse.status}`);
        }

        const subcategories = await subcategoryResponse.json();
        const subcategoryObj = subcategories.find(
          (sub) => sub.name === subcategory
        );
        if (subcategoryObj) {
          setSubcategoryId(subcategoryObj._id);
        } else {
          console.error("Subcategory not found:", subcategory);
        }
      } catch (error) {
        console.error("Error fetching subcategory ID:", error);
      }
    };

    fetchSubcategoryId();
  }, [subcategory]);

  useEffect(() => {
    if (!subcategoryId) return;
    console.log("subcategory>>>>>>>", subcategoryId);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${backendEndApi}/products/${subcategoryId}`
        );
        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [subcategoryId]);
  console.log("products----", products?.subcategory?.name);
  

  return (
    <>
      
      <Header name={`${subcategory}`} />
<nav className="woocommerce-breadcrumb">
        <span>
          <Link to="/">Home</Link> &gt;{" "}
         
            <Link
              to={`/categories/${category}`}
            >
              {category}
            </Link>{" "}
          
        </span>
      </nav>
      <div className="product-category-section">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Link
              to={`/details/${encodeURIComponent(product.productId)}`}
              key={product.productId}
              className="product-category-card"
            >
              <img
                // src={product.imageUrl}
                src={`${backendEndApiBannerUpload}${product.imageUrl[0]}`}
                alt={product.productName}
                className="product-category-image"
              />
              <h3 className="product-category-name">{product.productName}</h3>
            </Link>
          ))
        ) : (
          <p>No products found in {subcategory}.</p>
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default Products;
