import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "../styles/ServicesSection.css";

const gifts = [
  {
    title: "Ready For Welcome Kits",
    description:
      "If you're bad at picking out the right present for any occasion, Boxup's ready-to-ship gifting options are your savior...",
    imageDesktop:
      "/assets/categories/welcomekits.jpg",
    buttonImage:
      "https://www.boxupgifting.com/cdn/shop/files/Clip-Path_1.png?v=1657782189",
    link: "/collections/all",
  },
  {
    title: "Customized T-Shirt Items",
    description:
      "Any wedding has a gift-giving culture at its center, and a special day as such calls for specially crafted hampers...",
    imageDesktop:
      "/assets/categories/customized-tshirt.jpg",
    buttonImage:
      "https://www.boxupgifting.com/cdn/shop/files/Clip-Path.png?v=1657782103",
    link: "/collections/wedding-gifts",
  },
  {
    title: "Customized Caps Items",
    description:
      "Any wedding has a gift-giving culture at its center, and a special day as such calls for specially crafted hampers...",
    imageDesktop:
      "/assets/categories/customized-caps.jpg",
    buttonImage:
      "https://www.boxupgifting.com/cdn/shop/files/Clip-Path.png?v=1657782103",
    link: "/collections/wedding-gifts",
  },
];

const GiftItem = ({ gift, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Animation triggers when 30% of the item is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`gift-item ${index % 2 !== 0 ? "reverse" : ""}`}
    
    >
      <div className="gift-image">
        <img src={gift.imageDesktop} alt={gift.title} />
      </div>
      <div className="gift-content">
        <h4>{gift.title}</h4>
        <div className="gift-meta">
          <span>Personalized Gift Collection</span>{" "}
          <span className="line">|</span> <span>Safe Delivery</span>
        </div>
        <p>{gift.description}</p>
        <a href={gift.link} className="btn-image">
          <img src={gift.buttonImage} alt="Shop Now" />
        </a>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="gift-section">
      <h3 className="category-title-heading">We Offers</h3>
      <div className="container">
        <div className="gift-grid desktop">
          {gifts.map((gift, index) => (
            <GiftItem key={index} gift={gift} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
