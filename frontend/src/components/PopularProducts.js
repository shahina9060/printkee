// import React, { useEffect, useRef } from "react";
// import "../styles/PopularProducts.css";
// // import { image } from 'html2canvas/dist/types/css/types/image';

// const products = [
//   {
//     id: 940,
//     title: "2 in 1 Gift Set",
//     model: "H940",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H940/2%20In%201%20Gift%20Set%20H940%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=742",
//   },
//   {
//     id: 945,
//     title: "2 in 1 Gift Contrast Color",
//     model: "H945",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H945/2%20in%201%20Gift%20Set%20H945%20New%20Add%20Color-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=695",
//   },
//   {
//     id: 958,
//     title: "2 in 1 Gift Set",
//     model: "H958",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H958/2%20In%201%20Gift%20Set%20958%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=679",
//   },
//   {
//     id: 949,
//     title: "2 in 1 Gift Set",
//     model: "H949",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H949/2%20in%201%20Gift%20Set%20H949%20New%20Add%20Color-min-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=775",
//   },
//   {
//     id: 913,
//     title: "2 in 1 Gift Set",
//     model: "H913",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/2%20in%201%20Gift%20Set%20H913%20new-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=34",
//   },
//   {
//     id: 940,
//     title: "2 in 1 Gift Set",
//     model: "H940",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H940/2%20In%201%20Gift%20Set%20H940%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=742",
//   },
//   {
//     id: 945,
//     title: "2 in 1 Gift Contrast Color",
//     model: "H945",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H945/2%20in%201%20Gift%20Set%20H945%20New%20Add%20Color-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=695",
//   },
//     {
//       id: 958,
//       title: '2 in 1 Gift Set',
//       model: 'H958',
//       image: 'https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H958/2%20In%201%20Gift%20Set%20958%20New-583x640.jpg',
//     //   link: 'https://www.horagifts.com/index.php?route=product/product&product_id=679',
//     },
//     {
//       id: 949,
//       title: '2 in 1 Gift Set',
//       model: 'H949',
//       image: 'https://www.horagifts.com/image/cache/catalog/Gift%20Sets/H949/2%20in%201%20Gift%20Set%20H949%20New%20Add%20Color-min-583x640.jpg',
//     //   link: 'https://www.horagifts.com/index.php?route=product/product&product_id=775',
//     },
//     {
//       id: 913,
//       title: '2 in 1 Gift Set',
//       model: 'H913',
//       image: 'https://www.horagifts.com/image/cache/catalog/Gift%20Sets/2%20in%201%20Gift%20Set%20H913%20new-583x640.jpg',
//     //   link: 'https://www.horagifts.com/index.php?route=product/product&product_id=34',
//     },
// ];

// const productBottle = [
//   {
//     id: 714,
//     title: "Steel Water Bottle",
//     model: "H166 1000ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H166/Steel%20Water%20Bottle%20H166%201000ml-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=714",
//   },
//   {
//     id: 713,
//     title: "Steel Water Bottle",
//     model: "H166 750ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H166/Steel%20Water%20Bottle%20H166%20750ml-min-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=713",
//   },
//   {
//     id: 750,
//     title: "Steel Sipper Water Bottle",
//     model: "H162 900ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H162/Steel%20Sipper%20Water%20Bottle%20H162%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=750",
//   },
//   {
//     id: 748,
//     title: "Water Bottle With Hook",
//     model: "H163 900ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H163%20900%20ml/Steel%20Water%20Bottle%20with%20Hook%20900%20ml-min-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=748",
//   },
//   {
//     id: 725,
//     title: "Steel Water Bottle",
//     model: "H120 900ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H120/Steel%20Stainless%20Water%20Bottle%20H120%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=725",
//   },
//    {
//     id: 714,
//     title: "Steel Water Bottle",
//     model: "H166 1000ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H166/Steel%20Water%20Bottle%20H166%201000ml-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=714",
//   },
//   {
//     id: 713,
//     title: "Steel Water Bottle",
//     model: "H166 750ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H166/Steel%20Water%20Bottle%20H166%20750ml-min-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=713",
//   },
//   {
//     id: 750,
//     title: "Steel Sipper Water Bottle",
//     model: "H162 900ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H162/Steel%20Sipper%20Water%20Bottle%20H162%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=750",
//   },
//   {
//     id: 748,
//     title: "Water Bottle With Hook",
//     model: "H163 900ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H163%20900%20ml/Steel%20Water%20Bottle%20with%20Hook%20900%20ml-min-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=748",
//   },
//   {
//     id: 725,
//     title: "Steel Water Bottle",
//     model: "H120 900ml",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Steel%20Bottles/H120/Steel%20Stainless%20Water%20Bottle%20H120%20New-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=725",
//   },
// ];

