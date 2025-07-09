import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/tshirtDetails.css";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import axios from "axios";

const CapDetails = () => {
  const { productId } = useParams();
  console.log("productId", productId);
  const [selectedImage, setSelectedImage] = useState([]);
  const [product, setProduct] = useState();
  const [display, setDisplay] = useState();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [sideImagesList, setSideImagesList] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${backendEndApi}/products/side-images/${productId}`
        );
        console.log("Product Response:", res.data); // Add this

        setSelectedImage(res.data.imageUrl[0]);
        setProduct(res.data);
        setSideImagesList(res.data.imageUrl);
        setDisplay(res.data.imageUrl[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchImages();
  }, [productId]);

  console.log("Product idddd:", product?.subcategory?._id); // Add this
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${backendEndApi}/products/relatedProduct/display/${productId}`
      );
      console.log("related res", res);
      setRelatedProduct(res.data);
    };
    fetch();
  }, [productId]);

  const handleImages = (img) => {
    setDisplay(img);
    setIsFirstRender(false);
  };

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const hiddenFields = [
    "_id",
    "imageUrl",
    "subcategory",
    "productId",
    "__v",
    "tags",
    "updatedAt",
    "personalize",
    "createdAt",
    "csvFileName",
    "productPrice",
    "productCode",
  ];

  return (
    <div className="product-container">
      <div className="cl"></div>
      <div className="product-content">
        {/* <hr /> */}
        <nav className="woocommerce-breadcrumb">
          <span>
            <Link to="/">Home</Link> &gt;{" "}
            {product?.subcategory?.category?.name && (
              <>
                <Link
                  to={`/categories/${product?.subcategory?.category?.name}`}
                >
                  {formatKey(product?.subcategory?.category?.name)}
                </Link>{" "}
                &gt;{" "}
              </>
            )}
            {product?.subcategory?.name && (
              <>
                <Link
                  to={`/categories/${product?.subcategory?.category?.name}/${product?.subcategory?.name}`}
                >
                  {formatKey(product?.subcategory?.name)}
                </Link>{" "}
                &gt;{" "}
              </>
            )}
            <span className="breadcrumb_last" aria-current="page">
              {product?.productName}
            </span>
          </span>
        </nav>

        {product && (
          <>
            <div className="product-content">
              {/* <div className="main"> */}
              <div className="main">
                <div className="details-main">
                  {/* Left: Image */}

                  <div className="details-img">
                    <p>Product Code: {product.productCode}</p>
                    <div className="main-image-wrapper">
                      <img
                        src={`${backendEndApiBannerUpload}${
                          isFirstRender ? selectedImage : display
                        }`}
                        alt=""
                      />
                      <div className="image-section">
                        <div className="links">
                          {sideImagesList.map((itemlist, index) => (
                            <a key={index}>
                              <img
                                src={`${backendEndApiBannerUpload}${itemlist}`}
                                onClick={() => {
                                  setSelectedImage(itemlist);
                                  setDisplay(itemlist);
                                  setIsFirstRender(false);
                                }}
                                alt={`side-${index}`}
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Product Details */}
                  <div className="product-detail-con">
                    <div className="details-full">
                      {Object.entries(product).map(([key, value]) => {
                        if (hiddenFields.includes(key)) return null;
                        return (
                          <div className="detail-row" key={key}>
                            {key === "productName" ? (
                              <div className="product-title">
                                {String(value)}
                              </div>
                            ) : (
                              <span
                                className={`detail-value ${
                                  key === "productType" ||
                                  key === "capacity" ||
                                  key === "size"
                                    ? "highlight-field"
                                    : ""
                                }`}
                              >
                                {key === "productDescription"
                                  ? String(value)
                                      .split("\n")
                                      .map((line, idx) => (
                                        <div key={idx}>{line}</div>
                                      ))
                                  : String(value)}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Personalize Button */}
                    {/* <Link
                        to={`/customize/${product.productType.toLowerCase()}/${productId}`}
                      >
                        <button className="personalize-btn">Personalize</button>
                      </Link> */}

                    {/* ============= */}

                    {/* t-shirt */}
                    {product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb7438e" && (
                      <Link to={`/customize/T-Shirt/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}
                    {/* caps & hats */}
                    {product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb7438f" && (
                      <Link to={`/customize/cap/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}

                    {/* apron ,pen, coffe mug, bottle*/}
                    {(product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb74392" ||
                      product?.subcategory?._id ===
                        "67dd46e9ad2dfed36bb7439c" ||
                      product?.subcategory?._id ===
                        "67dd46e9ad2dfed36bb743aa" ||
                      product?.subcategory?._id ===
                        "67dd46e9ad2dfed36bb7439d") && (
                      <Link to={`/customize/bottle/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}
                    {/* corporate shirt */}
                    {product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb74390" && (
                      <Link to={`/customize/corporate-shirt/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}

                    {/* notebook and diary */}
                    {product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb743a9" && (
                      <Link to={`/customize/notebook-diary/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}

                    {/* backpacks */}
                    {product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb74385" && (
                      <Link to={`/customize/bags/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}
                    {/* totebags */}
                    {product?.subcategory?._id ===
                      "67dd46e9ad2dfed36bb74388" && (
                      <Link to={`/customize/totebags/${productId}`}>
                        <button className="personalize-btn">Personalize</button>
                      </Link>
                    )}
                    {/* ============ */}
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </>
        )}

        <hr />
        <div className="titleTwo">Related Categories</div>
        <span className="backBtn">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            style={{ textDecoration: "none", color: "white", padding: "5px" }}
          >
            Back
          </a>
        </span>
        <div className="cl"></div>

        {/* {relatedProduct && */}
        <div className="product-category-section">
          {relatedProduct.length > 0 ? (
            relatedProduct.map((product, index) => (
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
            <p>No products found.</p>
          )}
        </div>
        {/* ))} */}

        <div className="cl"></div>
      </div>
      <div className="cl"></div>
    </div>
  );
};

export default CapDetails;
