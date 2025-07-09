import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CategorySection.css";
import axios from "axios";
import { backendEndApi } from "../endUserApi/api";
// import { categories } from "../Data/data";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${backendEndApi}/category`); // Correct API endpoint
        // console.log("API Response:", response);
        const data = await response.data;
        // console.log("data",data)
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <>
      <h3 className="category-title-heading">All Categories</h3>
      <div className="category-section">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link
              to={`/categories/${category.name}`}
              key={category._id}
              className="category-card"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="category-image"
                onMouseOver={(e) => {
                    console.log("Hovering, changing to:", category.hoverImageUrl); // Debugging
                    if (category.hoverImageUrl) e.currentTarget.src = category.hoverImageUrl;
                }}
                onMouseOut={(e) => {
                    console.log("Mouse out, reverting to:", category.imageUrl); // Debugging
                    e.currentTarget.src = category.imageUrl;
                }}
              />
              <h3 className="category-name">{category.name}</h3>
              <button className="view-btn">View Product</button>
            </Link>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </>
  );
};

export default Categories;
