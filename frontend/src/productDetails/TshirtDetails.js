// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// import "../styles/tshirtDetails.css"; // Ensure this CSS file exists
// import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
// import axios from "axios";

// const TshirtDetails = () => {
//   const { productId } = useParams();
//   const [selectedImage, setSelectedImage] = useState([]);
//   const [product, setProduct] = useState();
//   const [display, setDisplay] = useState(selectedImage[0]);
//   const [isFirstRender, setIsFirstRender] = useState(true);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await axios.get(
//           `${backendEndApi}/products/side-images/${productId}`
//         );
//         setSelectedImage(res.data.imageUrl);
//         setProduct(res.data);
//         console.log("res", res);
//       } catch (error) {}
//     };
//     fetchImages();
//   }, []);
//   console.log("selectedimages: ", selectedImage[0]);
//   console.log("product: ", product);

//   const handleImages = (img) => {
//     setDisplay(img);
//     setIsFirstRender(false);
//   };
//   return (
//     <div className="product-container">
//       <div className="cl"></div>
//       <div className="product-content">
//         <h2 className="title-three">T-SHIRT</h2>
//         <hr />
//         {/* <div class="cl"></div>

//         <div class="details">
//           <p></p>
//           <p></p>
//         </div> */}

//         {product && (
//           <div className="main">
//             {/* Thumbnail Images */}
//             <div className="img-thumbnails">
//               {selectedImage.map((img, index) => (
//                 <div
//                   key={index}
//                   title="View Image"
//                   onClick={() => handleImages(img)}
//                 >
//                   <img
//                     src={`${backendEndApiBannerUpload}${img}`}
//                     width="100"
//                     height="100"
//                     alt="thumbnail"
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* <div className='main'> */}
//             <div className="details-main">
//               <div id="loadarea" className="details-img">
//                 <p>Product Code: {product.productCode}</p>
//                 {isFirstRender && (
//                   <img
//                     src={`${backendEndApiBannerUpload}${selectedImage[0]}`}
//                     alt=""
//                   />
//                 )}

//                 <img src={`${backendEndApiBannerUpload}${display}`} alt="" />
//                 {productId}
//               </div>

//               <div className="product-detail-con">
//                 <strong>Product Details</strong>
//                 <div className="details-full">
//                   <div>
//                     <p>Name:</p>
//                     <p>Type:</p>
//                     <p>Fabric:</p>
//                     <p>Color:</p>
//                     <p>Size:</p>
//                     <p>Price:</p>
//                     <p>Description:</p>
//                   </div>
//                   <div>
//                     <p>{product.productName}</p>
//                     <p>{product.productType}</p>
//                     <p>{product.fabricType}</p>
//                     <p>{product.productColor}</p>
//                     <p>{product.productSize}</p>
//                     <p>{product.proMinQuantity}</p>
//                     <p>{product.productPrice}</p>
//                     <p>{product.productDescription}</p>
//                   </div>
//                 </div>
//                 <Link to={`/tshirtcanvas/${encodeURIComponent(productId)}`}>
//                   <button
//                     style={{
//                       margin: "100px",
//                       height: "30px",
//                       width: "100px",
//                       right: 0,
//                     }}
//                   >
//                     Personalize
//                   </button>
//                 </Link>
//               </div>

//               <div className="cl"></div>
//             </div>
//           </div>
//         )}
//         <hr />
//         {/* <h3 className="title-two">Related Categories</h3> */}
//         <div className="titleTwo">Related Categories</div>
//         <span className="backBtn">
//           <a
//             href="/"
//             onClick={(e) => {
//               e.preventDefault();
//               window.history.back(); // Or history.go(-1)
//             }}
//             style={{ textDecoration: "none", color: "white", padding: "5px" }}
//           >
//             Back
//           </a>
//         </span>
//         <div className="cl"></div>

//         {/* Related Product List */}
//         <div className="productlist">
//           <ul>
//             {[
//               {
//                 link: "/categories/Apparel%20and%20Accessories/Aprons",
//                 name: "Apron",
//               },
//               {
//                 link: "/categories/Apparel%20and%20Accessories/Caps%20and%20Hats",
//                 name: "Caps & Hats",
//               },
//               {
//                 link: "/categories/Bags%20and%20Travel/Backpacks",
//                 name: "BackPasck",
//               },
//               {
//                 link: "/categories/Apparel%20and%20Accessories/Winter%20Wear",
//                 name: "Winter Wear",
//               },
//               {
//                 link: "/categories/Technology%20Accessories/Computer%20Accessories",
//                 name: "Computer Accessaries",
//               },
//               {
//                 link: "/categories/Office%20and%20Writing/Notebook%20&%20Diary",
//                 name: "Notebook & Diary",
//               },
//             ].map((item, index) => (
//               <li key={index}>
//                 <Link to={item.link}>{item.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="cl"></div>
//       </div>
//       <div className="cl"></div>
//     </div>
//   );
// };

// export default TshirtDetails;
