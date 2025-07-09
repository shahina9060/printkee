import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/CategorySection.css';
import { backendEndApi } from '../endUserApi/api';
// import { subcategories } from '../Data/subcategorydata';
// import { subcategories } from '../Data/subcategorydata';

const Subcategories = () => {
    const { category } = useParams();
    console.log("category", category)
    // console.log("subcategories", subcategories)
    // Ensure subcategories exist for the given category
    // const categorySubcategories = subcategories[category] || [];
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                // Fetch all categories from the backend
                const categoryResponse = await fetch(`${backendEndApi}/category`);
                const categories = await categoryResponse.json();

                // Find the selected category by name
                const selectedCategory = categories.find(cat => cat.name === category);

                if (selectedCategory) {
                    console.log("Selected Category ID:", selectedCategory._id); // Debugging log

                    // Fetch subcategories using the correct ObjectId
                    const subcategoryResponse = await fetch(`${backendEndApi}/subcategories/${selectedCategory._id}`);
                    const subcategoriesData = await subcategoryResponse.json();
                    console.log("Fetched subcategoryResponse:", subcategoryResponse); // Debugging log
                    console.log("Fetched Subcategories:", subcategoriesData); // Debugging log

                    setSubcategories(subcategoriesData);
                } else {
                    console.error("Category not found:", category);
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
            setLoading(false);
        };

        fetchSubcategories();
    }, [category]);

    return (
        <>

        
            <Header name={category} />
            <nav className="woocommerce-breadcrumb">
                <span>
                  <Link to="/">Home</Link> &gt;{" "}
                 
                    <Link
                      to={`/categories/${category}`}
                    >
                      {/* {category} */}
                    </Link>{" "}
                </span> 
              </nav>
            <div className="category-section">
                {loading ? (
                    <p>Loading subcategories...</p>
                ) : subcategories.length > 0 ? (
                    subcategories.map((sub) => (
                        <Link to={`/categories/${category}/${sub.name}`} key={sub._id} className="category-card">
                            <img src={sub.imageUrl} alt={sub.name} className="category-image" />
                            <h3 className="category-name">{sub.name}</h3>
                        </Link>
                    ))
                ) : (
                    <p>No subcategories found for {category}.</p>
                )}
            </div>
        </>

    //     <>
    //     <Header name = {category}/>
    //     <div className="category-section">
    //     {categorySubcategories.length > 0 ? (
    //         categorySubcategories.map((sub) => (
    //                 <Link to={`/categories/${category}/${sub.name}`} key={sub.id} className="category-card" >
    //                     <img src={sub.imageUrl} alt={sub.name} className="category-image"/>
    //                     <h3 className="category-name">{sub.name}</h3>
    //                 </Link>
        
    //         ))
    //     ) : (
    //         <p>No subcategories found for {category}.</p>
    //     )}
    //     </div>
    // </>
    );
};

export default Subcategories;