// const productBags = [
//   {
//     id: 459,
//     title: "Office Laptop Bag",
//     model: "H1550",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Office%20Laptop%20Bag%20H1550%20new1-583x640.jpg",
//     // image: "http://localhost:5050/uploads/images/Noble Laptop Bag.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=459",
//   },
//   {
//     id: 836,
//     title: "Sports Travel Bag",
//     model: "H1507",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/H1507/Sports%20Travel%20Bag%20H1507%20New-min-583x640.jpg",
//     // link: "https://www.horagifts.com/h1507-sports-travel-bag",
//   },
//   {
//     id: 454,
//     title: "Anti Theft Laptop Backpack",
//     model: "H1544",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Anti%20Theft%20Travel%20Laptop%20Backpack%20H1544-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=454",
//   },
//   {
//     id: 456,
//     title: "Anti Theft Laptop Backpack",
//     model: "H1543",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Anti%20Theft%20Travel%20Laptop%20Backpack%20H1543%20new-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=456",
//   },
//   {
//     id: 534,
//     title: "Travel Gadget Organizer Bag",
//     model: "H1551",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Double%20Layer%20Travel%20Electronics%20Organizer%20Bag%20H1551%20new-583x640.jpg",
//     // link: "https://www.horagifts.com/H1551-double-layer-travel-gadget-bag-logo",
//   },
//   {
//     id: 459,
//     title: "Office Laptop Bag",
//     model: "H1550",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Office%20Laptop%20Bag%20H1550%20new1-583x640.jpg",
//     // image: "http://localhost:5050/uploads/images/Noble Laptop Bag.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=459",
//   },
//   {
//     id: 836,
//     title: "Sports Travel Bag",
//     model: "H1507",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/H1507/Sports%20Travel%20Bag%20H1507%20New-min-583x640.jpg",
//     // link: "https://www.horagifts.com/h1507-sports-travel-bag",
//   },
//   {
//     id: 454,
//     title: "Anti Theft Laptop Backpack",
//     model: "H1544",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Anti%20Theft%20Travel%20Laptop%20Backpack%20H1544-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=454",
//   },
//   {
//     id: 456,
//     title: "Anti Theft Laptop Backpack",
//     model: "H1543",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Anti%20Theft%20Travel%20Laptop%20Backpack%20H1543%20new-583x640.jpg",
//     // link: "https://www.horagifts.com/index.php?route=product/product&product_id=456",
//   },
//   {
//     id: 534,
//     title: "Travel Gadget Organizer Bag",
//     model: "H1551",
//     image:
//       "https://www.horagifts.com/image/cache/catalog/Bags/Double%20Layer%20Travel%20Electronics%20Organizer%20Bag%20H1551%20new-583x640.jpg",
//     // link: "https://www.horagifts.com/H1551-double-layer-travel-gadget-bag-logo",
//   },
// ];

// const PopularProducts = () => {
//   const giftSetRef = useRef(null);
//   const waterBottleRef = useRef(null);
//   const bagRef = useRef(null);

//   const scroll = (ref, direction) => {
//     const container = ref.current;
//     if (container) {
//       const scrollAmount = container.firstChild.offsetWidth + 20;
//       container.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   // Auto-scroll each section every 30s
//  useEffect(() => {
//   const interval = setInterval(() => {
//     scroll(giftSetRef, "right");
//   }, 3000);
//   return () => clearInterval(interval);
// }, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     scroll(waterBottleRef, "right");
//   }, 30000);
//   return () => clearInterval(interval);
// }, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     scroll(bagRef, "right");
//   }, 30000);
//   return () => clearInterval(interval);
// }, []);


//   return (
//     <>
//     <h3 className="category-title-heading">Popular Products</h3>
//       {/* Gift Sets */}
//       <div className="gift-slider-wrapper">
//         <div className="gift-slider-header">
//           <h3 className="gift-slider-title">GIFT SETS</h3>
//           <div className="gift-slider-controls">
//             <button className="arrow-btn" onClick={() => scroll(giftSetRef, "left")}>&lt;</button>
//             <button className="arrow-btn" onClick={() => scroll(giftSetRef, "right")}>&gt;</button>
//           </div>
//         </div>
//         <div className="heading-underline"></div>
//         <div className="gift-slider-container" ref={giftSetRef}>
//           {products.map((item) => (
//             <div key={item.id} className="gift-card">
//               <img src={item.image} alt={item.title} className="gift-image" />
//               <h4 className="gift-title">{item.title}</h4>
//               <span className="gift-model">{item.model}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Water Bottles */}
//       <div className="gift-slider-wrapper">
//         <div className="gift-slider-header">
//           <h3 className="gift-slider-title">WATER BOTTLES</h3>
//           <div className="gift-slider-controls">
//             <button className="arrow-btn" onClick={() => scroll(waterBottleRef, "left")}>&lt;</button>
//             <button className="arrow-btn" onClick={() => scroll(waterBottleRef, "right")}>&gt;</button>
//           </div>
//         </div>
//         <div className="heading-underline"></div>
//         <div className="gift-slider-container" ref={waterBottleRef}>
//           {productBottle.map((item) => (
//             <div key={item.id} className="gift-card">
//               <img src={item.image} alt={item.title} className="gift-image" />
//               <h4 className="gift-title">{item.title}</h4>
//               <span className="gift-model">{item.model}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bags */}
//       <div className="gift-slider-wrapper">
//         <div className="gift-slider-header">
//           <h3 className="gift-slider-title">BAGS</h3>
//           <div className="gift-slider-controls">
//             <button className="arrow-btn" onClick={() => scroll(bagRef, "left")}>&lt;</button>
//             <button className="arrow-btn" onClick={() => scroll(bagRef, "right")}>&gt;</button>
//           </div>
//         </div>
//         <div className="heading-underline"></div>
//         <div className="gift-slider-container" ref={bagRef}>
//           {productBags.map((item) => (
//             <div key={item.id} className="gift-card">
//               <img src={item.image} alt={item.title} className="gift-image" />
//               <h4 className="gift-title">{item.title}</h4>
//               <span className="gift-model">{item.model}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PopularProducts;
